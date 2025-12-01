import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    // Core
    index: 'src/index.ts',
    'core/engine': 'src/core/engine.ts',
    'core/types': 'src/core/types.ts',

    // Algorithms (para uso avanzado)
    'core/algorithms/easter': 'src/core/algorithms/easter.ts',
    'core/algorithms/nth-weekday': 'src/core/algorithms/nth-weekday.ts',
    'core/algorithms/shifts': 'src/core/algorithms/shifts.ts',

    // Locales
    'locales/co': 'src/locales/co.ts',
    'locales/us': 'src/locales/us.ts',
    'locales/mx': 'src/locales/mx.ts',
    'locales/ar': 'src/locales/ar.ts',
    'locales/br': 'src/locales/br.ts',

    // i18n
    'i18n/es': 'src/i18n/es.ts',
    'i18n/en': 'src/i18n/en.ts',
    'i18n/pt': 'src/i18n/pt.ts',
    'i18n/index': 'src/i18n/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: true,
  sourcemap: true,
});
