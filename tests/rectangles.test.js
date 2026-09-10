const assert = require("node:assert/strict");
const { describe, it } = require("node:test");
const Rectangles = require("..");

const rectangle = { x1: 0, y1: 0, x2: 10, y2: 20 };

describe("Rectangles", () => {
  it("detects only overlaps with positive area", () => {
    assert.equal(
      Rectangles.intersect(rectangle, { x1: 5, y1: 5, x2: 15, y2: 15 }),
      true,
    );
    assert.equal(
      Rectangles.intersect(rectangle, { x1: 10, y1: 0, x2: 20, y2: 10 }),
      false,
    );
    assert.equal(
      Rectangles.intersect(rectangle, { x1: 10, y1: 20, x2: 20, y2: 30 }),
      false,
    );
    assert.equal(
      Rectangles.intersect(rectangle, { x1: 11, y1: 0, x2: 20, y2: 10 }),
      false,
    );
  });

  it("calculates intersections and bounding unions", () => {
    const other = { x1: 5, y1: -5, x2: 15, y2: 5 };
    assert.deepEqual(Rectangles.intersection(rectangle, other), {
      x1: 5,
      y1: 0,
      x2: 10,
      y2: 5,
    });
    assert.deepEqual(Rectangles.union(rectangle, other), {
      x1: 0,
      y1: -5,
      x2: 15,
      y2: 20,
    });
    assert.deepEqual(
      Rectangles.union(
        { x1: 10, y1: 10, x2: 0, y2: 0 },
        { x1: 20, y1: 5, x2: 15, y2: -5 },
      ),
      { x1: 0, y1: -5, x2: 20, y2: 10 },
    );
  });

  it("normalizes reversed coordinates without mutating the input", () => {
    const input = { x1: 10, y1: 20, x2: 0, y2: -10 };
    assert.deepEqual(Rectangles.normalize(input), {
      x1: 0,
      y1: -10,
      x2: 10,
      y2: 20,
    });
    assert.deepEqual(input, { x1: 10, y1: 20, x2: 0, y2: -10 });
  });

  it("measures rectangles independently of coordinate order", () => {
    assert.equal(Rectangles.width(rectangle), 10);
    assert.equal(Rectangles.height(rectangle), 20);
    assert.equal(Rectangles.area(rectangle), 200);
    assert.equal(Rectangles.perimeter(rectangle), 60);
    assert.equal(Rectangles.area({ x1: 10, y1: 20, x2: 0, y2: 0 }), 200);
  });

  it("calculates the center along directed coordinates", () => {
    assert.deepEqual(Rectangles.center(rectangle), { x: 5, y: 10 });
    assert.deepEqual(Rectangles.center({ x1: 10, y1: 20, x2: 0, y2: 0 }), {
      x: 5,
      y: 10,
    });
  });

  it("preserves the legacy asymmetric inset operation", () => {
    assert.deepEqual(Rectangles.insetBy({ x1: 0, y1: 0, x2: 10, y2: 10 }, 2), {
      x1: 2,
      y1: 2,
      x2: 6,
      y2: 6,
    });
  });

  it("tests rectangle and point containment with inclusive boundaries", () => {
    assert.equal(
      Rectangles.contains(rectangle, { x1: 2, y1: 2, x2: 4, y2: 4 }),
      true,
    );
    assert.equal(
      Rectangles.contains(rectangle, { x1: -1, y1: 2, x2: 4, y2: 4 }),
      false,
    );
    assert.equal(
      Rectangles.contains(
        { x1: 10, y1: 20, x2: 0, y2: 0 },
        { x1: 4, y1: 4, x2: 2, y2: 2 },
      ),
      true,
    );
    assert.equal(Rectangles.containsPoint(rectangle, { x: 5, y: 5 }), true);
    assert.equal(Rectangles.containsPoint(rectangle, { x: 0, y: 0 }), true);
    assert.equal(Rectangles.containsPoint(rectangle, { x: -1, y: 0 }), false);
  });

  it("translates and clones without mutating or leaking extra fields", () => {
    const source = { x1: 0, y1: 0, x2: 10, y2: 10 };
    assert.deepEqual(Rectangles.translate(source, 5, -2), {
      x1: 5,
      y1: -2,
      x2: 15,
      y2: 8,
    });
    assert.deepEqual(source, { x1: 0, y1: 0, x2: 10, y2: 10 });
    assert.deepEqual(Rectangles.clone({ ...source, label: "ignored" }), source);
  });

  it("compares exact coordinates", () => {
    assert.equal(Rectangles.equals(rectangle, { ...rectangle }), true);
    assert.equal(Rectangles.equals(rectangle, { ...rectangle, x2: 11 }), false);
  });

  it("converts to and from XYWH coordinates", () => {
    assert.deepEqual(Rectangles.fromXYWH(10, 20, 30, 40), {
      x1: 10,
      y1: 20,
      x2: 40,
      y2: 60,
    });
    assert.deepEqual(Rectangles.fromXYWH(10, 20, -30, -40), {
      x1: 10,
      y1: 20,
      x2: -20,
      y2: -20,
    });
    assert.deepEqual(Rectangles.toXYWH({ x1: 40, y1: 60, x2: 10, y2: 20 }), {
      x: 10,
      y: 20,
      width: 30,
      height: 40,
    });
  });
});
