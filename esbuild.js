import esbuild from 'esbuild';

esbuild.build({
  bundle: true,
  entryPoints: ['./src/index.ts'],
  format: 'esm',
  logLevel: 'info',
  mainFields: ['module', 'main'],
  outfile: './dist/pixi-dashed-line.mjs',
  packages: 'external',  // don't actually bundle dependencies
  platform: 'node',
  sourcemap: true,
  target: 'es2020'
}).catch(() => process.exit(1))

esbuild.build({
  bundle: true,
  entryPoints: ['./src/index.ts'],
  format: 'cjs',
  logLevel: 'info',
  mainFields: ['main', 'module'],
  outfile: './dist/pixi-dashed-line.cjs',
  packages: 'external',  // don't actually bundle dependencies
  platform: 'node',
  sourcemap: true,
  target: 'es2020'
}).catch(() => process.exit(1))

esbuild.build({
  bundle: true,
  entryPoints: ['./src/index.ts'],
  format: 'iife',
  globalName: 'PixiDashLine',
  logLevel: 'info',
  mainFields: ['module', 'main'],
  outfile: './dist/pixi-dashed-line.iife.js',
  platform: 'browser',
  sourcemap: true,
  target: 'es2020'
}).catch(() => process.exit(1))
