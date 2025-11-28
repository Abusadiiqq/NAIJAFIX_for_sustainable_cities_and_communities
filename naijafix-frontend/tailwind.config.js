// tailwind.config.js
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        golden: colors.amber, // Use amber as golden in v4
      }
    },
  },
}