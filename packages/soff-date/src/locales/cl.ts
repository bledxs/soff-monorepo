import type { HolidayDefinition } from '../core/types';
import { createHolidayManager } from '../core/manager';
import { es } from '../i18n/es';

const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  { key: 'holySaturday', rule: { type: 'easterRelative', offset: -1 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 } },
  { key: 'navyDay', rule: { type: 'fixed', month: 5, day: 21 } },
  { key: 'indigenousPeoplesDay', rule: { type: 'fixed', month: 6, day: 21 } },
  { key: 'saintPeterPaul', rule: { type: 'fixed', month: 6, day: 29 }, shift: 'nearestMonday' },
  { key: 'ourLadyOfMountCarmel', rule: { type: 'fixed', month: 7, day: 16 } },
  { key: 'assumptionMary', rule: { type: 'fixed', month: 8, day: 15 } },
  { key: 'independenceDay', rule: { type: 'fixed', month: 9, day: 18 } },
  { key: 'armyDay', rule: { type: 'fixed', month: 9, day: 19 } },
  { key: 'columbusDay', rule: { type: 'fixed', month: 10, day: 12 }, shift: 'nearestMonday' },
  { key: 'reformationDay', rule: { type: 'fixed', month: 10, day: 31 }, shift: 'nearestMonday' },
  { key: 'allSaints', rule: { type: 'fixed', month: 11, day: 1 } },
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
