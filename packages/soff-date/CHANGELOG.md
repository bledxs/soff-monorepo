# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-11-29

### Added

- **Business Days**: New `isBusinessDay(date)` and `businessDays(date, amount)` functions available in all locales (`co`, `us`, `mx`, `ar`, `br`).
- Core: Exposed `isWeekend`, `checkIsBusinessDay`, and `addBusinessDays` in `soff-date/core/business`.

### Fixed

- **Colombia**: Corrected liturgical offsets for Ascension, Corpus Christi, and Sacred Heart. Now `isShifted` correctly reflects the Emiliani shift.
- Documentation: Fixed License badge and removed incorrect reference to Chile.

### Technical

- Test coverage increased to >99%.

## [0.1.2] - 2025-11-29

### Added

- Locales:
  - 🇲🇽 Mexico (`soff-date/locales/mx`)
  - 🇦🇷 Argentina (`soff-date/locales/ar`)
  - 🇧🇷 Brazil (`soff-date/locales/br`)
- Shift rule: `nearestMonday` (for Argentina)

### Fixed

- Documentation updates

## [0.1.1] - 2025-11-29

### Fixed

- Corrected package name in documentation

## [0.1.0] - 2025-11-29

### Added

- Initial release
- Core engine with algorithmic date calculation
- Easter calculation (Meeus/Jones/Butcher algorithm)
- Nth weekday calculation (e.g., "3rd Monday of January")
- Shift rules: `emiliani`, `observedUS`, `nextMonday`
- Locales:
  - 🇨🇴 Colombia (`soff-date/locales/co`) - 18 holidays
  - 🇺🇸 USA (`soff-date/locales/us`) - 10 federal holidays
- i18n support:
  - Spanish (`soff-date/i18n/es`)
  - English (`soff-date/i18n/en`)
  - Portuguese (`soff-date/i18n/pt`)
- Full TypeScript support with exported types
- Tree-shakeable ESM and CJS builds
- Zero runtime dependencies

### Technical

- Bundle size: ~3-4KB per locale (minified)
- Supports Node.js 18, 20, 22
- 100% test coverage on core algorithms

[Unreleased]: https://github.com/bledxs/soff-date/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/bledxs/soff-date/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/bledxs/soff-date/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/bledxs/soff-date/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/bledxs/soff-date/releases/tag/v0.1.0
