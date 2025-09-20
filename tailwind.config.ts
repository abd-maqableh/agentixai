import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        //Theme Colors
        green: {
          50: "#e8f5e8",
          100: "#d1e7dd",
          200: "#badbcc",
          300: "#a3cfbb",
          400: "#8cc3aa",
          500: "#75b799",
          600: "#5e9c7a",
          700: "#47815b",
          800: "#30663c",
          900: "#2d5016",
          950: "#1a3009",
        },
        gold: {
          50: "#fefcf0",
          100: "#fef7e0",
          200: "#fdefc2",
          300: "#fce7a3",
          400: "#fbdf85",
          500: "#d4af37",
          600: "#b8941f",
          700: "#9c7918",
          800: "#805e11",
          900: "#64430a",
        },

        // Modern neutral colors
        gray: {
          50: "#f8faf9",
          100: "#f0f5f3",
          200: "#e8f2ed",
          300: "#d1e7dd",
          400: "#badbcc",
          500: "#6b8068",
          600: "#2d5016",
          700: "#1a3009",
          800: "#1a2c20",
          900: "#0d1f0f",
        },
        // Success, warning, error colors
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#06b6d4",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.125rem",
      },
      fontFamily: {
        sans: [
          "var(--font-noto-arabic)",
          "var(--font-cairo)",
          "Noto Sans Arabic",
          "Cairo",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        arabic: ["var(--font-noto-arabic)", "Noto Sans Arabic", "sans-serif"],
        cairo: ["var(--font-cairo)", "Cairo", "sans-serif"],
        amiri: ["var(--font-amiri)", "Amiri", "serif"],
      },
      boxShadow: {
        "custom-sm": "var(--shadow-sm)",
        "custom-md": "var(--shadow-md)",
        "custom-lg": "var(--shadow-lg)",
      },
      animation: {
        typing: "typing 1.4s infinite ease-in-out",
        "fade-in": "fadeIn 200ms ease-in-out",
        "slide-in-left": "slideInLeft 200ms ease-out",
        "slide-in-right": "slideInRight 200ms ease-out",
        "gradient-shift": "gradientShift 3s ease infinite",
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        typing: {
          "0%, 80%, 100%": {
            transform: "scale(0.8)",
            opacity: "0.5",
          },
          "40%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInLeft: {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        slideInRight: {
          from: {
            transform: "translateX(100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        gradientShift: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        // Mobile breakpoints
        mobile: { max: "767px" },
        tablet: { min: "768px", max: "1023px" },
        desktop: { min: "1024px" },
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
