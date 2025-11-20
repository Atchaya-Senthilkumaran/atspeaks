/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // Mobile-first breakpoints as specified
        'sm': '480px',   // Large phones (480-768px)
        'md': '768px',   // Tablets (768-1024px)
        'lg': '1024px',  // Laptops (1024-1440px)
        'xl': '1440px',  // Large screens (1440px+)
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
}
