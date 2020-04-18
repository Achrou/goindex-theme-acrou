const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "[name].mini.js",
  },
  module: {
    rules: [],
  },
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm.js",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html", inject: "head" }),
  ],
  mode: "production",
};
