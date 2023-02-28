const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          600: "#222",
          200: "#e5e7eb",
          100: "#f5f6f7",
        },
        blue: {
          600: "#2363eb",
        },
        yellow: {
          600: "#f9d13e",
        },
      },
      fontFamily: {
        poppins: ['Poppins, sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
      },
      screens: {
        lg: '1125px',
        xl: '1125px',
        '2xl': '1125px',
      },
    },
  },
  plugins: [],
};

module.exports = tailwindConfig;
