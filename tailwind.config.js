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
    },
  },
  plugins: [],
}
