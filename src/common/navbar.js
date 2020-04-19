import Vue from "vue";

let navbar = Vue.component("navbar", {
  created() {
    if (window.gds) {
      this.gds = window.gds.map((item, index) => {
        return {
          name: item,
          id: ":" + index + "/",
        };
      });
    }
  },
  data: function () {
    return {
      siteName: "",
      param: "",
      currgd: {
        name: "个人盘",
        id: ":0/",
      },
      gds: [],
    };
  },
  methods: {
    changeItem(item) {
      this.currgd = item;
    },
    query() {
      if (this.param) {
        location.href = "/?q=" + this.param;
      }
    },
  },
  computed: {
    getCurrGD() {
      return this.gds.filter((item) => item.name !== this.currgd.name);
    },
  },
  template: `
              <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
                  <div class="container">
                      <div class="navbar-brand">
                          <a class="navbar-item" href="/">
                              <h3 class="title is-3 has-text-white">{{siteName}}</h3>
                          </a>
                          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
                              <span aria-hidden="true"></span>
                              <span aria-hidden="true"></span>
                              <span aria-hidden="true"></span>
                          </a>
                      </div>
                      <div class="navbar-menu">
                          <div class="navbar-start">
                            <div class="navbar-item has-dropdown is-hoverable" v-if="gds.length>0">
                                <a class="navbar-link">
                                    {{this.currgd.name}}
                                </a>
                                <div class="navbar-dropdown is-boxed">
                                    <a class="navbar-item" @click="changeItem(item)" v-for="item in getCurrGD">
                                        {{item.name}}
                                    </a>
                                </div>
                            </div>
                          </div>
  
                          <div class="navbar-end">
                              <div class="navbar-item">
                                  <div class="field is-grouped">
                                      <p class="control has-icons-left has-icons-right">
                                          <input class="input is-rounded has-text-grey" @keyup.enter="query" v-model="param" type="text" placeholder="输入搜索关键词">
                                          <span class="icon is-small is-left">
                                              <i class="fas fa-search"></i>
                                          </span>
                                      </p>
                                  </div>
                              </div>
                              <a class="navbar-item" target="_blank" rel="noopener" title="Download on GitHub" href="https://github.com/Aicirou/goindex-theme-acrou">
                                <i class="fab fa-github"></i> 
                              </a>
                          </div>
                      </div>
                  </div>
              </nav>
          `,
});

export default navbar;
