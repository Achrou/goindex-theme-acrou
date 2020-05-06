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
          if (process.env.NODE_ENV === "production") {
            filename = (process.env.VUE_APP_PUBLIC_PATH || "/") + filename;
          } else {
            filename = "/" + filename;
          }
          // filename = "/" + filename;

          if (filename.match(".*\\.js$")) {
            jsarr.push(filename);
          }
          if (filename.match(".*\\.css$")) {
            cssarr.push(filename);
          }
        }
        cssarr = cssarr.sort(function(a) {
          return a.indexOf("app.");
        });
        var cdnjs = ''
        if (process.env.NODE_ENV === "production") {
          cssarr = cdn.css.concat(cssarr);
          cdnjs = `var cdnjs = ${JSON.stringify(cdn.js)};
          cdnjs.forEach((item) => {
            document.write('<script src="' + item + '"></script>');
          });`
        } else {
          cssarr = cssarr.concat(cdnDependencies
            .filter((e) => e.name === "")
            .map((e) => e.css));
        }
        let content = `
          var styles = ${JSON.stringify(cssarr)};
          var scripts = ${JSON.stringify(jsarr)};
          ${cdnjs}
          document.write('<div id="app"></div>');
          var title = document.getElementsByTagName('title')
          styles.forEach((item) => {
              let link = document.createElement('link');
              link.href=item;
              link.rel = 'preload';
              link.as = 'style';
              title[0].parentNode.insertBefore(link,title[0])
              link = document.createElement('link');
              link.href=item;
              link.rel = 'stylesheet';
              title[0].parentNode.insertBefore(link,title[0])
          });
          scripts.forEach((item) => {
            document.write('<script src="' + item + '"></script>');
          });
        `;
        // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
        compilation.assets["app.js"] = {
          source: function() {
            return content;
          },
          size: function() {
            return cssarr.length + jsarr.length;
          },
        };

        callback();
      }
    );
  }
}

module.exports = BuildAppJSPlugin;
