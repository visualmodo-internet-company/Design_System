# Visual reference — not the React application

Open `reference.html` in a browser. This generated, dependency-free reference uses the same canonical `src/styles/tokens.css`, `src/styles/system.css`, and neutral Overview fixture as the source project. Limited native interactions help visual review; they are not a replacement for testing the React app.

Fonts fall back to platform fonts here because no font binaries are supplied. The React app imports Geist and Geist Mono from declared npm packages after installation. Do not infer exact font fidelity from this preview.

`template.html` and `reference.js` are inspection scaffolding, not reusable product components. Edit the React components to develop the system. Run `node scripts/build-reference.mjs` after canonical CSS or fixture changes to regenerate the reference.
