---
'soff-date': minor
---

Add a new public `soff-date/locales` barrel export for dynamic locale selection.

Harden the package against invalid inputs across public helpers and algorithms:

- return an empty array for non-integer years in `resolveHolidays`
- return an empty string for invalid dates in `formatRelativeTime`
- preserve invalid inputs safely in business day helpers
- return `Invalid Date` for unsupported or impossible algorithm inputs in `getEasterSunday`, `getNthWeekday`, and `applyShift`

Also expand regression coverage and README documentation for the updated runtime contracts.
