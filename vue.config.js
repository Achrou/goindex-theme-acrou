const path = require("path");
const cdnDependencies = require("./dependencies-cdn");

function resolve(dir) {
  return path.join(__dirname, dir);
}

// 基础路径 注意发布之前要先修改这里
let publicPath = process.env.VUE_APP_PUBLIC_PATH || "/";

// 设置不参与构建的库
let externals = {};
cdnDependencies.forEach((item) => {
  externals[item.name] = item.library;
});

// 引入文件的 cdn 链接
const cdn = {
  css: cdnDependencies.map((e) => e.css).filter((e) => e),
  js: cdnDependencies.map((e) => e.js).filter((e) => e),
};
module.exports = {
  publicPath,
  lintOnSave: true,

  configureWebpack: (config) => {
    const configNew = {};
    if (process.env.NODE_ENV === "production") {
      configNew.externals = externals;
    }
    return configNew;
  },

  chainWebpack: (config) => {
    /**
     * 添加 CDN 参数到 htmlWebpackPlugin 配置中
     */
    config.plugin("html").tap((args) => {
      if (process.env.NODE_ENV === "production") {
        args[0].cdn = cdn;
      } else {
        args[0].cdn = {
          css: cdnDependencies.filter((e) => e.name==="").map((e) => e.css),
        };
      }
      return args;
    });
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@utils", resolve("src/utils"))
      .set("@node_modules", resolve("node_modules"));

    // 分析工具
    if (process.env.npm_config_report) {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  },

  // 不输出 map 文件
  productionSourceMap: false,

  devServer: {
    publicPath,
    proxy: {
      "/api": {
        target: "https://ossdev.achirou.workers.dev/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: "zh-chs",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true,
    },
  },
};
