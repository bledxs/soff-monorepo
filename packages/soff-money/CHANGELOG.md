# soff-money

## 0.2.0

### Minor Changes

- [`a805830`](https://github.com/bledxs/soff-monorepo/commit/a8058302fe63b653a5e127ad084df351f3a8c974) Thanks [@bledxs](https://github.com/bledxs)! - feat(soff-money): add utility functions and new locales

  ### New Features
  - Add `percentage()`, `addPercentage()`, `subtractPercentage()` for percentage calculations
  - Add `min()`, `max()`, `clamp()`, `isBetween()` for comparisons
  - Add `toCents()` to convert Money to cents
  - Add static methods: `Money.sum()`, `Money.minimum()`, `Money.maximum()`, `Money.average()`

  ### New Locales
  - Add CLP (Chilean Peso)
  - Add PEN (Peruvian Sol)
  - Add UYU (Uruguayan Peso)
  - Add EUR (Euro)

  ### Improvements
  - Expanded test coverage from 32 to 64 tests
  - Coverage improved from 91.57% to 99.24%

## 0.1.1

### Patch Changes

- 29b7286: fix: update repository homepage URLs from main to master branch
