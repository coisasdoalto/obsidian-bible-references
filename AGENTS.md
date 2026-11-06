# AGENTS.md

Guidance for agents working in this repository.

## Commands

- Install dependencies: `npm install`.
- Run all tests: `npm test`.
- Run a single test file: `npx vitest run tests/settings.test.ts`. Add `-t "test name"` to select a test.
- Type-check and build the plugin: `npm run build`.
- No lint script is configured.

## Architecture

The plugin processes Obsidian-rendered Markdown in reading mode. Each processed region receives a `MarkdownRenderChild` that mounts `@coisasdoalto/bible-references` and destroys its instance when the region is removed. The library detects references and displays a popup, fetching passages from biblias.app in ACF.

Persisted settings control the popup's accent color and theme. Changing settings remounts rendered regions; when following the Obsidian theme, the `css-change` event also updates the theme. The region itself is used as the popup container so CSS variables are inherited. `src/compact.css` overrides the library's appearance.

Esbuild bundles JavaScript and imported CSS while keeping the Obsidian API external, producing `main.js` and `styles.css`; both are Git-ignored. To install manually, copy these files and `manifest.json` into the vault's `.obsidian/plugins/bible-references/` directory and enable the plugin. Verify visual changes in Obsidian itself, as automated tests do not cover the UI.
