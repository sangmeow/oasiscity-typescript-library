# OASISCITY TYPESCRIPT LIBRARY

## Build

```bash
yarn run build:npm
```

### Typescript Config

```json
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "module": "commonjs" /* Specify what module code is generated. */,
    "declaration": true /* Generate .d.ts files from TypeScript and JavaScript files in your project. */,
    "declarationMap": true /* Create sourcemaps for d.ts files. */,
    "sourceMap": true /* Create source map files for emitted JavaScript files. */,
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,
    "strict": true /* Enable all strict type-checking options. */,
    "noImplicitAny": false /* Enable error reporting for expressions and declarations with an implied 'any' type. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": [
    "src/**/*.ts"
  ] /* Add the path to your TypeScript file or directory here */,
  "exclude": [".vscode", "node_modules", "**/*.test.ts", "nodeenv-18.20.0"]
}
```

### TSup Config

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*", "!src/**/*.test.ts"],
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
});
```

### Biome

```bash
npm run biome
```

### Jest test

```json
...
"scripts": {
    "test": "jest",
    "build": "tsc -p .",
    "build:npm": "tsup"
  },
...
```

```bash
npm test
npm test isValidDateTime.test.ts
```
