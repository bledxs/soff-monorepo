---
title: Business Days Examples
description: Advanced business days calculations
---

# Business Days Examples

Advanced examples for working with business days.

## SLA Tracking System

```typescript
import { businessDays } from 'soff-date/locales/us';

interface Ticket {
  id: string;
  createdAt: Date;
  priority: 'critical' | 'high' | 'medium' | 'low';
  resolvedAt?: Date;
}

const SLA_DAYS = {
  critical: 1,
  high: 2,
  medium: 5,
  low: 10,
};

function calculateSLA(ticket: Ticket) {
  const slaDate = businessDays(ticket.createdAt, SLA_DAYS[ticket.priority]);

  if (ticket.resolvedAt) {
    const resolved = ticket.resolvedAt <= slaDate;
    return { slaDate, resolved, status: resolved ? 'Met' : 'Missed' };
  }

  const overdue = new Date() > slaDate;
  return { slaDate, overdue, status: overdue ? 'Overdue' : 'On Track' };
}

const ticket: Ticket = {
  id: 'T-123',
  createdAt: new Date('2025-07-01'),
  priority: 'high',
};

const sla = calculateSLA(ticket);
console.log(`SLA Status: ${sla.status}`);
console.log(`Due: ${sla.slaDate.toISOString().split('T')[0]}`);
```

## Project Timeline Calculator

```typescript
import { businessDays, isBusinessDay } from 'soff-date/locales/co';

interface ProjectTask {
  name: string;
  duration: number;
  dependencies?: string[];
}

class ProjectPlanner {
  private tasks: Map<string, { task: ProjectTask; startDate: Date; endDate: Date }> =
    new Map();

  addTask(task: ProjectTask, startDate: Date) {
    const endDate = businessDays(startDate, task.duration);
    this.tasks.set(task.name, { task, startDate, endDate });
    return this;
  }

  getTimeline() {
    const timeline: Array<{ task: string; start: string; end: string; days: number }> =
      [];

    this.tasks.forEach(({ task, startDate, endDate }) => {
      timeline.push({
        task: task.name,
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
        days: task.duration,
      });
    });

    return timeline;
  }
}

const planner = new ProjectPlanner();
planner
  .addTask({ name: 'Requirements', duration: 3 }, new Date('2025-01-02'))
  .addTask({ name: 'Design', duration: 5 }, new Date('2025-01-07'))
  .addTask({ name: 'Development', duration: 10 }, new Date('2025-01-14'));

console.table(planner.getTimeline());
```

## Invoice Payment Calculator

```typescript
import { businessDays } from 'soff-date/locales/co';

interface Invoice {
  invoiceNumber: string;
  invoiceDate: Date;
  terms: 'Net 15' | 'Net 30' | 'Net 60';
  amount: number;
}

function getTermsDays(terms: Invoice['terms']): number {
  return parseInt(terms.split(' ')[1]);
}

function calculatePaymentSchedule(invoice: Invoice) {
  const termsDays = getTermsDays(invoice.terms);
  const dueDate = businessDays(invoice.invoiceDate, termsDays);
  const reminderDate = businessDays(dueDate, -5); // 5 days before due

  return {
    invoiceDate: invoice.invoiceDate,
    reminderDate,
    dueDate,
    amount: invoice.amount,
  };
}

const invoice: Invoice = {
  invoiceNumber: 'INV-2025-001',
  invoiceDate: new Date('2025-01-15'),
  terms: 'Net 30',
  amount: 5000,
};

const schedule = calculatePaymentSchedule(invoice);
console.log('Payment Schedule:');
console.log(`Invoice: ${schedule.invoiceDate.toISOString().split('T')[0]}`);
console.log(`Reminder: ${schedule.reminderDate.toISOString().split('T')[0]}`);
console.log(`Due: ${schedule.dueDate.toISOString().split('T')[0]}`);
```

## See Also

- [Business Days Concept](/concepts/business-days/)
- [API Reference](/api/business-days/)
