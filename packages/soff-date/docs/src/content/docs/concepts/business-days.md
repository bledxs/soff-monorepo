---
title: Business Days
description: Learn how to work with business days and skip holidays
---

# Business Days

Business days (also called working days or weekdays) are days when businesses typically operate. Soff Date provides utilities to work with business days while accounting for both weekends and holidays.

## What is a Business Day?

A business day is a day that is:
1. **Not a weekend** (Saturday or Sunday)
2. **Not a holiday** (locale-specific)

```typescript
Monday + Not Holiday = Business Day ✓
Saturday = Not a Business Day ✗
Monday + Holiday = Not a Business Day ✗
```

## Available Functions

Soff Date provides business day functions in locale exports:

```typescript
import { isBusinessDay, businessDays } from 'soff-date/locales/co';
```

## Check if a Date is a Business Day

### isBusinessDay()

Check if a specific date is a business day:

```typescript
import { isBusinessDay } from 'soff-date/locales/co';

// Regular Monday
const monday = new Date('2025-01-13');
console.log(isBusinessDay(monday)); // true

// Saturday
const saturday = new Date('2025-01-04');
console.log(isBusinessDay(saturday)); // false (weekend)

// Monday holiday (Epiphany moved to Monday)
const holiday = new Date('2025-01-06');
console.log(isBusinessDay(holiday)); // false (holiday)
```

### Signature

```typescript
function isBusinessDay(date: Date): boolean
```

**Parameters:**
- `date`: The date to check

**Returns:**
- `true` if the date is a business day
- `false` if the date is a weekend or holiday

## Add or Subtract Business Days

### businessDays()

Add (or subtract) a specific number of business days to a date:

```typescript
import { businessDays } from 'soff-date/locales/co';

const startDate = new Date('2025-01-02'); // Thursday

// Add 5 business days
const result = businessDays(startDate, 5);
console.log(result.toISOString().split('T')[0]);
// 2025-01-09 (Thursday)
// Skipped: Jan 4-5 (weekend), Jan 6 (Epiphany holiday)

// Subtract 5 business days
const before = businessDays(startDate, -5);
console.log(before.toISOString().split('T')[0]);
// 2024-12-26 (Thursday)
// Skipped: Dec 28-29 (weekend), Dec 25 (Christmas)
```

### Signature

```typescript
function businessDays(startDate: Date, amount: number): Date
```

**Parameters:**
- `startDate`: The starting date
- `amount`: Number of business days to add (positive) or subtract (negative)

**Returns:**
- New `Date` object with business days added/subtracted

## How It Works

### Weekend Detection

Uses UTC day-of-week to avoid timezone issues:

```typescript
function isWeekend(date: Date): boolean {
  const day = date.getUTCDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
}
```

### Holiday Detection

Checks against the locale's holiday definitions:

```typescript
function isBusinessDay(date: Date): boolean {
  // First check: weekend?
  if (isWeekend(date)) return false;

  // Second check: holiday?
  if (isHoliday(date)) return false;

  // It's a business day!
  return true;
}
```

### Adding Business Days

Algorithm for adding N business days:

```typescript
function addBusinessDays(startDate: Date, amount: number): Date {
  const result = new Date(startDate);
  let remaining = Math.abs(amount);
  const direction = amount >= 0 ? 1 : -1;

  while (remaining > 0) {
    // Move one day in direction
    result.setUTCDate(result.getUTCDate() + direction);

    // If it's a business day, count it
    if (isBusinessDay(result)) {
      remaining--;
    }
    // Otherwise, skip it and continue
  }

  return result;
}
```

## Common Use Cases

### 1. Delivery Date Calculation

Calculate when an order will be delivered:

```typescript
import { businessDays } from 'soff-date/locales/co';

function calculateDeliveryDate(
  orderDate: Date,
  processingDays: number
): Date {
  return businessDays(orderDate, processingDays);
}

const orderDate = new Date('2025-01-02'); // Thursday
const deliveryDate = calculateDeliveryDate(orderDate, 5);

console.log(`Ordered: ${orderDate.toISOString().split('T')[0]}`);
console.log(`Delivers: ${deliveryDate.toISOString().split('T')[0]}`);

// Output:
// Ordered: 2025-01-02
// Delivers: 2025-01-09 (skipped weekend + holiday)
```

### 2. SLA Deadline Calculation

Calculate when a support ticket is due:

```typescript
import { businessDays } from 'soff-date/locales/us';

interface Ticket {
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

function calculateSLA(ticket: Ticket): Date {
  const slaHours = {
    low: 5, // 5 business days
    medium: 3,
    high: 1,
  };

  return businessDays(ticket.createdAt, slaHours[ticket.priority]);
}

const ticket = {
  createdAt: new Date('2025-07-03'), // Thursday
  priority: 'medium' as const,
};

const due = calculateSLA(ticket);
console.log(`Ticket due: ${due.toISOString().split('T')[0]}`);
// 2025-07-08 (Tuesday, skipped July 4 + weekend)
```

### 3. Business Days Counter

Count business days between two dates:

```typescript
import { isBusinessDay } from 'soff-date/locales/co';

function countBusinessDays(startDate: Date, endDate: Date): number {
  let count = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    if (isBusinessDay(current)) {
      count++;
    }
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return count;
}

const start = new Date('2025-01-01');
const end = new Date('2025-01-31');
const businessDaysInJanuary = countBusinessDays(start, end);

console.log(`Business days in January 2025: ${businessDaysInJanuary}`);
```

### 4. Next Business Day

Find the next business day from today:

```typescript
import { isBusinessDay } from 'soff-date/locales/co';

function getNextBusinessDay(from: Date = new Date()): Date {
  const next = new Date(from);
  next.setUTCDate(next.getUTCDate() + 1);

  while (!isBusinessDay(next)) {
    next.setUTCDate(next.getUTCDate() + 1);
  }

  return next;
}

const today = new Date('2025-01-03'); // Friday
const nextBusiness = getNextBusinessDay(today);
console.log(nextBusiness.toISOString().split('T')[0]);
// 2025-01-07 (Tuesday, skipped weekend + Jan 6 holiday)
```

### 5. Invoice Payment Terms

Calculate invoice due date (e.g., "Net 30 business days"):

```typescript
import { businessDays } from 'soff-date/locales/us';

function calculateInvoiceDueDate(
  invoiceDate: Date,
  terms: number = 30
): Date {
  return businessDays(invoiceDate, terms);
}

const invoiceDate = new Date('2025-01-02');
const dueDate = calculateInvoiceDueDate(invoiceDate, 30);

console.log(`Invoice date: ${invoiceDate.toISOString().split('T')[0]}`);
console.log(`Due date (Net 30): ${dueDate.toISOString().split('T')[0]}`);
```

### 6. Business Hours Calculator

Combined with time calculations:

```typescript
import { businessDays, isBusinessDay } from 'soff-date/locales/co';

function addBusinessHours(start: Date, hours: number): Date {
  const HOURS_PER_DAY = 8;
  const fullDays = Math.floor(hours / HOURS_PER_DAY);
  const remainingHours = hours % HOURS_PER_DAY;

  // Add full business days
  let result = businessDays(start, fullDays);

  // Add remaining hours
  result.setUTCHours(result.getUTCHours() + remainingHours);

  // If we overflow to next day, move to next business day
  if (result.getUTCHours() >= 17) {
    // Assuming 9-5 workday
    const overflow = result.getUTCHours() - 17;
    result = businessDays(result, 1);
    result.setUTCHours(9 + overflow);
  }

  return result;
}

const taskStart = new Date('2025-01-02T09:00:00Z');
const taskEnd = addBusinessHours(taskStart, 20); // 2.5 business days
console.log(taskEnd.toISOString());
```

## Multi-Locale Scenarios

When working across different countries:

```typescript
import { isBusinessDay as isBusinessDayCO } from 'soff-date/locales/co';
import { isBusinessDay as isBusinessDayUS } from 'soff-date/locales/us';

function isGlobalBusinessDay(date: Date): boolean {
  // Business day in BOTH countries
  return isBusinessDayCO(date) && isBusinessDayUS(date);
}

const date = new Date('2025-07-04'); // Friday, US Independence Day

console.log('Colombia:', isBusinessDayCO(date)); // true
console.log('US:', isBusinessDayUS(date)); // false
console.log('Global:', isGlobalBusinessDay(date)); // false
```

## Performance Considerations

### Caching Holiday Lists

If checking many dates in the same year, cache holidays:

```typescript
import { getHolidays } from 'soff-date/locales/co';

class BusinessDayCalculator {
  private holidayCache = new Map<number, Set<string>>();

  private getHolidayDates(year: number): Set<string> {
    if (!this.holidayCache.has(year)) {
      const holidays = getHolidays(year);
      const dates = new Set(holidays.map((h) => h.date));
      this.holidayCache.set(year, dates);
    }
    return this.holidayCache.get(year)!;
  }

  isBusinessDay(date: Date): boolean {
    const day = date.getUTCDay();
    if (day === 0 || day === 6) return false;

    const year = date.getUTCFullYear();
    const dateStr = date.toISOString().split('T')[0];
    const holidays = this.getHolidayDates(year);

    return !holidays.has(dateStr);
  }
}

const calc = new BusinessDayCalculator();

// First call: calculates holidays
console.log(calc.isBusinessDay(new Date('2025-01-02'))); // true

// Subsequent calls: uses cache
console.log(calc.isBusinessDay(new Date('2025-01-03'))); // true
```

### Batch Processing

For large date ranges, optimize iterations:

```typescript
function getBusinessDaysInRange(start: Date, end: Date): Date[] {
  const businessDays: Date[] = [];
  const current = new Date(start);

  // Pre-fetch holidays for all years in range
  const years = new Set<number>();
  const temp = new Date(start);
  while (temp <= end) {
    years.add(temp.getUTCFullYear());
    temp.setUTCMonth(temp.getUTCMonth() + 1);
  }

  // Cache holidays
  const allHolidays = new Set<string>();
  years.forEach((year) => {
    getHolidays(year).forEach((h) => allHolidays.add(h.date));
  });

  // Fast iteration
  while (current <= end) {
    if (isBusinessDay(current)) {
      businessDays.push(new Date(current));
    }
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return businessDays;
}
```

## Limitations

### Weekend Definition

Currently hardcoded to Saturday-Sunday. Some countries have different weekends:

- 🇮🇱 Israel: Friday-Saturday
- 🇸🇦 Saudi Arabia: Friday-Saturday
- 🇦🇪 UAE: Friday-Saturday

**Workaround:**

```typescript
function isBusinessDayCustomWeekend(
  date: Date,
  weekendDays: number[] = [0, 6]
): boolean {
  const day = date.getUTCDay();
  if (weekendDays.includes(day)) return false;

  return !isHoliday(date);
}

// Israel: Friday-Saturday weekend
isBusinessDayCustomWeekend(date, [5, 6]);
```

### Time Zones

All calculations use UTC dates. If working with user timezones:

```typescript
import { businessDays } from 'soff-date/locales/co';

function businessDaysInTimezone(
  startDate: Date,
  amount: number,
  timezone: string
): Date {
  // Convert to UTC
  const utcStart = new Date(startDate.toISOString());

  // Calculate
  const utcResult = businessDays(utcStart, amount);

  // Convert back (if needed)
  return utcResult;
}
```

## What's Next?

- [API Reference](/api/is-business-day/) - isBusinessDay() details
- [API Reference](/api/business-days/) - businessDays() details
- [Examples](/examples/business-days/) - More real-world examples
- [Locales](/locales/overview/) - Explore different country rules
