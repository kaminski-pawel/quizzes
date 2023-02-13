const path = require("path");

module.exports = {
  entry: {
    next: "./views/next.js",
    ui: "./components/ui.js",
  },
  output: {
    filename: "_[name].bundle.js",
    path: path.resolve(__dirname, "../static/js"),
  },
};
