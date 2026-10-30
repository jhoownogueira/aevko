import { access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const targetDirectory = path.resolve(scriptDirectory, '../public/brand');
const assets = ['logo.svg', 'logo-icon.svg', 'favicon.svg'];

await Promise.all(assets.map((asset) => access(path.join(targetDirectory, asset))));
console.log(`Validated ${assets.length} versioned brand assets.`);
