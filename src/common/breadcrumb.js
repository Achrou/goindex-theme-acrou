import Vue from 'vue'

let breadcrumb = Vue.component("breadcrumb", {
    data: function () {
      return {
        navs: [],
      };
    },
    template: `
          <nav class="breadcrumb" aria-label="breadcrumbs">
              <ul>
                  <li><a href="#">首页</a></li>
                  <li v-for="(item,index) in navs" :class="(index+1)==navs.length?'is-active':''">
                      <a v-if="(index+1)==navs.length" aria-current="page" href="#">{{item.title}}</a>
                      <a v-else :href="item.path">{{item.title}}</a>
                  </li>
              </ul>
          </nav>
      `,
    methods: {
      render(path) {
        var arr = path.trim("/").split("/");
        var p = "/";
        if (arr.length > 0) {
          var navs = [];
          for (var i in arr) {
            var n = arr[i];
            n = decodeURI(n);
            p += n + "/";
            if (n == "") {
              break;
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
  });

export default breadcrumb