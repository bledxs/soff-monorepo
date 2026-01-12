<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Geo</h1>
  <p>Lightweight geographic data library for LATAM - Departments, municipalities, postal codes and more.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-geo)](https://www.npmjs.com/package/soff-geo)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-geo)](https://bundlephobia.com/package/soff-geo)
[![All Contributors](https://img.shields.io/github/all-contributors/bledxs/soff-monorepo?color=ee8449&style=flat-square)](#contributors)

</div>

---

**Zero dependencies** · **TypeScript** · **Tree-shakeable**

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Why?](#why)
- [Install](#install)
- [Quick Start](#quick-start)
- [Available Locales](#available-locales)
- [API Reference](#api-reference)
- [Bundle Size](#bundle-size)
- [Contributing](#contributing)
- [License](#license)
- [Documentation](#documentation)
- [Contributors](#contributors)

## Why?

Often you need lists of departments/provinces and municipalities/cities for address forms, but APIs are slow or existing libraries are heavy and contain data from the whole world.

`soff-geo` provides a modular solution where you import only the country data you need.

## Install

```bash
npm install soff-geo
```

## Quick Start

```typescript
// Only Colombia included in bundle
import { getDepartments, getMunicipalities, searchMunicipalities } from 'soff-geo/co';

// Get all departments
const departments = getDepartments();
// [{ code: '05', name: 'Antioquia', ... }, ...]

// Get municipalities for a department
const antioquiaMunis = getDepartmentMunicipalities('05');
// [{ code: '05001', name: 'Medellín', ... }, ...]

// Search
const results = searchMunicipalities('medellin');
// [{ item: { name: 'Medellín', ... }, score: 1 }]
```

## Available Locales

| Locale      | Import        | Data                        |
| ----------- | ------------- | --------------------------- |
| 🇨🇴 Colombia | `soff-geo/co` | Departments, Municipalities |
| 🇲🇽 México   | `soff-geo/mx` | States, Municipalities      |

## API Reference

Each locale exports a consistent set of functions:

### `getDepartments() / getStates()`

Returns the list of all first-level administrative divisions.

### `getMunicipalities()`

Returns the list of all available municipalities.

### `getDepartment(code) / getState(code)`

Finds a department/state by its official code.

### `getMunicipality(code)`

Finds a municipality by its official code.

### `getDepartmentMunicipalities(code) / getStateMunicipalities(code)`

Returns all municipalities belonging to a specific department/state.

### `searchDepartments(query) / searchStates(query)`

Search for departments/states by name or code.

### `searchMunicipalities(query)`

Search for municipalities by name or code.

## Bundle Size

| Import       | Size (minified) |
| ------------ | --------------- |
| `locales/co` | ~21KB           |
| `locales/mx` | ~52KB           |
| Core only    | ~1.2KB          |

Tree-shaking ensures you only ship what you import.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Documentation

- [Español](docs/README.es.md)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://all-contributors.js.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/bledxs"><img src="https://avatars.githubusercontent.com/u/90062924?v=4" width="100px;" alt="Luis C. Rojas"/><br /><sub><b>Luis C. Rojas</b></sub></a><br /><a href="https://github.com/bledxs/soff-monorepo/commits?author=bledxs" title="Code">💻</a> <a href="https://github.com/bledxs/soff-monorepo/commits?author=bledxs" title="Documentation">📖</a> <a href="#maintenance-bledxs" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
