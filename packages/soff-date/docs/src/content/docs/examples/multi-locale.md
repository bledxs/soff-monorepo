---
title: Multi-locale Applications
description: Working with holidays from multiple countries
---

# Multi-locale Applications

Examples for applications serving multiple countries.

## Multi-Country Holiday Calendar

```typescript
import { getHolidays as getCO } from 'soff-date/locales/co';
import { getHolidays as getUS } from 'soff-date/locales/us';
import { getHolidays as getMX } from 'soff-date/locales/mx';

interface CountryHoliday {
  country: string;
  flag: string;
  holidays: Holiday[];
}

function getMultiCountryHolidays(year: number): CountryHoliday[] {
  return [
    { country: 'Colombia', flag: '🇨🇴', holidays: getCO(year) },
    { country: 'United States', flag: '🇺🇸', holidays: getUS(year) },
    { country: 'Mexico', flag: '🇲🇽', holidays: getMX(year) },
  ];
}

const countries = getMultiCountryHolidays(2025);

countries.forEach((c) => {
  console.log(`\n${c.flag} ${c.country}: ${c.holidays.length} holidays`);
  c.holidays.slice(0, 3).forEach((h) => {
    console.log(`  ${h.date} - ${h.name}`);
  });
});
```

## Global Office Availability

```typescript
import { isBusinessDay as isBusinessDayCO } from 'soff-date/locales/co';
import { isBusinessDay as isBusinessDayUS } from 'soff-date/locales/us';

interface Office {
  name: string;
  locale: 'co' | 'us';
  timezone: string;
}

const offices: Office[] = [
  { name: 'Bogotá', locale: 'co', timezone: 'America/Bogota' },
  { name: 'New York', locale: 'us', timezone: 'America/New_York' },
];

function checkOfficeAvailability(date: Date) {
  const checkers = {
    co: isBusinessDayCO,
    us: isBusinessDayUS,
  };

  return offices.map((office) => ({
    office: office.name,
    isOpen: checkers[office.locale](date),
  }));
}

const availability = checkOfficeAvailability(new Date('2025-07-04'));
console.table(availability);
```

## See Also

- [Locales Overview](/locales/overview/)
- [Common Use Cases](/examples/common-use-cases/)
