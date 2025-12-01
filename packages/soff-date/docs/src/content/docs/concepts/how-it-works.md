---
title: How It Works
description: Understanding the algorithmic approach of Soff Date
---

# How Soff Date Works

Soff Date calculates holidays algorithmically instead of using pre-generated data. This page explains the core architecture and calculation process.

## Architecture Overview

```
┌─────────────────┐
│  Your Code      │
└────────┬────────┘
         │
         │ getHolidays(2025)
         ├─────────────────────────────────┐
         │                                 │
         v                                 v
┌────────────────┐              ┌──────────────────┐
│  Locale        │              │  i18n            │
│  (co, us, mx)  │              │  (en, es, pt)    │
└────────┬───────┘              └──────────────────┘
         │                                 │
         │ Holiday Definitions             │ Names
         │                                 │
         v                                 v
┌──────────────────────────────────────────────────┐
│              Core Engine                         │
│  ┌──────────────────────────────────────────┐   │
│  │ 1. Resolve Rules → Dates                 │   │
│  │ 2. Apply Shift Rules                     │   │
│  │ 3. Format & Sort                         │   │
│  └──────────────────────────────────────────┘   │
│                                                  │
│  Algorithms:                                     │
│  • Fixed dates                                   │
│  • Nth weekday (3rd Monday)                      │
│  • Easter calculation (Computus)                 │
│  • Custom functions                              │
│  • Shift rules (Emiliani, Observed US)           │
└──────────────────────────────────────────────────┘
         │
         v
┌──────────────────┐
│  Holiday[]       │
│  [{ date, key,   │
│     name, ...}]  │
└──────────────────┘
```

## Step-by-Step Calculation

### 1. Holiday Definitions

Each locale defines holidays using rules:

```typescript
const definitions: HolidayDefinition[] = [
  // Fixed date
  {
    key: 'newYear',
    rule: { type: 'fixed', month: 1, day: 1 },
  },

  // Nth weekday: 4th Thursday of November
  {
    key: 'thanksgiving',
    rule: { type: 'nthWeekday', month: 11, weekday: 4, n: 4 },
  },

  // Easter-relative: Good Friday is Easter - 2 days
  {
    key: 'goodFriday',
    rule: { type: 'easterRelative', offset: -2 },
  },

  // With shift rule
  {
    key: 'christmas',
    rule: { type: 'fixed', month: 12, day: 25 },
    shift: 'observedUS',
  },
];
```

### 2. Rule Resolution

When you call `getHolidays(2025)`, each rule is resolved to a concrete date:

#### Fixed Dates

```typescript
// January 1, 2025
{ type: 'fixed', month: 1, day: 1 }
→ new Date(2025, 0, 1) // Note: month is 0-indexed in Date
→ Date(2025-01-01)
```

#### Nth Weekday

```typescript
// 4th Thursday of November 2025
{ type: 'nthWeekday', month: 11, weekday: 4, n: 4 }
→ Calculate 4th occurrence of Thursday (weekday 4) in November
→ Date(2025-11-27)
```

**Algorithm:**
1. Find first day of month
2. Find first occurrence of target weekday
3. Add (n-1) weeks
4. For negative n (last occurrence), start from end of month

#### Easter-Relative

```typescript
// Good Friday: Easter - 2 days
{ type: 'easterRelative', offset: -2 }
→ Calculate Easter Sunday using Computus algorithm
→ Easter 2025 = April 20
→ April 20 - 2 days = April 18
→ Date(2025-04-18)
```

**The Computus Algorithm:**
Uses the Anonymous Gregorian algorithm (1876):

```typescript
function getEasterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(Date.UTC(year, month - 1, day));
}
```

#### Custom Calculation

```typescript
{
  key: 'custom',
  rule: {
    type: 'custom',
    calc: (year) => {
      // Your logic here
      return new Date(year, 5, 15);
    }
  }
}
```

### 3. Shift Rules

After calculating the base date, shift rules move holidays from weekends to weekdays:

#### Emiliani Law (Colombia)

Moves holidays falling on weekends to the following Monday:

```typescript
function applyEmiliani(date: Date): Date {
  const day = date.getUTCDay();

  // If Saturday (6) or Sunday (0), move to Monday
  if (day === 6) {
    date.setUTCDate(date.getUTCDate() + 2); // Sat → Mon
  } else if (day === 0) {
    date.setUTCDate(date.getUTCDate() + 1); // Sun → Mon
  }

  return date;
}
```

**Example:**
```
January 6, 2024 is a Saturday
→ Move 2 days forward
→ January 8, 2024 (Monday)
→ isShifted: true
```

#### Observed US Rule

Saturday → Friday (before), Sunday → Monday (after):

```typescript
function applyObservedUS(date: Date): Date {
  const day = date.getUTCDay();

  if (day === 6) {
    date.setUTCDate(date.getUTCDate() - 1); // Sat → Fri
  } else if (day === 0) {
    date.setUTCDate(date.getUTCDate() + 1); // Sun → Mon
  }

  return date;
}
```

**Example:**
```
July 4, 2026 is a Saturday
→ Move 1 day backward
→ July 3, 2026 (Friday)
→ isShifted: true
```

### 4. Formatting & Assembly

Finally, dates are formatted and combined with names:

```typescript
function resolveHolidays(
  definitions: HolidayDefinition[],
  year: number,
  names: HolidayNames
): Holiday[] {
  return definitions
    .map((def) => {
      // 1. Resolve rule to date
      const rawDate = resolveRule(def.rule, year);

      // 2. Apply shift rule
      const { date, shifted } = applyShift(rawDate, def.shift);

      // 3. Format to ISO string
      const isoDate = date.toISOString().split('T')[0];

      // 4. Build holiday object
      return {
        date: isoDate,
        key: def.key,
        name: names[def.key] ?? def.key,
        ...(shifted && { isShifted: true }),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date)); // 5. Sort by date
}
```

## Performance Characteristics

### Time Complexity

- **Fixed dates**: O(1) - Instant calculation
- **Nth weekday**: O(1) - Simple arithmetic
- **Easter**: O(1) - Fixed number of operations
- **Custom**: O(?) - Depends on your function
- **Overall**: O(n) where n = number of holidays in locale

### Space Complexity

- **Memory usage**: O(n) for the result array
- **No caching**: Each call recalculates (predictable memory)
- **Bundle size**: ~3KB of code + data per locale

### Benchmarks

On a modern CPU (M1 MacBook):

| Operation | Time | Compared to JSON Lookup |
|-----------|------|-------------------------|
| Calculate 1 year | ~0.5ms | +0.4ms |
| Calculate 100 years | ~50ms | N/A (not possible with JSON) |
| Check if date is holiday | ~0.5ms | +0.4ms |
| Get next holiday | ~1ms | +0.9ms |

**Conclusion:** Tiny runtime overhead, massive bundle size savings.

## Date Handling

### UTC vs Local Time

Soff Date uses **UTC** internally to avoid timezone issues:

```typescript
// All dates are created in UTC
new Date(Date.UTC(2025, 0, 1)); // Jan 1, 2025 00:00:00 UTC

// When checking dates, convert to UTC
function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}
```

**Why UTC?**
- Holidays are calendar dates, not moments in time
- Avoids "off by one day" errors across timezones
- Consistent behavior worldwide

### Date Boundaries

When checking if a date is a holiday, only the date portion matters:

```typescript
isHoliday(new Date('2025-01-01T00:00:00Z')); // true
isHoliday(new Date('2025-01-01T23:59:59Z')); // true
isHoliday(new Date('2025-01-01T12:00:00-05:00')); // true
```

## Extensibility

The architecture is designed to be extended:

### Custom Shift Rules

```typescript
function customShift(date: Date): { date: Date; shifted: boolean } {
  // Your logic
  return { date, shifted: false };
}
```

### Custom Rule Types

Add new rule types by extending the engine:

```typescript
type CustomRule =
  | { type: 'solarEvent'; event: 'solstice' | 'equinox' }
  | { type: 'lunar'; phase: 'newMoon' | 'fullMoon' };

function resolveCustomRule(rule: CustomRule, year: number): Date {
  // Your calculation
}
```

## What's Next?

Dive deeper into specific topics:

- [Holiday Rules](/concepts/holiday-rules/) - Detailed rule types
- [Shift Rules](/concepts/shift-rules/) - All shifting strategies
- [Business Days](/concepts/business-days/) - Working day calculations
- [Custom Locales](/advanced/custom-locales/) - Build your own
