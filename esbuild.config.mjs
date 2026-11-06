import { build } from 'esbuild';
import { rename } from 'node:fs/promises';

await build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  external: ['obsidian', 'electron', '@codemirror/*', '@lezer/*'],
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  outfile: 'main.js',
});
await rename('main.css', 'styles.css');
