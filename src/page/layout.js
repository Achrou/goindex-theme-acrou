import Vue from "vue";
import navbar from "../common/navbar";
import breadcrumb from "../common/breadcrumb";
import govideo from "./video";
import gohead from "../common/head";
import gomarkdown from "../common/markdown";
import list from "./list";
import gotext from "./text";
import goimg from "./img";
import gofooter from "../common/footer";
import gohtml from "./html";
import gocheck from "../common/check";
import { getQueryString, get_filex } from "../utils/AcrouUtil";

var layout = Vue.component("layout", {
  data: function () {
    return {
      path: "",
      show: "list",
      text: { file: {}, path: "" },
      html: { file: {}, path: "" },
      headmd: { display: false, file: {}, path: "" },
      readmemd: { display: false, file: {}, path: "" },
    };
  },
  components: {
    navbar: navbar,
    breadcrumb: breadcrumb,
    gohead: gohead,
    goheadmd: gomarkdown,
    goreadmemd: gomarkdown,
    list: list,
    govideo: govideo,
    gotext: gotext,
    goimg: goimg,
    gofooter: gofooter,
    gohtml,
    gocheck
  },
  methods: {
    render(config) {
      let path = config.path;
      this.$refs.navbar.siteName = config.siteName;
      this.$refs.breadcrumb.render(path);
      var param = window.location.search;
      if (param.indexOf("?a=view") < 0) {
        this.show = "list";
        this.$refs.list.render(path, getQueryString(param, "q"));
      } else {
        var name = path.split("/").pop();
        var ext = name.split(".").pop().toLowerCase();
        if("|html|htm|".indexOf(`|${ext}|`) >= 0){
          this.show = "html"
          this.html = {
            path: path,
            file: {},
          };
          return
        }
        if (
          "|html|php|css|go|java|js|json|txt|sh|md|".indexOf(`|${ext}|`) >= 0
        ) {
          this.show = "text";
          this.text = {
            path: path,
            file: {},
          };
        }

        if ("|mp4|webm|mkv|".indexOf(`|${ext}|`) >= 0) {
          this.show = "video";
          this.$refs.govideo.render(path);
        }

        if ("|bmp|jpg|jpeg|png|gif|".indexOf(`|${ext}|`) >= 0) {
          this.show = "img";
          this.$refs.goimg.render(path);
        }
      }
    },
    setHeadmd(val) {
      this.headmd = val;
    },
    setReadmemd(val){
      this.readmemd = val;
    }
  },
  template: `
    <div>
      <navbar ref="navbar" v-if="show!=='html'"></navbar>
      <section class="section" v-if="show!=='html'">
        <div class="container">
          <goheadmd :option="headmd" v-show="headmd.display"></goheadmd>
          <breadcrumb ref="breadcrumb"></breadcrumb>
          <list ref="list" v-on:headmd="setHeadmd" v-on:readmemd="setReadmemd" v-show="show=='list'"></list>
          <govideo ref="govideo" v-show="show=='video'"></govideo>
          <hr/>
          <goreadmemd :option="readmemd" v-show="readmemd.display"></goreadmemd>
          <gotext :option="text" v-show="show=='text'"></gotext>
          <goimg ref="goimg" v-show="show=='img'"></goimg>
          <gofooter v-show="show!=='html'"></gofooter>
        </div>
      </section>
      <gohtml :option="html" v-show="show=='html'"></gohtml>
      <gocheck></gocheck>
    </div>
  `,
});

export default layout;
