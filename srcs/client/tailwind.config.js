/** @type {import('tailwindcss').Config} */
import graviadTheme from "./graviad-theme.js";
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: graviadTheme.colors,
            fontFamily: graviadTheme.fontFamily,
            fontSize: graviadTheme.fontSize,
            boxShadow: graviadTheme.boxShadow,
            borderRadius: graviadTheme.borderRadius,
        },
    },
    plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
    ],
});


