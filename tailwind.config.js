module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        1500: "1500px",
      },
      containerWidth: { maxWidth: "1200px", width: "80vw", margin: "0 auto" },
      height: {
        h25:"25%",
      },
      width: {
        w18:"18%"
      }
    },
    screens: {
      xsm: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
