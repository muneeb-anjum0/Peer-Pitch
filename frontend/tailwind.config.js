/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f6fbff",
          100: "#e9f5ff",
          200: "#cfeaff",
          300: "#a7d7ff",
          400: "#6bb8ff",
          500: "#2a94ff",
          600: "#1277e6",
          700: "#0d5fc0",
          800: "#0f4f9c",
          900: "#113f7a"
        }
      },
      dropShadow: {
        glow: "0 10px 30px rgba(42,148,255,.25)",
      },
      boxShadow: {
        soft: "0 12px 40px -12px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.6)",
        hard: "0 8px 60px rgba(16,24,40,.1)",
      },
      animation: {
        'slow-spin': 'spin 18s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'shine': 'shine 1.2s linear forwards'
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' }
        }
      }
    },
  },
  plugins: [],
};
