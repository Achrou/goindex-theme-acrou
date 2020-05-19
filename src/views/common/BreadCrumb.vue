<template>
  <div>
    <nav
      class="breadcrumb level g2-breadcrumb is-hidden-mobile is-hidden-touch"
      aria-label="breadcrumbs"
    >
      <div class="level-left">
        <div class="level-item">
          <ul>
            <li>
              <a
                v-show="navs && navs.length > 0"
                @click="go('/' + index + ':/')"
                >{{ $t("index") }}</a
              >
            </li>
            <li
              v-for="(item, index) in navs"
              :class="index + 1 == navs.length ? 'is-active' : ''"
              v-bind:key="index"
            >
              <a v-if="index + 1 == navs.length" aria-current="page" href="#">{{
                item.title
              }}</a>
              <a v-else @click="go(item.path)">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <view-mode />
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import ViewMode from "@/layout/viewmode";
import { decode64 } from "@utils/AcrouUtil";
export default {
  props: ["name"],
  components: {
    ViewMode,
  },
  data: function() {
    return {
      navs: [],
      index: "/",
    };
  },
  mounted() {
    this.render();
  },
  watch: {
    $route: "render",
  },
  methods: {
    go(path) {
      this.$router.push({
        path: path,
      });
    },
    render() {
      this.index = this.$route.params.id;
      let cmd = this.$route.params.cmd;
      // 如果是搜索不进行渲染
      if (cmd === "search") {
        this.navs = [];
        return;
      }
      let path = this.$route.path;
      if (cmd) {
        path = decode64(this.$route.params.path);
      }
      var arr = path.trim("/").split("/");
      var p = "/";
      if (arr.length > 0) {
        var navs = [];
        for (var i in arr) {
          var n = arr[i];
          if (n == "") {
            continue;
          }
          n = decodeURIComponent(n);
          p += arr[i] + "/";
          // if (p.match("/[0-9]+:/")[0] === p) {
          //   n = this.$t('index');
          // }
          if (n.match("[0-9]+:")) {
            continue;
          }
          navs.push({
            path: p,
            title: n,
          });
        }
        this.navs = navs;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.g2-breadcrumb {
  border-bottom: 2px solid #f5f5f5;
  // height: 100%;
  padding: 10px 0.75em;
}
.level-left {
  width: 95%;
  .level-item {
    display: initial;
    width: 100%;
  }
}
.level-right {
  .level-item {
    // border-radius: 50%;
    // height: 40px;
    // width: 40px;
    &:hover {
      // border: 1px dotted transparent;
      // background: rgba(0, 0, 0, 0.12);
      // text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>
