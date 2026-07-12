import type { HolidayDefinition } from '../core/types';
import { createHolidayManager } from '../core/manager';
import { es } from '../i18n/es';

const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'holyThursday', rule: { type: 'easterRelative', offset: -3 } },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 } },
  { key: 'saintPeterPaul', rule: { type: 'fixed', month: 6, day: 29 } },
  { key: 'independenceDay1', rule: { type: 'fixed', month: 7, day: 28 } },
  { key: 'independenceDay2', rule: { type: 'fixed', month: 7, day: 29 } },
  { key: 'battleOfJunin', rule: { type: 'fixed', month: 8, day: 6 } },
  { key: 'santaRosaDeLima', rule: { type: 'fixed', month: 8, day: 30 } },
  { key: 'battleOfAngamos', rule: { type: 'fixed', month: 10, day: 8 } },
  { key: 'allSaints', rule: { type: 'fixed', month: 11, day: 1 } },
  { key: 'immaculateConception', rule: { type: 'fixed', month: 12, day: 8 } },
  { key: 'battleOfAyacucho', rule: { type: 'fixed', month: 12, day: 9 } },
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
