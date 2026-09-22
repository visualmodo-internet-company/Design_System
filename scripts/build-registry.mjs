import { readFile, writeFile, mkdir, realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = fileURLToPath(new URL('../', import.meta.url));
const registry = JSON.parse(await readFile(path.join(root, 'registry.json'), 'utf8'));
assert.equal(registry.name, 'design-system');
const seen = new Set();
await mkdir(path.join(root, 'public/r'), { recursive: true });
for (const item of registry.items) {
  assert.match(item.name, /^[a-z0-9-]+$/);
  assert(!seen.has(item.name), `Duplicate item: ${item.name}`);
  seen.add(item.name);
  const files = await Promise.all(item.files.map(async (file) => {
    assert(!path.isAbsolute(file.path) && !file.path.split('/').includes('..'), 'Unsafe source path');
    assert(file.target && !path.isAbsolute(file.target) && !file.target.split('/').includes('..'), 'Unsafe target');
    const resolved = await realpath(path.join(root, file.path));
    assert(resolved.startsWith(root), 'Source escaped repository');
    return { ...file, content: await readFile(resolved, 'utf8') };
  }));
  const output = { $schema: 'https://ui.shadcn.com/schema/registry-item.json', ...item, files };
  await writeFile(path.join(root, `public/r/${item.name}.json`), `${JSON.stringify(output, null, 2)}\n`);
  console.log(`Registry: ${item.name}, ${files.length} files`);
}
await writeFile(path.join(root, 'public/registry.json'), `${JSON.stringify(registry, null, 2)}\n`);
