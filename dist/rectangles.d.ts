/**
 * @license Rectangles.js v0.1.0 9/9/2026
 * https://github.com/rawify/Rectangles.js
 *
 * Copyright (c) 2025-2026, Robert Eisele (https://raw.org/)
 * Licensed under the MIT license.
 */
interface Rectangle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
interface Point {
    x: number;
    y: number;
}
interface XYWH extends Point {
    width: number;
    height: number;
}
/** Returns true only when the rectangles overlap with non-zero area. */
declare function intersect(a: Readonly<Rectangle>, b: Readonly<Rectangle>): boolean;
/** Calculates the intersection. Call only when intersect(a, b) is true. */
declare function intersection(a: Readonly<Rectangle>, b: Readonly<Rectangle>): Rectangle;
declare function normalize(rectangle: Readonly<Rectangle>): Rectangle;
declare function area(rectangle: Readonly<Rectangle>): number;
declare function height(rectangle: Readonly<Rectangle>): number;
declare function width(rectangle: Readonly<Rectangle>): number;
declare function perimeter(rectangle: Readonly<Rectangle>): number;
declare function center(rectangle: Readonly<Rectangle>): Point;
/** Preserves the legacy asymmetric inset transformation. */
declare function insetBy(rectangle: Readonly<Rectangle>, width: number): Rectangle;
declare function union(a: Readonly<Rectangle>, b: Readonly<Rectangle>): Rectangle;
declare function contains(a: Readonly<Rectangle>, b: Readonly<Rectangle>): boolean;
declare function containsPoint(rectangle: Readonly<Rectangle>, point: Readonly<Point>): boolean;
declare function translate(rectangle: Readonly<Rectangle>, deltaX: number, deltaY: number): Rectangle;
declare function clone(rectangle: Readonly<Rectangle>): Rectangle;
declare function equals(a: Readonly<Rectangle>, b: Readonly<Rectangle>): boolean;
declare function fromXYWH(x: number, y: number, width: number, height: number): Rectangle;
declare function toXYWH(rectangle: Readonly<Rectangle>): XYWH;
/** Stateless operations for axis-aligned rectangles. */
declare const Rectangles: {
    readonly intersect: typeof intersect;
    readonly intersection: typeof intersection;
    readonly normalize: typeof normalize;
    readonly area: typeof area;
    readonly height: typeof height;
    readonly width: typeof width;
    readonly perimeter: typeof perimeter;
    readonly center: typeof center;
    readonly insetBy: typeof insetBy;
    readonly union: typeof union;
    readonly contains: typeof contains;
    readonly containsPoint: typeof containsPoint;
    readonly translate: typeof translate;
    readonly clone: typeof clone;
    readonly equals: typeof equals;
    readonly fromXYWH: typeof fromXYWH;
    readonly toXYWH: typeof toXYWH;
};
export = Rectangles;
