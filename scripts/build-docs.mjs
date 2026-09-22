import { readFile, writeFile, readdir, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const css = await readFile(path.join(root, 'src/styles/tokens.css'), 'utf8');
function variables(block) {
  return Object.fromEntries([...block.matchAll(/(--ds-[\w-]+)\s*:\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]));
}
const rootBlock = css.match(/:root\s*\{([\s\S]*?)\}/)?.[1];
const darkBlock = css.match(/\[data-theme='dark'\]\s*\{([\s\S]*?)\}/)?.[1];
if (!rootBlock || !darkBlock) throw new Error('Canonical light/dark token blocks not found.');
const light = variables(rootBlock);
const darkOverrides = variables(darkBlock);
const tokens = { schemaVersion: 1, source: 'src/styles/tokens.css', provenance: 'docs/reference-audit.md', status: 'foundation-preview', light, dark: { ...light, ...darkOverrides } };
await mkdir(path.join(root, 'public/docs'), { recursive: true });
await writeFile(path.join(root, 'public/tokens.json'), `${JSON.stringify(tokens, null, 2)}\n`);
const files = (await readdir(path.join(root, 'docs'))).filter((name) => name.endsWith('.md')).sort();
for (const name of files) await copyFile(path.join(root, 'docs', name), path.join(root, 'public/docs', name));
await copyFile(path.join(root, 'AGENTS.md'), path.join(root, 'public/docs/AGENTS.md'));
await copyFile(path.join(root, 'docs/component-manifest.json'), path.join(root, 'public/component-manifest.json'));
const index = '# Design System\n\n> Shared React interface foundations. Preview stage. Read provenance and validation before use.\n\n## Agent entry points\n\n- [Agent instructions](./docs/AGENTS.md)\n- [Component manifest](./component-manifest.json)\n- [Tokens](./tokens.json)\n- [Registry bundle](./r/design-system.json)\n\n## Documentation\n\n' + files.map((name) => `- [${name}](./docs/${name})`).join('\n') + '\n';
await writeFile(path.join(root, 'public/llms.txt'), index);
console.log(`Documentation: ${files.length} Markdown files; ${Object.keys(light).length} tokens in two themes`);
