---
title: businessDays()
description: Add or subtract business days
---

# businessDays()

Add or subtract a specific number of business days to/from a date.

## Signature

```typescript
function businessDays(startDate: Date, amount: number): Date
```

## Parameters

### startDate
- **Type:** `Date`
- **Required:** Yes
- **Description:** The starting date

### amount
- **Type:** `number`
- **Required:** Yes
- **Description:** Number of business days to add (positive) or subtract (negative)

## Return Value

Returns a new `Date` object with business days added/subtracted.

## Examples

### Add Business Days

```typescript
import { businessDays } from 'soff-date/locales/co';

const start = new Date('2025-01-02'); // Thursday

const result = businessDays(start, 5);
console.log(result.toISOString().split('T')[0]);
// '2025-01-09' (skips weekend + Jan 6 holiday)
```

### Subtract Business Days

```typescript
import { businessDays } from 'soff-date/locales/us';

const start = new Date('2025-07-10'); // Thursday

const result = businessDays(start, -5);
console.log(result.toISOString().split('T')[0]);
// '2025-07-02' (skips weekend + July 4 holiday)
```

### Delivery Date Calculator

```typescript
import { businessDays } from 'soff-date/locales/co';

function calculateDeliveryDate(orderDate: Date): Date {
  const processingDays = 3;
  return businessDays(orderDate, processingDays);
}

const orderDate = new Date('2025-01-06'); // Monday (holiday)
const deliveryDate = calculateDeliveryDate(orderDate);

console.log(`Order: ${orderDate.toISOString().split('T')[0]}`);
console.log(`Delivery: ${deliveryDate.toISOString().split('T')[0]}`);
```

## Common Patterns

### SLA Calculator

```typescript
import { businessDays } from 'soff-date/locales/us';

interface Ticket {
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

function calculateSLA(ticket: Ticket): Date {
  const days = {
    low: 5,
    medium: 3,
    high: 1,
  };

  return businessDays(ticket.createdAt, days[ticket.priority]);
}

const ticket = {
  createdAt: new Date('2025-07-03'),
  priority: 'high' as const,
};

const dueDate = calculateSLA(ticket);
console.log(`Due: ${dueDate.toISOString().split('T')[0]}`);
```

### Invoice Payment Terms

```typescript
import { businessDays } from 'soff-date/locales/co';

function calculatePaymentDue(invoiceDate: Date, terms: number = 30): Date {
  return businessDays(invoiceDate, terms);
}

const invoiceDate = new Date('2025-01-15');
const dueDate = calculatePaymentDue(invoiceDate, 30);

console.log(`Invoice: ${invoiceDate.toISOString().split('T')[0]}`);
console.log(`Due (Net 30): ${dueDate.toISOString().split('T')[0]}`);
```

### Project Timeline

```typescript
import { businessDays } from 'soff-date/locales/us';

interface Task {
  name: string;
  duration: number; // business days
}

function calculateProjectTimeline(
  startDate: Date,
  tasks: Task[]
): Map<string, Date> {
  const timeline = new Map<string, Date>();
  let currentDate = startDate;

  for (const task of tasks) {
    const endDate = businessDays(currentDate, task.duration);
    timeline.set(task.name, endDate);
    currentDate = endDate;
  }

  return timeline;
}

const tasks = [
  { name: 'Design', duration: 5 },
  { name: 'Development', duration: 10 },
  { name: 'Testing', duration: 3 },
];

const timeline = calculateProjectTimeline(new Date('2025-01-02'), tasks);
timeline.forEach((date, task) => {
  console.log(`${task}: ${date.toISOString().split('T')[0]}`);
});
```

## How It Works

The function iterates day-by-day, skipping weekends and holidays:

```typescript
function addBusinessDays(startDate: Date, amount: number): Date {
  const result = new Date(startDate);
  let remaining = Math.abs(amount);
  const direction = amount >= 0 ? 1 : -1;

  while (remaining > 0) {
    result.setDate(result.getDate() + direction);

    if (isBusinessDay(result)) {
      remaining--;
    }
  }

  return result;
}
```

## Important Notes

:::caution[Inclusive vs Exclusive]
The start date is **not counted** as a business day. Adding 1 business day to Monday returns Tuesday (assuming Tuesday is a business day).
:::

:::tip[Performance]
For large values of `amount` (e.g., 100+ days), consider that each iteration checks if the date is a business day. Cache holiday lists if performance is critical.
:::

:::info[Negative Values]
Negative values move backward in time. `businessDays(date, -5)` subtracts 5 business days.
:::

## See Also

- [isBusinessDay()](/api/is-business-day/) - Check if business day
- [Business Days Guide](/concepts/business-days/) - Detailed explanation
- [Examples](/examples/business-days/) - Real-world use cases
