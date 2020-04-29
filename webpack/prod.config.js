const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const resolve = dir => path.resolve(__dirname, "..", dir);

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
      '@': resolve('src')
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html", inject: "head" }),
  ],
  mode: "production",
};
