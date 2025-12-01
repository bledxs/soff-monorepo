import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'core/index': 'src/core/index.ts',
    'locales/co': 'src/locales/co.ts',
    'locales/mx': 'src/locales/mx.ts',
    'locales/ar': 'src/locales/ar.ts',
    'locales/br': 'src/locales/br.ts',
    'locales/us': 'src/locales/us.ts',
    'locales/cl': 'src/locales/cl.ts',
    'locales/pe': 'src/locales/pe.ts',
    'locales/uy': 'src/locales/uy.ts',
    'locales/eu': 'src/locales/eu.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: true,
  sourcemap: true,
});
