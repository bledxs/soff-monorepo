---
title: API Overview
description: Complete API reference for Soff Date
---

# API Reference

Soff Date provides a simple, consistent API across all locales.

## Import Patterns

### Locale-Specific Functions

Each locale exports the same set of functions:

```typescript
import {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
} from 'soff-date/locales/co';
```

Available locales: `co`, `us`, `mx`, `ar`, `br`

### Core Engine (Advanced)

For building custom locales:

```typescript
import { resolveHolidays, checkIsHoliday, findNextHoliday } from 'soff-date/core/engine';
import { checkIsBusinessDay, addBusinessDays } from 'soff-date/core/business';
```

### Algorithms (Advanced)

Direct access to calculation algorithms:

```typescript
import { getEasterSunday } from 'soff-date/core/algorithms/easter';
import { getNthWeekday } from 'soff-date/core/algorithms/nth-weekday';
import { applyShift } from 'soff-date/core/algorithms/shifts';
```

### Internationalization

```typescript
import { en } from 'soff-date/i18n/en';
import { es } from 'soff-date/i18n/es';
import { pt } from 'soff-date/i18n/pt';
```

## Locale Functions

### getHolidays()

Get all holidays for a year.

```typescript
function getHolidays(year: number, options?: GetHolidaysOptions): Holiday[]
```

[Full documentation →](/api/get-holidays/)

### isHoliday()

Check if a specific date is a holiday.

```typescript
function isHoliday(date: Date, options?: GetHolidaysOptions): Holiday | null
```

[Full documentation →](/api/is-holiday/)

### getNextHoliday()

Get the next holiday from a date.

```typescript
function getNextHoliday(from?: Date, options?: GetHolidaysOptions): Holiday | null
```

[Full documentation →](/api/get-next-holiday/)

### isBusinessDay()

Check if a date is a business day (not weekend or holiday).

```typescript
function isBusinessDay(date: Date): boolean
```

[Full documentation →](/api/is-business-day/)

### businessDays()

Add or subtract business days from a date.

```typescript
function businessDays(startDate: Date, amount: number): Date
```

[Full documentation →](/api/business-days/)

## Types

### Holiday

Represents a single holiday:

```typescript
interface Holiday {
  date: string; // ISO format: '2025-01-01'
  key: string; // Unique identifier: 'newYear'
  name: string; // Display name: 'Año Nuevo'
  isShifted?: boolean; // true if moved by shift rule
}
```

### GetHolidaysOptions

Options for customizing holiday results:

```typescript
interface GetHolidaysOptions {
  lang?: HolidayNames; // Custom translations
}
```

### HolidayNames

Translation map for holiday names:

```typescript
type HolidayNames = Record<string, string>;

// Example
const customNames: HolidayNames = {
  newYear: "New Year's Day",
  christmas: 'Christmas Day',
  // ...
};
```

### HolidayDefinition

Defines how a holiday is calculated:

```typescript
interface HolidayDefinition {
  key: string; // Unique identifier
  rule: HolidayRule; // Calculation rule
  shift?: ShiftRule; // Optional shifting
}
```

### HolidayRule

Union of all supported rule types:

```typescript
type HolidayRule =
  | { type: 'fixed'; month: number; day: number }
  | { type: 'nthWeekday'; month: number; weekday: number; n: number }
  | { type: 'easterRelative'; offset: number }
  | { type: 'custom'; calc: (year: number) => Date | null };
```

### ShiftRule

Holiday shifting strategies:

```typescript
type ShiftRule = 'none' | 'emiliani' | 'observedUS' | 'nextMonday' | 'nearestMonday';
```

## Quick Reference

| Function | Returns | Use Case |
|----------|---------|----------|
| `getHolidays(year)` | `Holiday[]` | Get all holidays for a year |
| `isHoliday(date)` | `Holiday \| null` | Check if date is a holiday |
| `getNextHoliday(from)` | `Holiday \| null` | Find next upcoming holiday |
| `isBusinessDay(date)` | `boolean` | Check if date is a working day |
| `businessDays(date, n)` | `Date` | Add/subtract business days |

## Examples

### Basic Usage

```typescript
import { getHolidays, isHoliday, getNextHoliday } from 'soff-date/locales/co';

// Get all holidays
const holidays = getHolidays(2025);

// Check a date
const result = isHoliday(new Date('2025-01-01'));
if (result) {
  console.log(`It's ${result.name}!`);
}

// Next holiday
const next = getNextHoliday();
console.log(`Next: ${next.name} on ${next.date}`);
```

### With Custom Language

```typescript
import { getHolidays } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';

const holidays = getHolidays(2025, { lang: en });
console.log(holidays[0].name); // "New Year's Day"
```

### Business Days

```typescript
import { isBusinessDay, businessDays } from 'soff-date/locales/us';

// Check if today is a business day
if (isBusinessDay(new Date())) {
  console.log('Time to work!');
}

// Calculate delivery date
const orderDate = new Date('2025-01-02');
const deliveryDate = businessDays(orderDate, 5);
console.log(`Delivers on ${deliveryDate.toISOString().split('T')[0]}`);
```

## Error Handling

All functions handle edge cases gracefully:

```typescript
// Invalid dates return null
isHoliday(new Date('invalid')); // null

// Future years work fine
getHolidays(2099); // Works!

// Past years work too
getHolidays(1900); // Works!

// Negative business days
businessDays(new Date(), -5); // Goes backward
```

## Performance Tips

### 1. Cache Holiday Lists

If checking many dates in the same year:

```typescript
const holidays2025 = getHolidays(2025); // Calculate once

dates.forEach((date) => {
  const holiday = holidays2025.find((h) => h.date === toISODate(date));
  // ...
});
```

### 2. Use Specific Imports

For best tree-shaking:

```typescript
// ✅ Good
import { getHolidays } from 'soff-date/locales/co';

// ❌ Bad (might include unused code)
import * as soffDate from 'soff-date';
```

### 3. Reuse Date Objects

```typescript
// ✅ Good
const today = new Date();
isHoliday(today);
isBusinessDay(today);

// ❌ Bad (creates multiple objects)
isHoliday(new Date());
isBusinessDay(new Date());
```

## TypeScript Usage

Full type safety with autocomplete:

```typescript
import type { Holiday, HolidayDefinition, ShiftRule } from 'soff-date';
import { getHolidays } from 'soff-date/locales/co';

// Type inference
const holidays = getHolidays(2025); // Type: Holiday[]

// Type checking
function formatHoliday(h: Holiday): string {
  return `${h.name} on ${h.date}`;
}

// Type-safe definitions
const myHolidays: HolidayDefinition[] = [
  { key: 'custom', rule: { type: 'fixed', month: 6, day: 15 } },
];
```

## What's Next?

Explore detailed documentation for each function:

- [getHolidays()](/api/get-holidays/) - Complete guide
- [isHoliday()](/api/is-holiday/) - Complete guide
- [getNextHoliday()](/api/get-next-holiday/) - Complete guide
- [isBusinessDay()](/api/is-business-day/) - Complete guide
- [businessDays()](/api/business-days/) - Complete guide
