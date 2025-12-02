<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Geo</h1>
  <p>Librería ligera de datos geográficos para LATAM - Departamentos, municipios, códigos postales y más.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-geo)](https://www.npmjs.com/package/soff-geo)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](../LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)

</div>

---

**Cero dependencias** · **TypeScript** · **Tree-shakeable**

## Tabla de Contenidos

- [Soff Geo](#soff-geo)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [¿Por qué?](#por-qué)
  - [Instalación](#instalación)
  - [Inicio Rápido](#inicio-rápido)
  - [Países Disponibles](#países-disponibles)
  - [Referencia API](#referencia-api)

## 🤔 ¿Por qué?

A menudo necesitas listas de departamentos/provincias y municipios/ciudades para formularios de dirección:

| Problema                  | Solución tradicional        | Solución Soff Geo                 |
| ------------------------- | --------------------------- | --------------------------------- |
| 🌐 **Datos actualizados** | APIs externas lentas        | ✅ Datos embebidos, cero latencia |
| 📦 **Tamaño del bundle**  | Librerías globales (100KB+) | ✅ Solo tu país (~45-100KB)       |
| 🔍 **Búsqueda**           | Implementación manual       | ✅ Búsqueda fuzzy incluida        |
| 🌳 **Tree-shaking**       | Todo o nada                 | ✅ Importa solo lo que necesitas  |

`soff-geo` ofrece una solución modular donde importas solo los datos del país que necesitas.

## 📦 Instalación

```bash
# npm
npm install soff-geo

# pnpm
pnpm add soff-geo

# yarn
yarn add soff-geo

# bun
bun add soff-geo
```

## 🚀 Inicio Rápido

```typescript
// Solo Colombia incluido en el bundle
import { getDepartments, getMunicipalities, searchMunicipalities } from 'soff-geo/co';

// 📍 Obtener todos los departamentos
const departments = getDepartments();
// → [{ code: '05', name: 'Antioquia', ... }, ...]

// 🏙️ Obtener municipios por departamento
const antioquiaMunis = getDepartmentMunicipalities('05');
// → [{ code: '05001', name: 'Medellín', ... }, ...]

// 🔍 Buscar
const results = searchMunicipalities('medellin');
// → [{ item: { name: 'Medellín', ... }, score: 1 }]
```

## Países Disponibles

| País        | Import        | Datos                     |
| ----------- | ------------- | ------------------------- |
| 🇨🇴 Colombia | `soff-geo/co` | Departamentos, Municipios |
| 🇲🇽 México   | `soff-geo/mx` | Estados, Municipios       |

## Referencia API

Cada país exporta un conjunto consistente de funciones:

### `getDepartments() / getStates()`

Retorna la lista de todas las divisiones administrativas de primer nivel.

### `getMunicipalities()`

Retorna la lista de todos los municipios disponibles.

### `getDepartment(code) / getState(code)`

Encuentra un departamento/estado por su código oficial.

### `getMunicipality(code)`

Encuentra un municipio por su código oficial.

### `getDepartmentMunicipalities(code) / getStateMunicipalities(code)`

Retorna todos los municipios pertenecientes a un departamento/estado específico.

### `searchDepartments(query) / searchStates(query)`

Busca departamentos/estados por nombre o código.

### `searchMunicipalities(query)`

Busca municipios por nombre o código.

## Tamaño del Bundle

| Import       | Tamaño (minified) |
| ------------ | ----------------- |
| `locales/co` | ~21KB             |
| `locales/mx` | ~52KB             |
| Core only    | ~1.2KB            |

Tree-shaking asegura que solo envías lo que importas.

## Contribuir

Por favor lee [CONTRIBUTING.md](../../CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](../LICENSE) para más detalles.

## Documentación

- [English](../README.md)
