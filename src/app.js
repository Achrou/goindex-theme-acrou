import navbar from './common/navbar'
import breadcrumb from './common/breadcrumb'
import list from './page/list'
import Vue from 'vue'

document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.1/css/bulma.min.css">')
document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">')
document.write('<style>.icon{width:2em;height:2em;vertical-align:-0.5em;fill:currentColor;overflow:hidden;}th,td{border:0 !important;}.breadcrumb:not(:last-child){margin:0.5rem 0;padding:0 0.75em;}.breadcrumb ul{flex-wrap:inherit;}.breadcrumb li:not(:first-child):not(:last-child){margin:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}</style>')
document.write('<div id="app"></div>')

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
                <list ref="list"></list>
            </div>
        </div>
    `,
    components: {
        navbar: navbar,
        breadcrumb: breadcrumb,
        list: list
    },
    methods: {
        init () {
            let path = window.location.pathname;
            path = "/api/"+path;
            // path = "oss.achirou.workers.dev/Movies/";
            this.$refs.navbar.siteName = document.getElementsByTagName('title')[0].innerText
            this.render(path);
        },
        render (path) {
            if (path.indexOf("?") > 0) {
                path = path.substr(0, path.indexOf("?"));
            }
            this.title(path);
            this.$refs.breadcrumb.render(path);
            if (path.substr(-1) == "/") {
                this.$refs.list.render(path);
            } else {
                // this.file(path);
            }
        },
        title (path) {
            path = decodeURI(path);
            this._title = this.siteName + "-" + path;
        },
    },
    created () {
        let favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = "https://cdn.jsdelivr.net/gh/Aicirou/goindex-theme-acrou/favicon.ico"
        document.getElementsByTagName("head")[0].appendChild(favicon);

        let scripts = [
            "https://at.alicdn.com/t/font_1760192_fi1hh3slkj.js",
        ];
        scripts.map((item) => {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = item;
            document.getElementsByTagName("head")[0].appendChild(script);
        });
    },
})

app.init()