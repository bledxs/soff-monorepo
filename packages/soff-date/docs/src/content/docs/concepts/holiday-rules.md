---
title: Holiday Rules
description: Learn about all supported holiday calculation rules
---

# Holiday Rules

Soff Date supports four types of rules for calculating holidays. Each rule type handles different calendar patterns.

## Overview

```typescript
type HolidayRule =
  | { type: 'fixed'; month: number; day: number }
  | { type: 'nthWeekday'; month: number; weekday: number; n: number }
  | { type: 'easterRelative'; offset: number }
  | { type: 'custom'; calc: (year: number) => Date | null };
```

## Fixed Dates

The simplest rule type for holidays that fall on the same date every year.

### Syntax

```typescript
{
  type: 'fixed',
  month: number, // 1-12 (1 = January, 12 = December)
  day: number    // 1-31
}
```

### Examples

```typescript
// New Year's Day: January 1
{ type: 'fixed', month: 1, day: 1 }

// Independence Day (US): July 4
{ type: 'fixed', month: 7, day: 4 }

// Christmas: December 25
{ type: 'fixed', month: 12, day: 25 }

// Valentine's Day: February 14
{ type: 'fixed', month: 2, day: 14 }
```

### Use Cases

Perfect for:
- 📅 **Civic holidays**: Independence days, national days
- 🎄 **Fixed religious holidays**: Christmas (Dec 25)
- 💼 **International observances**: Labor Day (May 1 in many countries)
- 🎉 **Cultural celebrations**: Cinco de Mayo (May 5)

### Validation

- Month must be 1-12
- Day must be valid for the month (accounting for leap years)
- Invalid dates return `null` (e.g., Feb 30)

## Nth Weekday

For holidays defined as "the Nth occurrence of a weekday in a month".

### Syntax

```typescript
{
  type: 'nthWeekday',
  month: number,   // 1-12
  weekday: number, // 0-6 (0 = Sunday, 6 = Saturday)
  n: number        // 1-5 for first-to-fifth, -1 for last
}
```

### Examples

```typescript
// Thanksgiving (US): 4th Thursday of November
{ type: 'nthWeekday', month: 11, weekday: 4, n: 4 }

// Memorial Day (US): Last Monday of May
{ type: 'nthWeekday', month: 5, weekday: 1, n: -1 }

// MLK Day: 3rd Monday of January
{ type: 'nthWeekday', month: 1, weekday: 1, n: 3 }

// Mother's Day: 2nd Sunday of May
{ type: 'nthWeekday', month: 5, weekday: 0, n: 2 }
```

### Weekday Reference

| Weekday | Value |
|---------|-------|
| Sunday | 0 |
| Monday | 1 |
| Tuesday | 2 |
| Wednesday | 3 |
| Thursday | 4 |
| Friday | 5 |
| Saturday | 6 |

### Positive vs Negative N

**Positive n** (1-5): Count from start of month
```typescript
// First Monday of September
{ type: 'nthWeekday', month: 9, weekday: 1, n: 1 }
```

**Negative n** (-1): Last occurrence in month
```typescript
// Last Friday of October
{ type: 'nthWeekday', month: 10, weekday: 5, n: -1 }
```

### Algorithm Details

For positive n:
1. Find first day of month
2. Calculate days until first occurrence of weekday
3. Add (n - 1) × 7 days

For negative n (-1):
1. Find last day of month
2. Calculate days back to last occurrence of weekday

### Use Cases

Perfect for:
- 🇺🇸 **US federal holidays**: Thanksgiving, Memorial Day, Labor Day
- 🇲🇽 **Mexican holidays**: Revolution Day (3rd Monday of November)
- 📅 **Floating observances**: Mother's Day, Father's Day
- 💼 **Custom business days**: First Monday of fiscal quarter

## Easter-Relative

For holidays defined relative to Easter Sunday.

### Syntax

```typescript
{
  type: 'easterRelative',
  offset: number  // Days relative to Easter (negative = before, positive = after)
}
```

### Examples

```typescript
// Good Friday: 2 days before Easter
{ type: 'easterRelative', offset: -2 }

// Easter Monday: 1 day after Easter
{ type: 'easterRelative', offset: 1 }

// Ascension Day: 39 days after Easter (always Thursday)
{ type: 'easterRelative', offset: 39 }

// Pentecost: 49 days after Easter
{ type: 'easterRelative', offset: 49 }

// Corpus Christi: 60 days after Easter
{ type: 'easterRelative', offset: 60 }

// Ash Wednesday: 46 days before Easter
{ type: 'easterRelative', offset: -46 }
```

### Common Easter-Related Holidays

| Holiday | Offset | Notes |
|---------|--------|-------|
| Ash Wednesday | -46 | Start of Lent |
| Palm Sunday | -7 | Week before Easter |
| Maundy Thursday | -3 | Holy Thursday |
| Good Friday | -2 | Friday before Easter |
| Holy Saturday | -1 | Day before Easter |
| **Easter Sunday** | **0** | Reference date |
| Easter Monday | +1 | Day after Easter |
| Ascension | +39 | Always Thursday |
| Pentecost | +49 | 50 days after |
| Corpus Christi | +60 | Thursday after Trinity |

### Easter Calculation

Uses the **Computus algorithm** (Anonymous Gregorian, 1876):

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

### Date Range

Easter can fall between March 22 and April 25:

| Year | Easter Date |
|------|-------------|
| 2024 | March 31 |
| 2025 | April 20 |
| 2026 | April 5 |
| 2027 | March 28 |
| 2028 | April 16 |

### Use Cases

Perfect for:
- ⛪ **Christian holidays**: Good Friday, Easter Monday, Ascension
- 🇨🇴 **Colombia**: Multiple Easter-relative holidays with Emiliani shifts
- 🇧🇷 **Brazil**: Carnival (before Lent), Good Friday
- 🇦🇷 **Argentina**: Holy Week observances
- 🇪🇺 **Europe**: Many countries observe Easter Monday

## Custom Calculation

For holidays with complex calculation logic or external data requirements.

### Syntax

```typescript
{
  type: 'custom',
  calc: (year: number) => Date | null
}
```

The function:
- Receives the year as input
- Returns a `Date` object or `null` (if holiday doesn't exist that year)
- Should create dates in UTC

### Examples

#### Solar Events

```typescript
// Summer Solstice (approximate)
{
  type: 'custom',
  calc: (year) => {
    // June 20-22 depending on year
    const day = year % 4 === 0 ? 20 : 21;
    return new Date(Date.UTC(year, 5, day));
  }
}
```

#### Conditional Holidays

```typescript
// Only exists in certain years
{
  type: 'custom',
  calc: (year) => {
    if (year < 2000) return null; // Didn't exist before 2000
    return new Date(Date.UTC(year, 3, 15));
  }
}
```

#### Lunar Calendar

```typescript
// Chinese New Year (simplified approximation)
{
  type: 'custom',
  calc: (year) => {
    // Actual calculation is complex
    // This is a simplified example
    const lunarData = {
      2024: new Date(Date.UTC(2024, 1, 10)),
      2025: new Date(Date.UTC(2025, 0, 29)),
      // ...
    };
    return lunarData[year] || null;
  }
}
```

#### Week Number Based

```typescript
// ISO week 15, Monday
{
  type: 'custom',
  calc: (year) => {
    // Find Monday of ISO week 15
    // (Complex calculation omitted)
    return calculateISOWeekMonday(year, 15);
  }
}
```

### Use Cases

Perfect for:
- 🌙 **Lunar holidays**: Chinese New Year, Ramadan, Diwali
- 🔬 **Astronomical events**: Solstices, equinoxes
- 📅 **ISO week-based**: "Week 26 Monday"
- 🏢 **Business-specific**: Fiscal year boundaries
- 🌍 **Multi-source**: Data from external APIs or tables

### Best Practices

1. **Return UTC dates:**
   ```typescript
   ✅ return new Date(Date.UTC(year, 5, 15));
   ❌ return new Date(year, 5, 15); // Local timezone
   ```

2. **Handle invalid cases:**
   ```typescript
   calc: (year) => {
     if (year < 1900) return null; // Out of range
     // ... calculation
   }
   ```

3. **Keep it fast:**
   ```typescript
   // ❌ Slow: Network request
   calc: async (year) => {
     const data = await fetch(`/api/holidays/${year}`);
     return data.date;
   }

   // ✅ Fast: Pre-computed data
   calc: (year) => {
     const dates = { 2024: new Date(...), 2025: new Date(...) };
     return dates[year] || null;
   }
   ```

## Combining with Shift Rules

All rule types can be combined with shift rules:

```typescript
// Christmas with observed shift
{
  key: 'christmas',
  rule: { type: 'fixed', month: 12, day: 25 },
  shift: 'observedUS' // Sat → Fri, Sun → Mon
}

// Epiphany with Emiliani shift
{
  key: 'epiphany',
  rule: { type: 'fixed', month: 1, day: 6 },
  shift: 'emiliani' // Weekend → Monday
}

// Good Friday (never shifted, always Friday)
{
  key: 'goodFriday',
  rule: { type: 'easterRelative', offset: -2 },
  shift: 'none' // Or omit shift property
}
```

## Summary

| Rule Type | Best For | Complexity | Example |
|-----------|----------|------------|---------|
| **fixed** | Same date every year | Simple | Dec 25 |
| **nthWeekday** | Nth weekday of month | Medium | 4th Thu Nov |
| **easterRelative** | Easter-based holidays | Medium | Easter - 2 |
| **custom** | Complex calculations | High | Lunar dates |

## What's Next?

- [Shift Rules](/concepts/shift-rules/) - Learn about holiday shifting
- [Custom Locales](/advanced/custom-locales/) - Create your own rules
- [Using Algorithms](/advanced/algorithms/) - Direct algorithm access
