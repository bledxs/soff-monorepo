---
title: Introduction
description: Learn about Soff Date and what makes it unique
---

# Introduction to Soff Date

**Soff Date** is a lightweight, tree-shakeable holiday calculator library that uses algorithmic date computation instead of pre-generated JSON files.

## The Problem

Most holiday libraries work by shipping large JSON files containing pre-calculated holiday dates for many years into the future. This approach has several drawbacks:

- **Large bundle sizes**: Shipping dates until 2050 adds unnecessary kilobytes to your bundle
- **No flexibility**: Can't calculate dates beyond the pre-generated range
- **Maintenance burden**: Need to update files when holiday rules change
- **Poor tree-shaking**: Often import entire datasets even when you only need one locale

## The Solution

Soff Date takes a different approach by **calculating dates algorithmically** at runtime:

```typescript
// Traditional library: Ships 10+ years of data
import holidays from 'big-library'; // 50KB+

// Soff Date: Calculates on demand
import { getHolidays } from 'soff-date/locales/co'; // ~3KB
const holidays = getHolidays(2025); // Calculated instantly
```

## Key Features

### 🎯 Algorithmic Calculation

Dates are computed using mathematical algorithms:
- **Fixed dates**: Simple month/day calculation
- **Nth weekday**: "3rd Monday of January"
- **Easter-based**: Using the Computus algorithm
- **Custom logic**: Your own calculation functions

### 📦 Tree-Shakeable

Import only what you need:

```typescript
// Only Colombia holidays in your bundle (~3KB)
import { getHolidays } from 'soff-date/locales/co';

// Add English translations (+1KB)
import { en } from 'soff-date/i18n/en';
```

### 🌍 Multi-Locale Support

Built-in support for:
- 🇨🇴 Colombia (Emiliani law)
- 🇺🇸 United States (Observed rule)
- 🇲🇽 México (Nth weekday rule)
- 🇦🇷 Argentina (Nearest Monday)
- 🇧🇷 Brasil (Fixed dates)

### ⚙️ Shift Rules

Handle complex holiday shifting logic:
- **Emiliani** (Colombia): Moves religious holidays to Monday
- **Observed US**: Saturday → Friday, Sunday → Monday
- **Nearest Monday**: Moves to closest Monday
- **Next Monday**: Always moves to following Monday

### 📅 Business Days

Calculate business days with awareness of:
- Weekends (Saturday & Sunday)
- Holidays (locale-specific)
- Configurable logic

## Use Cases

Perfect for:

- 📊 **Business applications**: Calculate working days, delivery dates
- 📅 **Calendar apps**: Display holidays for different countries
- 🎉 **Event platforms**: Schedule around holidays
- 💼 **HR systems**: Track holidays and time off
- 📱 **Mobile apps**: Lightweight holiday data

## TypeScript Support

Fully typed with excellent IDE support:

```typescript
import type { Holiday, HolidayDefinition, ShiftRule } from 'soff-date';

const holiday: Holiday = {
  date: '2025-01-01',
  key: 'newYear',
  name: "New Year's Day",
  isShifted: false,
};
```

## Zero Dependencies

Soff Date has **zero runtime dependencies**. This means:
- ✅ No dependency conflicts
- ✅ Smaller node_modules
- ✅ Faster installs
- ✅ Better security

## Browser & Node.js Support

Works everywhere JavaScript runs:
- ✅ Modern browsers (ES2020+)
- ✅ Node.js 20+
- ✅ Deno
- ✅ Bun
- ✅ Edge runtimes (Vercel, Cloudflare Workers)

## What's Next?

Ready to dive in? Here's where to go next:

- [Why Soff Date?](/getting-started/why/) - Detailed comparison with other libraries
- [Installation](/getting-started/installation/) - Get up and running
- [Quick Start](/getting-started/quick-start/) - Your first holiday calculation
