---
title: 🇨🇴 Colombia
description: Colombian holidays with Emiliani Law support
---

# 🇨🇴 Colombia

Colombian holidays including the unique **Ley Emiliani** (Emiliani Law) that moves many religious holidays to the following Monday.

## Usage

```typescript
import {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
} from 'soff-date/locales/co';

const holidays = getHolidays(2025); // 18 holidays
```

## Holidays (2025)

| Date | Holiday | Type | Shifted |
|------|---------|------|---------|
| Jan 1 | Año Nuevo | Fixed | |
| Jan 6 | Día de los Reyes Magos | Fixed + Emiliani | ✓ (Mon) |
| Mar 24 | San José | Fixed + Emiliani | ✓ (Mon) |
| Apr 17 | Jueves Santo | Easter -3 | |
| Apr 18 | Viernes Santo | Easter -2 | |
| May 1 | Día del Trabajo | Fixed | |
| Jun 2 | Ascensión del Señor | Easter +39 + Emiliani | ✓ (Mon) |
| Jun 23 | Corpus Christi | Easter +60 + Emiliani | ✓ (Mon) |
| Jun 30 | Sagrado Corazón | Easter +68 + Emiliani | ✓ (Mon) |
| Jul 7 | San Pedro y San Pablo | Fixed + Emiliani | ✓ (Mon) |
| Jul 20 | Día de la Independencia | Fixed | |
| Aug 7 | Batalla de Boyacá | Fixed | |
| Aug 18 | Asunción de la Virgen | Fixed + Emiliani | ✓ (Mon) |
| Oct 13 | Día de la Raza | Fixed + Emiliani | ✓ (Mon) |
| Nov 3 | Todos los Santos | Fixed + Emiliani | ✓ (Mon) |
| Nov 17 | Independencia de Cartagena | Fixed + Emiliani | ✓ (Mon) |
| Dec 8 | Inmaculada Concepción | Fixed | |
| Dec 25 | Navidad | Fixed | |

**Total:** 18 holidays (10 with Emiliani shift rule)

## Ley Emiliani

The [Emiliani Law](https://es.wikipedia.org/wiki/Ley_Emiliani) (Law 51 of 1983) moves most religious holidays to the following Monday when they fall on a weekday other than Monday.

### How It Works

- **Weekends** (Saturday/Sunday) → **Monday**
- **Monday-Friday** → **No change**

### Example

```typescript
import { getHolidays } from 'soff-date/locales/co';

// Epiphany: January 6
const holidays2024 = getHolidays(2024);
const epiphany = holidays2024.find((h) => h.key === 'epiphany');

console.log(epiphany);
// {
//   date: '2024-01-08',  // Moved from Jan 6 (Saturday)
//   key: 'epiphany',
//   name: 'Día de los Reyes Magos',
//   isShifted: true
// }
```

### Holidays NOT Affected by Emiliani

These holidays stay on their fixed dates:
- New Year (Jan 1)
- Labor Day (May 1)
- Independence Day (Jul 20)
- Battle of Boyacá (Aug 7)
- Immaculate Conception (Dec 8)
- Christmas (Dec 25)
- Holy Thursday & Good Friday (always Thu/Fri)

## Default Language

```typescript
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2025);
console.log(holidays[0].name); // "Año Nuevo"
```

## English Translation

```typescript
import { getHolidays } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';

const holidays = getHolidays(2025, { lang: en });
console.log(holidays[0].name); // "New Year's Day"
```

## Business Days

```typescript
import { isBusinessDay, businessDays } from 'soff-date/locales/co';

// Check if today is a business day
isBusinessDay(new Date()); // boolean

// Add 5 business days
const start = new Date('2025-01-02');
const end = businessDays(start, 5);
console.log(end.toISOString().split('T')[0]);
// '2025-01-09' (skips weekend + Jan 6 holiday)
```

## Common Patterns

### Colombian Holiday Calendar

```typescript
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2025);

console.log('Días Festivos en Colombia 2025:\n');
holidays.forEach((h) => {
  const emoji = h.isShifted ? '🔄' : '📅';
  const note = h.isShifted ? ' (trasladado)' : '';
  console.log(`${emoji} ${h.date} - ${h.name}${note}`);
});
```

### Monday Holidays Only

```typescript
import { getHolidays } from 'soff-date/locales/co';

const holidays = getHolidays(2025);

const mondayHolidays = holidays.filter((h) => {
  const date = new Date(h.date);
  return date.getUTCDay() === 1; // Monday
});

console.log(`Lunes festivos: ${mondayHolidays.length}`);
```

## Bundle Size

| Import | Size |
|--------|------|
| `locales/co` | ~4.3KB |
| `locales/co` + `i18n/es` | ~5.5KB |
| `locales/co` + `i18n/en` | ~5.4KB |

## See Also

- [Shift Rules](/concepts/shift-rules/) - Learn about Emiliani law
- [i18n](/i18n/languages/) - Translation options
- [Examples](/examples/common-use-cases/) - Real-world usage
