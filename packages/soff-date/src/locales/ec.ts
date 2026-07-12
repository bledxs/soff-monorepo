import type { HolidayDefinition } from '../core/types';
import { createHolidayManager } from '../core/manager';
import { es } from '../i18n/es';

const definitions: HolidayDefinition[] = [
  { key: 'newYear', rule: { type: 'fixed', month: 1, day: 1 } },
  { key: 'carnivalMonday', rule: { type: 'easterRelative', offset: -48 } },
  { key: 'carnivalTuesday', rule: { type: 'easterRelative', offset: -47 } },
  { key: 'goodFriday', rule: { type: 'easterRelative', offset: -2 } },
  { key: 'laborDay', rule: { type: 'fixed', month: 5, day: 1 }, shift: 'nearestMonday' },
  { key: 'battleOfPichincha', rule: { type: 'fixed', month: 5, day: 24 }, shift: 'nearestMonday' },
  {
    key: 'firstCryOfIndependence',
    rule: { type: 'fixed', month: 8, day: 10 },
    shift: 'nearestMonday',
  },
  {
    key: 'independenceOfGuayaquil',
    rule: { type: 'fixed', month: 10, day: 9 },
    shift: 'nearestMonday',
  },
  { key: 'allSoulsDay', rule: { type: 'fixed', month: 11, day: 2 } },
  { key: 'independenceOfCuenca', rule: { type: 'fixed', month: 11, day: 3 } },
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
