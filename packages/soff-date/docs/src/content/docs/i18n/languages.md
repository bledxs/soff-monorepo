---
title: Available Languages
description: Internationalization support in Soff Date
---

# Available Languages

Soff Date includes built-in translations for holiday names.

## Supported Languages

| Language | Code | Import |
|----------|------|--------|
| English | en | `soff-date/i18n/en` |
| Español | es | `soff-date/i18n/es` |
| Português | pt | `soff-date/i18n/pt` |

## Usage

```typescript
import { getHolidays } from 'soff-date/locales/co';
import { en } from 'soff-date/i18n/en';
import { es } from 'soff-date/i18n/es';
import { pt } from 'soff-date/i18n/pt';

// Spanish (default for Colombia)
const holidaysES = getHolidays(2025);

// English
const holidaysEN = getHolidays(2025, { lang: en });

// Portuguese
const holidaysPT = getHolidays(2025, { lang: pt });
```

## Examples

```typescript
import { getHolidays } from 'soff-date/locales/us';
import { es } from 'soff-date/i18n/es';

const holidays = getHolidays(2025, { lang: es });
console.log(holidays[0].name); // "Año Nuevo"
```

## Bundle Size

| Import | Size |
|--------|------|
| `i18n/en` | ~1.1KB |
| `i18n/es` | ~1.2KB |
| `i18n/pt` | ~1.2KB |

## See Also

- [Custom Translations](/i18n/custom-translations/) - Create your own
