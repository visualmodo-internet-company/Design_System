# Registry sources

Root `registry.json` is canonical. All file content comes directly from `src/`; there is no second component implementation in this directory. Run `npm run registry:build` to generate `public/r/design-system.json`.

`homepage` uses the explicit placeholder `https://example.com/design-system` until a successful publication provides the real URL. It is not a deployed site. Replace it in root registry.json before public distribution.

The initial bundle is intentionally complete rather than offering primitives whose shared CSS or dependencies would be missing. Test CLI installation in a disposable Vite project before marking the registry stable.
