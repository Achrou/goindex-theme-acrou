<template>
  <nav class="breadcrumb is-hidden-mobile is-hidden-touch" aria-label="breadcrumbs">
    <ul>
      <li v-show="navs.length>0">
        <a href="/">首页</a>
      </li>
      <li
        v-for="(item,index) in navs"
        :class="(index+1)==navs.length?'is-active':''"
        v-bind:key="index"
      >
        <a v-if="(index+1)==navs.length" aria-current="page" href="#">{{item.title}}</a>
        <a v-else :href="item.path">{{item.title}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {
      navs: [],
    };
  },
  methods: {
    render (path) {
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
          navs.push({
            path: p,
            title: n,
          });
        }
        this.navs = navs;
      }
    },
  }
}
</script>