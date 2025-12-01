---
title: Custom Locales
description: Create your own locale with custom holidays
---

# Create Custom Locales

Build your own locale with custom holidays and rules.

## Basic Custom Locale

```typescript
import type { HolidayDefinition, Holiday, HolidayNames } from 'soff-date';
import { resolveHolidays, checkIsHoliday, findNextHoliday } from 'soff-date';

// Define holidays
const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'christmas', rule: { type: 'fixed', month: 12, day: 25 }, shift: 'observedUS' },
];

// Define names
const names: HolidayNames = {
  newYear: "New Year's Day",
  christmas: 'Christmas',
};

// Export functions
export function getHolidays(year: number): Holiday[] {
  return resolveHolidays(definitions, year, names);
}

export function isHoliday(date: Date): Holiday | null {
  return checkIsHoliday(definitions, date, names);
}

export function getNextHoliday(from: Date = new Date()): Holiday | null {
  return findNextHoliday(definitions, from, names);
}
```

## All Rule Types

```typescript
const definitions: HolidayDefinition[] = [
  // Fixed date
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },

  // Nth weekday
  { key: 'thanksgiving', rule: { type: 'nthWeekday', month: 11, weekday: 4, n: 4 } },

  // Easter-relative
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },

  // Custom calculation
  {
    key: 'custom',
    rule: {
      type: 'custom',
      calc: (year) => new Date(Date.UTC(year, 5, 15)),
    },
  },
];
```

## With Business Days

```typescript
import { checkIsBusinessDay, addBusinessDays } from 'soff-date/core/business';

export function isBusinessDay(date: Date): boolean {
  return checkIsBusinessDay(definitions, date);
}

export function businessDays(date: Date, amount: number): Date {
  return addBusinessDays(definitions, date, amount);
}
```

## See Also

- [Holiday Rules](/concepts/holiday-rules/) - All rule types
- [Shift Rules](/concepts/shift-rules/) - Available shift rules
