import "@trivago/prettier-plugin-sort-imports";
import "prettier-plugin-classnames";
import "prettier-plugin-merge";
import "prettier-plugin-tailwindcss";

const prettierConfig = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
    "prettier-plugin-merge"
  ],

  printWidth: 105,
  tabWidth: 2,
  arrowParens: "always",
  singleAttributePerLine: true,
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "none",
  htmlWhitespaceSensitivity: "css",
  proseWrap: "always",
  insertPragma: false,
  requirePragma: false,
  useTabs: false,

  importOrder: ["^@/(.*)$", "^[./]", "<THIRD_PARTY_MODULES>"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  endingPosition: "absolute"
};

export default prettierConfig;
