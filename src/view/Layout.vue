<template>
  <div>
    <Navbar ref="navbar"></Navbar>
    <section class="section">
      <div class="container">
        <go-headmd :option="headmd" v-show="headmd.display"></go-headmd>
        <bread-crumb ref="breadcrumb"></bread-crumb>
        <go-list
          ref="list"
          v-on:headmd="setHeadmd"
          v-on:readmemd="setReadmemd"
          v-show="show=='list'"
        ></go-list>
        <hr />
        <go-readmemd :option="readmemd" v-show="readmemd.display"></go-readmemd>
        <go-video ref="govideo" v-show="show=='video'"></go-video>
        <go-text :option="text" v-show="show=='text'"></go-text>
        <go-img ref="goimg" v-show="show=='img'"></go-img>
        <Footer></Footer>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from "./common/Navbar"
import BreadCrumb from "./common/BreadCrumb"
import GoVideo from "./page/GoVideo"
import Markdown from "./common/Markdown"
import GoList from "./page/GoList"
import GoText from "./page/GoText"
import GoImg from "./page/GoImg"
import Footer from "./common/Footer"
import { getQueryString } from "@utils/AcrouUtil"
export default {
  data: function () {
    return {
      path: "",
      show: "list",
      text: { file: {}, path: "" },
      headmd: { display: false, file: {}, path: "" },
      readmemd: { display: false, file: {}, path: "" },
    };
  },
  components: {
    Navbar: Navbar,
    BreadCrumb: BreadCrumb,
    GoHeadmd: Markdown,
    GoReadmemd: Markdown,
    GoList: GoList,
    GoVideo: GoVideo,
    GoText: GoText,
    GoImg: GoImg,
    Footer: Footer,
  },
  methods: {
    render (config) {
      let path = config.path;
      this.$refs.navbar.siteName = config.siteName;
      this.$refs.breadcrumb.render(path);
      var param = window.location.search;
      var reg = /\/\d+:$/g;
      if (path.match(reg) || param.indexOf("?a=view") < 0) {
        this.show = "list";
        this.$refs.list.render(path, getQueryString(param, "q"));
      } else {
        var name = path.split("/").pop();
        var ext = name.split(".").pop().toLowerCase();
        if (
          "|html|php|css|go|java|py|js|json|txt|sh|md|".indexOf(`|${ext}|`) >= 0
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
    setHeadmd (val) {
      this.headmd = val;
    },
    setReadmemd (val) {
      this.readmemd = val;
    }
  }
}
</script>
<style lang="scss">
@import "~@/assets/style/theme/register.scss";
</style>
