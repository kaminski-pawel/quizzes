const path = require("path");

module.exports = {
  entry: {
    ui: "./components/ui.js",
  },
  output: {
    filename: "_[name].bundle.js",
    path: path.resolve(__dirname, "../static/js"),
  },
};
