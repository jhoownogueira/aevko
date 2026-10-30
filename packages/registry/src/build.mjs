import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspaceRoot = path.resolve(packageRoot, '../..');
const registryRoot = path.join(workspaceRoot, 'registry');
const manifestRoot = path.join(registryRoot, 'manifest');
const schemaRoot = path.join(registryRoot, 'schema');
const outputRoot = path.join(workspaceRoot, 'public-registry');
const checkOnly = process.argv.includes('--check');

const normalizeRelativePath = (value, field) => {
  if (typeof value !== 'string' || value.length === 0 || value.includes('\\')) {
    throw new Error(`${field} must be a non-empty POSIX path`);
  }

  const normalized = path.posix.normalize(value);
  if (normalized.startsWith('../') || normalized === '..' || path.posix.isAbsolute(normalized)) {
    throw new Error(`${field} escapes its allowed root: ${value}`);
  }
  return normalized;
};

const manifestNames = (await readdir(manifestRoot))
  .filter((name) => name.endsWith('.json'))
  .map((name) => name.slice(0, -'.json'.length))
  .sort();
const manifests = [];

for (const expectedName of manifestNames) {
  const manifestPath = path.join(manifestRoot, `${expectedName}.json`);
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  if (manifest.schemaVersion !== 1 || manifest.name !== expectedName) {
    throw new Error(`Invalid manifest identity in ${manifestPath}`);
  }
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) {
    throw new Error(`${manifest.name} must declare at least one file`);
  }

  const targets = new Set();
  const files = [];
  for (const entry of manifest.files) {
    const source = normalizeRelativePath(entry.source, `${manifest.name}.files.source`);
    const target = normalizeRelativePath(entry.target, `${manifest.name}.files.target`);
    if (targets.has(target)) throw new Error(`${manifest.name} has duplicate target ${target}`);
    targets.add(target);

    const absoluteSource = path.resolve(registryRoot, ...source.split('/'));
    if (!absoluteSource.startsWith(`${registryRoot}${path.sep}`)) {
      throw new Error(`${manifest.name} source escapes registry root`);
    }
    await access(absoluteSource);
    const content = await readFile(absoluteSource, 'utf8');
    files.push({ target, content });
  }

  manifests.push({ ...manifest, files });
}

const names = new Set(manifests.map(({ name }) => name));
const visiting = new Set();
const visited = new Set();
const byName = new Map(manifests.map((item) => [item.name, item]));

function visit(name) {
  if (visited.has(name)) return;
  if (visiting.has(name)) throw new Error(`Registry dependency cycle detected at ${name}`);
  visiting.add(name);
  for (const dependency of byName.get(name).registryDependencies) {
    if (!names.has(dependency)) throw new Error(`${name} depends on unknown item ${dependency}`);
    visit(dependency);
  }
  visiting.delete(name);
  visited.add(name);
}

for (const name of names) visit(name);

const theme = await readFile(path.join(registryRoot, 'shared/styles/aevko.css'), 'utf8');
const itemSchema = await readFile(path.join(schemaRoot, 'item.v1.json'), 'utf8');
const index = {
  schemaVersion: 1,
  generatedBy: '@aevko/registry',
  items: manifests.map(({ name, title, description, category, angular }) => ({
    name,
    title,
    description,
    category,
    angular,
    url: `components/${name}.json`,
  })),
};

const serialize = (value) => `${JSON.stringify(value, null, 2)}\n`;
const outputs = new Map([
  ['index.json', serialize(index)],
  ['theme.css', theme.endsWith('\n') ? theme : `${theme}\n`],
  ['schema/item.v1.json', itemSchema.endsWith('\n') ? itemSchema : `${itemSchema}\n`],
  ...manifests.map((manifest) => [
    `components/${manifest.name}.json`,
    serialize({
      ...manifest,
      integrity: createHash('sha256')
        .update(manifest.files.map(({ target, content }) => `${target}\0${content}`).join('\0'))
        .digest('hex'),
    }),
  ]),
]);

if (checkOnly) {
  for (const [relative, expected] of outputs) {
    const actual = await readFile(path.join(outputRoot, relative), 'utf8').catch(() => null);
    if (actual !== expected) throw new Error(`Generated registry is stale: ${relative}`);
  }
  console.log(`Registry is valid and current (${manifests.length} items).`);
} else {
  await rm(outputRoot, { recursive: true, force: true });
  for (const [relative, content] of outputs) {
    const target = path.join(outputRoot, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content, 'utf8');
  }
  console.log(`Generated ${manifests.length} registry items in ${outputRoot}.`);
}
