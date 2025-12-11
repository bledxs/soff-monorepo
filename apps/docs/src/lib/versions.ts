import soffCronPkg from '../../../../packages/soff-cron/package.json';
import soffDatePkg from '../../../../packages/soff-date/package.json';
import soffGeoPkg from '../../../../packages/soff-geo/package.json';
import soffIdPkg from '../../../../packages/soff-id/package.json';
import soffMaskPkg from '../../../../packages/soff-mask/package.json';
import soffMoneyPkg from '../../../../packages/soff-money/package.json';
import soffPhonePkg from '../../../../packages/soff-phone/package.json';

export const versions = {
  'soff-cron': soffCronPkg.version,
  'soff-date': soffDatePkg.version,
  'soff-geo': soffGeoPkg.version,
  'soff-id': soffIdPkg.version,
  'soff-mask': soffMaskPkg.version,
  'soff-money': soffMoneyPkg.version,
  'soff-phone': soffPhonePkg.version,
} as const;

export type LibraryName = keyof typeof versions;

export function getVersion(name: LibraryName): string {
  return versions[name];
}

export const libraries = [
  {
    name: 'soff-cron' as const,
    description: soffCronPkg.description,
    version: soffCronPkg.version,
  },
  {
    name: 'soff-date' as const,
    description: soffDatePkg.description,
    version: soffDatePkg.version,
  },
  {
    name: 'soff-geo' as const,
    description: soffGeoPkg.description,
    version: soffGeoPkg.version,
  },
  {
    name: 'soff-id' as const,
    description: soffIdPkg.description,
    version: soffIdPkg.version,
  },
  {
    name: 'soff-mask' as const,
    description: soffMaskPkg.description,
    version: soffMaskPkg.version,
  },
  {
    name: 'soff-money' as const,
    description: soffMoneyPkg.description,
    version: soffMoneyPkg.version,
  },
  {
    name: 'soff-phone' as const,
    description: soffPhonePkg.description,
    version: soffPhonePkg.version,
  },
] as const;
