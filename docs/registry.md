# Registry

`registry.json` describes an initial shadcn-compatible bundle called `design-system`. `npm run registry:build` inserts the actual file contents and emits `public/r/design-system.json`. It includes the shared components, providers, blocks/layouts and canonical styles, excluding the Overview fixture and page-specific demo blocks.

`src/styles/globals.css` is installed as `src/styles/design-system.css` to avoid overwriting a consumer's default CSS entry. The consumer must import it once. The bundle uses `@/` imports and assumes aliases consistent with components.json. Review file targets before installation.

## After hosting the Storybook

The public static directory is copied into Storybook's build, so the registry can be hosted under the same site. Replace the example below with the actual deployed base URL:

```bash
npx shadcn@4.21.0 add https://YOUR-HOST/r/design-system.json
```

That URL is a placeholder, not a deployed endpoint. Individual component distribution, registry namespaces and automated version upgrades can be added after the foundation is approved. CLI installation of this bundle has not been exercised in the blocked offline environment; schema/content checks are not a substitute for that consumer test.

The root `homepage` is deliberately `https://example.com/design-system` until a real deployment succeeds. Replace this placeholder before public registry distribution. The generated JSON has structural contract checks, but shadcn CLI installation in a fresh consumer has not been executed in the creation environment.
