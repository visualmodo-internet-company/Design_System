# Reuse in Another Project

## Preferred initial route: reviewed source installation

Keep React 19, TypeScript strict, Tailwind 4 and the declared primitive dependencies compatible. Install the `design-system` registry bundle only after hosting and validating it, or copy the reviewed foundation directories into a consumer with an `@/*` alias pointing to `src/*`.

Import the shared stylesheet once at the application's root. Wrap the application in ThemeProvider. Use the existing components and pass project-specific navigation and actions to ApplicationShell.

```tsx
import '@/styles/design-system.css'; // registry target; local repository uses globals.css
import { ThemeProvider } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';

export function Example() {
  return <ThemeProvider><Button>Save changes</Button></ThemeProvider>;
}
```

The registry installer includes an alternate `design-system.css` entry rather than overwriting an existing `globals.css`. It still contains Tailwind and font imports; integrate those once when the consumer already imports them elsewhere. Back up and review every generated diff. Never accept blind overwrite in an established app.

## Routing and providers

The shell exposes onNavigate instead of coupling to a router. In a real application, map item IDs to routes, derive activeId from the router and use appropriate hrefs. Use project-specific storageKey. Replace onAction demo messages with real handlers only in the consuming application, not in the Design System library.

Vite is the reference environment. For server-component frameworks, create a client boundary around interactive components/provider and verify the framework integration; Next.js and SSR integration are not tested in this release. Fonts, CSS paths and Tailwind source discovery must be configured in the consumer.

## Version contract

Pin a release or commit, record it in the consumer's `design-system.lock.json`, and do not automatically import main on every build. Registry copies are local code, not live-linked packages. Review token and API diffs on upgrades and keep domain-specific logic outside shared primitives.

The package remains private to prevent accidental npm publication. A compiled distributable npm library is a future optional distribution method, not an already-published package.
