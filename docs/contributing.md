# Contributing

Use a small branch for one component, token change or pattern. Read AGENTS.md and the canonical guidelines. Include use/avoid/a11y rules in the component manifest and relevant stories. Avoid adding packages when a composition of existing components solves the task.

Run `npm run check` and `npm run test:e2e`. Review reference screenshots at known dimensions; do not replace baselines merely to make a test green. If an environment blocks a command, record the exact failure instead of checking the item as complete.

After the first successful npm installation, commit the real package-lock.json and use npm ci for reproducible builds. Do not fabricate lockfiles. Bump versions intentionally and document breaking changes to tokens, layout contracts or component props.

No private exports, credentials, account HTML, customer data or user-uploaded reference screenshots should be added to the public repository. Public source/license notices must be preserved. New licensing decisions for original code belong to the owner.
