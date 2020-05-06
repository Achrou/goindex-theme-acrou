class BuildAppJSPlugin {
  apply(compiler) {
    // emit 是异步 hook，使用 tapAsync 触及它，还可以使用 tapPromise/tap(同步)
    compiler.hooks.emit.tapAsync("BuildAppJSPlugin", (compilation, callback) => {
      // 在生成文件中，创建一个头部字符串：
      var filelist = "In this build:\n\n";

      // 遍历所有编译过的资源文件，
      // 对于每个文件名称，都添加一行内容。
      for (var filename in compilation.assets) {
        filelist += "- " + filename + "\n";
      }

      // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
      compilation.assets["filelist.md"] = {
        source: function() {
          return filelist;
        },
        size: function() {
          return filelist.length;
        },
      };

      callback();
    });
  }
}

module.exports = BuildAppJSPlugin;
