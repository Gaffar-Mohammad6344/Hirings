/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure this path matches your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: "#071952",   // The Navy Blue
        secondary: "#0B57D0", // The Bright Blue
      }
    },
  },
  plugins: [],
}