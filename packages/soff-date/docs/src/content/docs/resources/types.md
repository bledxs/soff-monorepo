---
title: TypeScript Types
description: Complete TypeScript type reference
---

# TypeScript Types

Complete reference for all TypeScript types in Soff Date.

## Holiday Types

### Holiday

```typescript
interface Holiday {
  date: string; // ISO format: '2025-01-01'
  key: string; // Unique identifier: 'newYear'
  name: string; // Display name: 'Año Nuevo'
  isShifted?: boolean; // true if moved by shift rule
}
```

### HolidayDefinition

```typescript
interface HolidayDefinition {
  key: string;
  rule: HolidayRule;
  shift?: ShiftRule;
}
```

### HolidayRule

```typescript
type HolidayRule =
  | { type: 'fixed'; month: number; day: number }
  | { type: 'nthWeekday'; month: number; weekday: number; n: number }
  | { type: 'easterRelative'; offset: number }
  | { type: 'custom'; calc: (year: number) => Date | null };
```

### ShiftRule

```typescript
type ShiftRule = 'none' | 'emiliani' | 'observedUS' | 'nextMonday' | 'nearestMonday';
```

## Options

### GetHolidaysOptions

```typescript
interface GetHolidaysOptions {
  lang?: HolidayNames;
}
```

### HolidayNames

```typescript
type HolidayNames = Record<string, string>;
```

## Importing Types

```typescript
import type {
  Holiday,
  HolidayDefinition,
  HolidayRule,
  ShiftRule,
  HolidayNames,
  GetHolidaysOptions,
} from 'soff-date';
```
