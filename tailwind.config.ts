import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        "primary-foreground": "#ffffff",

        secondary: "#facc15",
        "secondary-foreground": "#000000",

        destructive: "#ef4444",
        "destructive-foreground": "#ffffff",

        accent: "#d946ef",
        "accent-foreground": "#ffffff",

        muted: "#f5f5f5",
        "muted-foreground": "#6b7280",

        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#2563eb",
        background: "#ffffff",
        foreground: "#000000",
      },
      borderRadius: {
        md: "6px",
        lg: "8px",
        full: "9999px",
      },
    },
  },
  plugins: [],
}

export default config