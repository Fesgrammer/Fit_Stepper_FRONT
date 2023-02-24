//const { defineConfig } = require('@vue/cli-service')

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      title: "Fit Stepperへようこそ",
    },
    fitstepper: {
      entry: "src/home.js",
      template: "public/fitstepper.html",
      filename: "fitstepper.html",
      title: "Fit Stepper",
    },
  },
};
