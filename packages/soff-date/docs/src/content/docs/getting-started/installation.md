---
title: Installation
description: How to install Soff Date in your project
---

# Installation

Get started with Soff Date in seconds.

## Package Managers

Install using your favorite package manager:

### npm

```bash
npm install soff-date
```

### pnpm

```bash
pnpm add soff-date
```

### yarn

```bash
yarn add soff-date
```

### bun

```bash
bun add soff-date
```

## CDN Usage

For quick prototyping or simple pages, you can use a CDN:

### ESM.sh

```html
<script type="module">
  import { getHolidays } from 'https://esm.sh/soff-date/locales/co';

  const holidays = getHolidays(2025);
  console.log(holidays);
</script>
```

### unpkg

```html
<script type="module">
  import { getHolidays } from 'https://unpkg.com/soff-date/dist/locales/co.js';

  const holidays = getHolidays(2025);
  console.log(holidays);
</script>
```

## TypeScript Configuration

Soff Date is written in TypeScript and includes type definitions. No additional @types packages needed!

### tsconfig.json

For best results, use these TypeScript compiler options:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true
  }
}
```

## Import Styles

Soff Date supports both ESM and CommonJS:

### ES Modules (Recommended)

```typescript
import { getHolidays } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';
```

### CommonJS

```javascript
const { getHolidays } = require('soff-date/locales/co');
const { en } = require('soff-date/i18n/en');
```

## Tree-Shaking Setup

To get the most out of Soff Date's tree-shaking capabilities:

### Vite

Works out of the box! No configuration needed.

```typescript
import { getHolidays } from 'soff-date/locales/co';
```

### Webpack 5

Enable `sideEffects` in your webpack config:

```javascript
module.exports = {
  optimization: {
    sideEffects: true,
    usedExports: true,
  },
};
```

### Rollup

Use the `@rollup/plugin-node-resolve` plugin:

```javascript
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main'],
    }),
  ],
};
```

### esbuild

Works automatically with default settings:

```bash
esbuild app.ts --bundle --minify --format=esm
```

## Verifying Installation

Create a test file to verify everything works:

```typescript
// test.ts
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2025);
console.log('Colombia holidays in 2025:', holidays.length);
console.log('First holiday:', holidays[0]);
```

Run it:

```bash
# With ts-node
npx ts-node test.ts

# With tsx
npx tsx test.ts

# Compile and run
tsc test.ts && node test.js
```

Expected output:

```
Colombia holidays in 2025: 18
First holiday: {
  date: '2025-01-01',
  key: 'newYear',
  name: 'Año Nuevo',
  isShifted: false
}
```

## Bundle Size Verification

Check what's actually included in your bundle:

### Using bundle-phobia

Visit [bundlephobia.com](https://bundlephobia.com/package/soff-date) to see:
- Minified size
- Minified + gzipped size
- Download time estimates

### Using source-map-explorer

```bash
# Install
npm install -D source-map-explorer

# Build your app with source maps
npm run build

# Analyze
npx source-map-explorer dist/bundle.js
```

You should see only the locales and i18n files you imported!

## Platform Support

Soff Date works on:

### Node.js

Requires Node.js 20 or higher:

```bash
node --version  # Should be >= 20.0.0
```

### Deno

```typescript
import { getHolidays } from 'npm:soff-date/locales/co';

const holidays = getHolidays(2025);
console.log(holidays);
```

### Bun

```typescript
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2025);
console.log(holidays);
```

### Browsers

Works in all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browsers, you may need to transpile with Babel.

## Edge Runtime Support

Soff Date works perfectly in edge runtimes:

### Vercel Edge Functions

```typescript
export const config = { runtime: 'edge' };

import { getHolidays } from 'soff-date/locales/us';

export default function handler(req: Request) {
  const holidays = getHolidays(2025);
  return new Response(JSON.stringify(holidays));
}
```

### Cloudflare Workers

```typescript
import { getHolidays } from 'soff-date/locales/us';

export default {
  async fetch(request: Request) {
    const holidays = getHolidays(2025);
    return new Response(JSON.stringify(holidays));
  },
};
```

## What's Next?

Now that you have Soff Date installed, let's use it:

- [Quick Start](/getting-started/quick-start/) - Your first holiday calculation
- [API Reference](/api/overview/) - Explore all available functions
- [Locales](/locales/overview/) - Browse supported countries
