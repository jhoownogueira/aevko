import { access, copyFile, cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const workspaceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browserRoot = path.join(workspaceRoot, 'apps', 'docs', 'dist', 'docs', 'browser');
const registryRoot = path.join(workspaceRoot, 'public-registry');
const outputRoot = path.join(workspaceRoot, 'dist', 'pages');

await Promise.all([
  access(path.join(browserRoot, 'index.html')),
  access(path.join(browserRoot, 'index.csr.html')),
  access(path.join(registryRoot, 'index.json')),
]);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(browserRoot, outputRoot, { recursive: true });
await cp(registryRoot, path.join(outputRoot, 'registry'), { recursive: true });
await copyFile(path.join(workspaceRoot, 'LICENSE'), path.join(outputRoot, 'LICENSE.txt'));
await copyFile(path.join(browserRoot, 'index.csr.html'), path.join(outputRoot, '404.html'));
await writeFile(path.join(outputRoot, '.nojekyll'), '');

await Promise.all([
  access(path.join(outputRoot, 'index.html')),
  access(path.join(outputRoot, '404.html')),
  access(path.join(outputRoot, 'registry', 'index.json')),
  access(path.join(outputRoot, 'registry', 'schema', 'item.v1.json')),
  access(path.join(outputRoot, 'LICENSE.txt')),
  access(path.join(outputRoot, '.nojekyll')),
]);

console.log(`GitHub Pages artifact prepared at ${outputRoot}`);
