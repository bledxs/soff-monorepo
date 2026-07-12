import type { HolidayDefinition } from '../core/types';
import { createHolidayManager } from '../core/manager';
import { es } from '../i18n/es';

const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'carnivalMonday', rule: { type: 'easterRelative', offset: -48 } },
  { key: 'carnivalTuesday', rule: { type: 'easterRelative', offset: -47 } },
  { key: 'memoryDay', rule: { type: 'fixed', month: 3, day: 24 } },
  { key: 'malvinasDay', rule: { type: 'fixed', month: 4, day: 2 } },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 } },
  { key: 'mayRevolution', rule: { type: 'fixed', month: 5, day: 25 } },
  {
    key: 'guemesDay',
    rule: { type: 'fixed', month: 6, day: 17 },
    shift: 'nearestMonday',
  },
  { key: 'belgranoDay', rule: { type: 'fixed', month: 6, day: 20 } },
  { key: 'independenceDay', rule: { type: 'fixed', month: 7, day: 9 } },
  {
    key: 'sanMartinDay',
    rule: { type: 'fixed', month: 8, day: 17 },
    shift: 'nearestMonday',
  },
  {
    key: 'diversityDay',
    rule: { type: 'fixed', month: 10, day: 12 },
    shift: 'nearestMonday',
  },
  {
    key: 'sovereigntyDay',
    rule: { type: 'fixed', month: 11, day: 20 },
    shift: 'nearestMonday',
  },
  { key: 'immaculateConception', rule: { type: 'fixed', month: 12, day: 8 } },
  { key: 'christmas', rule: { type: 'fixed', month: 12, day: 25 } },
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
