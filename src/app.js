import Vue from "vue";
import layout from "./page/layout";

var styles = [
  'https://cdn.jsdelivr.net/npm/bulma@0.8.1/css/bulma.min.css',
  'https://cdn.jsdelivr.net/npm/bulma-tooltip@3.0.2/dist/css/bulma-tooltip.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/font-awesome-animation@0.2.1/dist/font-awesome-animation.min.css',
  'https://cdn.jsdelivr.net/npm/font-awesome@latest/css/font-awesome.min.css',
  'https://cdn.jsdelivr.net/npm/bulma-pageloader@0.3.0/dist/css/bulma-pageloader.min.css'
]
styles.forEach(item=>{
  document.write(`<link rel="stylesheet" href="${item}">`);
})

document.write(
  `<style>
    body {
      overflow: hidden;
    }
    
    .section {
      padding: 0.5rem 0.5rem 1.5rem 0.5rem;
    }
    
    .container {
      max-width: 980px !important;
    }
    .iconfont {
      width: 2em;
      height: 2em;
      vertical-align: -0.5em;
      fill: currentColor;
      overflow: hidden;
    }
    
    th,td {
      border: 0 !important;
    }
    
    .breadcrumb:not(:last-child) {
      margin: 0.5rem 0;
      padding: 0 0.75em;
    }
    
    .breadcrumb ul {
      flex-wrap: inherit;
    }
    
    .breadcrumb li:not(:first-child):not(:last-child) {
      margin: 0 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .table {
      width: 100%;
      table-layout: fixed;
    }
    
    .table td {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }

    .table td:hover {
      cursor: pointer;
    }
    
    .no-content {
      background: url(https://s1.hdslb.com/bfs/static/jinkela/search/asserts/no-data.png) no-repeat 50% 50%;
      height: 240px;
      line-height: 240px;
      text-align: center;
      margin-top: 20px;
    }
    
    .modal-background {
      background-color: rgba(0,0,0,.4);
    }
    .check-notification {
      position: fixed;
      top: 4rem;
      z-index: 2008;
      right: 16px;
      border: 1px solid rgb(235, 238, 245);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
      transition: opacity 0.3s ease 0s, transform 0.3s ease 0s, left 0.3s ease 0s, right 0.3s ease 0s, top 0.4s ease 0s, bottom 0.3s ease 0s;
    }
    .video-content{
      width: 100%;
      background: #000;
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
    }
    .video-content iframe{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  </style>`
);

document.write(`
  <script>
      var _hmt = _hmt || [];
      (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?6be1011f95a1bfcdb2179fe2ae6e58fe";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
      })();
  </script>
`);
document.write('<div id="app"></div>');

var app = new Vue({
  el: "#app",
  data: {
    config: {
      siteName: "",
      title: "",
      path: "",
    },
  },
  template: `
        <layout ref="layout"></layout>
    `,
  components: {
    layout: layout,
  },
  methods: {
    init() {
      let path = window.location.pathname;
      this.config.path = path;
      this.config.siteName = document.getElementsByTagName(
        "title"
      )[0].innerText;
      this.config.title = this.siteName + "-" + decodeURI(path);
      this.$refs.layout.render(this.config);
    },
  },
  created() {
    let favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href =
      "https://cdn.jsdelivr.net/gh/Aicirou/goindex-theme-acrou/favicon.ico";
    document.getElementsByTagName("head")[0].appendChild(favicon);

    let scripts = [
      "https://at.alicdn.com/t/font_1760192_zf96psu0uo.js",
      "https://cdn.jsdelivr.net/npm/markdown-it@9.1.0/dist/markdown-it.min.js",
    ];
    scripts.map((item) => {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = item;
      document.getElementsByTagName("head")[0].appendChild(script);
    });
  },
});

app.init();
