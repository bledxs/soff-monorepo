import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'locales/co': 'src/locales/co.ts',
    'locales/mx': 'src/locales/mx.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: true,
  sourcemap: true,
});
