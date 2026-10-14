const globals = require("globals");

module.exports = [
  { ignores: ["node_modules/**"] },
  {
    files: ["src/**/*.js", "scripts/**/*.js", "tests/**/*.js"],
    languageOptions: { ecmaVersion: "latest", sourceType: "commonjs", globals: { ...globals.node, ...globals.es2021 } },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
      "no-constant-condition": "error",
      "eqeqeq": ["error", "always"],
      "no-throw-literal": "error"
    }
  }
];
