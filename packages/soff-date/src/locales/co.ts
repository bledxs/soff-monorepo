import type { HolidayDefinition } from '../core/types';
import { createHolidayManager } from '../core/manager';
import { es } from '../i18n/es';

const definitions: HolidayDefinition[] = [
  // Fijos sin traslado
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 } },
  { key: 'independenceDay', rule: { type: 'fixed', month: 7, day: 20 } },
  { key: 'boyacaBattle', rule: { type: 'fixed', month: 8, day: 7 } },
  { key: 'immaculateConception', rule: { type: 'fixed', month: 12, day: 8 } },
  { key: 'christmas', rule: { type: 'fixed', month: 12, day: 25 } },

  // Ley Emiliani (se trasladan al lunes)
  {
    key: 'epiphany',
    rule: { type: 'fixed', month: 1, day: 6 },
    shift: 'emiliani',
  },
  {
    key: 'saintJoseph',
    rule: { type: 'fixed', month: 3, day: 19 },
    shift: 'emiliani',
  },
  {
    key: 'saintPeterPaul',
    rule: { type: 'fixed', month: 6, day: 29 },
    shift: 'emiliani',
  },
  {
    key: 'assumptionMary',
    rule: { type: 'fixed', month: 8, day: 15 },
    shift: 'emiliani',
  },
  {
    key: 'columbusDay',
    rule: { type: 'fixed', month: 10, day: 12 },
    shift: 'emiliani',
  },
  {
    key: 'allSaints',
    rule: { type: 'fixed', month: 11, day: 1 },
    shift: 'emiliani',
  },
  {
    key: 'independenceCartagena',
    rule: { type: 'fixed', month: 11, day: 11 },
    shift: 'emiliani',
  },
  {
    key: 'chiquinquira',
    rule: {
      type: 'custom',
      calc: (year) => (year >= 2026 ? new Date(Date.UTC(year, 6, 9)) : null),
    },
    shift: 'emiliani',
  },

  // Relativos a Pascua
  { key: 'holyThursday', rule: { type: 'easterRelative', offset: -3 } },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  {
    key: 'ascension',
    rule: { type: 'easterRelative', offset: 39 },
    shift: 'emiliani',
  },
  {
    key: 'corpusChristi',
    rule: { type: 'easterRelative', offset: 60 },
    shift: 'emiliani',
  },
  {
    key: 'sacredHeart',
    rule: { type: 'easterRelative', offset: 68 },
    shift: 'emiliani',
  },
];

export const {
  getHolidays,
  isHoliday,
  getNextHoliday,
  isBusinessDay,
  businessDays,
  diffBusinessDays,
  businessHours,
  diffBusinessHours,
} = createHolidayManager(definitions, es);
