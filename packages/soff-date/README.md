<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Date</h1>
  <p>Lightweight, tree-shakeable holiday calculator with algorithmic date computation.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-date)](https://www.npmjs.com/package/soff-date)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-date)](https://bundlephobia.com/package/soff-date)
[![All Contributors](https://img.shields.io/github/all-contributors/bledxs/soff-monorepo?color=ee8449&style=flat-square)](#contributors)

</div>

---

**Zero dependencies** · **TypeScript** · **~3KB per locale**

## Table of Contents

- [Soff Date](#soff-date)
  - [Table of Contents](#table-of-contents)
  - [Why?](#why)
  - [Install](#install)
  - [Quick Start](#quick-start)
  - [i18n Support](#i18n-support)
  - [Available Locales](#available-locales)
  - [Available Languages](#available-languages)
  - [Shift Rules Explained](#shift-rules-explained)
    - [Emiliani (Colombia, Argentina)](#emiliani-colombia-argentina)
    - [Observed US (USA, UK)](#observed-us-usa-uk)
  - [Advanced: Create Your Own Locale](#advanced-create-your-own-locale)
  - [Advanced: Use Algorithms Directly](#advanced-use-algorithms-directly)
  - [Bundle Size](#bundle-size)
  - [API Reference](#api-reference)
    - [`getHolidays(year, options?)`](#getholidaysyear-options)
    - [`isHoliday(date, options?)`](#isholidaydate-options)
    - [`getNextHoliday(from?, options?)`](#getnextholidayfrom-options)
  - [Types](#types)
  - [Contributing](#contributing)
  - [License](#license)
  - [Documentation](#documentation)
  - [Contributors](#contributors)

## Why?

Most holiday libraries ship giant JSON files with dates until 2050. This library **calculates dates algorithmically**, supporting:

- Fixed dates (`December 25`)
- Nth weekday (`3rd Monday of January`)
- Easter-relative (`Good Friday = Easter - 2 days`)
- Shift rules (`Emiliani`, `Observed US`)

## Install

```bash
npm install soff-date
```

## Quick Start

```typescript
// Only Colombia included in bundle (~3KB)
import { getHolidays, isHoliday, getNextHoliday } from 'soff-date/locales/co';

// Get all holidays for a year
getHolidays(2025);
// → [{ date: '2025-01-01', key: 'newYear', name: 'Año Nuevo' }, ...]

// Check if a date is a holiday
isHoliday(new Date('2025-01-01'));
// → { date: '2025-01-01', key: 'newYear', name: 'Año Nuevo' }

isHoliday(new Date('2025-01-02'));
// → null

// Get next holiday from a date
getNextHoliday(new Date('2025-01-02'));
// → { date: '2025-01-06', key: 'epiphany', name: 'Día de los Reyes Magos' }
```

## i18n Support

```typescript
import { getHolidays } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';

getHolidays(2025, { lang: en });
// → [{ date: '2025-01-01', key: 'newYear', name: "New Year's Day" }, ...]

// Custom override
getHolidays(2025, { lang: { ...en, newYear: 'Happy New Year!' } });
```

## Available Locales

| Locale       | Import                 | Holidays | Shift Rule |
| ------------ | ---------------------- | -------- | ---------- |
| 🇨🇴 Colombia  | `soff-date/locales/co` | 18       | Emiliani   |
| 🇺🇸 USA       | `soff-date/locales/us` | 10       | Observed   |
| 🇲🇽 México    | `soff-date/locales/mx` | 8        | NthWeekday |
| 🇦🇷 Argentina | `soff-date/locales/ar` | 16       | NearestMon |
| 🇧🇷 Brasil    | `soff-date/locales/br` | 13       | None       |

## Available Languages

| Language  | Import              |
| --------- | ------------------- |
| Español   | `soff-date/i18n/es` |
| English   | `soff-date/i18n/en` |
| Português | `soff-date/i18n/pt` |

## Shift Rules Explained

### Emiliani (Colombia, Argentina)

Holidays falling on weekends **move to Monday**.

```typescript
// January 6, 2024 = Saturday → Monday January 8
{ date: '2024-01-08', key: 'epiphany', isShifted: true }
```

### Observed US (USA, UK)

- Saturday → Friday (before)
- Sunday → Monday (after)

```typescript
// July 4, 2026 = Saturday → Friday July 3
{ date: '2026-07-03', key: 'independenceDayUS', isShifted: true }
```

## Advanced: Create Your Own Locale

```typescript
import type { HolidayDefinition, Holiday, HolidayNames } from 'soff-date';
import { resolveHolidays, checkIsHoliday, findNextHoliday } from 'soff-date';

const definitions: HolidayDefinition[] = [
  // Fixed date
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },

  // Fixed with shift
  { key: 'christmas', rule: { type: 'fixed', month: 12, day: 25 }, shift: 'observedUS' },

  // Nth weekday: 3rd Monday of January
  { key: 'mlkDay', rule: { type: 'nthWeekday', month: 1, weekday: 1, n: 3 } },

  // Last Monday of May
  { key: 'memorialDay', rule: { type: 'nthWeekday', month: 5, weekday: 1, n: -1 } },

  // Easter relative: Good Friday = Easter - 2
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },

  // Custom calculation
  {
    key: 'custom',
    rule: {
      type: 'custom',
      calc: (year) => new Date(year, 5, 15), // June 15
    },
  },
];

const names: HolidayNames = {
  newYear: "New Year's Day",
  christmas: 'Christmas',
  // ...
};

export function getHolidays(year: number): Holiday[] {
  return resolveHolidays(definitions, year, names);
}
```

## Advanced: Use Algorithms Directly

```typescript
import { getEasterSunday } from 'soff-date/core/algorithms/easter';
import { getNthWeekday } from 'soff-date/core/algorithms/nth-weekday';
import { applyShift } from 'soff-date/core/algorithms/shifts';

// Easter Sunday 2025
getEasterSunday(2025); // → Date(2025, 3, 20)

// 4th Thursday of November 2025 (Thanksgiving)
getNthWeekday(2025, 11, 4, 4); // → Date(2025, 10, 27)

// Apply observed shift
applyShift(new Date('2026-07-04'), 'observedUS');
// → { date: Date(2026-07-03), shifted: true }
```

## Bundle Size

| Import       | Size (minified) |
| ------------ | --------------- |
| `locales/co` | ~4.3KB          |
| `locales/us` | ~3.7KB          |
| `i18n/es`    | ~1.2KB          |
| `i18n/en`    | ~1.1KB          |
| Core only    | ~1.9KB          |

Tree-shaking ensures you only ship what you import.

## API Reference

### `getHolidays(year, options?)`

Returns all holidays for a given year.

> **Note:** Some holidays might fall on the same date (e.g., a fixed holiday coinciding with a movable one). Always use `holiday.key` as the unique identifier, not the date.

```typescript
interface GetHolidaysOptions {
  lang?: HolidayNames; // Custom translations
}

interface Holiday {
  date: string; // ISO date: '2025-01-01'
  key: string; // Identifier: 'newYear'
  name: string; // Display name: 'Año Nuevo'
  isShifted?: boolean; // True if moved by shift rule
}
```

### `isHoliday(date, options?)`

Returns holiday info if the date is a holiday, `null` otherwise.

### `getNextHoliday(from?, options?)`

Returns the next holiday from a given date (defaults to today).

## Types

```typescript
type ShiftRule = 'none' | 'emiliani' | 'observedUS' | 'nextMonday';

type HolidayRule =
  | { type: 'fixed'; month: number; day: number }
  | { type: 'nthWeekday'; month: number; weekday: number; n: number }
  | { type: 'easterRelative'; offset: number }
  | { type: 'custom'; calc: (year: number) => Date };

interface HolidayDefinition {
  key: string;
  rule: HolidayRule;
  shift?: ShiftRule;
}
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Documentation

- [Español](docs/README.es.md)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://all-contributors.js.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bledxs"><img src="https://avatars.githubusercontent.com/u/90062924?v=4" width="100px;" alt="Luis C. Rojas"/><br /><sub><b>Luis C. Rojas</b></sub></a><br /><a href="https://github.com/bledxs/soff-monorepo/commits?author=bledxs" title="Code">💻</a> <a href="https://github.com/bledxs/soff-monorepo/commits?author=bledxs" title="Documentation">📖</a> <a href="#maintenance-bledxs" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
