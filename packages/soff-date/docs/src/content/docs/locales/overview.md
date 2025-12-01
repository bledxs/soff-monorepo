---
title: Locales Overview
description: Overview of all available locales in Soff Date
---

# Locales

Soff Date provides built-in support for holidays in multiple countries.

## Available Locales

| Flag | Country | Import | Holidays | Shift Rule |
|------|---------|--------|----------|------------|
| 🇨🇴 | [Colombia](/locales/colombia/) | `soff-date/locales/co` | 18 | Emiliani |
| 🇺🇸 | [United States](/locales/united-states/) | `soff-date/locales/us` | 10 | Observed US |
| 🇲🇽 | [México](/locales/mexico/) | `soff-date/locales/mx` | 8 | Nth Weekday |
| 🇦🇷 | [Argentina](/locales/argentina/) | `soff-date/locales/ar` | 16 | Nearest Monday |
| 🇧🇷 | [Brasil](/locales/brasil/) | `soff-date/locales/br` | 13 | None |

## How to Use

Each locale exports the same API:

```typescript
import {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
} from 'soff-date/locales/[LOCALE]';
```

## Quick Comparison

### Colombia (CO)
- **18 holidays** including religious and civic observances
- **Emiliani Law**: Many holidays move to Monday if they fall on weekends
- **Default language**: Spanish (ES)

### United States (US)
- **10 federal holidays**
- **Observed rule**: Saturday→Friday, Sunday→Monday
- **Default language**: English (EN)

### México (MX)
- **8 official holidays**
- **Flexible holidays**: Many use Nth weekday rules (moved to Mondays)
- **Default language**: Spanish (ES)

### Argentina (AR)
- **16 national holidays**
- **Nearest Monday**: Some holidays move to closest Monday
- **Default language**: Spanish (ES)

### Brasil (BR)
- **13 national holidays**
- **No shifting**: Holidays stay on their fixed dates
- **Default language**: Portuguese (PT)

## Examples

### Using Multiple Locales

```typescript
import { getHolidays as getCO } from 'soff-date/locales/co';
import { getHolidays as getUS } from 'soff-date/locales/us';

const co2025 = getCO(2025); // 18 holidays
const us2025 = getUS(2025); // 10 holidays

console.log(`Colombia: ${co2025.length} holidays`);
console.log(`USA: ${us2025.length} holidays`);
```

### Comparing Holidays

```typescript
import { isHoliday as isHolidayCO } from 'soff-date/locales/co';
import { isHoliday as isHolidayUS } from 'soff-date/locales/us';

const date = new Date('2025-07-04');

console.log('Colombia:', isHolidayCO(date)); // null (not a holiday)
console.log('USA:', isHolidayUS(date)); // { name: 'Independence Day', ... }
```

## Bundle Size by Locale

Only the locales you import are included in your bundle:

| Import | Minified Size |
|--------|---------------|
| `locales/co` | ~4.3KB |
| `locales/us` | ~3.7KB |
| `locales/mx` | ~3.2KB |
| `locales/ar` | ~4.1KB |
| `locales/br` | ~3.5KB |

```typescript
// Only ~3.7KB in your bundle
import { getHolidays } from 'soff-date/locales/us';

// ~7.9KB total (both locales)
import { getHolidays as getUS } from 'soff-date/locales/us';
import { getHolidays as getCO } from 'soff-date/locales/co';
```

## Need Another Country?

Don't see your country? You can:

1. **Create a custom locale** - [Learn how →](/advanced/custom-locales/)
2. **Request a locale** - [Open an issue on GitHub](https://github.com/bledxs/soff-date/issues)
3. **Contribute** - [Submit a PR](/resources/contributing/)

## Explore Locales

Click on a country to see detailed holiday information:

- [🇨🇴 Colombia →](/locales/colombia/)
- [🇺🇸 United States →](/locales/united-states/)
- [🇲🇽 México →](/locales/mexico/)
- [🇦🇷 Argentina →](/locales/argentina/)
- [🇧🇷 Brasil →](/locales/brasil/)
