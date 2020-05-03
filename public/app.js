var styles = [
  'https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/font-awesome@latest/css/font-awesome.min.css',
  'https://cdn.jsdelivr.net/npm/font-awesome-animation@0.2.1/dist/font-awesome-animation.min.css',
  'https://cloud.jsonpop.cn/go2index/vue/dist/css/app.15d37280.css',
];
var scripts = [
  "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
  "https://cdn.jsdelivr.net/npm/vue-i18n@8.17.3/dist/vue-i18n.min.js",
  "https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js",
  "https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js",
  // 'https://cdn.jsdelivr.net/npm/brace@0.11.1/index.min.js',
  // 'https://cdn.jsdelivr.net/npm/brace@0.11.1/ext/language_tools.js',
  // 'https://cdn.jsdelivr.net/npm/brace@0.11.1/mode/html.js',
  // 'https://cdn.jsdelivr.net/npm/brace@0.11.1/mode/javascript.js',
  // 'https://cdn.jsdelivr.net/npm/brace@0.11.1/mode/less.js',
  // 'https://cdn.jsdelivr.net/npm/brace@0.11.1/theme/chrome.js',
  // 'https://cdn.jsdelivr.net/npm/brace@0.11.1/snippets/javascript.js',
  "https://cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js",
  'https://cloud.jsonpop.cn/go2index/vue/dist/js/chunk-1ed22f12.64aeb3d6.js',
  'https://cloud.jsonpop.cn/go2index/vue/dist/js/chunk-vendors.1a3ef683.js',
  'https://cloud.jsonpop.cn/go2index/vue/dist/js/chunk-4850b756.160c2c8c.js',
  'https://cloud.jsonpop.cn/go2index/vue/dist/js/app.f314926a.js',
  'https://cloud.jsonpop.cn/go2index/vue/dist/js/chunk-56b11c46.cc8e90e1.js',
  'https://cloud.jsonpop.cn/go2index/vue/dist/js/chunk-6a24b24e.b8a4da9e.js',   
  'https://cloud.jsonpop.cn/go2index/vue/dist/js/chunk-2d0aed92.7e4c9d1b.js',
  'https://cloud.jsonpop.cn/go2index/vue/dist/js/chunk-2d2137a3.5bc616b8.js',
];

styles.forEach((item) => {
  document.write(`<link rel="stylesheet" href="${item}">`);
});
scripts.forEach((item) => {
  document.write(`<script src="${item}"></script>`);
});
