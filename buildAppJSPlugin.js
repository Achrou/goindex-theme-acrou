const cdnDependencies = require("./dependencies-cdn");

// 引入文件的 cdn 链接
const cdn = {
  css: cdnDependencies.map((e) => e.css).filter((e) => e),
  js: cdnDependencies.map((e) => e.js).filter((e) => e),
};

class BuildAppJSPlugin {
  apply(compiler) {
    // emit 是异步 hook，使用 tapAsync 触及它，还可以使用 tapPromise/tap(同步)
    compiler.hooks.emit.tapAsync(
      "BuildAppJSPlugin",
      (compilation, callback) => {
        let cssarr = [];
        let jsarr = [];
        // 遍历所有编译过的资源文件，
        // 对于每个文件名称，都添加一行内容。
        for (let filename in compilation.assets) {
          if (filename.match(".*\\.js$")) {
            if (process.env.NODE_ENV === "production") {
              filename = (process.env.VUE_APP_CDN_PATH || "/") + filename;
            } else {
              filename = "/" + filename;
            }
            jsarr.push(filename);
          }
          if (filename.match(".*\\.css$")) {
            cssarr.push(filename);
          }
        }
        cssarr = cssarr.sort(function (a) {
          return a.indexOf("app.");
        });
        var cdnjs = "";
        if (process.env.NODE_ENV === "production") {
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
