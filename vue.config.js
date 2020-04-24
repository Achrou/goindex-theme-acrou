const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    css: {
        loaderOptions: {
          // 设置 scss 公用变量文件
          sass: {
            prependData: `@import '~@/assets/style/public.scss';`
          }
        }
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
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@utils', resolve('src/utils'))
            .set('@node_modules', resolve('node_modules'))
    }
};