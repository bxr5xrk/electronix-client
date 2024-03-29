/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{html,js}', './src/**/*.{html,js,tsx}'],
    darkMode: 'class',
    theme: {
        colors: {
            primary: colors.indigo,
            normal: colors.slate,
            ...colors
        },
        extend: {
            width: {
                50: '12.5rem'
            },
            height: {
                sidebar: '75vh'
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif']
            }
        }
    },
    plugins: []
};
