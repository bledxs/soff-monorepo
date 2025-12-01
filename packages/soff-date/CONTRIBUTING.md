# Contributing to Soff Date

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways to help and details about how this project handles them. Please make sure to read the relevant section before making your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The community looks forward to your contributions.

## Table of Contents

- [Contributing to Soff Date](#contributing-to-soff-date)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [I Have a Question](#i-have-a-question)
  - [I Want To Contribute](#i-want-to-contribute)
    - [Reporting Bugs](#reporting-bugs)
    - [Suggesting Enhancements](#suggesting-enhancements)
    - [Your First Code Contribution](#your-first-code-contribution)
    - [Adding a New Locale](#adding-a-new-locale)
  - [Styleguides](#styleguides)
    - [Commit Messages](#commit-messages)

## Code of Conduct

This project and everyone participating in it is governed by the
[Soff Date Code of Conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## I Have a Question

If you want to ask a question, we assume that you have read the available [Documentation](README.md).

Before you ask a question, it is best to search for existing [Issues](https://github.com/bledxs/soff-date/issues) that might help you. In case you have found a suitable issue and still need clarification, you can write your question in this issue. It is also advisable to search the internet for answers first.

## I Want To Contribute

### Reporting Bugs

- Make sure that you are using the latest version.
- Read the [documentation](README.md) to find out if the functionality is supported.
- Perform a search to see if the bug has already been reported.
- If you find an issue, open a new one. Provide a clear title and description, and as much relevant information as possible.

### Suggesting Enhancements

- Open a new issue.
- Describe the enhancement in detail.
- Explain why this enhancement would be useful to most users.

### Your First Code Contribution

1. **Fork the repository**
2. **Clone your fork**: `git clone https://github.com/your-username/soff-date.git`
3. **Create a branch**: `git checkout -b feat/my-new-feature`
4. **Install dependencies**: `npm install`
5. **Make your changes**
6. **Run tests**: `npm test`
7. **Commit your changes**: `git commit -m 'feat: add some feature'` (See [Commit Messages](#commit-messages))
8. **Push to the branch**: `git push origin feat/my-new-feature`
9. **Submit a pull request**

### Adding a New Locale

1. Create `src/locales/{code}.ts`
2. Define `definitions` array with holiday rules
3. Add translations to `src/i18n/*.ts`
4. Add tests in `tests/locales/{code}.test.ts`
5. Update `tsup.config.ts` and `package.json` exports

## Styleguides

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. This allows us to automatically generate changelogs and version numbers.

Format: `<type>(<scope>): <subject>`

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

Example: `feat(locale): add support for Brazil`
