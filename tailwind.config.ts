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
        "table th, table td": {
          padding: "8px",
        },
        ".icon": {
          width: "20px",
          height: "20px"
        },
        ".icon path, .icon circle": {
          stroke: "rgb(0,0,0)"
        }
      })
    }
  ],
} satisfies Config

