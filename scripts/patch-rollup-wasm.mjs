import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";

const require = createRequire(import.meta.url);

try {
  await import("rollup");
  process.exit(0);
} catch (error) {
  const message = String(error?.cause?.message ?? error?.message ?? "");
  if (!message.includes("rollup") && !message.includes("dlopen")) {
    throw error;
  }
}

const rollupNativePath = require.resolve("rollup/dist/native.js");
require.resolve("@rollup/wasm-node/dist/native.js");

await writeFile(
  rollupNativePath,
  'module.exports = require("@rollup/wasm-node/dist/native.js");\n',
  "utf8"
);

console.warn("Patched Rollup to use @rollup/wasm-node because the native binary could not be loaded.");
