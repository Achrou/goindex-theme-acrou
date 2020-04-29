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
    filename: "[name].js",
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
    new webpack.DefinePlugin({
      "process.env": {
        GOINEX_APP_API: JSON.stringify(process.env.GOINEX_APP_API),
      },
    }),
  ],
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 4000,
    compress: true,
    open: true,
    proxy: {
      "/api": {
        target: "https://ossdev.achirou.workers.dev/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/**": {
        target: "http://127.0.0.1:4000/",
        pathRewrite: function (path, req) {
          if (path.indexOf("/app.js") > 0) {
            return "/app.js";
          }
          return "";
        },
      },
    },
  },
};
