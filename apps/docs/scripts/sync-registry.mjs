import { cp, mkdir } from 'node:fs/promises';
const source = new URL('../../../public-registry/', import.meta.url);
const target = new URL('../.generated/registry/', import.meta.url);
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });
console.log('Copied canonical generated registry for documentation source examples.');
