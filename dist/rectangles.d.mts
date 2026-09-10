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
/** Returns true only when the rectangles overlap with non-zero area. */
export declare function intersect(a: Readonly<Rectangle>, b: Readonly<Rectangle>): boolean;
/** Calculates the intersection. Call only when intersect(a, b) is true. */
export declare function intersection(a: Readonly<Rectangle>, b: Readonly<Rectangle>): Rectangle;
export declare function normalize(rectangle: Readonly<Rectangle>): Rectangle;
export declare function area(rectangle: Readonly<Rectangle>): number;
export declare function height(rectangle: Readonly<Rectangle>): number;
export declare function width(rectangle: Readonly<Rectangle>): number;
export declare function perimeter(rectangle: Readonly<Rectangle>): number;
export declare function center(rectangle: Readonly<Rectangle>): Point;
/** Preserves the legacy asymmetric inset transformation. */
export declare function insetBy(rectangle: Readonly<Rectangle>, width: number): Rectangle;
export declare function union(a: Readonly<Rectangle>, b: Readonly<Rectangle>): Rectangle;
export declare function contains(a: Readonly<Rectangle>, b: Readonly<Rectangle>): boolean;
export declare function containsPoint(rectangle: Readonly<Rectangle>, point: Readonly<Point>): boolean;
export declare function translate(rectangle: Readonly<Rectangle>, deltaX: number, deltaY: number): Rectangle;
export declare function clone(rectangle: Readonly<Rectangle>): Rectangle;
export declare function equals(a: Readonly<Rectangle>, b: Readonly<Rectangle>): boolean;
export declare function fromXYWH(x: number, y: number, width: number, height: number): Rectangle;
export declare function toXYWH(rectangle: Readonly<Rectangle>): XYWH;
/** Stateless operations for axis-aligned rectangles. */
export declare const Rectangles: {
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
export default Rectangles;
