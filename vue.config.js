const path = require("path");
const fs = require('fs')
const cdnDependencies = require('./dependencies-cdn')

function resolve(dir) {
  return path.join(__dirname, dir);
}

// 基础路径 注意发布之前要先修改这里
let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'

// 设置不参与构建的库
let externals = {}
cdnDependencies.forEach(item => { externals[item.name] = item.library })

// 引入文件的 cdn 链接
const cdn = {
  css: cdnDependencies.map(e => e.css).filter(e => e),
  js: cdnDependencies.map(e => e.js).filter(e => e)
}
module.exports = {
  publicPath,
  lintOnSave: true,
  configureWebpack: config => {
    const configNew = {}
    if (process.env.NODE_ENV === 'production') {
      configNew.externals = externals
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.done.tap('JSWebpackPluginHooks', compilation => {
            // console.log(compilation.assetsInfo)
            const chunkOnlyConfig = {
              assets: false,
              cached: false,
              children: false,
              chunks: true,
              chunkModules: false,
              chunkOrigins: false,
              errorDetails: false,
              hash: false,
              modules: false,
              reasons: false,
              source: false,
              timings: false,
              version: false
            };
            const allChunks = compilation.toJson(chunkOnlyConfig).chunks;
            // console.log(JSON.stringify(allChunks))
            let chunks = filterChunks(allChunks, 'all', []);
            const assets = htmlWebpackPluginAssets(compilation, chunks);
            function filterChunks (chunks, includedChunks, excludedChunks) {
              return chunks.filter(chunk => {
                const chunkName = chunk.names[0];
                // This chunk doesn't have a name. This script can't handled it.
                if (chunkName === undefined) {
                  return false;
                }
                // Skip if the chunk should be lazy loaded
                if (typeof chunk.isInitial === 'function') {
                  if (!chunk.isInitial()) {
                    return false;
                  }
                } else if (!chunk.initial) {
                  return false;
                }
                // Skip if the chunks should be filtered and the given chunk was not added explicity
                if (Array.isArray(includedChunks) && includedChunks.indexOf(chunkName) === -1) {
                  return false;
                }
                // Skip if the chunks should be filtered and the given chunk was excluded explicity
                if (Array.isArray(excludedChunks) && excludedChunks.indexOf(chunkName) !== -1) {
                  return false;
                }
                // Add otherwise
                return true;
              });
            }
            function htmlWebpackPluginAssets (compilation, chunks) {
              const self = this;
              const compilationHash = compilation.hash;
          
              // Use the configured public path or build a relative path
              let publicPath = typeof compilation.options.output.publicPath !== 'undefined'
                // If a hard coded public path exists use it
                ? compilation.mainTemplate.getPublicPath({hash: compilationHash})
                // If no public path was set get a relative url path
                : path.relative(path.resolve(compilation.options.output.path, path.dirname(self.childCompilationOutputName)), compilation.options.output.path)
                  .split(path.sep).join('/');
          
              if (publicPath.length && publicPath.substr(-1, 1) !== '/') {
                publicPath += '/';
              }
          
              const assets = {
                // The public path
                publicPath: publicPath,
                // Will contain all js & css files by chunk
                chunks: {},
                // Will contain all js files
                js: [],
                // Will contain all css files
                css: [],
                // Will contain the html5 appcache manifest files if it exists
                manifest: Object.keys(compilation.assets).filter(assetFile => path.extname(assetFile) === '.appcache')[0]
              };
          
              // Append a hash for cache busting
              if (this.options.hash) {
                assets.manifest = self.appendHash(assets.manifest, compilationHash);
                assets.favicon = self.appendHash(assets.favicon, compilationHash);
              }
          
              for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                const chunkName = chunk.names[0];
          
                assets.chunks[chunkName] = {};
          
                // Prepend the public path to all chunk files
                let chunkFiles = [].concat(chunk.files).map(chunkFile => publicPath + chunkFile);
          
                // Append a hash for cache busting
                if (this.options.hash) {
                  chunkFiles = chunkFiles.map(chunkFile => self.appendHash(chunkFile, compilationHash));
                }
          
                // Webpack outputs an array for each chunk when using sourcemaps
                // or when one chunk hosts js and css simultaneously
                const js = chunkFiles.find(chunkFile => /.js($|\?)/.test(chunkFile));
                if (js) {
                  assets.chunks[chunkName].size = chunk.size;
                  assets.chunks[chunkName].entry = js;
                  assets.chunks[chunkName].hash = chunk.hash;
                  assets.js.push(js);
                }
          
                // Gather all css files
                const css = chunkFiles.filter(chunkFile => /.css($|\?)/.test(chunkFile));
                assets.chunks[chunkName].css = css;
                assets.css = assets.css.concat(css);
              }
          
              // Duplicate css assets can occur on occasion if more than one chunk
              // requires the same css.
              assets.css = _.uniq(assets.css);
          
              return assets;
            }
            fs.writeFile(path.resolve('dist/app.js'),JSON.stringify(assets),function(err){
              if(err){
                return console.log(err)
              }
              console.log("Success")
            })
          });
        }
      })
    }
    return configNew
  },
  chainWebpack: (config) => {
    /**
     * 添加 CDN 参数到 htmlWebpackPlugin 配置中
     */
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn
      } else {
        args[0].cdn = []
      }
      return args
    })
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@utils", resolve("src/utils"))
      .set("@node_modules", resolve("node_modules"));

    // 分析工具
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
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
};