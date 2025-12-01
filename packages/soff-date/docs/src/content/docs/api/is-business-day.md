---
title: isBusinessDay()
description: Check if a date is a business day
---

# isBusinessDay()

Check if a date is a business day (not a weekend or holiday).

## Signature

```typescript
function isBusinessDay(date: Date): boolean
```

## Parameters

### date
- **Type:** `Date`
- **Required:** Yes
- **Description:** The date to check

## Return Value

- Returns `true` if the date is a business day (weekday and not a holiday)
- Returns `false` if the date is a weekend or holiday

## Examples

### Basic Usage

```typescript
import { isBusinessDay } from 'soff-date/locales/co';

// Monday (not a holiday)
const monday = new Date('2025-01-13');
console.log(isBusinessDay(monday)); // true

// Saturday
const saturday = new Date('2025-01-04');
console.log(isBusinessDay(saturday)); // false

// Holiday (Monday)
const holiday = new Date('2025-01-06'); // Epiphany (moved to Monday)
console.log(isBusinessDay(holiday)); // false
```

### Check Today

```typescript
import { isBusinessDay } from 'soff-date/locales/us';

if (isBusinessDay(new Date())) {
  console.log('Office is open today!');
} else {
  console.log('Office is closed (weekend or holiday)');
}
```

### Filter Business Days

```typescript
import { isBusinessDay } from 'soff-date/locales/co';

function getBusinessDaysInRange(start: Date, end: Date): Date[] {
  const businessDays: Date[] = [];
  const current = new Date(start);

  while (current <= end) {
    if (isBusinessDay(current)) {
      businessDays.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return businessDays;
}

const start = new Date('2025-01-01');
const end = new Date('2025-01-31');
const businessDays = getBusinessDaysInRange(start, end);

console.log(`Business days in January: ${businessDays.length}`);
```

## Common Patterns

### Count Business Days

```typescript
import { isBusinessDay } from 'soff-date/locales/us';

function countBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);

  while (current <= end) {
    if (isBusinessDay(current)) count++;
    current.setDate(current.getDate() + 1);
  }

  return count;
}
```

### Office Hours Check

```typescript
import { isBusinessDay } from 'soff-date/locales/co';

function isOfficeOpen(date: Date = new Date()): boolean {
  if (!isBusinessDay(date)) return false;

  const hour = date.getHours();
  return hour >= 9 && hour < 17; // 9 AM - 5 PM
}
```

### Next Business Day

```typescript
import { isBusinessDay } from 'soff-date/locales/us';

function getNextBusinessDay(from: Date = new Date()): Date {
  const next = new Date(from);
  next.setDate(next.getDate() + 1);

  while (!isBusinessDay(next)) {
    next.setDate(next.getDate() + 1);
  }

  return next;
}
```

## Important Notes

:::info[Weekend Definition]
Weekends are defined as Saturday (day 6) and Sunday (day 0). Countries with different weekend patterns (e.g., Friday-Saturday in some Middle Eastern countries) are not currently supported.
:::

:::tip[Performance]
For checking many dates in the same year, consider caching the holiday list to avoid recalculating holidays on each call.
:::

## See Also

- [businessDays()](/api/business-days/) - Add/subtract business days
- [isHoliday()](/api/is-holiday/) - Check if date is a holiday
- [Business Days Guide](/concepts/business-days/) - Detailed explanation
