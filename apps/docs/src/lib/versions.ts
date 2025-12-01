import soffDatePkg from '../../../../packages/soff-date/package.json';
import soffIdPkg from '../../../../packages/soff-id/package.json';
import soffMaskPkg from '../../../../packages/soff-mask/package.json';
import soffMoneyPkg from '../../../../packages/soff-money/package.json';

export const versions = {
  'soff-date': soffDatePkg.version,
  'soff-id': soffIdPkg.version,
  'soff-mask': soffMaskPkg.version,
  'soff-money': soffMoneyPkg.version,
} as const;

export type LibraryName = keyof typeof versions;

export function getVersion(name: LibraryName): string {
  return versions[name];
}

export const libraries = [
  {
    name: 'soff-date' as const,
    description: soffDatePkg.description,
    version: soffDatePkg.version,
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
] as const;
