---
title: Quick Start
description: Get started with Soff Date in 5 minutes
---

# Quick Start

Learn the basics of Soff Date in just a few minutes.

## Basic Usage

### Get All Holidays

Import from your desired locale and get holidays for a year:

```typescript
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2025);

console.log(holidays);
// [
//   { date: '2025-01-01', key: 'newYear', name: 'Año Nuevo' },
//   { date: '2025-01-06', key: 'epiphany', name: 'Día de los Reyes Magos' },
//   ...
// ]
```

### Check if a Date is a Holiday

```typescript
import { isHoliday } from 'soff-date/locales/co';

// Check a specific date
const holiday = isHoliday(new Date('2025-01-01'));

if (holiday) {
  console.log(`It's ${holiday.name}!`);
} else {
  console.log('Not a holiday');
}

// Result: It's Año Nuevo!
```

### Get the Next Holiday

```typescript
import { getNextHoliday } from 'soff-date/locales/co';

// From today
const next = getNextHoliday();
console.log(`Next holiday: ${next.name} on ${next.date}`);

// From a specific date
const nextFromDate = getNextHoliday(new Date('2025-06-01'));
console.log(`Next after June 1: ${nextFromDate.name}`);
```

## Working with Business Days

### Check if a Day is a Business Day

```typescript
import { isBusinessDay } from 'soff-date/locales/co';

const monday = new Date('2025-01-06'); // Monday but a holiday
const tuesday = new Date('2025-01-07'); // Regular Tuesday

console.log(isBusinessDay(monday)); // false (holiday)
console.log(isBusinessDay(tuesday)); // true
```

### Add Business Days

```typescript
import { businessDays } from 'soff-date/locales/co';

const startDate = new Date('2025-01-02'); // Thursday
const deliveryDate = businessDays(startDate, 5); // Add 5 business days

console.log(deliveryDate.toISOString().split('T')[0]);
// Result: 2025-01-09 (skips weekend + Epiphany holiday on Jan 6)
```

## Using Different Locales

Each locale has the same API:

```typescript
// Colombia
import { getHolidays as getCO } from 'soff-date/locales/co';

// United States
import { getHolidays as getUS } from 'soff-date/locales/us';

// Mexico
import { getHolidays as getMX } from 'soff-date/locales/mx';

const colombiaHolidays = getCO(2025); // 18 holidays
const usHolidays = getUS(2025); // 10 holidays
const mexicoHolidays = getMX(2025); // 8 holidays
```

## Internationalization (i18n)

By default, holidays return names in their locale's primary language. You can override this:

```typescript
import { getHolidays } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';

// Spanish (default)
const holidays = getHolidays(2025);
console.log(holidays[0].name); // "Año Nuevo"

// English
const holidaysEN = getHolidays(2025, { lang: en });
console.log(holidaysEN[0].name); // "New Year's Day"

// Custom
const holidaysFR = getHolidays(2025, {
  lang: {
    newYear: 'Nouvel An',
    christmas: 'Noël',
    // ... other translations
  },
});
```

## Understanding the Response

### Holiday Object

Each holiday returned has this structure:

```typescript
interface Holiday {
  date: string; // ISO format: '2025-01-01'
  key: string; // Unique identifier: 'newYear'
  name: string; // Display name: 'Año Nuevo'
  isShifted?: boolean; // true if moved by shift rule
}
```

### Example with Shifted Holiday

```typescript
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2024);

// Find Epiphany (Jan 6, 2024 was a Saturday)
const epiphany = holidays.find((h) => h.key === 'epiphany');

console.log(epiphany);
// {
//   date: '2024-01-08', // Moved to Monday
//   key: 'epiphany',
//   name: 'Día de los Reyes Magos',
//   isShifted: true // Indicates it was moved
// }
```

## Common Patterns

### Display Holiday Calendar

```typescript
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2025);

console.log('Colombia Holidays 2025:\n');
holidays.forEach((holiday) => {
  const shifted = holiday.isShifted ? ' (moved)' : '';
  console.log(`${holiday.date} - ${holiday.name}${shifted}`);
});
```

### Check Multiple Dates

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

### Calculate Delivery Date

```typescript
import { businessDays, isBusinessDay } from 'soff-date/locales/co';

function getDeliveryDate(orderDate: Date, processingDays: number): Date {
  // Add processing time (business days)
  const deliveryDate = businessDays(orderDate, processingDays);

  // If delivery falls on non-business day, move to next business day
  let finalDate = new Date(deliveryDate);
  while (!isBusinessDay(finalDate)) {
    finalDate.setDate(finalDate.getDate() + 1);
  }

  return finalDate;
}

const orderDate = new Date('2025-01-02');
const delivery = getDeliveryDate(orderDate, 3);
console.log(`Order on ${orderDate.toISOString().split('T')[0]}`);
console.log(`Delivers on ${delivery.toISOString().split('T')[0]}`);
```

### Filter Upcoming Holidays

```typescript
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2025);
const today = new Date().toISOString().split('T')[0];

const upcoming = holidays.filter((h) => h.date >= today);

console.log(`${upcoming.length} holidays remaining this year`);
upcoming.slice(0, 3).forEach((h) => {
  console.log(`- ${h.date}: ${h.name}`);
});
```

## Type Safety with TypeScript

Soff Date is fully typed:

```typescript
import type { Holiday } from 'soff-date';
import { getHolidays } from 'soff-date/locales/co';

function formatHoliday(holiday: Holiday): string {
  return `${holiday.name} on ${holiday.date}`;
}

const holidays = getHolidays(2025);
holidays.forEach((h) => console.log(formatHoliday(h)));
```

## JavaScript Usage

Everything works in plain JavaScript too:

```javascript
const { getHolidays, isHoliday } = require('soff-date/locales/co');

const holidays = getHolidays(2025);
console.log(`Found ${holidays.length} holidays`);

const today = isHoliday(new Date());
if (today) {
  console.log(`Today is ${today.name}`);
}
```

## Performance Tips

### Cache Holiday Lists

If you're checking many dates in the same year, cache the results:

```typescript
import { getHolidays } from 'soff-date/locales/co';

// Bad: Recalculates every time
dates.forEach((date) => {
  const holidays = getHolidays(date.getFullYear());
  // ...
});

// Good: Calculate once per year
const holidaysByYear = new Map();

function getHolidaysForYear(year: number) {
  if (!holidaysByYear.has(year)) {
    holidaysByYear.set(year, getHolidays(year));
  }
  return holidaysByYear.get(year);
}

dates.forEach((date) => {
  const holidays = getHolidaysForYear(date.getFullYear());
  // ...
});
```

### Use Specific Imports

Always import from specific locales for best tree-shaking:

```typescript
// ✅ Good: Only Colombia code in bundle
import { getHolidays } from 'soff-date/locales/co';

// ❌ Bad: Might include unused code
import { getHolidays } from 'soff-date';
```

## What's Next?

Now that you know the basics, explore:

- [Core Concepts](/concepts/how-it-works/) - Understand how Soff Date works
- [API Reference](/api/overview/) - Complete API documentation
- [Locales](/locales/overview/) - Browse all available countries
- [Examples](/examples/common-use-cases/) - Real-world use cases
