# Rectangles.js

[![NPM Package](https://img.shields.io/npm/v/rectangles.svg?style=flat)](https://npmjs.org/package/rectangles "View this project on npm")
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Rectangles.js is a small, dependency-free TypeScript library for working with axis-aligned rectangles. It exports tree-shakable functions and a compatible `Rectangles` object that operates on plain objects.

The npm package is [`rectangles`](https://www.npmjs.com/package/rectangles). Use it for lightweight axis-aligned bounding-box calculations with plain objects. Use a polygon or oriented-box library when rotation, clipping polygons, or minimum separating axes are required.

The library provides tools to:

- test whether two rectangles intersect
- compute their intersection or union
- calculate area, perimeter, dimensions, and center points
- test containment and translate rectangles without mutation
- convert between corner and XYWH representations

Every rectangle is defined by two cartesian points:

- `(x1, y1)` — top-left corner
- `(x2, y2)` — bottom-right corner

Use `normalize(a)` before intersection operations when coordinate order is not guaranteed. Measurement, containment, union, center, and XYWH conversion already support reversed coordinates.

## Installation

Install via npm:

```bash
npm install rectangles
```

## Usage

### Node (CommonJS)

```js
const Rectangles = require('rectangles');

const A = { x1: 20, y1: 20, x2: 100, y2: 100 };
const B = { x1: 80, y1: 80, x2: 300, y2: 300 };

if (Rectangles.intersect(A, B)) {
  console.log(Rectangles.intersection(A, B));
} else {
  console.log('no intersection');
}
```

### ES Modules

```js
import Rectangles, { area, type Rectangle } from 'rectangles';

const rectangle: Rectangle = Rectangles.fromXYWH(10, 10, 50, 40);
console.log(area(rectangle));
```

### Normalize, test, and measure overlap

Normalize rectangles before `intersect()` or `intersection()` when coordinate order is unknown.

```ts
import Rectangles from 'rectangles';

const a = Rectangles.normalize(Rectangles.fromXYWH(10, 20, 30, 40));
const b = Rectangles.normalize(Rectangles.fromXYWH(25, 30, 30, 15));

if (Rectangles.intersect(a, b)) {
  const overlap = Rectangles.intersection(a, b);
  console.log(overlap);                  // { x1: 25, y1: 30, x2: 40, y2: 45 }
  console.log(Rectangles.area(overlap)); // 225
}
```

### Move a rectangle without mutation

```ts
import Rectangles from 'rectangles';

const source = { x1: 10, y1: 20, x2: 40, y2: 60 };
const moved = Rectangles.translate(source, 5, -5);

console.log(moved);  // { x1: 15, y1: 15, x2: 45, y2: 55 }
console.log(source); // unchanged
```

All methods are synchronous. Object-returning methods create new plain objects and do not mutate their inputs. Coordinates must be finite numbers; runtime validation is intentionally left to the caller.

### Browser (global)

```html
<script src="node_modules/rectangles/dist/rectangles.min.js"></script>
<script>
  const A = { x1: 0, y1: 0, x2: 10, y2: 10 };
  console.log(Rectangles.center(A));
</script>
```

### RequireJS

```html
<script src="require.js"></script>
<script>
requirejs(['node_modules/rectangles/dist/rectangles.min.js'], function (Rectangles) {
  const r = { x1: 0, y1: 0, x2: 10, y2: 20 };
  console.log(Rectangles.normalize(r));
});
</script>
```

### Browser ES module

```js
import Rectangles from 'rectangles/browser';

const rectangle = Rectangles.fromXYWH(10, 20, 30, 40);
console.log(Rectangles.toXYWH(rectangle));
```

## Functions

### `intersect(a, b)`

Determines whether two normalized rectangles intersect.

Returns `true` if they overlap with non-zero area, `false` otherwise
(touching only at an edge or corner is **not** considered intersection).

### `intersection(a, b)`

Calculates the intersection rectangle of two rectangles.

* Assumes that `intersect(a, b)` is `true`.
* Returns a rectangle `{ x1, y1, x2, y2 }`.

### `normalize(a)`

Normalizes a rectangle to ensure `x1 <= x2` and `y1 <= y2`.

Useful when you are not sure about coordinate ordering.

### `area(a)`

Calculates the area of a rectangle.

### `height(a)`

Calculates the height of a rectangle.

### `width(a)`

Calculates the width of a rectangle.

### `perimeter(a)`

Calculates the perimeter of a rectangle.

### `center(a)`

Calculates the center point of a rectangle.

Returns an object: `{ x, y }`.

### `insetBy(a, w)`

Applies the library's legacy inset transformation: it adds `w` to `x1` and `y1`, and subtracts `2 * w` from `x2` and `y2`.

This is not a symmetric inset. For a conventional inset by `w` on every side, construct `{ x1: a.x1 + w, y1: a.y1 + w, x2: a.x2 - w, y2: a.y2 - w }` instead.
* Returns a new rectangle: `{ x1, y1, x2, y2 }`.

### `union(a, b)`

Calculates the bounding rectangle that contains both `a` and `b`.

Returns `{ x1, y1, x2, y2 }`.

### `contains(a, b)`

Checks whether rectangle `a` fully contains rectangle `b`.

Returns `true` or `false`.

### `containsPoint(a, p)`

Checks whether rectangle `a` contains the point `p`.

* `p` has the form `{ x, y }`.
* The boundary counts as “inside”.

Returns `true` or `false`.

### `translate(a, dx, dy)`

Translates a rectangle by `dx` and `dy`.

Returns a new rectangle `{ x1, y1, x2, y2 }`.

### `clone(a)`

Returns a new rectangle containing the four coordinate properties.

### `equals(a, b)`

Compares two rectangles for exact coordinate equality.

Returns `true` or `false`.

### `fromXYWH(x, y, width, height)`

Creates a rectangle from `x`, `y`, `width`, `height`.

* `(x, y)` is the top-left coordinate.
* `width` and `height` may be negative.

Returns `{ x1, y1, x2, y2 }`.


### `toXYWH(a)`

Converts a rectangle to `{ x, y, width, height }` representation.

* Ensures `width >= 0` and `height >= 0`, regardless of original `x1/x2`, `y1/y2` order.

## Development

Node.js 20 or newer is required for development.

```bash
npm install
npm test
```

Build CommonJS, ESM, browser, and declaration outputs with:

```bash
npm run build
```

## Copyright and Licensing

Copyright (c) 2025-2026, [Robert Eisele](https://raw.org/)
Licensed under the MIT license.
