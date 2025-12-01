# Contributing to Soff Monorepo

First off, thanks for taking the time to contribute! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include your environment details** (Node.js version, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `master`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes (`npm run test`)
4. Make sure your code lints (`npm run lint`)
5. Update documentation if needed

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/soff-monorepo.git
cd soff-monorepo

# Install dependencies
npm install

# Run tests
npm run test

# Build all packages
npm run build
```

## Project Structure

```
soff-monorepo/
├── apps/
│   └── docs/          # Documentation website
├── packages/
│   ├── soff-date/     # Holiday calculator
│   ├── soff-id/       # ID validation
│   ├── soff-mask/     # Input masking
│   ├── soff-money/    # Currency utilities
│   └── tsconfig/      # Shared TypeScript configs
└── turbo.json         # Turborepo configuration
```

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code changes that neither fix bugs nor add features
- `test:` - Adding or correcting tests
- `chore:` - Changes to build process or auxiliary tools

Examples:

```
feat(soff-date): add support for Peru holidays
fix(soff-mask): correct phone mask for Argentina
docs: update README with new examples
```

## Creating a Changeset

When making changes that should be released:

```bash
npx changeset
```

Follow the prompts to:

1. Select the packages that changed
2. Choose the version bump type (major/minor/patch)
3. Write a summary of the changes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
