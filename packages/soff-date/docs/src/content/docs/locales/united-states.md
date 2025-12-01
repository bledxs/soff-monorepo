---
title: 🇺🇸 United States
description: US federal holidays with observed rule
---

# 🇺🇸 United States

United States federal holidays with the "observed" rule (Saturday→Friday, Sunday→Monday).

## Usage

```typescript
import {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
} from 'soff-date/locales/us';

const holidays = getHolidays(2025); // 10 holidays
```

## Federal Holidays (2025)

| Date | Holiday | Type |
|------|---------|------|
| Jan 1 | New Year's Day | Fixed |
| Jan 20 | Martin Luther King Jr. Day | 3rd Monday of January |
| Feb 17 | Presidents' Day | 3rd Monday of February |
| May 26 | Memorial Day | Last Monday of May |
| Jun 19 | Juneteenth | Fixed |
| Jul 4 | Independence Day | Fixed |
| Sep 1 | Labor Day | 1st Monday of September |
| Oct 13 | Columbus Day | 2nd Monday of October |
| Nov 11 | Veterans Day | Fixed |
| Nov 27 | Thanksgiving Day | 4th Thursday of November |
| Dec 25 | Christmas Day | Fixed |

**Total:** 10 federal holidays

## Observed Rule

When a holiday falls on a weekend, it's "observed" on a nearby weekday:

- **Saturday** → **Friday** (day before)
- **Sunday** → **Monday** (day after)

### Example

```typescript
import { getHolidays } from 'soff-date/locales/us';

// Independence Day falls on Saturday in 2026
const holidays2026 = getHolidays(2026);
const july4 = holidays2026.find((h) => h.key === 'independenceDayUS');

console.log(july4);
// {
//   date: '2026-07-03',  // Friday (moved back from Saturday)
//   key: 'independenceDayUS',
//   name: 'Independence Day',
//   isShifted: true
// }
```

### Holidays with Observed Rule

Only fixed-date holidays use the observed rule:
- New Year's Day (Jan 1)
- Juneteenth (Jun 19)
- Independence Day (Jul 4)
- Veterans Day (Nov 11)
- Christmas Day (Dec 25)

Floating holidays (MLK Day, Memorial Day, etc.) are always on weekdays by definition.

## Default Language

```typescript
import { getHolidays } from 'soff-date/locales/us';

const holidays = getHolidays(2025);
console.log(holidays[0].name); // "New Year's Day"
```

## Spanish Translation

```typescript
import { getHolidays } from 'soff-date/locales/us';
import { es } from 'soff-date/i18n/es';

const holidays = getHolidays(2025, { lang: es });
console.log(holidays[0].name); // "Año Nuevo"
```

## Business Days

```typescript
import { isBusinessDay, businessDays } from 'soff-date/locales/us';

// Federal government is closed today?
if (!isBusinessDay(new Date())) {
  console.log('Federal offices closed');
}

// Calculate business days
const start = new Date('2025-07-02');
const end = businessDays(start, 5);
console.log(end.toISOString().split('T')[0]);
// '2025-07-09' (skips July 4 + weekend)
```

## Common Patterns

### US Federal Holiday Calendar

```typescript
import { getHolidays } from 'soff-date/locales/us';

const holidays = getHolidays(2025);

console.log('US Federal Holidays 2025:\n');
holidays.forEach((h) => {
  const observed = h.isShifted ? ' (observed)' : '';
  console.log(`${h.date} - ${h.name}${observed}`);
});
```

### Long Weekends

Find holidays that create 3-day weekends:

```typescript
import { getHolidays } from 'soff-date/locales/us';

const holidays = getHolidays(2025);

const longWeekends = holidays.filter((h) => {
  const date = new Date(h.date);
  const day = date.getUTCDay();
  return day === 1 || day === 5; // Monday or Friday
});

console.log(`Long weekends: ${longWeekends.length}`);
longWeekends.forEach((h) => {
  const day = new Date(h.date).getUTCDay() === 1 ? 'Mon' : 'Fri';
  console.log(`${h.date} (${day}) - ${h.name}`);
});
```

## State Holidays

This locale includes only **federal holidays**. State-specific holidays vary:

- **Texas**: Texas Independence Day (Mar 2)
- **California**: César Chávez Day (Mar 31)
- **Massachusetts**: Patriots' Day (3rd Mon in April)

For state holidays, create a [custom locale](/advanced/custom-locales/).

## Bundle Size

| Import | Size |
|--------|------|
| `locales/us` | ~3.7KB |
| `locales/us` + `i18n/en` | ~4.8KB |
| `locales/us` + `i18n/es` | ~4.9KB |

## See Also

- [Shift Rules](/concepts/shift-rules/) - Learn about observed rule
- [i18n](/i18n/languages/) - Translation options
- [Custom Locales](/advanced/custom-locales/) - Add state holidays
