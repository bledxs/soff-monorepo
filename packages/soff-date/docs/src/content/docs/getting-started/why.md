---
title: Why Soff Date?
description: Learn why Soff Date is different from other holiday libraries
---

# Why Soff Date?

Choosing the right holiday library can significantly impact your bundle size and application performance. Here's why Soff Date stands out.

## The Traditional Approach

Most holiday libraries work like this:

```json
// holidays.json (50KB+ for single locale)
{
  "2024": [
    { "date": "2024-01-01", "name": "New Year" },
    { "date": "2024-12-25", "name": "Christmas" }
  ],
  "2025": [...],
  "2026": [...],
  // ... through 2050
}
```

**Problems:**
- 📦 Large bundle sizes (50KB+ per locale)
- 🚫 Limited to pre-generated years
- 🔄 Requires updates when laws change
- ❌ Poor tree-shaking support

## The Soff Date Approach

Instead of shipping data, we ship **algorithms**:

```typescript
// Only 3KB of code
export const definitions = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'christmas', rule: { type: 'fixed', month: 12, day: 25 } },
];

// Calculate for any year
getHolidays(2025); // Computed in milliseconds
getHolidays(2099); // Also works!
```

**Benefits:**
- ✅ Tiny bundle size (~3KB per locale)
- ✅ Works for any year (past or future)
- ✅ Easy to update when laws change
- ✅ Excellent tree-shaking

## Size Comparison

| Library | Bundle Size | Approach |
|---------|-------------|----------|
| **Soff Date** | **~3KB** | Algorithmic |
| date-holidays | ~50KB | JSON data |
| holiday-jp | ~25KB | JSON data |
| @18f/us-federal-holidays | ~15KB | JSON data |

## Feature Comparison

### Support for Complex Rules

Many libraries only support fixed dates. Soff Date handles complex calculations:

```typescript
// ❌ Other libraries: Limited to pre-generated dates
const holidays = require('some-library');
holidays['2025']['thanksgiving']; // Only if pre-calculated

// ✅ Soff Date: Dynamic calculation
{
  key: 'thanksgiving',
  rule: {
    type: 'nthWeekday',
    month: 11,
    weekday: 4, // Thursday
    n: 4 // 4th occurrence
  }
}
```

### Shift Rules

Soff Date excels at handling holidays that move based on day of week:

```typescript
// Colombia's Emiliani Law: Religious holidays move to Monday
{
  key: 'epiphany',
  rule: { type: 'fixed', month: 1, day: 6 },
  shift: 'emiliani' // Jan 6, 2024 (Sat) → Jan 8, 2024 (Mon)
}

// US Observed: Saturday → Friday, Sunday → Monday
{
  key: 'independenceDay',
  rule: { type: 'fixed', month: 7, day: 4 },
  shift: 'observedUS' // July 4, 2026 (Sat) → July 3, 2026 (Fri)
}
```

Most other libraries require separate entries for observed dates or don't support shifting at all.

### Business Days

Soff Date includes business day calculations:

```typescript
import { isBusinessDay, businessDays } from 'soff-date/locales/co';

// Is today a business day?
isBusinessDay(new Date()); // false if weekend or holiday

// Add 5 business days
businessDays(new Date('2025-01-01'), 5); // Skips weekends + holidays
```

Other libraries typically don't include this functionality.

## Performance

### Bundle Size Impact

For a multi-locale application:

```typescript
// Traditional library: All locales loaded
import holidays from 'big-library';
// Bundle: 150KB+ (all countries included)

// Soff Date: Tree-shakeable
import { getHolidays as getCO } from 'soff-date/locales/co';
import { getHolidays as getUS } from 'soff-date/locales/us';
// Bundle: ~6KB (only 2 locales)
```

### Runtime Performance

| Operation | Soff Date | Traditional |
|-----------|-----------|-------------|
| Get all holidays for 1 year | ~0.5ms | ~0.1ms (lookup) |
| Check if date is holiday | ~0.5ms | ~0.1ms (lookup) |
| Get holidays for 100 years | ~50ms | ❌ Not possible |
| Bundle download time (3G) | ~30ms | ~500ms |

**Conclusion:** Soff Date trades a tiny bit of runtime performance (<1ms) for massive bundle size savings and unlimited year range.

## Developer Experience

### TypeScript Support

Full TypeScript support with no additional @types packages:

```typescript
import type { Holiday, HolidayDefinition, ShiftRule } from 'soff-date';

// Autocomplete and type checking
const holidays: Holiday[] = getHolidays(2025);
```

### Custom Locales

Easy to create custom locales:

```typescript
import { resolveHolidays } from 'soff-date';

const myHolidays: HolidayDefinition[] = [
  { key: 'companyFoundingDay', rule: { type: 'fixed', month: 3, day: 15 } },
  { key: 'teamOffsite', rule: { type: 'custom', calc: (year) => {
    // Your custom logic
    return new Date(year, 5, 15);
  }}},
];

export const getHolidays = (year: number) =>
  resolveHolidays(myHolidays, year, { /* names */ });
```

### i18n Built-in

Multi-language support out of the box:

```typescript
import { getHolidays } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';
import { es } from 'soff-date/i18n/es';

// Spanish (default for Colombia)
getHolidays(2025);

// English
getHolidays(2025, { lang: en });

// Custom
getHolidays(2025, { lang: { newYear: 'Nouvel An' } });
```

## When NOT to Use Soff Date

Soff Date might not be the best choice if:

- ❌ You need historical accuracy for dates before 1900
- ❌ You need holidays for 100+ countries (use a dedicated service)
- ❌ You absolutely cannot afford ~0.5ms calculation time
- ❌ You're working in an environment without ES2020 support

For most modern web applications, Soff Date is the perfect choice.

## Migration Guide

Coming from another library? We've got you covered:

- [Migration Guide](/resources/migration/) - Step-by-step migration instructions

## What's Next?

Ready to get started?

- [Installation](/getting-started/installation/) - Install the library
- [Quick Start](/getting-started/quick-start/) - Build your first integration
- [Bundle Size Analysis](/resources/bundle-size/) - Deep dive into tree-shaking
