import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    files: ["test/**/*.js", "**/*.test.js", "*.config.js", "*.config.mjs", "babel.config.js", "jest.config.js"],
    languageOptions: { globals: { ...globals.jest, ...globals.node } },
  },
];
