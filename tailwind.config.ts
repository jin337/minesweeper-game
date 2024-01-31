import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        xs: '450px',
      },
      keyframes: {
        explode: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '30%': { transform: 'scale(1.4)', opacity: '1' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        explode: 'explode 1s ease-out',
        fadeIn: 'fadeIn 1.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config
