"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/rectangles.ts
var rectangles_exports = {};
__export(rectangles_exports, {
  Rectangles: () => Rectangles,
  area: () => area,
  center: () => center,
  clone: () => clone,
  contains: () => contains,
  containsPoint: () => containsPoint,
  default: () => rectangles_default,
  equals: () => equals,
  fromXYWH: () => fromXYWH,
  height: () => height,
  insetBy: () => insetBy,
  intersect: () => intersect,
  intersection: () => intersection,
  normalize: () => normalize,
  perimeter: () => perimeter,
  toXYWH: () => toXYWH,
  translate: () => translate,
  union: () => union,
  width: () => width
});
module.exports = __toCommonJS(rectangles_exports);
/**
 * @license Rectangles.js v0.1.0 9/9/2026
 * https://github.com/rawify/Rectangles.js
 *
 * Copyright (c) 2025-2026, Robert Eisele (https://raw.org/)
 * Licensed under the MIT license.
 */
function getWidth(rectangle) {
  return Math.abs(rectangle.x2 - rectangle.x1);
}
function getHeight(rectangle) {
  return Math.abs(rectangle.y2 - rectangle.y1);
}
function intersect(a, b) {
  return a.x1 < b.x2 && a.x2 > b.x1 && a.y1 < b.y2 && a.y2 > b.y1;
}
function intersection(a, b) {
  return {
    x1: Math.max(a.x1, b.x1),
    y1: Math.max(a.y1, b.y1),
    x2: Math.min(a.x2, b.x2),
    y2: Math.min(a.y2, b.y2)
  };
}
function normalize(rectangle) {
  return {
    x1: Math.min(rectangle.x1, rectangle.x2),
    y1: Math.min(rectangle.y1, rectangle.y2),
    x2: Math.max(rectangle.x1, rectangle.x2),
    y2: Math.max(rectangle.y1, rectangle.y2)
  };
}
function area(rectangle) {
  return getWidth(rectangle) * getHeight(rectangle);
}
function height(rectangle) {
  return getHeight(rectangle);
}
function width(rectangle) {
  return getWidth(rectangle);
}
function perimeter(rectangle) {
  return 2 * (getWidth(rectangle) + getHeight(rectangle));
}
function center(rectangle) {
  return {
    x: rectangle.x1 + (rectangle.x2 - rectangle.x1) / 2,
    y: rectangle.y1 + (rectangle.y2 - rectangle.y1) / 2
  };
}
function insetBy(rectangle, width2) {
  return {
    x1: rectangle.x1 + width2,
    y1: rectangle.y1 + width2,
    x2: rectangle.x2 - 2 * width2,
    y2: rectangle.y2 - 2 * width2
  };
}
function union(a, b) {
  return {
    x1: Math.min(a.x1, a.x2, b.x1, b.x2),
    y1: Math.min(a.y1, a.y2, b.y1, b.y2),
    x2: Math.max(a.x1, a.x2, b.x1, b.x2),
    y2: Math.max(a.y1, a.y2, b.y1, b.y2)
  };
}
function contains(a, b) {
  const outer = normalize(a);
  const inner = normalize(b);
  return outer.x1 <= inner.x1 && outer.y1 <= inner.y1 && outer.x2 >= inner.x2 && outer.y2 >= inner.y2;
}
function containsPoint(rectangle, point) {
  const normalized = normalize(rectangle);
  return point.x >= normalized.x1 && point.x <= normalized.x2 && point.y >= normalized.y1 && point.y <= normalized.y2;
}
function translate(rectangle, deltaX, deltaY) {
  return {
    x1: rectangle.x1 + deltaX,
    y1: rectangle.y1 + deltaY,
    x2: rectangle.x2 + deltaX,
    y2: rectangle.y2 + deltaY
  };
}
function clone(rectangle) {
  return {
    x1: rectangle.x1,
    y1: rectangle.y1,
    x2: rectangle.x2,
    y2: rectangle.y2
  };
}
function equals(a, b) {
  return a.x1 === b.x1 && a.y1 === b.y1 && a.x2 === b.x2 && a.y2 === b.y2;
}
function fromXYWH(x, y, width2, height2) {
  return {
    x1: x,
    y1: y,
    x2: x + width2,
    y2: y + height2
  };
}
function toXYWH(rectangle) {
  return {
    x: Math.min(rectangle.x1, rectangle.x2),
    y: Math.min(rectangle.y1, rectangle.y2),
    width: getWidth(rectangle),
    height: getHeight(rectangle)
  };
}
var Rectangles = {
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
  toXYWH
};
var rectangles_default = Rectangles;
const RectanglesExport=module.exports.default;RectanglesExport.default=RectanglesExport;RectanglesExport.Rectangles=RectanglesExport;module.exports=RectanglesExport;
//# sourceMappingURL=rectangles.js.map
