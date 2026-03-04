import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import onlyWarn from "eslint-plugin-only-warn";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts"
  ]),
  {
    plugins: { "unused-imports": unusedImports, "only-warn": onlyWarn },
    rules: {
      "unused-imports/no-unused-imports": "warn"
    }
  }
]);

export default eslintConfig;
