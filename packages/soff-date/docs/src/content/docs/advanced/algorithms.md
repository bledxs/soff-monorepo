---
title: Using Algorithms Directly
description: Access to low-level calculation algorithms
---

# Using Algorithms Directly

Direct access to the underlying calculation algorithms.

## Easter Algorithm

```typescript
import { getEasterSunday } from 'soff-date/core/algorithms/easter';

const easter2025 = getEasterSunday(2025);
console.log(easter2025); // Date(2025-04-20)
```

## Nth Weekday Algorithm

```typescript
import { getNthWeekday } from 'soff-date/core/algorithms/nth-weekday';

// 4th Thursday of November 2025
const thanksgiving = getNthWeekday(2025, 11, 4, 4);
console.log(thanksgiving); // Date(2025-11-27)

// Last Monday of May 2025
const memorial = getNthWeekday(2025, 5, 1, -1);
console.log(memorial); // Date(2025-05-26)
```

## Shift Rules

```typescript
import { applyShift } from 'soff-date/core/algorithms/shifts';

const july4 = new Date('2026-07-04'); // Saturday

const { date, shifted } = applyShift(july4, 'observedUS');
console.log(date); // Date(2026-07-03) - Friday
console.log(shifted); // true
```

## Use Cases

Perfect for:
- Building custom locales
- Holiday calculation tools
- Academic/research purposes

## See Also

- [Custom Locales](/advanced/custom-locales/) - Build your own
- [How It Works](/concepts/how-it-works/) - Algorithm details
