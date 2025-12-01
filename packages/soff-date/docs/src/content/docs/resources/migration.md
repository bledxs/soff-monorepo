---
title: Migration Guide
description: Migrating from other holiday libraries
---

# Migration Guide

Guide for migrating from other holiday libraries to Soff Date.

## From date-holidays

```typescript
// Before (date-holidays)
const Holidays = require('date-holidays');
const hd = new Holidays('US');
const holidays = hd.getHolidays(2025);

// After (Soff Date)
import { getHolidays } from 'soff-date/locales/us';
const holidays = getHolidays(2025);
```

## From holiday-jp

```typescript
// Before (holiday-jp)
const holiday = require('@holiday-jp/holiday_jp');
const isHoliday = holiday.isHoliday(new Date('2025-01-01'));

// After (Soff Date)
import { isHoliday } from 'soff-date/locales/jp'; // If available
const result = isHoliday(new Date('2025-01-01'));
```

## Key Differences

1. **Import paths** - Use specific locale imports
2. **Return types** - Holiday objects have consistent structure
3. **No instantiation** - Functions are exported directly
4. **Tree-shakeable** - Only import what you need

## See Also

- [Quick Start](/getting-started/quick-start/)
- [API Overview](/api/overview/)
