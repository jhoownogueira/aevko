import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const packageRoot = path.join(workspace, 'packages/cli');
const registry = path.join(workspace, 'public-registry');
const temporaryRoot = await mkdtemp(path.join(tmpdir(), 'aevko-package-'));
let tarball = '';
const expectedVersion = JSON.parse(
  await readFile(path.join(packageRoot, 'package.json'), 'utf8'),
).version;

function execute(command, args, cwd, capture = false) {
  return execFileSync(command, args, {
    cwd,
    encoding: capture ? 'utf8' : undefined,
    stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
}

try {
  const filename = execute('npm', ['pack', '--silent'], packageRoot, true)
    .trim()
    .split(/\r?\n/)
    .at(-1);
  if (!filename) throw new Error('npm pack did not return a tarball name.');
  tarball = path.join(packageRoot, filename);

  const entries = execute('tar', ['-tf', tarball], workspace, true).split(/\r?\n/);
  for (const required of [
    'package/dist/index.js',
    'package/package.json',
    'package/README.md',
    'package/LICENSE',
  ]) {
    if (!entries.includes(required)) throw new Error(`Packed CLI is missing ${required}.`);
  }
  if (entries.some((entry) => entry.startsWith('package/src/'))) {
    throw new Error('Packed CLI unexpectedly contains source files.');
  }

  execute(
    'pnpm',
    [
      'dlx',
      '@angular/cli@22.2.5',
      'new',
      'consumer',
      '--directory',
      'consumer',
      '--skip-git',
      '--skip-install',
      '--style',
      'css',
      '--standalone',
      '--strict',
      '--package-manager',
      'npm',
      '--defaults',
    ],
    temporaryRoot,
  );

  const app = path.join(temporaryRoot, 'consumer');
  execute('npm', ['install', '--save-dev', tarball], app);
  const bin = path.join(
    app,
    'node_modules/.bin',
    process.platform === 'win32' ? 'aevko-ui.cmd' : 'aevko-ui',
  );
  const version = execute(bin, ['--version'], app, true).trim();
  if (version !== expectedVersion) {
    throw new Error(
      `Packed CLI reported version ${version || '<empty>'}; expected ${expectedVersion}.`,
    );
  }

  execute(bin, ['init', '--yes', '--registry', registry], app);
  execute(bin, ['add', 'button', '--yes'], app);
  await writeFile(
    path.join(app, 'src/app/app.ts'),
    `import { Component } from '@angular/core';
import { AevkoButton } from './ui/button';

@Component({
  selector: 'app-root',
  imports: [AevkoButton],
  template: '<button aevkoButton variant="accent">Packaged CLI works</button>',
})
export class App {}
`,
    'utf8',
  );
  execute('npm', ['install'], app);
  execute('npm', ['run', 'build'], app);

  const packageJson = JSON.parse(await readFile(path.join(app, 'package.json'), 'utf8'));
  if (packageJson.dependencies?.['@aevko/ui'] || packageJson.dependencies?.['@aevko/source']) {
    throw new Error('Packed CLI introduced an Aevko runtime dependency.');
  }
  if (packageJson.dependencies?.['@lucide/angular']) {
    throw new Error('Packed CLI introduced an optional Lucide dependency.');
  }
  console.log(`PACKAGE_SMOKE_OK ${path.basename(tarball)} Angular 22 production build`);
} finally {
  if (tarball) await rm(tarball, { force: true });
  const relative = path.relative(tmpdir(), temporaryRoot);
  if (!relative.startsWith('..') && !path.isAbsolute(relative)) {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
}
