<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Cron</h1>
  <p>Lightweight, tree-shakeable cron expression parser and human-readable formatter.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-cron)](https://www.npmjs.com/package/soff-cron)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-cron)](https://bundlephobia.com/package/soff-cron)

</div>

---

**Zero dependencies** · **TypeScript** · **~2KB minzipped** · **i18n ready**

## Table of Contents

- [🤔 Why?](#-why)
- [📦 Install](#-install)
- [🚀 Quick Start](#-quick-start)
- [🌍 i18n Support](#-i18n-support)
- [API Reference](#api-reference)
  - [`formatCron(expression, options?)`](#formatcronexpression-options)
  - [`parseCron(expression, allowSeconds?)`](#parsecronexpression-allowseconds)
  - [`validateCron(expression, allowSeconds?)`](#validatecronexpression-allowseconds)
- [Supported Cron Syntax](#supported-cron-syntax)
- [Examples](#examples)
- [Types](#types)
- [Contributing](#contributing)
- [License](#license)

## 🤔 Why?

Cron expressions like `*/15 9-17 * * 1-5` are powerful but hard to read. This library:

- ✅ **Converts cron to human text**: "Every 15 minutes, between 9:00 AM and 5:00 PM, Monday through Friday"
- ✅ **Converts human text to cron**: "every 5 minutes" → `*/5 * * * *` **NEW!**
- ✅ **Validates cron syntax**: Catch errors before execution
- ✅ **Parses to structured data**: Extract minute/hour/day patterns
- ✅ **Zero dependencies**: No bloat, pure TypeScript
- ✅ **i18n ready**: Built-in Spanish and English support
- ✅ **Tree-shakeable**: Only import what you need

**Perfect for:** Dashboards, task schedulers, configuration UIs, logs, documentation, and **non-technical users** who need to create schedules!

## 📦 Install

```bash
# npm
npm install soff-cron

# pnpm
pnpm add soff-cron

# yarn
yarn add soff-cron

# bun
bun add soff-cron
```

## 🚀 Quick Start

```typescript
import { formatCron, validateCron, parseCron } from 'soff-cron';

// 📝 Format cron expressions to human-readable text
formatCron('0 2 * * *', { locale: 'en' });
// → "At 02:00, every day"

formatCron('*/15 9-17 * * 1-5', { locale: 'es' });
// → "Cada 15 minutos, entre las 09:00 y 17:00, día de semanas"

formatCron('@daily', { locale: 'en' });
// → "every day"

// 🔄 Convert natural language to cron expressions
import { humanizeCron } from 'soff-cron';

humanizeCron('every 5 minutes', { locale: 'en' });
// → { success: true, cronExpression: "*/5 * * * *" }

humanizeCron('todos los días a las 2 am', { locale: 'es' });
// → { success: true, cronExpression: "0 2 * * *" }

humanizeCron('every monday at 10am', { locale: 'en' });
// → { success: true, cronExpression: "0 10 * * 1" }

// ✅ Validate cron expressions
validateCron('0 2 * * *');
// → { isValid: true }

validateCron('60 * * * *');
// → { isValid: false, error: 'Value 60 is out of range...', field: 'minute' }

// 🔍 Parse cron expressions into structured data
parseCron('*/15 9-17 * * 1-5');
// → {
//   minute: { raw: '*/15', values: [0, 15, 30, 45], isStep: true, ... },
//   hour: { raw: '9-17', values: [9, 10, 11, ..., 17], isRange: true, ... },
//   dayOfWeek: { raw: '1-5', values: [1, 2, 3, 4, 5], isRange: true, ... },
//   ...
// }
```

## 🌍 i18n Support

Built-in support for **Spanish** and **English**:

```typescript
import { formatCron } from 'soff-cron';

// English (default)
formatCron('0 9 * * 1-5', { locale: 'en' });
// → "At 09:00, Monday through Friday"

// Spanish
formatCron('0 9 * * 1-5', { locale: 'es' });
// → "A las 09:00, de lunes a viernes"

// 12-hour format
formatCron('0 14 * * *', { locale: 'en', use24HourFormat: false });
// → "At 2:00 PM, every day"
```

Want to add more languages? Check out [`src/i18n/`](src/i18n/) for examples!

## API Reference

### `humanizeCron(text, options?)`

**NEW!** Converts natural language text to cron expressions. Perfect for non-technical users!

**Parameters:**

- `text` (string): Human-readable text (e.g., "every 5 minutes")
- `options` (object, optional):
  - `locale` ('en' | 'es'): Input language (default: `'en'`)

**Returns:** `HumanizerResult`

```typescript
{
  success: boolean;
  cronExpression?: string;
  error?: string;
  suggestions?: string[];
}
```

**Supported patterns (English):**

- Time intervals: "every minute", "every 5 minutes", "every hour", "every 2 hours"
- Daily: "every day", "every day at 2am", "at 14:30"
- Weekly: "every week", "every monday", "every monday at 10am"
- Monthly: "every month", "on the 1st of every month", "on the 15th of every month at 3pm"
- Weekdays/weekends: "weekdays at 9am", "weekends at 10am"

**Supported patterns (Spanish):**

- Intervalos: "cada minuto", "cada 5 minutos", "cada hora", "cada 2 horas"
- Diario: "todos los días", "todos los días a las 2am", "a las 14:30"
- Semanal: "cada semana", "todos los lunes", "cada lunes a las 10am"
- Mensual: "cada mes", "el día 1 de cada mes", "el dia 15 de cada mes a las 3pm"
- Días laborales: "días de semana a las 9am", "fines de semana a las 10am"

**Examples:**

```typescript
// English
humanizeCron('every 5 minutes', { locale: 'en' });
// → { success: true, cronExpression: "*/5 * * * *" }

humanizeCron('every monday at 10am', { locale: 'en' });
// → { success: true, cronExpression: "0 10 * * 1" }

humanizeCron('weekdays at 9am', { locale: 'en' });
// → { success: true, cronExpression: "0 9 * * 1-5" }

// Spanish
humanizeCron('cada 10 minutos', { locale: 'es' });
// → { success: true, cronExpression: "*/10 * * * *" }

humanizeCron('todos los lunes a las 10am', { locale: 'es' });
// → { success: true, cronExpression: "0 10 * * 1" }

humanizeCron('días de semana a las 9am', { locale: 'es' });
// → { success: true, cronExpression: "0 9 * * 1-5" }

// Error handling
humanizeCron('invalid text', { locale: 'en' });
// → {
//   success: false,
//   error: "Could not parse the text...",
//   suggestions: ["every 5 minutes", "every day at 9 am"]
// }
```

---

### `formatCron(expression, options?)`

Converts a cron expression to human-readable text.

**Parameters:**

- `expression` (string): The cron expression (5 or 6 fields)
- `options` (object, optional):
  - `locale` ('en' | 'es'): Output language (default: `'en'`)
  - `use24HourFormat` (boolean): Use 24-hour time format (default: `true`)
  - `includeSeconds` (boolean): Support 6-field cron with seconds (default: `false`)
  - `verbose` (boolean): Use more detailed descriptions (default: `false`)

**Returns:** `string` - Human-readable description

**Example:**

```typescript
formatCron('0 */2 * * *', { locale: 'en' });
// → "At minute 0, every 2 hours"

formatCron('0 0 1 * *', { locale: 'es' });
// → "A las 00:00, el día 1"
```

---

### `parseCron(expression, allowSeconds?)`

Parses a cron expression into structured data.

**Parameters:**

- `expression` (string): The cron expression
- `allowSeconds` (boolean, optional): Allow 6-field expressions (default: `false`)

**Returns:** `ParsedCron` - Structured cron data

**Throws:** `Error` if expression is invalid

**Example:**

```typescript
const parsed = parseCron('*/5 * * * *');

console.log(parsed.minute.values);
// → [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

console.log(parsed.minute.isStep);
// → true
```

---

### `validateCron(expression, allowSeconds?)`

Validates a cron expression syntax.

**Parameters:**

- `expression` (string): The cron expression
- `allowSeconds` (boolean, optional): Allow 6-field expressions (default: `false`)

**Returns:** `ValidationResult`

```typescript
{
  isValid: boolean;
  error?: string;
  field?: 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek' | 'second';
}
```

**Example:**

```typescript
validateCron('0 0 * * *');
// → { isValid: true }

validateCron('0 25 * * *');
// → { isValid: false, error: 'Value 25 is out of range for hour (0-23)', field: 'hour' }
```

## Supported Cron Syntax

| Syntax  | Example       | Description                                           |
| ------- | ------------- | ----------------------------------------------------- |
| `*`     | `* * * * *`   | Wildcard (all values)                                 |
| `-`     | `9-17`        | Range (9 through 17)                                  |
| `,`     | `1,3,5`       | List (1, 3, and 5)                                    |
| `/`     | `*/15`        | Step (every 15)                                       |
| `?`     | `? * * * *`   | Question mark (day fields only)                       |
| Names   | `JAN`, `MON`  | Month/day names (JAN-DEC, SUN-SAT)                    |
| Special | `@daily`      | `@yearly`, `@monthly`, `@weekly`, `@daily`, `@hourly` |
| 6-field | `0 0 2 * * *` | Includes seconds (requires `allowSeconds: true`)      |

## Examples

```typescript
// Every day at 2 AM
formatCron('0 2 * * *', { locale: 'en' });
// → "At 02:00, every day"

// Every 15 minutes during work hours on weekdays
formatCron('*/15 9-17 * * 1-5', { locale: 'es' });
// → "Cada 15 minutos, entre las 09:00 y 17:00, día de semanas"

// Every Monday at 9 AM
formatCron('0 9 * * MON', { locale: 'en' });
// → "At 09:00, on Monday"

// First day of every month at midnight
formatCron('0 0 1 * *', { locale: 'en' });
// → "At 00:00, on day 1"

// Special keywords
formatCron('@hourly', { locale: 'es' });
// → "cada hora"

// 6-field with seconds
formatCron('30 0 2 * * *', { locale: 'en', includeSeconds: true });
// → "At 02:00, every day"
```

## Types

```typescript
export interface ParsedCron {
  expression: string;
  minute: CronField;
  hour: CronField;
  dayOfMonth: CronField;
  month: CronField;
  dayOfWeek: CronField;
  second?: CronField;
  isSpecial: boolean;
  specialKeyword?: string;
}

export interface CronField {
  raw: string;
  values: number[];
  isWildcard: boolean;
  isRange: boolean;
  isStep: boolean;
  isList: boolean;
}

export interface FormatterOptions {
  locale?: 'es' | 'en';
  use24HourFormat?: boolean;
  includeSeconds?: boolean;
  verbose?: boolean;
}

export interface HumanizerOptions {
  locale?: 'es' | 'en';
}

export interface HumanizerResult {
  success: boolean;
  cronExpression?: string;
  error?: string;
  suggestions?: string[];
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  field?: 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek' | 'second';
}
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](../../CONTRIBUTING.md) before submitting PRs.

**Want to add a new locale?** Check out [`src/i18n/`](src/i18n/) and submit a PR!

## License

MIT © [Luis C. Rojas](https://github.com/bledxs)

See [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Part of the <a href="https://github.com/bledxs/soff-monorepo">Soff Monorepo</a></sub>
</div>
