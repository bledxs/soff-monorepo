---
title: Shift Rules
description: Understanding how holidays move from weekends to weekdays
---

# Shift Rules

Many countries have laws that move holidays falling on weekends to nearby weekdays. Soff Date supports several shift rule strategies.

## Overview

```typescript
type ShiftRule = 'none' | 'emiliani' | 'observedUS' | 'nextMonday' | 'nearestMonday';
```

When a holiday has a shift rule, the final date may differ from the calculated base date.

## Why Shift Rules?

Holidays exist to give people time off work. When a holiday falls on a weekend, it doesn't provide an extra day off. Different countries handle this differently:

- 🇨🇴 **Colombia**: Move to next Monday (Emiliani Law)
- 🇺🇸 **USA**: Saturday→Friday, Sunday→Monday (Observed)
- 🇦🇷 **Argentina**: Move to nearest Monday
- 🇧🇷 **Brazil**: No shifting (holiday stays on weekend)

## Shift Rule Types

### None

No shifting applied. Holiday stays on its calculated date regardless of day of week.

```typescript
shift: 'none' // Or omit the shift property entirely
```

**Behavior:**
- Sunday → Sunday
- Monday → Monday
- Saturday → Saturday

**Example:**
```typescript
// Christmas with no shift
{
  key: 'christmas',
  rule: { type: 'fixed', month: 12, day: 25 },
  shift: 'none'
}

// December 25, 2025 is Thursday → stays Thursday
// December 25, 2026 is Friday → stays Friday
// December 25, 2027 is Saturday → stays Saturday (not shifted)
```

**Used by:**
- Brazil (most holidays)
- Any holiday that should never move

### Emiliani

Moves holidays falling on weekends to the **following Monday**.

```typescript
shift: 'emiliani'
```

**Behavior:**
- Saturday → Monday (+2 days)
- Sunday → Monday (+1 day)
- Monday-Friday → No change

**Named after:** [Ley Emiliani](https://es.wikipedia.org/wiki/Ley_Emiliani) in Colombia

**Examples:**

```typescript
// Epiphany: January 6
{ type: 'fixed', month: 1, day: 6 }, shift: 'emiliani'

// 2024: Jan 6 (Sat) → Jan 8 (Mon)  ✓ Shifted
// 2025: Jan 6 (Mon) → Jan 6 (Mon)  No change
// 2026: Jan 6 (Tue) → Jan 6 (Tue)  No change
```

```typescript
// Saint Joseph: March 19
{ type: 'fixed', month: 3, day: 19 }, shift: 'emiliani'

// 2024: Mar 19 (Tue) → Mar 19 (Tue)  No change
// 2025: Mar 19 (Wed) → Mar 19 (Wed)  No change
// 2026: Mar 19 (Thu) → Mar 19 (Thu)  No change
```

**Result Object:**
```typescript
{
  date: '2024-01-08', // Shifted date
  key: 'epiphany',
  name: 'Día de los Reyes Magos',
  isShifted: true // Indicates shifting occurred
}
```

**Used by:**
- 🇨🇴 Colombia (religious holidays)
- 🇦🇷 Argentina (some holidays use similar logic)

**Algorithm:**
```typescript
function applyEmiliani(date: Date): { date: Date; shifted: boolean } {
  const day = date.getUTCDay();
  let shifted = false;

  if (day === 6) { // Saturday
    date.setUTCDate(date.getUTCDate() + 2);
    shifted = true;
  } else if (day === 0) { // Sunday
    date.setUTCDate(date.getUTCDate() + 1);
    shifted = true;
  }

  return { date, shifted };
}
```

### Observed US

The "observed" rule used by the United States federal government:
- **Saturday** → **Friday** (move back 1 day)
- **Sunday** → **Monday** (move forward 1 day)

```typescript
shift: 'observedUS'
```

**Behavior:**
- Saturday → Friday (-1 day)
- Sunday → Monday (+1 day)
- Monday-Friday → No change

**Examples:**

```typescript
// Independence Day: July 4
{ type: 'fixed', month: 7, day: 4 }, shift: 'observedUS'

// 2024: Jul 4 (Thu) → Jul 4 (Thu)  No change
// 2025: Jul 4 (Fri) → Jul 4 (Fri)  No change
// 2026: Jul 4 (Sat) → Jul 3 (Fri)  ✓ Shifted back
// 2027: Jul 4 (Sun) → Jul 5 (Mon)  ✓ Shifted forward
```

```typescript
// Christmas: December 25
{ type: 'fixed', month: 12, day: 25 }, shift: 'observedUS'

// 2024: Dec 25 (Wed) → Dec 25 (Wed)  No change
// 2025: Dec 25 (Thu) → Dec 25 (Thu)  No change
// 2026: Dec 25 (Fri) → Dec 25 (Fri)  No change
// 2027: Dec 25 (Sat) → Dec 24 (Fri)  ✓ Shifted back
// 2028: Dec 25 (Mon) → Dec 25 (Mon)  No change
```

**Result Object:**
```typescript
{
  date: '2026-07-03', // Friday
  key: 'independenceDay',
  name: 'Independence Day',
  isShifted: true
}
```

**Used by:**
- 🇺🇸 United States (federal holidays)
- 🇬🇧 United Kingdom (bank holidays)
- Various other anglophone countries

**Algorithm:**
```typescript
function applyObservedUS(date: Date): { date: Date; shifted: boolean } {
  const day = date.getUTCDay();
  let shifted = false;

  if (day === 6) { // Saturday → Friday
    date.setUTCDate(date.getUTCDate() - 1);
    shifted = true;
  } else if (day === 0) { // Sunday → Monday
    date.setUTCDate(date.getUTCDate() + 1);
    shifted = true;
  }

  return { date, shifted };
}
```

### Next Monday

Always moves holidays to the **following Monday**, regardless of what day they fall on.

```typescript
shift: 'nextMonday'
```

**Behavior:**
- Sunday → Monday (+1 day)
- Monday → Monday (no change)
- Tuesday → Next Monday (+6 days)
- Wednesday → Next Monday (+5 days)
- Thursday → Next Monday (+4 days)
- Friday → Next Monday (+3 days)
- Saturday → Next Monday (+2 days)

**Example:**
```typescript
// Hypothetical holiday
{ type: 'fixed', month: 6, day: 15 }, shift: 'nextMonday'

// 2025: Jun 15 (Sun) → Jun 16 (Mon)  +1 day
// 2026: Jun 15 (Mon) → Jun 15 (Mon)  No change
// 2027: Jun 15 (Tue) → Jun 21 (Mon)  +6 days
```

**Use Cases:**
- Some regional holidays
- Corporate holidays (e.g., "celebrated on following Monday")

### Nearest Monday

Moves holidays to the **nearest Monday** (before or after).

```typescript
shift: 'nearestMonday'
```

**Behavior:**
- Sunday → Monday (+1 day)
- Monday → Monday (no change)
- Tuesday → Previous Monday (-1 day)
- Wednesday → Previous Monday (-2 days)
- Thursday → Following Monday (+4 days)
- Friday → Following Monday (+3 days)
- Saturday → Following Monday (+2 days)

**Examples:**
```typescript
// Hypothetical holiday on June 15
{ type: 'fixed', month: 6, day: 15 }, shift: 'nearestMonday'

// 2025: Jun 15 (Sun) → Jun 16 (Mon)  +1 (next)
// 2026: Jun 15 (Mon) → Jun 15 (Mon)  No change
// 2027: Jun 15 (Tue) → Jun 14 (Mon)  -1 (previous)
// 2028: Jun 15 (Thu) → Jun 19 (Mon)  +4 (next)
```

**Used by:**
- 🇦🇷 Argentina (for some holidays)
- Various regional regulations

## Comparison Table

| Original Day | none | emiliani | observedUS | nextMonday | nearestMonday |
|--------------|------|----------|------------|------------|---------------|
| **Sunday** | Sun | **Mon** (+1) | **Mon** (+1) | **Mon** (+1) | **Mon** (+1) |
| **Monday** | Mon | Mon | Mon | Mon | Mon |
| **Tuesday** | Tue | Tue | Tue | Mon (+6) | Mon (-1) |
| **Wednesday** | Wed | Wed | Wed | Mon (+5) | Mon (-2) |
| **Thursday** | Thu | Thu | Thu | Mon (+4) | Mon (+4) |
| **Friday** | Fri | Fri | Fri | Mon (+3) | Mon (+3) |
| **Saturday** | Sat | **Mon** (+2) | **Fri** (-1) | **Mon** (+2) | **Mon** (+2) |

## Working with Shifted Holidays

### Detecting Shifts

Check the `isShifted` property:

```typescript
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2024);

holidays.forEach((h) => {
  if (h.isShifted) {
    console.log(`${h.name} was moved to ${h.date}`);
  }
});

// Output: "Día de los Reyes Magos was moved to 2024-01-08"
```

### Finding Original Date

To find what day a shifted holiday originally fell on:

```typescript
function getOriginalDate(holiday: Holiday): Date {
  if (!holiday.isShifted) {
    return new Date(holiday.date);
  }

  // You would need to re-resolve the holiday without shift
  // or store the original date separately
  // This is not built-in but can be implemented
}
```

### Displaying to Users

```typescript
function formatHoliday(holiday: Holiday): string {
  const shifted = holiday.isShifted ? ' (observed)' : '';
  return `${holiday.name}: ${holiday.date}${shifted}`;
}

// "Independence Day: 2026-07-03 (observed)"
```

## Multiple Holidays on Same Date

When shifts occur, two holidays might fall on the same date:

```typescript
const holidays = getHolidays(2024);

// Group by date
const byDate = holidays.reduce((acc, h) => {
  acc[h.date] = acc[h.date] || [];
  acc[h.date].push(h);
  return acc;
}, {});

// Find dates with multiple holidays
Object.entries(byDate).forEach(([date, holidays]) => {
  if (holidays.length > 1) {
    console.log(`${date} has ${holidays.length} holidays`);
  }
});
```

**Note:** Always use `holiday.key` as the unique identifier, not the date!

## Custom Shift Rules

You can create custom shift logic:

```typescript
import { applyShift } from 'soff-date/core/algorithms/shifts';

// Use built-in shifts
const { date, shifted } = applyShift(new Date('2025-07-04'), 'observedUS');

// Create custom logic
function customShift(date: Date): { date: Date; shifted: boolean } {
  const day = date.getUTCDay();

  // Move Tuesday-Thursday to Friday
  if (day >= 2 && day <= 4) {
    const daysToFriday = 5 - day;
    date.setUTCDate(date.getUTCDate() + daysToFriday);
    return { date, shifted: true };
  }

  return { date, shifted: false };
}
```

## Best Practices

### 1. Choose the Right Rule

Match the rule to the legal requirements:

```typescript
// ✅ Good: Matches US federal law
{ key: 'independenceDay', rule: {...}, shift: 'observedUS' }

// ❌ Bad: Wrong rule for US
{ key: 'independenceDay', rule: {...}, shift: 'emiliani' }
```

### 2. Document Shifted Holidays

When displaying holidays, indicate shifted dates:

```typescript
function displayHoliday(holiday: Holiday) {
  const badge = holiday.isShifted ? '🔄' : '';
  return `${badge} ${holiday.name} - ${holiday.date}`;
}
```

### 3. Don't Double-Shift

Easter-relative holidays that are always on weekdays don't need shifts:

```typescript
// ✅ Good: Good Friday is always Friday
{ key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } }

// ❌ Unnecessary: It's already Friday
{ key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 }, shift: 'observedUS' }
```

## What's Next?

- [Business Days](/concepts/business-days/) - Calculate working days
- [Colombia Locale](/locales/colombia/) - See Emiliani in action
- [US Locale](/locales/united-states/) - Observed rule examples
- [Custom Locales](/advanced/custom-locales/) - Implement your own shifts
