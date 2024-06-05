/** @type {import('tailwindcss').Config} */
import graviadTheme from "./graviad-theme.js";
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
    content: ["./src/**/*.{html,js, ts,tsx}"],
    theme: {
        extend: {
            colors: graviadTheme.colors,
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
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


