import { execFileSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { build } from "esbuild";

const entryPoints = ["src/rectangles.ts"];
const shared = {
  entryPoints,
  bundle: true,
  platform: "neutral",
  target: ["es2020"],
  legalComments: "inline",
};

await rm("dist", { recursive: true, force: true });
await rm(".types", { recursive: true, force: true });
await mkdir("dist", { recursive: true });

await Promise.all([
  build({
    ...shared,
    format: "cjs",
    outfile: "dist/rectangles.js",
    sourcemap: true,
    footer: {
      js: "const RectanglesExport=module.exports.default;RectanglesExport.default=RectanglesExport;RectanglesExport.Rectangles=RectanglesExport;module.exports=RectanglesExport;",
    },
  }),
  build({
    ...shared,
    format: "esm",
    outfile: "dist/rectangles.mjs",
    sourcemap: true,
  }),
  build({
    ...shared,
    format: "iife",
    globalName: "Rectangles",
    outfile: "dist/rectangles.min.js",
    minify: true,
    footer: {
      js: 'var RectanglesModule=Rectangles;if(typeof define==="function"&&define.amd)define([],function(){return RectanglesModule.default});Rectangles=RectanglesModule.default;',
    },
  }),
  build({
    ...shared,
    format: "esm",
    outfile: "dist/rectangles.min.mjs",
    minify: true,
  }),
]);

execFileSync("npx", ["tsc", "--project", "tsconfig.build.json"], {
  stdio: "inherit",
});

const declaration = await readFile(".types/rectangles.d.ts", "utf8");
await Promise.all([
  writeFile("dist/rectangles.d.mts", declaration),
  writeFile(
    "dist/rectangles.d.ts",
    declaration
      .replace("export interface Rectangle", "interface Rectangle")
      .replace("export interface Point", "interface Point")
      .replace("export interface XYWH", "interface XYWH")
      .replaceAll("export declare function ", "declare function ")
      .replace("export declare const Rectangles", "declare const Rectangles")
      .replace("export default Rectangles;", "export = Rectangles;"),
  ),
]);

await rm(".types", { recursive: true, force: true });
