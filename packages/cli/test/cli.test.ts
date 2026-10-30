import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { run } from '../src/index';

const fixtures: string[] = [];
const registry = path.resolve(import.meta.dirname, '../../../public-registry');

async function angularFixture(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), 'aevko-cli-test-'));
  fixtures.push(root);
  await mkdir(path.join(root, 'src'), { recursive: true });
  await writeFile(
    path.join(root, 'package.json'),
    `${JSON.stringify({ packageManager: 'pnpm@12.16.1', dependencies: { '@angular/core': '^22.2.0' } }, null, 2)}\n`,
  );
  await writeFile(
    path.join(root, 'angular.json'),
    `${JSON.stringify({ projects: { app: { architect: { build: { options: { styles: ['src/styles.css'] } } } } } }, null, 2)}\n`,
  );
  await writeFile(path.join(root, 'src/styles.css'), '/* consumer styles */\n');
  return root;
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(
    fixtures.splice(0).map((fixture) => rm(fixture, { recursive: true, force: true })),
  );
});

describe('Aevko CLI', () => {
  it('rejects Angular majors that have not passed the consumer suite', async () => {
    const root = await angularFixture();
    const packagePath = path.join(root, 'package.json');
    const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));
    packageJson.dependencies['@angular/core'] = '^21.0.0';
    await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
    await expect(run(['init', '--yes', '--registry', registry], root)).resolves.toBe(1);
  });

  it('initializes idempotently without deleting consumer styles', async () => {
    const root = await angularFixture();
    expect(await run(['init', '--yes', '--registry', registry], root)).toBe(0);
    expect(await run(['init', '--yes', '--registry', registry], root)).toBe(0);
    const styles = await readFile(path.join(root, 'src/styles.css'), 'utf8');
    expect(styles).toContain('/* consumer styles */');
    expect(styles.match(/aevko:theme:start/g)).toHaveLength(1);
  });

  it('adds one item and refuses to overwrite customization', async () => {
    const root = await angularFixture();
    expect(await run(['add', 'button', '--yes', '--registry', registry], root)).toBe(0);
    const target = path.join(root, 'src/app/ui/button/button.component.ts');
    await writeFile(target, `${await readFile(target, 'utf8')}\n// local change\n`);
    expect(await run(['add', 'button'], root)).toBe(2);
    expect(await readFile(target, 'utf8')).toContain('// local change');
  });

  it('keeps dry-run read-only', async () => {
    const root = await angularFixture();
    expect(await run(['add', 'card', '--yes', '--dry-run', '--registry', registry], root)).toBe(0);
    await expect(readFile(path.join(root, 'aevko.json'), 'utf8')).rejects.toThrow();
  });
});
