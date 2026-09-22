// Run locally and deliberately. This file never reads, stores or asks for an access token.
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
const root = fileURLToPath(new URL('../', import.meta.url));
const owner = 'visualmodo-internet-company';
const repository = `${owner}/Design_System`;
const bin = (name) => process.platform === 'win32' && name === 'npm' ? 'npm.cmd' : name;
function run(command, args, capture = false) {
  const result = spawnSync(bin(command), args, { cwd: root, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit', shell: false });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(' ')} failed. No subsequent step was run.`);
  return result.stdout?.trim() ?? '';
}
try {
  if (!stdin.isTTY) throw new Error('Run in an interactive terminal; explicit public-publication confirmation is required.');
  if (existsSync(new URL('../.git', import.meta.url))) throw new Error('This folder already has .git. Use your existing Git workflow; this helper does not alter it.');
  run('git', ['--version']); run('gh', ['auth', 'status']);
  if (run('gh', ['api', 'user', '--jq', '.login'], true) !== owner) throw new Error(`The authenticated account must be ${owner}.`);
  const existing = spawnSync('gh', ['api', `repos/${repository}`], { cwd: root, encoding: 'utf8', shell: false });
  if (existing.status === 0) throw new Error(`${repository} already exists. Nothing will be overwritten.`);
  if (!existing.stderr?.includes('404')) throw new Error('Could not safely confirm the repository is absent. Check GitHub access first.');
  run('git', ['config', 'user.name'], true); run('git', ['config', 'user.email'], true);
  const terminal = createInterface({ input: stdin, output: stdout });
  console.log(`This creates a PUBLIC repository: ${repository}. Review all source files before continuing.`);
  const answer = await terminal.question(`Type CREATE PUBLIC ${repository} to validate and publish: `);
  terminal.close();
  if (answer !== `CREATE PUBLIC ${repository}`) throw new Error('Cancelled.');
  run('npm', [existsSync(new URL('../package-lock.json', import.meta.url)) ? 'ci' : 'install']);
  run('npm', ['run', 'check']);
  run('git', ['init', '-b', 'main']);
  // An allow-list avoids uploading unrelated files added beside the project.
  run('git', ['add', '.github', '.storybook', '.gitignore', '.npmrc', '.nvmrc', 'AGENTS.md', 'README.md', 'THIRD_PARTY_NOTICES.md', 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts', 'eslint.config.js', 'playwright.config.ts', 'components.json', 'registry.json', 'index.html', 'src', 'stories', 'docs', 'registry', 'scripts', 'tests', 'preview']);
  run('git', ['commit', '-m', 'feat: establish shared design system foundation']);
  run('gh', ['repo', 'create', repository, '--public', '--source=.', '--remote=origin', '--push']);
  console.log('Repository published. GitHub Pages remains a separate, manual deployment.');
} catch (error) { console.error(error instanceof Error ? error.message : 'Publication failed.'); process.exitCode = 1; }
