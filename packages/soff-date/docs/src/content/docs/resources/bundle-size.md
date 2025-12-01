---
title: Bundle Size
description: Detailed bundle size analysis
---

# Bundle Size Analysis

Understanding what goes into your bundle.

## Size by Import

| Import | Minified | Gzipped |
|--------|----------|---------|
| Core only | 1.9KB | 0.8KB |
| `locales/co` | 4.3KB | 1.6KB |
| `locales/us` | 3.7KB | 1.4KB |
| `locales/mx` | 3.2KB | 1.2KB |
| `locales/ar` | 4.1KB | 1.5KB |
| `locales/br` | 3.5KB | 1.3KB |
| `i18n/en` | 1.1KB | 0.5KB |
| `i18n/es` | 1.2KB | 0.5KB |
| `i18n/pt` | 1.2KB | 0.5KB |

## Verification

Check your actual bundle size:

```bash
npm install -D source-map-explorer
npm run build
npx source-map-explorer dist/bundle.js
```

Or visit: [bundlephobia.com/package/soff-date](https://bundlephobia.com/package/soff-date)

## See Also

- [Tree-shaking](/advanced/tree-shaking/)
- [Installation](/getting-started/installation/)
