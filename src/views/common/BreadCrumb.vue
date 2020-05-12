<template>
  <nav class="breadcrumb is-hidden-mobile is-hidden-touch" aria-label="breadcrumbs">
    <ul>
      <li>
        <a v-show="navs && navs.length>0" @click="go('/'+index+':/')">{{$t('index')}}</a>
      </li>
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
import { decode64 } from "@utils/AcrouUtil";
export default {
  props: ["name"],
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
    $route: "render"
  },
  methods: {
    go(path) {
      this.$router.push({
        path: path
      });
    },
    render() {
      this.index = this.$route.params.id;
      let cmd = this.$route.params.cmd
      // 如果是搜索不进行渲染
      if (cmd === 'search') {
        this.navs = [];
        return;
      }
      let path = this.$route.path
      if(cmd){
        path = decode64(this.$route.params.path)
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
          // if (p.match("/[0-9]+:/")[0] === p) {
          //   n = this.$t('index');
          // }
          if (n.match("[0-9]+:")) {
            continue;
          }
          navs.push({
            path: p,
            title: n
          });
        }
        this.navs = navs;
      }
    }
  }
};
</script>