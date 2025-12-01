# Soff Monorepo

[![CI](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)

A collection of lightweight, tree-shakeable TypeScript utilities for common business logic.

**Zero dependencies** · **TypeScript** · **Tree-shakeable** · **SSR Ready**

## Packages

| Package                             | Version                                                                                     | Description                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [soff-date](./packages/soff-date)   | [![npm](https://img.shields.io/npm/v/soff-date)](https://www.npmjs.com/package/soff-date)   | Holiday calculator with algorithmic date computation |
| [soff-id](./packages/soff-id)       | [![npm](https://img.shields.io/npm/v/soff-id)](https://www.npmjs.com/package/soff-id)       | ID document validation for LATAM countries           |
| [soff-mask](./packages/soff-mask)   | [![npm](https://img.shields.io/npm/v/soff-mask)](https://www.npmjs.com/package/soff-mask)   | Input masking utilities                              |
| [soff-money](./packages/soff-money) | [![npm](https://img.shields.io/npm/v/soff-money)](https://www.npmjs.com/package/soff-money) | Currency formatting and manipulation                 |

## Features

- 🚀 **Lightweight** - Each package is optimized for minimal bundle size
- 🌳 **Tree-shakeable** - Import only what you need
- 📦 **Zero dependencies** - No external runtime dependencies
- 🔷 **TypeScript** - Full type safety out of the box
- 🌐 **SSR Ready** - Works in Node.js and browser environments
- 🌎 **LATAM Focus** - Built with Latin American business requirements in mind

## Quick Start

```bash
# Install individual packages
npm install soff-date
npm install soff-id
npm install soff-mask
npm install soff-money
```

### soff-date

```typescript
import { getHolidays, isHoliday } from 'soff-date/locales/co';

// Get all Colombian holidays for 2025
getHolidays(2025);

// Check if a date is a holiday
isHoliday(new Date('2025-01-01')); // → { key: 'newYear', ... }
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
│   ├── soff-id/       # ID validation
│   ├── soff-mask/     # Input masking
│   ├── soff-money/    # Currency utilities
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

## Author

**Luis C. Rojas** - [@bledxs](https://github.com/bledxs)

---

Made with ❤️ for the LATAM developer community
