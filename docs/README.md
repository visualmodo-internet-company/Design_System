# Documentation map

Start with `design_principles.md`, `reference-audit.md`, then the foundations. `component-manifest.json` is the machine-readable component index; `ai_guidelines.md` is the full agent rulebook. Storybook imports the Markdown directly.

- Foundations: `colors.md`, `typography.md`, `spacing.md`, `motion.md`.
- Composition: `components.md`, `layouts.md`, `responsive.md`, `accessibility.md`.
- Reuse: `integration.md`, `registry.md`, `contributing.md`.
- Delivery truth: `validation.md`, `roadmap.md`, `reference-audit.md`.

Tokens are maintained in `src/styles/tokens.css`. Run `npm run docs:build` to emit public Markdown, token JSON and the component manifest. Generated files must not be edited by hand.
