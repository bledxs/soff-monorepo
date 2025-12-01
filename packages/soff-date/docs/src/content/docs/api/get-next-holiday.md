---
title: getNextHoliday()
description: Get the next upcoming holiday
---

# getNextHoliday()

Get the next holiday from a given date (or today).

## Signature

```typescript
function getNextHoliday(from?: Date, options?: GetHolidaysOptions): Holiday | null
```

## Parameters

### from
- **Type:** `Date`
- **Required:** No (defaults to today)
- **Description:** The date to search from

### options
- **Type:** `GetHolidaysOptions`
- **Required:** No
- **Description:** Configuration options

## Return Value

- Returns the next `Holiday` object
- Returns `null` if no holidays found (unlikely unless you're in year 9999)

## Examples

### Next Holiday from Today

```typescript
import { getNextHoliday } from 'soff-date/locales/co';

const next = getNextHoliday();

console.log(`Next holiday: ${next.name}`);
console.log(`Date: ${next.date}`);
```

### Next Holiday from Specific Date

```typescript
import { getNextHoliday } from 'soff-date/locales/us';

const next = getNextHoliday(new Date('2025-06-01'));

console.log(`Next after June 1: ${next.name} on ${next.date}`);
// "Independence Day on 2025-07-04"
```

### Countdown Display

```typescript
import { getNextHoliday } from 'soff-date/locales/co';

const next = getNextHoliday();
const nextDate = new Date(next.date);
const today = new Date();

const daysUntil = Math.ceil(
  (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
);

console.log(`${daysUntil} days until ${next.name}`);
```

### Get Next N Holidays

```typescript
import { getHolidays } from 'soff-date/locales/us';

function getNextNHolidays(n: number, from: Date = new Date()): Holiday[] {
  const fromStr = from.toISOString().split('T')[0];
  const year = from.getFullYear();

  // Get holidays from current year and next year
  const holidays = [
    ...getHolidays(year),
    ...getHolidays(year + 1),
  ];

  return holidays.filter((h) => h.date >= fromStr).slice(0, n);
}

const upcoming = getNextNHolidays(5);
upcoming.forEach((h) => console.log(`${h.date} - ${h.name}`));
```

## Common Patterns

### Holiday Alert System

```typescript
import { getNextHoliday } from 'soff-date/locales/co';

function checkUpcomingHoliday() {
  const next = getNextHoliday();
  const nextDate = new Date(next.date);
  const today = new Date();

  const daysUntil = Math.ceil(
    (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntil <= 7) {
    console.log(`⚠️ ${next.name} is in ${daysUntil} days!`);
  }
}
```

### Shipping Deadline Calculator

```typescript
import { getNextHoliday } from 'soff-date/locales/us';

function getShippingDeadline(): Date {
  const next = getNextHoliday();
  const deadline = new Date(next.date);

  // Must ship 2 days before holiday
  deadline.setDate(deadline.getDate() - 2);

  return deadline;
}

const deadline = getShippingDeadline();
console.log(`Ship by ${deadline.toISOString().split('T')[0]}`);
```

## Important Notes

:::tip[Year Boundary]
If there are no more holidays in the current year, the function automatically searches in the next year.
:::

:::info[Includes Today]
If `from` is a holiday, it returns the next holiday *after* that date, not the holiday itself.
:::

## See Also

- [getHolidays()](/api/get-holidays/) - Get all holidays
- [isHoliday()](/api/is-holiday/) - Check specific date
