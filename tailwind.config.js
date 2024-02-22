/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        "orange-gradient": "rgb(0,61,163)",
      },
      backgroundImage: (theme) => ({
        "orange-gradient":
          "linear-gradient(66deg, rgba(0,61,163,1) 22%, rgba(21,96,209,1) 80%)",
      }),
    },
  },
  plugins: [],
};
