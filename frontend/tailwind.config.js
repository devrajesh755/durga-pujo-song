/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        terracotta: "#C1502E",
        "deep-red": "#7A2A2A",
        "warm-orange": "#E08A3E",
        "muted-pink": "#D98A82",
        "dusk-green": "#2F4A3C",
        cream: "#F3E6D0",
        charcoal: "#1B120D"
      },
      fontFamily: {
        bengali: ['"Noto Serif Bengali"', "serif"],
        display: ['"Fraunces"', "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"]
      },
      backdropBlur: {
        xs: "2px"
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.4, transform: "scale(1.4)" }
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        heroIn: {
          "0%": { opacity: 0, transform: "scale(0.98)" },
          "100%": { opacity: 1, transform: "scale(1)" }
        }
      },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "hero-in": "heroIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) both"
      }
    }
  },
  plugins: []
};
