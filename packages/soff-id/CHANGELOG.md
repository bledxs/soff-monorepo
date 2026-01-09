# Changelog

## 0.2.5

### Patch Changes

- [#42](https://github.com/bledxs/soff-monorepo/pull/42) [`1518ca1`](https://github.com/bledxs/soff-monorepo/commit/1518ca1ee06c45b1d0fb50be37995f36b5a05b76) Thanks [@github-actions](https://github.com/apps/github-actions)! - Merge pull request #41 from bledxs/dependabot/npm_and_yarn/minor-and-patch-e74edba63c

## 0.2.4

### Patch Changes

- [#38](https://github.com/bledxs/soff-monorepo/pull/38) [`de20aed`](https://github.com/bledxs/soff-monorepo/commit/de20aed9f2366a717eedbf98eb37d5c1c7f6f352) Thanks [@github-actions](https://github.com/apps/github-actions)! - Merge pull request #37 from bledxs/dependabot/npm_and_yarn/minor-and-patch-4366035450

## 0.2.3

### Patch Changes

- [#35](https://github.com/bledxs/soff-monorepo/pull/35) [`36b647c`](https://github.com/bledxs/soff-monorepo/commit/36b647cc57ac666e5e1403fb378b231f1d9d01ba) Thanks [@github-actions](https://github.com/apps/github-actions)! - Merge pull request #34 from bledxs/dependabot/npm_and_yarn/minor-and-patch-6d9a86e4a4

## 0.2.2

### Patch Changes

- [#27](https://github.com/bledxs/soff-monorepo/pull/27) [`fcc9830`](https://github.com/bledxs/soff-monorepo/commit/fcc983082d21e115551546f863e56c62a0f97b7c) Thanks [@github-actions](https://github.com/apps/github-actions)! - update test commands to use 'vitest run'

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
