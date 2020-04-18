import navbar from "./common/navbar";
import breadcrumb from "./common/breadcrumb";
import layout from "./page/layout";
import Vue from "vue";

document.write(
  '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.1/css/bulma.min.css">'
);
document.write(
  '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">'
);
document.write(
  `<style>.icon{width:2em;height:2em;vertical-align:-0.5em;fill:currentColor;overflow:hidden;}th,td{border:0 !important;}.breadcrumb:not(:last-child){margin:0.5rem 0;padding:0 0.75em;}.breadcrumb ul{flex-wrap:inherit;}.breadcrumb li:not(:first-child):not(:last-child){margin:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
    .container {
        max-width: 980px !important;
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
`)
document.write('<div id="app"></div>');

var app = new Vue({
  el: "#app",
  data: {
    siteName: "",
    _title: "",
  },
  template: `
        <div>
            <navbar ref="navbar"></navbar>
            <div class="container">
                <breadcrumb ref="breadcrumb"></breadcrumb>
                <layout ref="layout"></layout>
            </div>
        </div>
    `,
  components: {
    navbar: navbar,
    breadcrumb: breadcrumb,
    layout: layout,
  },
  methods: {
    init() {
      let path = window.location.pathname;
      // path = "/api/"+path;
      // path = "oss.achirou.workers.dev/Movies/";
      this.$refs.navbar.siteName = document.getElementsByTagName(
        "title"
      )[0].innerText;
      this.render(path);
    },
    render(path) {
      if (path.indexOf("?") > 0) {
        path = path.substr(0, path.indexOf("?"));
      }
      this.title(path);
      this.$refs.breadcrumb.render(path);
      this.$refs.layout.render(path);
      /* if (path.substr(-1) == "/") {
                this.$refs.layout.path = path
                this.$refs.layout.show = 'list'
                // this.$refs.list.render(path);
            } else {
                // this.file(path);
            } */
    },
    title(path) {
      path = decodeURI(path);
      this._title = this.siteName + "-" + path;
    },
  },
  created() {
    let favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href =
      "https://cdn.jsdelivr.net/gh/Aicirou/goindex-theme-acrou/favicon.ico";
    document.getElementsByTagName("head")[0].appendChild(favicon);

    let scripts = ["https://at.alicdn.com/t/font_1760192_ud2z97y6kba.js"];
    scripts.map((item) => {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = item;
      document.getElementsByTagName("head")[0].appendChild(script);
    });
  },
});

app.init();
