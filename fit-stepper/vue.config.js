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
      template: "public/fit_stepper.html",
      filename: "fit_stepper.html",
      title: "Fit Stepper",
    },
  },
};
