<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Money</h1>
  <p>Safe money handling for JavaScript with integer-based arithmetic and LATAM locale formatting.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-money)](https://www.npmjs.com/package/soff-money)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-money)](https://bundlephobia.com/package/soff-money)

</div>

---

**Zero dependencies** · **TypeScript** · **~8KB core**

## Table of Contents

- [Soff Money](#soff-money)
  - [Table of Contents](#table-of-contents)
  - [Why?](#why)
  - [Install](#install)
  - [Quick Start](#quick-start)
  - [Fair Distribution](#fair-distribution)
    - [Proportional Distribution](#proportional-distribution)
  - [Available Locales](#available-locales)
  - [API Reference](#api-reference)
    - [Creating Money](#creating-money)
    - [Arithmetic Operations](#arithmetic-operations)
    - [Percentage Operations](#percentage-operations)
    - [Min/Max Operations](#minmax-operations)
    - [Comparisons](#comparisons)
    - [Formatting](#formatting)
  - [Static Methods](#static-methods)
  - [Bundle Size](#bundle-size)
  - [Contributing](#contributing)
  - [License](#license)
  - [Documentation](#documentation)

## 🤔 Why?

In JavaScript, `0.1 + 0.2 === 0.30000000000000004`. This is **fatal** for e-commerce or financial applications. 🚨

Additionally, formatting currencies in Latin America is painful:

- Does the symbol go before or after? 🤔
- Dots or commas for thousands?
- How many decimals?

This library solves both problems:

| Problem                      | Solution                                           |
| ---------------------------- | -------------------------------------------------- |
| 🐞 **Floating point errors** | Uses **Safe Money Pattern** (integer cents)        |
| 🌎 **LATAM formatting**      | Locale-aware formatting (COP, MXN, ARS, BRL, etc.) |
| 🧩 **Lost cents**            | Fair distribution algorithm (no money lost!)       |
| ⚔️ **Math operations**       | Immutable Money objects with safe arithmetic       |

## 📦 Install

```bash
# npm
npm install soff-money

# pnpm
pnpm add soff-money

# yarn
yarn add soff-money

# bun
bun add soff-money
```

## 🚀 Quick Start

```typescript
import { Money, COP, USD } from 'soff-money';

// 💵 Create money from decimal (safe - converted to cents internally)
const price = Money.fromDecimal(1500000, COP);

// 🧮 Arithmetic operations (all return new Money instances)
const withTax = price.addPercentage(19); // Add 19% tax
const discounted = withTax.subtractPercentage(10); // 10% discount

// 🎨 Format for display
console.log(price.format()); // "$ 1.500.000,00"
console.log(discounted.format()); // "$ 1.606.500,00"

// ⚖️ Safe comparisons
price.equals(Money.fromDecimal(1500000, COP)); // true
price.greaterThan(discounted); // false
```

## Fair Distribution

When splitting money, you never lose cents:

```typescript
const bill = Money.fromDecimal(100, USD);
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
const [share1, share2, share3] = total.distributeByRatios([1, 2, 2]);

// share1: $20.00 (20%)
// share2: $40.00 (40%)
// share3: $40.00 (40%)
```

## Available Locales

| Locale       | Import                  | Currency | Symbol | Format      |
| ------------ | ----------------------- | -------- | ------ | ----------- |
| 🇨🇴 Colombia  | `soff-money/locales/co` | COP      | $      | $ 1.500.000 |
| 🇲🇽 México    | `soff-money/locales/mx` | MXN      | $      | $1,500.00   |
| 🇦🇷 Argentina | `soff-money/locales/ar` | ARS      | $      | $ 1.500,00  |
| 🇧🇷 Brasil    | `soff-money/locales/br` | BRL      | R$     | R$ 1.500,00 |
| 🇺🇸 USA       | `soff-money/locales/us` | USD      | $      | $1,500.00   |
| 🇨🇱 Chile     | `soff-money/locales/cl` | CLP      | $      | $ 1.500     |
| 🇵🇪 Perú      | `soff-money/locales/pe` | PEN      | S/     | S/ 1,500.00 |
| 🇺🇾 Uruguay   | `soff-money/locales/uy` | UYU      | $      | $ 1.500,00  |
| 🇪🇺 Euro      | `soff-money/locales/eu` | EUR      | €      | 1.500,00 €  |

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
const a = Money.fromDecimal(100, USD);
const b = Money.fromDecimal(50, USD);

a.add(b); // $150
a.subtract(b); // $50
a.multiply(2); // $200
a.multiply(0.5); // $50
a.divide(2); // $50
a.negate(); // -$100
a.abs(); // $100 (absolute value)
```

### Percentage Operations

```typescript
const price = Money.fromDecimal(100, USD);

price.percentage(10); // $10.00 (10% of price)
price.addPercentage(19); // $119.00 (price + 19% tax)
price.subtractPercentage(10); // $90.00 (price - 10% discount)
```

### Min/Max Operations

```typescript
const a = Money.fromDecimal(100, USD);
const b = Money.fromDecimal(50, USD);

a.min(b); // $50 (minimum of a and b)
a.max(b); // $100 (maximum of a and b)

const min = Money.fromDecimal(10, USD);
const max = Money.fromDecimal(100, USD);
a.clamp(min, max); // $100 (clamp a between min and max)

a.isBetween(min, max); // true (check if a is in range)
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
const price = Money.fromDecimal(1500.5, USD);

price.format(); // "$1,500.50"
price.format({ showSymbol: false }); // "1,500.50"
price.format({ showDecimals: false }); // "$1,501"
price.format({ symbolPosition: 'after' }); // "1,500.50 $"
price.toDecimal(); // 1500.50
price.toCents(); // 150050
price.toJSON(); // { cents: 150050, currency: 'USD' }
```

## Static Methods

```typescript
// Sum multiple values
const items = [Money.fromDecimal(100, USD), Money.fromDecimal(50, USD), Money.fromDecimal(25, USD)];

Money.sum(items); // $175.00

// Get min/max from array
Money.minimum(items); // $25.00
Money.maximum(items); // $100.00

// Calculate average
Money.average(items); // $58.33
```

## Bundle Size

| Import       | Size (minified) |
| ------------ | --------------- |
| `core`       | ~8.8KB          |
| `locales/*`  | ~0.3KB each     |
| Full package | ~10.6KB         |

Tree-shaking ensures you only ship what you import.

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Documentation

- [Español](docs/README.es.md)
