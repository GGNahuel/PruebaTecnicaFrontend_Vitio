import type { Config } from 'tailwindcss'

export default {
  content: [
    "./src/**/*.{ts,tsx}", 
    "./index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        'table th, table td': {
          padding: '8px',
        },
      })
    }
  ],
} satisfies Config

