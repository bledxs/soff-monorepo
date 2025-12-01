---
title: Common Use Cases
description: Real-world examples of using Soff Date
---

# Common Use Cases

Practical examples for common scenarios.

## Holiday Calendar Display

```typescript
import { getHolidays } from 'soff-date/locales/co';

function displayHolidayCalendar(year: number) {
  const holidays = getHolidays(year);

  console.log(`\n📅 Holidays ${year}\n`);

  holidays.forEach((h) => {
    const date = new Date(h.date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const shifted = h.isShifted ? ' 🔄' : '';

    console.log(`${h.date} (${dayName}) - ${h.name}${shifted}`);
  });

  console.log(`\nTotal: ${holidays.length} holidays`);
}

displayHolidayCalendar(2025);
```

## Check if Office is Open

```typescript
import { isBusinessDay } from 'soff-date/locales/us';

function isOfficeOpen(date: Date = new Date()): boolean {
  // Check if business day
  if (!isBusinessDay(date)) return false;

  // Check business hours (9 AM - 5 PM)
  const hour = date.getHours();
  return hour >= 9 && hour < 17;
}

console.log(isOfficeOpen()); // true/false
```

## Delivery Date Calculator

```typescript
import { businessDays } from 'soff-date/locales/co';

interface DeliveryEstimate {
  orderDate: Date;
  processingDays: number;
  estimatedDelivery: Date;
}

function calculateDelivery(
  orderDate: Date,
  processingDays: number = 3
): DeliveryEstimate {
  const estimatedDelivery = businessDays(orderDate, processingDays);

  return {
    orderDate,
    processingDays,
    estimatedDelivery,
  };
}

const order = calculateDelivery(new Date('2025-01-02'), 5);
console.log(`Delivery: ${order.estimatedDelivery.toISOString().split('T')[0]}`);
```

## Upcoming Holidays Widget

```typescript
import { getHolidays } from 'soff-date/locales/us';

function getUpcomingHolidays(count: number = 3): Holiday[] {
  const today = new Date().toISOString().split('T')[0];
  const year = new Date().getFullYear();

  const allHolidays = [
    ...getHolidays(year),
    ...getHolidays(year + 1),
  ];

  return allHolidays
    .filter((h) => h.date >= today)
    .slice(0, count);
}

const upcoming = getUpcomingHolidays(3);
upcoming.forEach((h) => {
  const daysUntil = Math.ceil(
    (new Date(h.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  console.log(`${h.name}: ${daysUntil} days`);
});
```

## Holiday Notification System

```typescript
import { getNextHoliday } from 'soff-date/locales/co';

function checkHolidayNotification() {
  const next = getNextHoliday();
  const nextDate = new Date(next.date);
  const today = new Date();

  const daysUntil = Math.ceil(
    (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntil === 1) {
    console.log(`🎉 Tomorrow is ${next.name}!`);
  } else if (daysUntil <= 7) {
    console.log(`⚠️ ${next.name} is in ${daysUntil} days`);
  } else {
    console.log(`Next holiday: ${next.name} (${daysUntil} days)`);
  }
}

checkHolidayNotification();
```

## Multi-Locale Comparison

```typescript
import { getHolidays as getCO } from 'soff-date/locales/co';
import { getHolidays as getUS } from 'soff-date/locales/us';
import { getHolidays as getMX } from 'soff-date/locales/mx';

const year = 2025;

const holidays = {
  Colombia: getCO(year),
  'United States': getUS(year),
  Mexico: getMX(year),
};

console.log('Holiday Count Comparison:\n');
Object.entries(holidays).forEach(([country, list]) => {
  console.log(`${country}: ${list.length} holidays`);
});
```

## Working Days Calculator

```typescript
import { isBusinessDay } from 'soff-date/locales/co';

function countWorkingDays(startDate: Date, endDate: Date): number {
  let count = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    if (isBusinessDay(current)) count++;
    current.setDate(current.getDate() + 1);
  }

  return count;
}

const workingDays = countWorkingDays(
  new Date('2025-01-01'),
  new Date('2025-01-31')
);

console.log(`Working days in January 2025: ${workingDays}`);
```

## See Also

- [Business Days Examples](/examples/business-days/)
- [Multi-locale Examples](/examples/multi-locale/)
- [Calendar Example](/examples/calendar/)
