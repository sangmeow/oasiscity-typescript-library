import { defineConfig } from "tsup";

export default defineConfig({
  //format: ["cjs", "esm"],
  //entryPoints: ["src/index.ts"],
  entry: ["src/**/*", "!src/**/*.test.ts"],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
});