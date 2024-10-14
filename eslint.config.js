import js from "@eslint/js";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs["flat/recommended"],
    ...svelte.configs["flat/prettier"],
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ["**/*.svelte"],
        languageOptions: {
            parserOptions: {
                parser: ts.parser,
            },
        },
    },
    {
        ignores: ["build/", ".svelte-kit/", "dist/"],
    },
    eslintPluginPrettier,
    {
        rules: {
            "prettier/prettier": [
                "error",
                {
                    plugins: ["prettier-plugin-svelte"],
                    pluginSearchDirs: ["."],
                    overrides: [
                        {
                            files: "*.svelte",
                            options: { parser: "svelte" },
                        },
                    ],
                    endOfLine: "lf",
                    tabWidth: 4,
                },
            ],
        },
    },
];
