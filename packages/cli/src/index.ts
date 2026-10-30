#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

type JsonObject = Record<string, unknown>;

interface CliOptions {
  cwd: string;
  registry?: string;
  dryRun: boolean;
  diff: boolean;
  overwrite: boolean;
  yes: boolean;
}

interface AevkoConfig {
  $schema: string;
  schemaVersion: 1;
  components: string;
  styles: string;
  direction: 'ltr' | 'rtl';
  registry: string;
}

interface RegistryIndexItem {
  name: string;
  title: string;
  description: string;
  category: string;
  angular: string;
  url: string;
}

interface RegistryIndex {
  schemaVersion: 1;
  items: RegistryIndexItem[];
}

interface RegistryItem {
  schemaVersion: 1;
  name: string;
  title: string;
  description: string;
  files: Array<{ target: string; content: string }>;
  registryDependencies: string[];
  npmDependencies: Record<string, string>;
  integrity: string;
}

interface ParsedArguments {
  command?: string;
  names: string[];
  options: CliOptions;
  help: boolean;
  version: boolean;
}

const CONFIG_NAME = 'aevko.json';
const DEFAULT_REGISTRY = 'https://aevko.jhonata.dev/registry';
const THEME_START = '/* aevko:theme:start */';
const THEME_END = '/* aevko:theme:end */';
const MAX_INDEX_BYTES = 2 * 1024 * 1024;
const MAX_ITEM_BYTES = 5 * 1024 * 1024;

class CliError extends Error {
  constructor(
    message: string,
    readonly exitCode = 1,
  ) {
    super(message);
  }
}

function parseArguments(argv: string[], initialCwd: string): ParsedArguments {
  const options: CliOptions = {
    cwd: initialCwd,
    dryRun: false,
    diff: false,
    overwrite: false,
    yes: false,
  };
  const positionals: string[] = [];
  let help = false;
  let version = false;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === '--cwd' || argument === '--registry') {
      const value = argv[index + 1];
      if (!value || value.startsWith('--')) throw new CliError(`${argument} requires a value.`);
      if (argument === '--cwd') options.cwd = path.resolve(initialCwd, value);
      else options.registry = value;
      index += 1;
    } else if (argument === '--dry-run') options.dryRun = true;
    else if (argument === '--diff') options.diff = true;
    else if (argument === '--overwrite') options.overwrite = true;
    else if (argument === '--yes' || argument === '-y') options.yes = true;
    else if (argument === '--help' || argument === '-h') help = true;
    else if (argument === '--version' || argument === '-v') version = true;
    else if (argument?.startsWith('-')) throw new CliError(`Unknown option: ${argument}`);
    else if (argument) positionals.push(argument);
  }

  return {
    command: positionals[0],
    names: positionals.slice(1),
    options,
    help,
    version,
  };
}

function printHelp(): void {
  console.log(`Aevko UI CLI

Usage:
  aevko-ui init [--dry-run] [--yes]
  aevko-ui add <component...> [--dry-run] [--diff] [--overwrite] [--yes]
  aevko-ui list
  aevko-ui diff <component...>

Options:
  --cwd <path>       Resolve an Angular workspace from another directory.
  --registry <path>  Use a local directory or HTTPS registry endpoint.
  --dry-run          Print planned changes without writing.
  --diff             Print file differences while adding.
  --overwrite        Replace conflicting component files.
  --yes, -y          Accept safe initialization defaults; never implies overwrite.
  --help, -h         Show command help.
  --version, -v      Print the CLI version.`);
}

async function findWorkspace(start: string): Promise<string> {
  let current = path.resolve(start);
  while (true) {
    if (existsSync(path.join(current, 'angular.json'))) return current;
    const parent = path.dirname(current);
    if (parent === current) break;
    current = parent;
  }
  throw new CliError(
    `No Angular workspace found from ${start}. Run this command in an Angular project.`,
  );
}

async function readJson<T>(file: string): Promise<T> {
  try {
    return JSON.parse(await readFile(file, 'utf8')) as T;
  } catch (error) {
    throw new CliError(`Could not read valid JSON from ${file}: ${(error as Error).message}`);
  }
}

function angularMajor(packageJson: JsonObject): number {
  const dependencies = {
    ...((packageJson.dependencies as JsonObject | undefined) ?? {}),
    ...((packageJson.devDependencies as JsonObject | undefined) ?? {}),
  };
  const range = dependencies['@angular/core'];
  const match = typeof range === 'string' ? range.match(/\d+/) : null;
  if (!match) throw new CliError('The workspace does not declare @angular/core.');
  const major = Number(match[0]);
  if (major !== 22) {
    throw new CliError(`Angular ${major} is not supported. Aevko currently validates Angular 22.`);
  }
  return major;
}

function detectPackageManager(workspace: string, packageJson: JsonObject): string {
  const declared = packageJson.packageManager;
  if (typeof declared === 'string') return declared.split('@')[0] || 'npm';
  if (existsSync(path.join(workspace, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(path.join(workspace, 'yarn.lock'))) return 'yarn';
  if (
    existsSync(path.join(workspace, 'bun.lockb')) ||
    existsSync(path.join(workspace, 'bun.lock'))
  ) {
    return 'bun';
  }
  return 'npm';
}

function normalizeInside(root: string, relative: string, label: string): string {
  if (path.isAbsolute(relative)) throw new CliError(`${label} must be relative to the workspace.`);
  const target = path.resolve(root, relative);
  const relation = path.relative(root, target);
  if (relation.startsWith('..') || path.isAbsolute(relation)) {
    throw new CliError(`${label} escapes the Angular workspace.`);
  }
  return target;
}

function detectStyles(angularJson: JsonObject): string {
  const projects = angularJson.projects as JsonObject | undefined;
  const firstProject = projects
    ? (Object.values(projects)[0] as JsonObject | undefined)
    : undefined;
  const architect = (firstProject?.architect ?? firstProject?.targets) as JsonObject | undefined;
  const build = architect?.build as JsonObject | undefined;
  const options = build?.options as JsonObject | undefined;
  const styles = options?.styles;
  if (Array.isArray(styles)) {
    const css = styles.find((entry) => typeof entry === 'string' && /\.s?css$/.test(entry));
    if (typeof css === 'string') return css;
  }
  return 'src/styles.css';
}

async function loadConfig(workspace: string): Promise<AevkoConfig | null> {
  const configPath = path.join(workspace, CONFIG_NAME);
  if (!existsSync(configPath)) return null;
  const config = await readJson<AevkoConfig>(configPath);
  if (config.schemaVersion !== 1 || !config.components || !config.styles || !config.registry) {
    throw new CliError(`${CONFIG_NAME} does not match schema version 1.`);
  }
  normalizeInside(workspace, config.components, 'components');
  normalizeInside(workspace, config.styles, 'styles');
  return config;
}

async function readRegistryText(base: string, relative: string, maxBytes: number): Promise<string> {
  if (/^https:\/\//.test(base)) {
    const url = new URL(relative, base.endsWith('/') ? base : `${base}/`);
    if (url.protocol !== 'https:') throw new CliError('Remote registries must use HTTPS.');
    const response = await fetch(url, { headers: { accept: 'application/json, text/css' } });
    if (!response.ok)
      throw new CliError(`Registry request failed (${response.status}) for ${url}.`);
    const declaredLength = Number(response.headers.get('content-length') ?? 0);
    if (declaredLength > maxBytes) throw new CliError(`Registry response is too large: ${url}.`);
    const text = await response.text();
    if (Buffer.byteLength(text) > maxBytes)
      throw new CliError(`Registry response is too large: ${url}.`);
    return text;
  }

  const root = path.resolve(base);
  const target = normalizeInside(root, relative.replaceAll('/', path.sep), 'registry path');
  const text = await readFile(target, 'utf8').catch((error: unknown) => {
    throw new CliError(`Could not read registry file ${target}: ${(error as Error).message}`);
  });
  if (Buffer.byteLength(text) > maxBytes)
    throw new CliError(`Registry file is too large: ${target}.`);
  return text;
}

async function registryJson<T>(base: string, relative: string, maxBytes: number): Promise<T> {
  const text = await readRegistryText(base, relative, maxBytes);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new CliError(`Registry returned invalid JSON for ${relative}.`);
  }
}

async function registryIndex(base: string): Promise<RegistryIndex> {
  const index = await registryJson<RegistryIndex>(base, 'index.json', MAX_INDEX_BYTES);
  if (index.schemaVersion !== 1 || !Array.isArray(index.items)) {
    throw new CliError('Unsupported registry index schema.');
  }
  return index;
}

async function registryItem(base: string, descriptor: RegistryIndexItem): Promise<RegistryItem> {
  const item = await registryJson<RegistryItem>(base, descriptor.url, MAX_ITEM_BYTES);
  if (item.schemaVersion !== 1 || item.name !== descriptor.name || !Array.isArray(item.files)) {
    throw new CliError(`Invalid registry item: ${descriptor.name}.`);
  }
  const digest = createHash('sha256')
    .update(item.files.map(({ target, content }) => `${target}\0${content}`).join('\0'))
    .digest('hex');
  if (digest !== item.integrity)
    throw new CliError(`Integrity check failed for ${descriptor.name}.`);
  return item;
}

async function confirmInitialization(): Promise<boolean> {
  if (!stdin.isTTY)
    throw new CliError('Aevko UI is not initialized. Re-run with --yes or run `aevko-ui init`.');
  const prompt = createInterface({ input: stdin, output: stdout });
  try {
    const answer = await prompt.question('Aevko UI is not initialized. Initialize now? [Y/n] ');
    return answer.trim() === '' || /^y(es)?$/i.test(answer.trim());
  } finally {
    prompt.close();
  }
}

function themeBlock(theme: string): string {
  return `${THEME_START}\n${theme.trim()}\n${THEME_END}`;
}

async function init(workspace: string, options: CliOptions): Promise<AevkoConfig> {
  const packagePath = path.join(workspace, 'package.json');
  const angularPath = path.join(workspace, 'angular.json');
  const packageJson = await readJson<JsonObject>(packagePath);
  const angularJson = await readJson<JsonObject>(angularPath);
  const major = angularMajor(packageJson);
  const packageManager = detectPackageManager(workspace, packageJson);
  const existing = await loadConfig(workspace);
  if (existing) {
    console.log(`Aevko UI is already initialized for Angular ${major}.`);
    return existing;
  }

  const registry = options.registry ?? DEFAULT_REGISTRY;
  const config: AevkoConfig = {
    $schema: 'https://aevko.jhonata.dev/schema/aevko.v1.json',
    schemaVersion: 1,
    components: 'src/app/ui',
    styles: detectStyles(angularJson),
    direction: 'ltr',
    registry,
  };
  const stylesPath = normalizeInside(workspace, config.styles, 'styles');
  const originalStyles = existsSync(stylesPath) ? await readFile(stylesPath, 'utf8') : '';
  const theme = await readRegistryText(registry, 'theme.css', MAX_ITEM_BYTES);
  const additions = [
    originalStyles.includes('@import "tailwindcss"') ||
    originalStyles.includes("@import 'tailwindcss'")
      ? ''
      : '@import "tailwindcss";',
    originalStyles.includes(THEME_START) ? '' : themeBlock(theme),
  ].filter(Boolean);
  const nextStyles = [originalStyles.trimEnd(), ...additions].filter(Boolean).join('\n\n') + '\n';
  const nextPackage = structuredClone(packageJson);
  const devDependencies = (nextPackage.devDependencies as JsonObject | undefined) ?? {};
  nextPackage.devDependencies = devDependencies;
  devDependencies['tailwindcss'] ??= '^4.3.3';
  devDependencies['@tailwindcss/postcss'] ??= '^4.3.3';
  devDependencies['postcss'] ??= '^8.5.6';
  const postcssPath = path.join(workspace, '.postcssrc.json');
  let nextPostcss: JsonObject = { plugins: { '@tailwindcss/postcss': {} } };
  if (existsSync(postcssPath)) {
    nextPostcss = await readJson<JsonObject>(postcssPath);
    const plugins = (nextPostcss.plugins as JsonObject | undefined) ?? {};
    nextPostcss.plugins = plugins;
    plugins['@tailwindcss/postcss'] ??= {};
  }

  console.log(`Initialize Aevko UI for Angular ${major} with ${packageManager}:`);
  console.log(`  create ${path.join(workspace, CONFIG_NAME)}`);
  console.log(`  update ${config.styles}`);
  console.log('  update package.json (Tailwind CSS 4)');
  console.log('  update .postcssrc.json');
  if (options.dryRun) return config;

  await mkdir(path.dirname(stylesPath), { recursive: true });
  await writeFile(
    path.join(workspace, CONFIG_NAME),
    `${JSON.stringify(config, null, 2)}\n`,
    'utf8',
  );
  await writeFile(stylesPath, nextStyles, 'utf8');
  await writeFile(packagePath, `${JSON.stringify(nextPackage, null, 2)}\n`, 'utf8');
  await writeFile(postcssPath, `${JSON.stringify(nextPostcss, null, 2)}\n`, 'utf8');
  console.log(`Aevko UI initialized. Run \`${packageManager} install\` before building.`);
  return config;
}

async function resolveItems(base: string, requested: string[]): Promise<RegistryItem[]> {
  const index = await registryIndex(base);
  const descriptors = new Map(index.items.map((item) => [item.name, item]));
  const resolved: RegistryItem[] = [];
  const visited = new Set<string>();
  const visiting = new Set<string>();

  const visit = async (name: string): Promise<void> => {
    if (visited.has(name)) return;
    if (visiting.has(name)) throw new CliError(`Registry dependency cycle detected at ${name}.`);
    const descriptor = descriptors.get(name);
    if (!descriptor)
      throw new CliError(
        `Unknown component: ${name}. Run \`aevko-ui list\` to inspect available items.`,
      );
    visiting.add(name);
    const item = await registryItem(base, descriptor);
    for (const dependency of item.registryDependencies) await visit(dependency);
    visiting.delete(name);
    visited.add(name);
    resolved.push(item);
  };

  for (const name of requested) await visit(name);
  return resolved;
}

function simpleDiff(previous: string, next: string, relative: string): string {
  const before = previous.split(/\r?\n/);
  const after = next.split(/\r?\n/);
  const lines = [`--- local/${relative}`, `+++ registry/${relative}`];
  const length = Math.max(before.length, after.length);
  for (let index = 0; index < length; index += 1) {
    if (before[index] === after[index]) continue;
    if (before[index] !== undefined) lines.push(`-${before[index]}`);
    if (after[index] !== undefined) lines.push(`+${after[index]}`);
  }
  return lines.join('\n');
}

async function updateNpmDependencies(
  workspace: string,
  items: RegistryItem[],
  dryRun: boolean,
): Promise<void> {
  const additions = Object.assign({}, ...items.map((item) => item.npmDependencies));
  if (Object.keys(additions).length === 0) return;
  const packagePath = path.join(workspace, 'package.json');
  const packageJson = await readJson<JsonObject>(packagePath);
  const dependencies = (packageJson.dependencies as JsonObject | undefined) ?? {};
  packageJson.dependencies = dependencies;
  for (const [name, range] of Object.entries(additions)) dependencies[name] ??= range;
  console.log(`  update package.json (${Object.keys(additions).join(', ')})`);
  if (!dryRun) await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, 'utf8');
}

async function add(
  workspace: string,
  config: AevkoConfig,
  names: string[],
  options: CliOptions,
): Promise<void> {
  if (names.length === 0) throw new CliError('Specify at least one component to add.');
  const base = options.registry ?? config.registry;
  const items = await resolveItems(base, names);
  const componentRoot = normalizeInside(workspace, config.components, 'components');
  const writes: Array<{
    absolute: string;
    relative: string;
    content: string;
    previous: string | null;
  }> = [];
  const conflicts: string[] = [];

  for (const item of items) {
    for (const file of item.files) {
      const absolute = normalizeInside(
        componentRoot,
        file.target.replaceAll('/', path.sep),
        'component file',
      );
      const relative = path.relative(workspace, absolute);
      const previous = existsSync(absolute) ? await readFile(absolute, 'utf8') : null;
      if (previous === file.content) continue;
      if (previous !== null && !options.overwrite) conflicts.push(relative);
      writes.push({ absolute, relative, content: file.content, previous });
    }
  }

  if (options.diff) {
    for (const file of writes) {
      if (file.previous === null) console.log(`+++ new/${file.relative}\n${file.content}`);
      else console.log(simpleDiff(file.previous, file.content, file.relative));
    }
  }
  if (conflicts.length > 0) {
    throw new CliError(
      `Refusing to overwrite customized files:\n${conflicts.map((file) => `  ${file}`).join('\n')}\nRun with --diff to inspect or --overwrite after review.`,
      2,
    );
  }

  console.log(
    `${options.dryRun ? 'Would add' : 'Adding'} ${items.map(({ name }) => name).join(', ')}:`,
  );
  for (const file of writes)
    console.log(`  ${file.previous === null ? 'create' : 'replace'} ${file.relative}`);
  await updateNpmDependencies(workspace, items, options.dryRun);
  if (options.dryRun) return;

  for (const file of writes) {
    await mkdir(path.dirname(file.absolute), { recursive: true });
    await writeFile(file.absolute, file.content, 'utf8');
  }
  console.log(
    `Installed ${items.length} component${items.length === 1 ? '' : 's'} from editable local source.`,
  );
}

async function list(base: string): Promise<void> {
  const index = await registryIndex(base);
  for (const item of index.items) console.log(`${item.name.padEnd(16)} ${item.description}`);
}

export async function run(
  argv = process.argv.slice(2),
  initialCwd = process.cwd(),
): Promise<number> {
  try {
    const parsed = parseArguments(argv, initialCwd);
    if (parsed.version) {
      console.log('0.1.0');
      return 0;
    }
    if (parsed.help || !parsed.command) {
      printHelp();
      return parsed.command || parsed.help ? 0 : 1;
    }
    const workspace = await findWorkspace(parsed.options.cwd);
    const packageJson = await readJson<JsonObject>(path.join(workspace, 'package.json'));
    angularMajor(packageJson);
    let config = await loadConfig(workspace);

    if (parsed.command === 'init') {
      await init(workspace, parsed.options);
      return 0;
    }
    if (parsed.command === 'list') {
      await list(parsed.options.registry ?? config?.registry ?? DEFAULT_REGISTRY);
      return 0;
    }
    if (parsed.command === 'add' || parsed.command === 'diff') {
      if (!config) {
        const proceed = parsed.options.yes || (await confirmInitialization());
        if (!proceed) throw new CliError('Initialization cancelled.');
        config = await init(workspace, parsed.options);
      }
      await add(workspace, config, parsed.names, {
        ...parsed.options,
        dryRun: parsed.command === 'diff' || parsed.options.dryRun,
        diff: parsed.command === 'diff' || parsed.options.diff,
      });
      return 0;
    }
    throw new CliError(`Unknown command: ${parsed.command}.`);
  } catch (error) {
    if (error instanceof CliError) {
      console.error(`Error: ${error.message}`);
      return error.exitCode;
    }
    console.error(error);
    return 1;
  }
}

const isDirectExecution =
  process.argv[1] !== undefined &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isDirectExecution) process.exitCode = await run();
