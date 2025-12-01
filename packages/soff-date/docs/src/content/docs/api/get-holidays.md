---
title: getHolidays()
description: Get all holidays for a year
---

# getHolidays()

Returns all holidays for a given year in chronological order.

## Signature

```typescript
function getHolidays(year: number, options?: GetHolidaysOptions): Holiday[]
```

## Parameters

### year
- **Type:** `number`
- **Required:** Yes
- **Description:** The year to get holidays for (e.g., 2025)

### options
- **Type:** `GetHolidaysOptions`
- **Required:** No
- **Description:** Configuration options

```typescript
interface GetHolidaysOptions {
  lang?: HolidayNames; // Custom translations
}
```

## Return Value

Returns an array of `Holiday` objects sorted by date:

```typescript
interface Holiday {
  date: string;        // ISO format: '2025-01-01'
  key: string;         // Unique ID: 'newYear'
  name: string;        // Display name
  isShifted?: boolean; // true if moved by shift rule
}
```

## Examples

### Basic Usage

```typescript
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2025);

console.log(holidays.length); // 18 holidays
console.log(holidays[0]);
// {
//   date: '2025-01-01',
//   key: 'newYear',
//   name: 'Año Nuevo',
//   isShifted: false
// }
```

### With Custom Language

```typescript
import { getHolidays } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';

const holidays = getHolidays(2025, { lang: en });

console.log(holidays[0].name); // "New Year's Day"
```

### Display All Holidays

```typescript
import { getHolidays } from 'soff-date/locales/us';

const holidays = getHolidays(2025);

console.log('US Holidays 2025:\n');
holidays.forEach((h) => {
  const shifted = h.isShifted ? ' (observed)' : '';
  console.log(`${h.date} - ${h.name}${shifted}`);
});
```

## Common Patterns

### Filter by Month

```typescript
const holidays = getHolidays(2025);

const januaryHolidays = holidays.filter((h) => h.date.startsWith('2025-01'));
```

### Group by Month

```typescript
const holidays = getHolidays(2025);

const byMonth = holidays.reduce((acc, h) => {
  const month = h.date.substring(5, 7);
  acc[month] = acc[month] || [];
  acc[month].push(h);
  return acc;
}, {} as Record<string, Holiday[]>);

console.log(`January: ${byMonth['01'].length} holidays`);
```

### Find Specific Holiday

```typescript
const holidays = getHolidays(2025);

const christmas = holidays.find((h) => h.key === 'christmas');
console.log(christmas?.date); // '2025-12-25'
```

## Important Notes

:::caution[Multiple Holidays on Same Date]
Some dates may have multiple holidays (e.g., a fixed holiday coinciding with a shifted one). Always use `holiday.key` as the unique identifier, not the date.
:::

:::tip[Performance]
If checking many dates in the same year, call `getHolidays()` once and reuse the result instead of calling it for each date.
:::

## See Also

- [isHoliday()](/api/is-holiday/) - Check a specific date
- [getNextHoliday()](/api/get-next-holiday/) - Find next holiday
- [i18n Guide](/i18n/languages/) - Available languages
