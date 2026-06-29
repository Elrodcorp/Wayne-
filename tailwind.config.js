/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wayne: {
          bg: "#050510",
          panel: "#0b1020",
          violet: "#8b5cf6",
          blue: "#38bdf8",
          green: "#22c55e",
          amber: "#fbbf24"
        }
      },
      boxShadow: {
        glow: "0 0 40px rgba(139, 92, 246, 0.35)"
      }
    }
  },
  plugins: []
};
