/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                geist: ["Geist", "sans-serif"],
            },
            colors: {
                primary: "#333333",
                offWhite: "#FDFFF8",
                teaGreen: "#D0F0C0",
                soccerGreen: "#74d434",
                darkGreen: "#4c8527",
                google: {
                    "text-gray": "#3c4043",
                    "button-blue": "#1a73e8",
                    "button-blue-hover": "#5195ee",
                    "button-dark": "#202124",
                    "button-dark-hover": "#555658",
                    "button-border-light": "#dadce0",
                    "logo-blue": "#4285f4",
                    "logo-green": "#34a853",
                    "logo-yellow": "#fbbc05",
                    "logo-red": "#ea4335",
                },
            },
        },
    },
    plugins: ["prettier-plugin-tailwindcss"],
};
