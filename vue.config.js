const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  //   css: {
  //     loaderOptions: {
  //       sass: {
  //         prependData: `@import '~@/assets/style/public.scss';`,
  //       },
  //     }
  //   },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@utils", resolve("src/utils"))
      .set("@node_modules", resolve("node_modules"));
    config.output
      .filename("js/app.mini.js")
      .end();
  },
  devServer: {
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
};
