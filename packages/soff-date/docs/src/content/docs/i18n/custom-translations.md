---
title: Custom Translations
description: How to create custom translations for holidays
---

# Custom Translations

Create your own translations or override existing ones.

## Basic Custom Translation

```typescript
import { getHolidays } from 'soff-date/locales/co';

const myTranslations = {
  newYear: 'Happy New Year!',
  christmas: 'Merry Christmas!',
  // ... other holidays
};

const holidays = getHolidays(2025, { lang: myTranslations });
console.log(holidays[0].name); // "Happy New Year!"
```

## Extending Existing Translations

```typescript
import { getHolidays } from 'soff-date/locales/us';
import { en } from 'soff-date/i18n/en';

const customEN = {
  ...en,
  independenceDayUS: 'July 4th',
  thanksgiving: 'Turkey Day',
};

const holidays = getHolidays(2025, { lang: customEN });
```

## Multi-Language Support

```typescript
type Language = 'en' | 'es' | 'fr';

const translations = {
  en: { newYear: "New Year's Day" },
  es: { newYear: 'Año Nuevo' },
  fr: { newYear: 'Nouvel An' },
};

function getHolidaysInLanguage(year: number, lang: Language) {
  return getHolidays(year, { lang: translations[lang] });
}
```

## See Also

- [Available Languages](/i18n/languages/) - Built-in translations
