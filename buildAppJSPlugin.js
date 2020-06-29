const cdnDependencies = require("./dependencies-cdn");

// 引入文件的 cdn 链接
const cdn = {
  css: cdnDependencies.map((e) => e.css).filter((e) => e),
  js: cdnDependencies.map((e) => e.js).filter((e) => e),
};

class BuildAppJSPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      "BuildAppJSPlugin",
      (compilation, callback) => {
        const isProd = process.env.NODE_ENV === "production"
        let cssarr = [];
        let jsarr = [];
        let reg = "";
        if (isProd) {
          reg = "(app|chunk-vendors)\\.";
        }
        // 遍历所有编译过的资源文件
        for (let filename in compilation.assets) {
          if (filename.match(reg + ".*\\.js$")) {
            if (isProd) {
              filename = (process.env.VUE_APP_CDN_PATH || "/") + filename;
            } else {
              filename = "/" + filename;
            }
            jsarr.push(filename);
          }
          if (filename.match(reg + ".*\\.css$")) {
            cssarr.push(filename);
          }
        }
        cssarr = cssarr.sort(function (a) {
          return a.indexOf("app.");
        });
        var cdnjs = "";
        if (isProd) {
          cssarr = cdn.css.concat(cssarr);
          cdnjs = `var cdnjs = ${JSON.stringify(cdn.js)};
          cdnjs.forEach((item) => {
            document.write('<script src="' + item + '"></script>');
          });`;
        } else {
          cssarr = cssarr.concat(
            cdnDependencies.filter((e) => e.name === "").map((e) => e.css)
          );
        }
        let content = `
          var scripts = ${JSON.stringify(jsarr)};
          ${cdnjs}
          scripts.forEach((item) => {
            document.write('<script src="' + item + '"></script>');
          });
        `;
        let cssContent = "";
        cssarr.forEach((item) => {
          cssContent += `@import url(${item});\n`;
        });
        // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
        compilation.assets["app.js"] = {
          source: function () {
            return content;
          },
          size: function () {
            return jsarr.length;
          },
        };

        compilation.assets["style.css"] = {
          source: function () {
            return cssContent;
          },
          size: function () {
            return cssarr.length;
          },
        };

        callback();
      }
    );
  }
}

module.exports = BuildAppJSPlugin;
