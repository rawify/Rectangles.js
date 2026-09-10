const assert = require("node:assert/strict");
const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");
const { runInNewContext } = require("node:vm");
const { describe, it } = require("node:test");

const sample = { x1: 0, y1: 0, x2: 3, y2: 4 };

describe("package distributions", () => {
  it("exports the function object directly from CommonJS with aliases", () => {
    const Rectangles = require("..");
    assert.equal(Rectangles.area(sample), 12);
    assert.equal(Rectangles.default, Rectangles);
    assert.equal(Rectangles.Rectangles, Rectangles);
  });

  it("exports the default object and named functions from ESM", async () => {
    const module = await import("../dist/rectangles.mjs");
    assert.equal(module.default.area(sample), 12);
    assert.equal(module.Rectangles, module.default);
    assert.equal(module.area(sample), 12);
  });

  it("provides a standalone browser ESM build", async () => {
    const module = await import("../dist/rectangles.min.mjs");
    assert.equal(module.default.perimeter(sample), 14);
    assert.equal(module.Rectangles, module.default);
  });

  it("provides browser global and AMD builds", async () => {
    const source = await readFile(
      resolve(__dirname, "../dist/rectangles.min.js"),
      "utf8",
    );
    const globalContext = {};
    runInNewContext(source, globalContext);
    assert.equal(globalContext.Rectangles.area(sample), 12);

    let amdFactory;
    const define = (_dependencies, factory) => {
      amdFactory = factory;
    };
    define.amd = {};
    const amdContext = { define };
    runInNewContext(source, amdContext);
    assert.equal(typeof amdFactory, "function");
    assert.equal(amdFactory().area(sample), 12);
  });
});
