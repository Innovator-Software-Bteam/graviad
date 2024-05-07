const grvdTheme = {
    "colors": {
        "black": "#000000",
        "white": "#ffffff",
        "grvd-theme": {
            "white": "#ffffff",
            "black": "#000000",
            "sys": {
                "dark": {
                    "primary": "#f2f2f2",
                    "on-primary": "#151515",
                    "secondary": "#1a1a1a",
                    "on-primary-variant": "#9A9A9A",
                    "on-secondary": "#ffffff",
                    "tertiary": "#33aaff",
                    "on-tertiary": "#006382",
                    "error": "#cc0000",
                    "on-error": "#610505",
                    "outline": "#262626",
                    "background": "#0d0d0d",
                    "on-background": "#ffffff",
                    "surface": "#151515",
                    "on-surface": "#ffffff",
                    "surface-container-lowest": "#060606",
                    "surface-container-lower": "#080808",
                    "surface-container-low": "#0d0d0d",
                    "surface-container": "#1f1f1f",
                    "surface-container-high": "#252525",
                    "surface-container-higher": "#2f2f2f",
                    "surface-container-highest": "#444444",
                    "on-secondary-variant": "#8F8F8F"
                }
            },
            "ref": {
                "primary": {
                    "50": "#f8f8f8",
                    "100": "#f2f2f2",
                    "200": "#dcdcdc",
                    "300": "#bdbdbd",
                    "400": "#989898",
                    "500": "#7c7c7c",
                    "600": "#656565",
                    "700": "#525252",
                    "800": "#464646",
                    "900": "#3d3d3d",
                    "950": "#292929"
                },
                "secondary": {
                    "50": "#f6f6f6",
                    "100": "#e7e7e7",
                    "200": "#d1d1d1",
                    "300": "#b0b0b0",
                    "400": "#888888",
                    "500": "#6d6d6d",
                    "600": "#5d5d5d",
                    "700": "#4f4f4f",
                    "800": "#454545",
                    "900": "#3d3d3d",
                    "950": "#1a1a1a"
                },
                "neutral": {
                    "neutral-50": "#fbfbfb",
                    "neutral-100": "#f0f0f0",
                    "neutral-200": "#dedede",
                    "neutral-300": "#a6a6a6",
                    "neutral-400": "#4d4d4d",
                    "neutral-500": "#333333",
                    "neutral-600": "#262626",
                    "neutral-700": "#141414",
                    "neutral-800": "#090909",
                    "neutral-900": "#020202",
                    "neutral-950": "#000000"
                },
                "tertiary": {
                    "50": "#eff7ff",
                    "100": "#dfeeff",
                    "200": "#b8dfff",
                    "300": "#78c6ff",
                    "400": "#33aaff",
                    "500": "#068ef1",
                    "600": "#006fce",
                    "700": "#0059a7",
                    "800": "#024b8a",
                    "900": "#083f72",
                    "950": "#06274b"
                }
            },
            "extended": {
                "sys": {
                    "dark": {
                        "color-button": "#34b530",
                        "on-color-button": "#175115"
                    }
                }
            },
            "state-layers": {
                "primary": {
                    "opacity-0.1": "#8c8c8c",
                    "opacity-0.05": "#ff4000",
                    "opacity-0.15": "#ff4000"
                },
                "secondary": {
                    "opacity-0.1": "#d9d9d9",
                    "opacity-0.05": "#ffffff",
                    "opacity-0.15": "#ffffff"
                },
                "tertiary": {
                    "opacity-0.05": "#d400ff",
                    "opacity-0.1": "#d400ff",
                    "opacity-0.15": "#d400ff"
                }
            }
        }
    }
    ,
    fontSize:
        {
            xs: ['0.75rem', {lineHeight: '1rem'}],
            sm: ['0.875rem', {lineHeight: '1.2rem'}],
            base: ['1rem', {lineHeight: '1.5rem'}],
            lg: ['1.125rem', {lineHeight: '1.75rem'}],
            xl: ['1.25rem', {lineHeight: '1.75rem'}],
            '2xl': ['1.5rem', {lineHeight: '2rem'}],
            '3xl': ['1.875rem', {lineHeight: '2.25rem'}],
            '4xl': ['2.25rem', {lineHeight: '2.5rem'}],
            '5xl': ['3rem', {lineHeight: '1'}],

        },
    fontFamily: {inter: 'Inter', sans: 'sans-serif'},
    boxShadow:
        {
            'grvd-theme/shadow/shadow-medium': '2px 2px 4px 0px rgba(0,0,0,0.25)',
            'grvd-theme/shadow/shadow-large': '2px 2px 8px 0px rgba(0,0,0,0.3)',
            'grvd-theme/shadow/shadow-small': '2px 2px 2px 0px rgba(0,0,0,0.1)'
        },
    borderRadius:
        {
            none: '0',
            sm: '0.375rem',
            md: '0.563rem',
            lg: '0.875rem',
            full: '9999px'
        }
};
export default grvdTheme;
