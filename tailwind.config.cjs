/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{html,js}', './src/**/*.{html,js,tsx}'],
    darkMode: 'class',
    theme: {
        colors: {
            primary: colors.indigo
        },
        extend: {
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif']
            }
        }
    },
    plugins: []
};
