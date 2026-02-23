/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#ffe3e0',
          200: '#ffcdc7',
          300: '#ffaaa0',
          400: '#ff7865',
          500: '#ff5233',
          600: '#ed3012',
          700: '#c82309',
          800: '#a5200c',
          900: '#882011',
        },
        accent: {
          50: '#fef7ee',
          100: '#fdecd3',
          200: '#fad4a5',
          300: '#f7b76d',
          400: '#f39133',
          500: '#f0730c',
          600: '#e15707',
          700: '#bb4108',
          800: '#94330e',
          900: '#772c0f',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      },
      boxShadow: {
        'sm-modern': '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        'md-modern': '0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -1px rgb(0 0 0 / 0.04)',
        'lg-modern': '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -2px rgb(0 0 0 / 0.04)',
        'xl-modern': '0 20px 25px -5px rgb(0 0 0 / 0.08), 0 10px 10px -5px rgb(0 0 0 / 0.02)',
      },
    },
  },
  plugins: [],
}
