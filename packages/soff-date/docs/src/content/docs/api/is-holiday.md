---
title: isHoliday()
description: Check if a date is a holiday
---

# isHoliday()

Check if a specific date is a holiday and get its details.

## Signature

```typescript
function isHoliday(date: Date, options?: GetHolidaysOptions): Holiday | null
```

## Parameters

### date
- **Type:** `Date`
- **Required:** Yes
- **Description:** The date to check

### options
- **Type:** `GetHolidaysOptions`
- **Required:** No
- **Description:** Configuration options (e.g., custom language)

## Return Value

- Returns a `Holiday` object if the date is a holiday
- Returns `null` if the date is not a holiday

```typescript
interface Holiday {
  date: string;
  key: string;
  name: string;
  isShifted?: boolean;
}
```

## Examples

### Basic Usage

```typescript
import { isHoliday } from 'soff-date/locales/co';

// Check New Year's Day
const result = isHoliday(new Date('2025-01-01'));

if (result) {
  console.log(`It's ${result.name}!`); // "It's Año Nuevo!"
} else {
  console.log('Not a holiday');
}
```

### Check Today

```typescript
import { isHoliday } from 'soff-date/locales/us';

const today = isHoliday(new Date());

if (today) {
  console.log(`Today is ${today.name} 🎉`);
} else {
  console.log('Regular day');
}
```

### With Custom Language

```typescript
import { isHoliday } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';

const holiday = isHoliday(new Date('2025-12-25'), { lang: en });

console.log(holiday?.name); // "Christmas"
```

### Batch Checking

```typescript
import { isHoliday } from 'soff-date/locales/co';

const dates = [
  new Date('2025-01-01'),
  new Date('2025-01-02'),
  new Date('2025-01-03'),
];

dates.forEach((date) => {
  const holiday = isHoliday(date);
  const dateStr = date.toISOString().split('T')[0];

  if (holiday) {
    console.log(`${dateStr}: ${holiday.name}`);
  } else {
    console.log(`${dateStr}: Regular day`);
  }
});
```

## Common Patterns

### Conditional UI

```typescript
import { isHoliday } from 'soff-date/locales/us';

function HeaderBanner() {
  const today = isHoliday(new Date());

  if (today) {
    return <div className="holiday-banner">
      🎉 Happy {today.name}!
    </div>;
  }

  return null;
}
```

### Working Hours Check

```typescript
import { isHoliday } from 'soff-date/locales/co';

function isOfficeOpen(date: Date): boolean {
  const day = date.getDay();

  // Weekends
  if (day === 0 || day === 6) return false;

  // Holidays
  if (isHoliday(date)) return false;

  return true;
}
```

## Important Notes

:::tip[Use for Single Date Checks]
If you need to check multiple dates in the same year, consider using `getHolidays()` once and searching the array instead of calling `isHoliday()` repeatedly.
:::

:::caution[Time Zone]
The function compares dates using ISO date strings (YYYY-MM-DD), ignoring time and timezone. The date "2025-01-01T23:59:59Z" and "2025-01-01T00:00:00-05:00" are both treated as January 1, 2025.
:::

## See Also

- [getHolidays()](/api/get-holidays/) - Get all holidays for a year
- [getNextHoliday()](/api/get-next-holiday/) - Find next holiday
- [isBusinessDay()](/api/is-business-day/) - Check if business day
