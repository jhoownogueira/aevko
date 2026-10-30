import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const forbiddenImport = /(?:@lucide\/angular|lucide-angular)/;

async function filesBelow(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) => {
        const target = path.join(directory, entry.name);
        return entry.isDirectory() ? filesBelow(target) : [target];
      }),
    )
  ).flat();
}

for (const file of await filesBelow(path.join(workspace, 'registry'))) {
  if (!/\.(?:ts|html|css|json)$/.test(file)) continue;
  const source = await readFile(file, 'utf8');
  if (forbiddenImport.test(source)) {
    throw new Error(
      `Installable registry source references Lucide: ${path.relative(workspace, file)}`,
    );
  }
}

for (const packagePath of ['package.json', 'registry/package.json', 'packages/cli/package.json']) {
  const packageJson = JSON.parse(await readFile(path.join(workspace, packagePath), 'utf8'));
  for (const section of ['dependencies', 'devDependencies', 'peerDependencies']) {
    if (packageJson[section]?.['@lucide/angular'] || packageJson[section]?.['lucide-angular']) {
      throw new Error(`${packagePath} exposes Lucide through ${section}.`);
    }
  }
}

const docsPackage = JSON.parse(
  await readFile(path.join(workspace, 'apps/docs/package.json'), 'utf8'),
);
if (!docsPackage.dependencies?.['@lucide/angular']) {
  throw new Error('The documentation application must own its optional Lucide dependency.');
}
if (docsPackage.dependencies?.['lucide-angular']) {
  throw new Error('The legacy lucide-angular package is not allowed.');
}

for (const file of await filesBelow(path.join(workspace, 'apps/docs/src'))) {
  if (!file.endsWith('.ts')) continue;
  const source = await readFile(file, 'utf8');
  if (/import\s+\*\s+as\s+.*from ['"]@lucide\/angular['"]/.test(source)) {
    throw new Error(`Wildcard Lucide import prevents explicit tree-shaking: ${file}`);
  }
  if (/import\s*\{[^}]*\bicons\b[^}]*\}\s*from ['"]@lucide\/angular['"]/.test(source)) {
    throw new Error(`Complete Lucide collection import is not allowed: ${file}`);
  }
}

console.log('ICON_BOUNDARY_OK registry is Lucide-free and docs use the official optional package.');
