/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{html,js}', './src/**/*.{html,js,tsx}'],
    darkMode: 'class',
    theme: {
        colors: {
            primary: colors.indigo,
            ...colors
        },
        extend: {
            width: {
                50: '12.5rem'
            },
            gridTemplateRows: {
                autoFr: 'auto 1fr'
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif']
            }
        }
    },
    plugins: []
};
