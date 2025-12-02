<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="120" height="120">
  <h1>Soff Monorepo</h1>
  <p>A collection of lightweight, tree-shakeable TypeScript utilities for common business logic.</p>
</div>

<div align="center">

[![CI](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![All Contributors](https://img.shields.io/github/all-contributors/bledxs/soff-monorepo?color=ee8449&style=flat-square)](#contributors)

</div>

---

**Zero dependencies** · **TypeScript** · **Tree-shakeable** · **SSR Ready**

## Packages

| Package                             | Version                                                                                     | Size (gzip)                   | Description                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------- |
| [soff-date](./packages/soff-date)   | [![npm](https://img.shields.io/npm/v/soff-date)](https://www.npmjs.com/package/soff-date)   | ~2KB (Core) / ~4KB (Loc)      | Holiday calculator with algorithmic date computation    |
| [soff-geo](./packages/soff-geo)     | [![npm](https://img.shields.io/npm/v/soff-geo)](https://www.npmjs.com/package/soff-geo)     | ~1KB (Core) / ~45-100KB (Loc) | Geographic data for LATAM (Departments, Municipalities) |
| [soff-id](./packages/soff-id)       | [![npm](https://img.shields.io/npm/v/soff-id)](https://www.npmjs.com/package/soff-id)       | ~0.5KB (Core) / ~1KB (Loc)    | ID document validation for LATAM countries              |
| [soff-mask](./packages/soff-mask)   | [![npm](https://img.shields.io/npm/v/soff-mask)](https://www.npmjs.com/package/soff-mask)   | ~3KB (Core)                   | Input masking utilities                                 |
| [soff-money](./packages/soff-money) | [![npm](https://img.shields.io/npm/v/soff-money)](https://www.npmjs.com/package/soff-money) | ~9KB (Core)                   | Currency formatting and manipulation                    |
| [soff-phone](./packages/soff-phone) | [![npm](https://img.shields.io/npm/v/soff-phone)](https://www.npmjs.com/package/soff-phone) | ~0.5KB (Core) / ~1KB (Loc)    | Phone number validation and formatting                  |

## ✨ Features

<table>
<tr>
<td width="33%">

### 🚀 Lightweight

Each package is optimized for minimal bundle size. Most packages are under 5KB gzipped.

</td>
<td width="33%">

### 🌳 Tree-shakeable

Import only what you need. Every function and locale is independently importable.

</td>
<td width="33%">

### 📦 Zero Dependencies

Pure TypeScript with no external runtime dependencies.

</td>
</tr>
<tr>
<td width="33%">

### 🔷 TypeScript First

Full type safety out of the box with exported types and interfaces.

</td>
<td width="33%">

### 🌐 Universal

Works in Node.js, browsers, and edge runtimes (Cloudflare, Vercel, etc.).

</td>
<td width="33%">

### 🌎 LATAM Focus

Built specifically for Latin American business requirements and regulations.

</td>
</tr>
</table>

## 🚀 Quick Start

```bash
# Install individual packages
npm install soff-date soff-id soff-mask soff-money

# Or with pnpm
pnpm add soff-date soff-id soff-mask soff-money

# Or with yarn
yarn add soff-date soff-id soff-mask soff-money
```

### 📚 Usage Examples

### soff-date

```typescript
import { getHolidays, isHoliday } from 'soff-date/locales/co';

// Get all Colombian holidays for 2025
getHolidays(2025);

// Check if a date is a holiday
isHoliday(new Date('2025-01-01')); // → { key: 'newYear', ... }
```

### soff-geo

```typescript
import { searchMunicipality } from 'soff-geo/locales/co';

// Search for a municipality
searchMunicipality('Medellin'); // → [{ name: 'Medellín', code: '05001', ... }]
```

### soff-id

```typescript
import { validateCC } from 'soff-id/locales/co';

// Validate Colombian ID
validateCC('1234567890'); // → { isValid: true, ... }
```

### soff-mask

```typescript
import { mask } from 'soff-mask';
import { phoneCO } from 'soff-mask';

// Apply phone mask
mask('3001234567', phoneCO); // → '(300) 123 4567'
```

### soff-money

```typescript
import { Money, COP } from 'soff-money';

// Create and format money
const price = Money.fromDecimal(1500000, COP);
price.format(); // → '$1.500.000'
```

### soff-phone

```typescript
import { validate } from 'soff-phone/co';

// Validate phone
validate('3001234567'); // → { isValid: true, type: 'mobile', ... }
```

## Development

This monorepo uses [Turborepo](https://turbo.build/) and [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces).

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Type check
npm run type-check

# Lint
npm run lint
```

## Repository Structure

```
soff-monorepo/
├── apps/
│   └── docs/          # Documentation website (Next.js)
├── packages/
│   ├── soff-date/     # Holiday calculator
│   ├── soff-geo/      # Geographic data
│   ├── soff-id/       # ID validation
│   ├── soff-mask/     # Input masking
│   ├── soff-money/    # Currency utilities
│   ├── soff-phone/    # Phone validation
│   └── tsconfig/      # Shared TypeScript configs
├── .github/
│   └── workflows/     # CI/CD pipelines
└── turbo.json         # Turborepo configuration
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Versioning

This project uses [Changesets](https://github.com/changesets/changesets) for versioning. Each package is versioned independently.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://all-contributors.js.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bledxs"><img src="https://avatars.githubusercontent.com/u/90062924?v=4" width="100px;" alt="Luis C. Rojas"/><br /><sub><b>Luis C. Rojas</b></sub></a><br /><a href="https://github.com/bledxs/soff-monorepo/commits?author=bledxs" title="Code">💻</a> <a href="https://github.com/bledxs/soff-monorepo/commits?author=bledxs" title="Documentation">📖</a> <a href="#maintenance-bledxs" title="Maintenance">🚧</a> <a href="#infra-bledxs" title="Infrastructure">🚇</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

Made with ❤️ for the LATAM developer community
