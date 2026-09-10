/**
 * @license Rectangles.js v0.1.0 9/9/2026
 * https://github.com/rawify/Rectangles.js
 *
 * Copyright (c) 2025-2026, Robert Eisele (https://raw.org/)
 * Licensed under the MIT license.
 */

export interface Rectangle {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface XYWH extends Point {
  width: number;
  height: number;
}

function getWidth(rectangle: Readonly<Rectangle>): number {
  return Math.abs(rectangle.x2 - rectangle.x1);
}

function getHeight(rectangle: Readonly<Rectangle>): number {
  return Math.abs(rectangle.y2 - rectangle.y1);
}

/** Returns true only when the rectangles overlap with non-zero area. */
export function intersect(
  a: Readonly<Rectangle>,
  b: Readonly<Rectangle>,
): boolean {
  return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
}

/** Calculates the intersection. Call only when intersect(a, b) is true. */
export function intersection(
  a: Readonly<Rectangle>,
  b: Readonly<Rectangle>,
): Rectangle {
  return {
    x1: Math.max(a.x1, b.x1),
    y1: Math.max(a.y1, b.y1),
    x2: Math.min(a.x2, b.x2),
    y2: Math.min(a.y2, b.y2),
  };
}

export function normalize(rectangle: Readonly<Rectangle>): Rectangle {
  return {
    x1: Math.min(rectangle.x1, rectangle.x2),
    y1: Math.min(rectangle.y1, rectangle.y2),
    x2: Math.max(rectangle.x1, rectangle.x2),
    y2: Math.max(rectangle.y1, rectangle.y2),
  };
}

export function area(rectangle: Readonly<Rectangle>): number {
  return getWidth(rectangle) * getHeight(rectangle);
}

export function height(rectangle: Readonly<Rectangle>): number {
  return getHeight(rectangle);
}

export function width(rectangle: Readonly<Rectangle>): number {
  return getWidth(rectangle);
}

export function perimeter(rectangle: Readonly<Rectangle>): number {
  return 2 * (getWidth(rectangle) + getHeight(rectangle));
}

export function center(rectangle: Readonly<Rectangle>): Point {
  return {
    x: rectangle.x1 + (rectangle.x2 - rectangle.x1) / 2,
    y: rectangle.y1 + (rectangle.y2 - rectangle.y1) / 2,
  };
}

/** Preserves the legacy asymmetric inset transformation. */
export function insetBy(
  rectangle: Readonly<Rectangle>,
  width: number,
): Rectangle {
  return {
    x1: rectangle.x1 + width,
    y1: rectangle.y1 + width,
    x2: rectangle.x2 - 2 * width,
    y2: rectangle.y2 - 2 * width,
  };
}

export function union(
  a: Readonly<Rectangle>,
  b: Readonly<Rectangle>,
): Rectangle {
  return {
    x1: Math.min(a.x1, a.x2, b.x1, b.x2),
    y1: Math.min(a.y1, a.y2, b.y1, b.y2),
    x2: Math.max(a.x1, a.x2, b.x1, b.x2),
    y2: Math.max(a.y1, a.y2, b.y1, b.y2),
  };
}

export function contains(
  a: Readonly<Rectangle>,
  b: Readonly<Rectangle>,
): boolean {
  const outer = normalize(a);
  const inner = normalize(b);
  return (
    outer.x1 <= inner.x1 &&
    outer.y1 <= inner.y1 &&
    outer.x2 >= inner.x2 &&
    outer.y2 >= inner.y2
  );
}

export function containsPoint(
  rectangle: Readonly<Rectangle>,
  point: Readonly<Point>,
): boolean {
  const normalized = normalize(rectangle);
  return (
    point.x >= normalized.x1 &&
    point.x <= normalized.x2 &&
    point.y >= normalized.y1 &&
    point.y <= normalized.y2
  );
}

export function translate(
  rectangle: Readonly<Rectangle>,
  deltaX: number,
  deltaY: number,
): Rectangle {
  return {
    x1: rectangle.x1 + deltaX,
    y1: rectangle.y1 + deltaY,
    x2: rectangle.x2 + deltaX,
    y2: rectangle.y2 + deltaY,
  };
}

export function clone(rectangle: Readonly<Rectangle>): Rectangle {
  return {
    x1: rectangle.x1,
    y1: rectangle.y1,
    x2: rectangle.x2,
    y2: rectangle.y2,
  };
}

export function equals(
  a: Readonly<Rectangle>,
  b: Readonly<Rectangle>,
): boolean {
  return a.x1 === b.x1 && a.y1 === b.y1 && a.x2 === b.x2 && a.y2 === b.y2;
}

export function fromXYWH(
  x: number,
  y: number,
  width: number,
  height: number,
): Rectangle {
  return {
    x1: x,
    y1: y,
    x2: x + width,
    y2: y + height,
  };
}

export function toXYWH(rectangle: Readonly<Rectangle>): XYWH {
  return {
    x: Math.min(rectangle.x1, rectangle.x2),
    y: Math.min(rectangle.y1, rectangle.y2),
    width: getWidth(rectangle),
    height: getHeight(rectangle),
  };
}

/** Stateless operations for axis-aligned rectangles. */
export const Rectangles = {
  intersect,
  intersection,
  normalize,
  area,
  height,
  width,
  perimeter,
  center,
  insetBy,
  union,
  contains,
  containsPoint,
  translate,
  clone,
  equals,
  fromXYWH,
  toXYWH,
} as const;

export default Rectangles;
