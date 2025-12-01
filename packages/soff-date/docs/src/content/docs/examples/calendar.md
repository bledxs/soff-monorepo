---
title: Holiday Calendar
description: Build an interactive holiday calendar
---

# Holiday Calendar Example

Create a visual holiday calendar.

## Monthly Calendar with Holidays

```typescript
import { getHolidays, isHoliday } from 'soff-date/locales/co';

function generateMonthCalendar(year: number, month: number) {
  const firstDay = new Date(Date.UTC(year, month - 1, 1));
  const lastDay = new Date(Date.UTC(year, month, 0));

  const calendar: Array<{ date: number; holiday?: string }> = [];

  for (let day = 1; day <= lastDay.getUTCDate(); day++) {
    const date = new Date(Date.UTC(year, month - 1, day));
    const holiday = isHoliday(date);

    calendar.push({
      date: day,
      holiday: holiday?.name,
    });
  }

  return calendar;
}

const january = generateMonthCalendar(2025, 1);

console.log('January 2025:\n');
january.forEach((day) => {
  const mark = day.holiday ? '🎉' : '  ';
  const name = day.holiday ? ` - ${day.holiday}` : '';
  console.log(`${mark} ${day.date.toString().padStart(2, ' ')}${name}`);
});
```

## Year Overview

```typescript
import { getHolidays } from 'soff-date/locales/us';

function generateYearOverview(year: number) {
  const holidays = getHolidays(year);
  const byMonth = new Map<number, Holiday[]>();

  holidays.forEach((h) => {
    const month = parseInt(h.date.split('-')[1]);
    if (!byMonth.has(month)) {
      byMonth.set(month, []);
    }
    byMonth.get(month)!.push(h);
  });

  return byMonth;
}

const overview = generateYearOverview(2025);

overview.forEach((holidays, month) => {
  const monthName = new Date(2025, month - 1).toLocaleDateString('en', {
    month: 'long',
  });
  console.log(`\n${monthName}: ${holidays.length} holiday(s)`);
  holidays.forEach((h) => console.log(`  ${h.date} - ${h.name}`));
});
```

## See Also

- [Common Use Cases](/examples/common-use-cases/)
- [API Reference](/api/overview/)
