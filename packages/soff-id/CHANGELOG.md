# Changelog

## 0.2.1

### Patch Changes

- [#7](https://github.com/bledxs/soff-monorepo/pull/7) [`d90a600`](https://github.com/bledxs/soff-monorepo/commit/d90a6000322453adefcc80d6d92931a21f590d46) Thanks [@github-actions](https://github.com/apps/github-actions)! - modernize Spanish README files with logos and visual improvements

## 0.2.0

### Minor Changes

- [`dd1b721`](https://github.com/bledxs/soff-monorepo/commit/dd1b72109b421dede8c3560c710f830eb12e2b67) Thanks [@bledxs](https://github.com/bledxs)! - Enhanced soff-id with 48 functions, improved test coverage to 91%

## 0.1.1

### Patch Changes

- 29b7286: fix: update repository homepage URLs from main to master branch

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-11-30

### Added

- Initial release
- Core validation engine with modular architecture
- Locales:
  - 🇨🇴 Colombia (`soff-id/locales/co`) - NIT, CC, CE, TI
  - 🇧🇷 Brazil (`soff-id/locales/br`) - CPF, CNPJ
  - 🇦🇷 Argentina (`soff-id/locales/ar`) - DNI, CUIT, CUIL
  - 🇨🇱 Chile (`soff-id/locales/cl`) - RUT, RUN
  - 🇲🇽 Mexico (`soff-id/locales/mx`) - RFC, CURP
- Full TypeScript support with exported types
- Tree-shakeable ESM and CJS builds
- Zero runtime dependencies

### Technical

- Bundle size: < 1KB per locale (gzipped)
- Supports Node.js 20+
- Official government algorithms for each document type

[Unreleased]: https://github.com/bledxs/soff-monorepo/compare/soff-id-v0.1.0...HEAD
[0.1.0]: https://github.com/bledxs/soff-monorepo/releases/tag/soff-id-v0.1.0
