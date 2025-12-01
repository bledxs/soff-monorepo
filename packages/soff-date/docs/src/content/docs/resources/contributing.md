---
title: Contributing
description: How to contribute to Soff Date
---

# Contributing

We welcome contributions to Soff Date!

## How to Contribute

1. **Fork the repository**
   ```bash
   gh repo fork bledxs/soff-date
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/my-new-feature
   ```

3. **Make changes**
   - Add tests for new features
   - Update documentation
   - Follow existing code style

4. **Run tests**
   ```bash
   npm test
   npm run typecheck
   npm run lint
   ```

5. **Submit a pull request**

## Adding a New Locale

1. Create `/src/locales/[code].ts`
2. Define holiday definitions
3. Export standard functions
4. Add tests in `/tests/locales/[code].test.ts`
5. Update documentation

## Adding Translations

1. Create `/src/i18n/[lang].ts`
2. Export `HolidayNames` object
3. Add tests

## Code of Conduct

Be respectful and inclusive.

## License

MIT License - see [LICENSE](https://github.com/bledxs/soff-date/blob/main/LICENSE)

## See Also

- [GitHub Repository](https://github.com/bledxs/soff-date)
- [Issues](https://github.com/bledxs/soff-date/issues)
