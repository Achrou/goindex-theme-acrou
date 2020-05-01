<template>
  <nav class="breadcrumb is-hidden-mobile is-hidden-touch" aria-label="breadcrumbs">
    <ul>
      <li
        v-for="(item,index) in navs"
        :class="(index+1)==navs.length?'is-active':''"
        v-bind:key="index"
      >
        <a v-if="(index+1)==navs.length" aria-current="page" href="#">{{item.title}}</a>
        <a v-else @click="go(item.path)">{{item.title}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data: function() {
    return {
      navs: [],
      index: "/"
    };
  },
  mounted() {
    this.render();
  },
  watch: {
    $route(to, from) {
      this.render();
    }
  },
  methods: {
    go(path) {
      this.$router.push({
        path: path
      });
    },
    render() {
      let path = window.location.pathname;
      // 如果是搜索不进行渲染
      if (path.match("/[0-9]+:search")) {
        return;
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
          n = decodeURI(n);
          p += n + "/";
          if (p.match("/[0-9]+:/")[0] === p) {
            n = "首页";
          }
          navs.push({
            path: p,
            title: n
          });
        }
        this.navs = navs;
        if (navs.length == 1 && navs[0].title === "首页") {
          this.navs = [];
        }
      }
    }
  }
};
</script>