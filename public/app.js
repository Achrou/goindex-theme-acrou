var styles = [
    'https://cloud.jsonpop.cn/go2index/dist/test/app.069f50e0.css'
]
var scripts = [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
    'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
    'https://cdn.jsdelivr.net/npm/brace@0.11.1/index.min.js',
    'https://cdn.jsdelivr.net/npm/brace@0.11.1/ext/language_tools.js',
    'https://cdn.jsdelivr.net/npm/brace@0.11.1/mode/html.js',
    'https://cdn.jsdelivr.net/npm/brace@0.11.1/mode/javascript.js',
    'https://cdn.jsdelivr.net/npm/brace@0.11.1/mode/less.js',
    'https://cdn.jsdelivr.net/npm/brace@0.11.1/theme/chrome.js',
    'https://cdn.jsdelivr.net/npm/brace@0.11.1/snippets/javascript.js',
    'https://cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js',
    'https://cloud.jsonpop.cn/go2index/dist/test/chunk-vendors.fefb89d7.js',
    'https://cloud.jsonpop.cn/go2index/dist/test/chunk-1de57003.56998a8f.js',
    'https://cloud.jsonpop.cn/go2index/dist/test/app.7e7fe63d.js'
]

styles.forEach(item => {
    document.write(`<link rel="stylesheet" href="${item}">`);
})
scripts.forEach(item => {
    document.write(`<script src="${item}"></script>`);
})