const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
      },
      colors: {
        "primary-color": "#1E88E5",
        "secondary-color": "#ECF0F4",
        darkMode: "#091729",
        "dark-primary": "#1e2b46",
        "dark-secondary": "#0A1A2D",
        "dark-light": "#102a43",
      },
      boxShadow: {
        "custom-light": "0 8px 24px rgba(149, 157, 165, 0.2)",
        "custom-dark": "0 8px 24px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
});
