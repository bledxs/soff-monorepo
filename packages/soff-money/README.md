# Soff Money

[![npm](https://img.shields.io/npm/v/soff-money)](https://www.npmjs.com/package/soff-money)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-money)](https://bundlephobia.com/package/soff-money)

Safe money handling for JavaScript with integer-based arithmetic and LATAM locale formatting.

**Zero dependencies** · **TypeScript** · **~6KB core**

## Table of Contents

- [Why?](#why)
- [Install](#install)
- [Quick Start](#quick-start)
- [Fair Distribution](#fair-distribution)
- [Available Locales](#available-locales)
- [API Reference](#api-reference)
- [Bundle Size](#bundle-size)
- [Contributing](#contributing)
- [License](#license)

## Why?

In JavaScript, `0.1 + 0.2 === 0.30000000000000004`. This is fatal for e-commerce or financial applications. Additionally, formatting currencies in Latin America is painful - does the symbol go before or after? Dots or commas for thousands?

This library handles money using integers (Safe Money pattern) and formats according to the country's locale.

## Install

```bash
npm install soff-money
```

## Quick Start

```typescript
import { Money, COP, USD } from 'soff-money';

// Create money from decimal (safe - converted to cents internally)
const price = Money.fromDecimal(1500000, COP);

// Arithmetic operations (all return new Money instances)
const withTax = price.multiply(1.19); // Add 19% tax
const discounted = withTax.multiply(0.9); // 10% discount

// Format for display
console.log(price.format()); // "$ 1.500.000"
console.log(discounted.format()); // "$ 1.606.500"

// Safe comparisons
price.equals(Money.fromDecimal(1500000, COP)); // true
price.greaterThan(discounted); // false
```

## Fair Distribution

When splitting money, you never lose cents:

```typescript
const bill = Money.fromDecimal(100, COP);
const [alice, bob, charlie] = bill.distribute(3);

// alice:   $33.34
// bob:     $33.33
// charlie: $33.33
// Total:   $100.00 ✓ (not $99.99!)
```

The extra cent goes to the first person - no money is lost!

### Proportional Distribution

```typescript
const total = Money.fromDecimal(100, USD);
const [share1, share2] = total.distributeBy([70, 30]);

// share1: $70.00 (70%)
// share2: $30.00 (30%)
```

## Available Locales

| Locale       | Import                  | Currency | Symbol | Format      |
| ------------ | ----------------------- | -------- | ------ | ----------- |
| 🇨🇴 Colombia  | `soff-money/locales/co` | COP      | $      | $ 1.500.000 |
| 🇲🇽 México    | `soff-money/locales/mx` | MXN      | $      | $1,500.00   |
| 🇦🇷 Argentina | `soff-money/locales/ar` | ARS      | $      | $ 1.500,00  |
| 🇧🇷 Brasil    | `soff-money/locales/br` | BRL      | R$     | R$ 1.500,00 |
| 🇺🇸 USA       | `soff-money/locales/us` | USD      | $      | $1,500.00   |

## API Reference

### Creating Money

```typescript
// From decimal (recommended)
Money.fromDecimal(1500.5, COP);

// From cents (when you already have cents)
Money.fromCents(150050, COP);

// Zero
Money.zero(COP);
```

### Arithmetic Operations

All operations return new Money instances (immutable):

```typescript
const a = Money.fromDecimal(100, COP);
const b = Money.fromDecimal(50, COP);

a.add(b); // $150
a.subtract(b); // $50
a.multiply(2); // $200
a.multiply(0.5); // $50
a.divide(2); // $50
a.percentage(10); // $10 (10% of a)
a.negate(); // -$100
a.abs(); // $100 (absolute value)
```

### Comparisons

```typescript
a.equals(b); // false
a.greaterThan(b); // true
a.greaterThanOrEqual(b); // true
a.lessThan(b); // false
a.lessThanOrEqual(b); // false
a.isZero(); // false
a.isPositive(); // true
a.isNegative(); // false
```

### Formatting

```typescript
const price = Money.fromDecimal(1500000, COP);

price.format(); // "$ 1.500.000"
price.toDecimal(); // 1500000
price.toCents(); // 150000000
price.toString(); // "COP 1500000.00"
```

## Bundle Size

| Import       | Size (minified) |
| ------------ | --------------- |
| `core`       | ~6.2KB          |
| `locales/co` | ~0.3KB          |
| `locales/mx` | ~0.3KB          |
| `locales/ar` | ~0.3KB          |
| `locales/br` | ~0.3KB          |
| `locales/us` | ~0.3KB          |
| Full package | ~7.2KB          |

Tree-shaking ensures you only ship what you import.

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Documentation

- [Español](docs/README.es.md)
