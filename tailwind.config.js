import daisyui from "daisyui";

/** @type {import("tailwindcss").Config & { daisyui: import("daisyui").Config }} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {
        themes: ["light", "dark", "valentine"],
    },
};
