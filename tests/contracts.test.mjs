import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const root = fileURLToPath(new URL('../', import.meta.url));
const text = (name) => readFileSync(path.join(root, name), 'utf8');
const json = (name) => JSON.parse(text(name));
function walk(directory) { return readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`]); }
const source = walk('src').filter((name) => /\.(ts|tsx)$/.test(name));
test('all 25 primitives have documented source, story and usage rules', () => {
  const manifest = json('docs/component-manifest.json');
  assert.equal(manifest.components.length, 25);
  assert.equal(new Set(manifest.components.map((item) => item.name)).size, 25);
  for (const item of manifest.components) { assert(existsSync(path.join(root, item.path))); assert(existsSync(path.join(root, item.story))); for (const field of ['description', 'use', 'avoid', 'accessibility', 'ai']) assert(item[field]?.length > 12, `${item.name}: ${field}`); }
});
test('every local static import resolves to a source file', () => {
  for (const file of [...source, ...walk('stories').filter((name) => /\.(mdx|tsx)$/.test(name)), ...walk('.storybook').filter((name) => /\.(ts|tsx)$/.test(name))]) {
    for (const match of text(file).matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/g)) {
      const name = match[1].split('?')[0];
      if (!name.startsWith('.') && !name.startsWith('@/')) continue;
      const resolved = name.startsWith('@/') ? path.join(root, 'src', name.slice(2)) : path.resolve(root, path.dirname(file), name);
      assert(['', '.ts', '.tsx', '.json', '.css', '.md', '/index.ts', '/index.tsx'].some((extension) => existsSync(resolved + extension)), `${file}: ${name}`);
    }
  }
});
test('UI code avoids explicit any and literal hexadecimal colors', () => {
  for (const file of source) { assert(!/(:\s*any\b|as\s+any\b|<any>)/.test(text(file)), file); assert(!/#[a-f\d]{3,8}\b/i.test(text(file)), file); }
  assert(!/#[a-f\d]{3,8}\b/i.test(text('src/styles/system.css')));
});
test('all ds custom-property references resolve to canonical or runtime tokens', () => {
  const styles = walk('src/styles').map(text).join('\n');
  const defined = new Set([...styles.matchAll(/(--ds-[\w-]+)\s*:/g)].map((match) => match[1]));
  for (const match of styles.matchAll(/var\((--ds-[\w-]+)/g)) assert(defined.has(match[1]), match[1]);
});
test('AI documentation is imported, not independently rewritten in Storybook', () => {
  assert(text('AGENTS.md').includes('docs/ai_guidelines.md'));
  assert(text('stories/guidelines/introduction.mdx').includes('docs/ai_guidelines.md?raw'));
  assert(text('stories/foundations/motion.mdx').includes('docs/motion.md?raw'));
});
test('registry builds content from real source and remains product-neutral', () => {
  execFileSync(process.execPath, ['scripts/build-registry.mjs'], { cwd: root });
  const item = json('public/r/design-system.json');
  assert(item.files.length >= 40);
  for (const file of item.files) { assert.equal(file.content, text(file.path)); assert(!/src\/(pages|fixtures)\//.test(file.path)); }
  assert.equal(item.files.find((file) => file.path === 'src/styles/globals.css').target, 'src/styles/design-system.css');
});
test('machine-readable tokens and Markdown are generated from the canonical files', () => {
  execFileSync(process.execPath, ['scripts/build-docs.mjs'], { cwd: root });
  const tokens = json('public/tokens.json');
  assert.equal(tokens.dark['--ds-background'], '#000000');
  assert.equal(tokens.light['--ds-background'], '#ffffff');
  assert.equal(tokens.dark['--ds-sidebar-width'], '256px');
  assert.equal(text('public/docs/ai_guidelines.md'), text('docs/ai_guidelines.md'));
});
test('foundation scope excludes real Account, authentication and server logic', () => {
  assert.deepEqual(readdirSync(path.join(root, 'src/pages')).sort(), ['overview-example.tsx', 'overview-page.tsx']);
  assert(!existsSync(path.join(root, 'src/api')));
  assert(text('README.md').includes('foundation-preview'));
});
test('source and generated preview exclude account-export identifiers and secrets', () => {
  const forbidden = [/contact-\d{8}/, /team_[a-zA-Z0-9]{18,}/, /dpl_[a-zA-Z0-9]{18,}/, /ghp_[A-Za-z0-9]{20}/];
  for (const file of [...source, ...walk('preview').filter((name) => name.endsWith('.html'))]) for (const pattern of forbidden) assert(!pattern.test(text(file)), file);
});
test('sidebar search and scrollbars preserve the requested visual contracts', () => {
  const styles = text('src/styles/system.css');
  const tokens = text('src/styles/tokens.css');
  const source = text('src/blocks/sidebar-search.tsx');
  assert(styles.includes('width: min(440px, calc(100vw - var(--ds-space-4)))'));
  assert(styles.includes('min-height: 54px'));
  assert(styles.includes('*::-webkit-scrollbar { width: 8px; height: 8px; }'));
  assert(styles.includes('border: 2px solid var(--ds-scrollbar-track)'));
  assert(tokens.includes('--ds-scrollbar-thumb: #454545'));
  assert(source.includes('Navigation Assistant'));
  assert(source.includes('sideOffset={-36}'));
});

test('team switcher preserves the measured Vercel scope interaction contract', () => {
  const styles = text('src/styles/system.css');
  const source = text('src/blocks/team-switcher.tsx');
  assert(styles.includes('.ds-team-link:hover { background: transparent; }'));
  assert(styles.includes('width: min(384px, calc(100vw - var(--ds-space-4)))'));
  assert(styles.includes('.ds-team-results { width: 100%; height: 250px;'));
  assert(source.includes('aria-label="Switch team"'));
  assert(source.includes('placeholder="Find Team…"'));
  assert(source.includes('Teams you create and join appear here for quick context switching.'));
});

test('Storybook docs expand stories to content height instead of fixed iframes', () => {
  const preview = text('.storybook/preview.tsx');
  assert(preview.includes("story: { inline: true }"));
  assert(!preview.includes("story: { inline: false }"));
});

test('package scripts use static Storybook publication and strict source checking', () => {
  const pkg = json('package.json');
  assert.equal(pkg.scripts['build-storybook'], 'storybook build --disable-telemetry');
  assert.equal(pkg.scripts.build, 'npm run typecheck && vite build');
  assert.equal(json('tsconfig.json').compilerOptions.strict, true);
});
