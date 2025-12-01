---
title: Tree-shaking
description: Understanding bundle optimization in Soff Date
---

# Tree-shaking & Bundle Size

Soff Date is designed for optimal tree-shaking to minimize bundle size.

## How It Works

Only the code you import is included in your bundle:

```typescript
// ✅ Good: Only Colombia (~3KB)
import { getHolidays } from 'soff-date/locales/co';

// ✅ Good: Colombia + English (~5KB)
import { getHolidays } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';

// ✅ Good: Two locales (~7KB)
import { getHolidays as getCO } from 'soff-date/locales/co';
import { getHolidays as getUS } from 'soff-date/locales/us';
```

## Verify Bundle Size

### Using bundlephobia

Visit [bundlephobia.com/package/soff-date](https://bundlephobia.com/package/soff-date)

### Using source-map-explorer

```bash
npm install -D source-map-explorer
npm run build
npx source-map-explorer dist/bundle.js
```

## Bundle Size Table

| Import | Minified | Gzipped |
|--------|----------|---------|
| Core only | ~1.9KB | ~0.8KB |
| `locales/co` | ~4.3KB | ~1.6KB |
| `locales/us` | ~3.7KB | ~1.4KB |
| `locales/mx` | ~3.2KB | ~1.2KB |
| `i18n/en` | ~1.1KB | ~0.5KB |
| `i18n/es` | ~1.2KB | ~0.5KB |

## Comparison

| Library | Bundle Size |
|---------|-------------|
| **soff-date** | **~3KB** |
| date-holidays | ~50KB |
| holiday-jp | ~25KB |

## See Also

- [Installation](/getting-started/installation/) - Setup guide
- [Why Soff Date?](/getting-started/why/) - Benefits
