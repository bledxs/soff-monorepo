<div align="center">
  <img src="https://raw.githubusercontent.com/bledxs/soff-monorepo/master/assets/logo.png" alt="Soff Logo" width="100" height="100">
  <h1>Soff Money</h1>
  <p>Manejo seguro de dinero para JavaScript con aritmética basada en enteros y formato de locales LATAM.</p>
</div>

<div align="center">

[![npm](https://img.shields.io/npm/v/soff-money)](https://www.npmjs.com/package/soff-money)
[![License](https://img.shields.io/github/license/bledxs/soff-monorepo)](LICENSE)
[![Build Status](https://github.com/bledxs/soff-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/bledxs/soff-monorepo/actions)
[![codecov](https://codecov.io/gh/bledxs/soff-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/bledxs/soff-monorepo)
[![minzipped size](https://img.shields.io/bundlephobia/minzip/soff-money)](https://bundlephobia.com/package/soff-money)

</div>

---

**Sin dependencias** · **TypeScript** · **~6KB core**

## Tabla de Contenidos

- [¿Por qué?](#por-qué)
- [Instalación](#instalación)
- [Inicio Rápido](#inicio-rápido)
- [Distribución Justa](#distribución-justa)
- [Locales Disponibles](#locales-disponibles)
- [Referencia de API](#referencia-de-api)
- [Tamaño del Bundle](#tamaño-del-bundle)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## 🤔 ¿Por qué?

En JavaScript, `0.1 + 0.2 === 0.30000000000000004`. Esto es **fatal** para aplicaciones de e-commerce o financieras. 🚨

Además, formatear monedas en Latinoamérica es doloroso:

- ¿El símbolo va antes o después? 🤔
- ¿Puntos o comas para los miles?
- ¿Cuántos decimales?

Esta librería resuelve ambos problemas:

| Problema                         | Solución                                                |
| -------------------------------- | ------------------------------------------------------- |
| 🐞 **Errores de punto flotante** | Usa el **Patrón Safe Money** (centavos enteros)         |
| 🌎 **Formato LATAM**             | Formato consciente de locale (COP, MXN, ARS, BRL, etc.) |
| 🧩 **Centavos perdidos**         | Algoritmo de distribución justa (¡no se pierde dinero!) |
| ⚔️ **Operaciones matemáticas**   | Objetos Money inmutables con aritmética segura          |

## 📦 Instalación

```bash
# npm
npm install soff-money

# pnpm
pnpm add soff-money

# yarn
yarn add soff-money

# bun
bun add soff-money
```

## 🚀 Inicio Rápido

```typescript
import { Money, COP, USD } from 'soff-money';

// 💵 Crear dinero desde decimal (seguro - convertido a centavos internamente)
const precio = Money.fromDecimal(1500000, COP);

// 🧮 Operaciones aritméticas (todas retornan nuevas instancias de Money)
const conIva = precio.addPercentage(19); // Agregar 19% IVA
const conDescuento = conIva.subtractPercentage(10); // 10% descuento

// 🎨 Formatear para mostrar
console.log(precio.format()); // "$ 1.500.000,00"
console.log(conDescuento.format()); // "$ 1.606.500,00"

// ⚖️ Comparaciones seguras
precio.equals(Money.fromDecimal(1500000, COP)); // true
precio.greaterThan(conDescuento); // false
```

## Distribución Justa

Cuando divides dinero, nunca pierdes centavos:

```typescript
const cuenta = Money.fromDecimal(100, COP);
const [alice, bob, charlie] = cuenta.distribute(3);

// alice:   $33.34
// bob:     $33.33
// charlie: $33.33
// Total:   $100.00 ✓ (¡no $99.99!)
```

¡El centavo extra va a la primera persona - no se pierde dinero!

### Distribución Proporcional

```typescript
const total = Money.fromDecimal(100, USD);
const [share1, share2, share3] = total.distributeByRatios([1, 2, 2]);

// share1: $20.00 (20%)
// share2: $40.00 (40%)
// share3: $40.00 (40%)
```

## Locales Disponibles

| Locale       | Import                  | Moneda | Símbolo | Formato     |
| ------------ | ----------------------- | ------ | ------- | ----------- |
| 🇨🇴 Colombia  | `soff-money/locales/co` | COP    | $       | $ 1.500.000 |
| 🇲🇽 México    | `soff-money/locales/mx` | MXN    | $       | $1,500.00   |
| 🇦🇷 Argentina | `soff-money/locales/ar` | ARS    | $       | $ 1.500,00  |
| 🇧🇷 Brasil    | `soff-money/locales/br` | BRL    | R$      | R$ 1.500,00 |
| 🇺🇸 USA       | `soff-money/locales/us` | USD    | $       | $1,500.00   |
| 🇨🇱 Chile     | `soff-money/locales/cl` | CLP    | $       | $ 1.500     |
| 🇵🇪 Perú      | `soff-money/locales/pe` | PEN    | S/      | S/ 1,500.00 |
| 🇺🇾 Uruguay   | `soff-money/locales/uy` | UYU    | $       | $ 1.500,00  |
| 🇪🇺 Euro      | `soff-money/locales/eu` | EUR    | €       | 1.500,00 €  |

## Referencia de API

### Crear Money

```typescript
// Desde decimal (recomendado)
Money.fromDecimal(1500.5, COP);

// Desde centavos (cuando ya tienes centavos)
Money.fromCents(150050, COP);

// Cero
Money.zero(COP);
```

### Operaciones Aritméticas

Todas las operaciones retornan nuevas instancias de Money (inmutable):

```typescript
const a = Money.fromDecimal(100, COP);
const b = Money.fromDecimal(50, COP);

a.add(b); // $150
a.subtract(b); // $50
a.multiply(2); // $200
a.multiply(0.5); // $50
a.divide(2); // $50
a.negate(); // -$100
a.abs(); // $100 (valor absoluto)
```

### Operaciones de Porcentaje

```typescript
const precio = Money.fromDecimal(100, COP);

precio.percentage(10); // $10.00 (10% del precio)
precio.addPercentage(19); // $119.00 (precio + 19% IVA)
precio.subtractPercentage(10); // $90.00 (precio - 10% descuento)
```

### Operaciones Min/Max

```typescript
const a = Money.fromDecimal(100, COP);
const b = Money.fromDecimal(50, COP);

a.min(b); // $50 (mínimo de a y b)
a.max(b); // $100 (máximo de a y b)

const min = Money.fromDecimal(10, COP);
const max = Money.fromDecimal(100, COP);
a.clamp(min, max); // $100 (ajusta a entre min y max)

a.isBetween(min, max); // true (verifica si a está en el rango)
```

### Comparaciones

```typescript
a.equals(b); // false
a.greaterThan(b); // true
a.greaterThanOrEqual(b); // true
a.lessThan(b); // false
a.lessThanOrEqual(b); // false
a.isZero(); // false
a.isPositive(); // true
a.isNegative(); // false
```

### Formateo

```typescript
const precio = Money.fromDecimal(1500000, COP);

precio.format(); // "$ 1.500.000,00"
precio.format({ showSymbol: false }); // "1.500.000,00"
precio.format({ showDecimals: false }); // "$ 1.500.000"
precio.format({ symbolPosition: 'after' }); // "1.500.000,00 $"
precio.toDecimal(); // 1500000
precio.toCents(); // 150000000
precio.toJSON(); // { cents: 150000000, currency: 'COP' }
```

## Métodos Estáticos

```typescript
// Sumar múltiples valores
const items = [Money.fromDecimal(100, COP), Money.fromDecimal(50, COP), Money.fromDecimal(25, COP)];

Money.sum(items); // $175.00

// Obtener min/max del array
Money.minimum(items); // $25.00
Money.maximum(items); // $100.00

// Calcular promedio
Money.average(items); // $58.33
```

## Tamaño del Bundle

| Import           | Tamaño (minified) |
| ---------------- | ----------------- |
| `core`           | ~8.8KB            |
| `locales/*`      | ~0.3KB cada uno   |
| Paquete completo | ~10.6KB           |

Tree-shaking asegura que solo envías lo que importas.

## Contribuir

Por favor lee [CONTRIBUTING.md](../../CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](../LICENSE) para más detalles.

## Documentación

- [English](../README.md)
