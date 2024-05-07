/** @type {import('tailwindcss').Config} */
import graviadTheme from "./graviad-theme.js";
import withMT from "@material-tailwind/react/utils/withMT";
import {createTheme} from "@mui/material";

module.exports = createTheme({
    content: ["./src/**/*.{html,js, ts,tsx}"],
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


