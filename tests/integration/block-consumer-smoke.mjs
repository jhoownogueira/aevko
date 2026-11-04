import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const cli = path.join(workspace, 'packages/cli/dist/index.js');
const registry = path.join(workspace, 'public-registry');
const allBlocks = [
  'dashboard-01',
  ...Array.from({ length: 5 }, (_, index) => `login-${String(index + 1).padStart(2, '0')}`),
  ...Array.from({ length: 5 }, (_, index) => `signup-${String(index + 1).padStart(2, '0')}`),
  ...Array.from({ length: 16 }, (_, index) => `sidebar-${String(index + 1).padStart(2, '0')}`),
];
const requested = process.env['AEVKO_BLOCKS']
  ?.split(',')
  .map((block) => block.trim())
  .filter(Boolean);
const blocks = requested?.length ? requested : allBlocks;

for (const block of blocks) {
  if (!allBlocks.includes(block)) throw new Error(`Unknown smoke block: ${block}`);
}

function execute(command, args, cwd) {
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
    env: process.env,
    shell: process.platform === 'win32',
  });
}

function className(block) {
  return `Aevko${block
    .split('-')
    .map((part) => `${part[0].toUpperCase()}${part.slice(1)}`)
    .join('')}Block`;
}

for (const block of blocks) {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), `aevko-block-${block}-`));
  const app = path.join(temporaryRoot, 'consumer');
  try {
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
    execute('node', [cli, 'init', '--cwd', app, '--yes', '--registry', registry], workspace);
    execute('node', [cli, 'add', block, '--cwd', app, '--yes'], workspace);
    const imported = className(block);
    await writeFile(
      path.join(app, 'src/app/app.ts'),
      `import { Component } from '@angular/core';\nimport { ${imported} } from './ui/blocks/${block}';\n\n@Component({\n  selector: 'app-root',\n  imports: [${imported}],\n  template: '<aevko-${block}-block />',\n})\nexport class App {}\n`,
      'utf8',
    );
    execute('npm', ['install'], app);
    execute('npm', ['run', 'build'], app);
    const packageJson = JSON.parse(await readFile(path.join(app, 'package.json'), 'utf8'));
    if (packageJson.dependencies?.['@aevko/ui'] || packageJson.dependencies?.['@aevko/source']) {
      throw new Error(`${block} introduced an Aevko runtime dependency.`);
    }
    if (
      packageJson.dependencies?.['@lucide/angular'] ||
      packageJson.devDependencies?.['@lucide/angular']
    ) {
      throw new Error(`${block} introduced an optional Lucide dependency.`);
    }
    console.log(`BLOCK_CONSUMER_SMOKE_OK ${block}`);
  } finally {
    const relative = path.relative(tmpdir(), temporaryRoot);
    if (!relative.startsWith('..') && !path.isAbsolute(relative)) {
      await rm(temporaryRoot, { recursive: true, force: true });
    }
  }
}
