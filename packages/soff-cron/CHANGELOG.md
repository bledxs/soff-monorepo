# Changelog

## 0.0.2

### Patch Changes

- [#19](https://github.com/bledxs/soff-monorepo/pull/19) [`433d761`](https://github.com/bledxs/soff-monorepo/commit/433d7619b601e132f2d8489eed4718e2592b151b) Thanks [@github-actions](https://github.com/apps/github-actions)! - update i18n strings for weekdays and weekends

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial release of soff-cron
- Cron expression validator with comprehensive error messages
- Cron expression parser with structured output
- Human-readable formatter with i18n support (Spanish and English)
- Support for 5-field and 6-field (with seconds) cron expressions
- Support for special keywords (@yearly, @monthly, @daily, etc.)
- Support for ranges, lists, step values, and wildcards
- Support for named months (JAN-DEC) and days (SUN-SAT)
- 12-hour and 24-hour time format options
- Comprehensive test suite with 100% coverage
- Full TypeScript support with type definitions
- Zero external dependencies
