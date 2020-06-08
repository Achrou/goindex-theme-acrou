<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <a class="navbar-item" :href="currgd.id">
          <h3 class="title is-3 has-text-white">{{ siteName }}</h3>
        </a>
        <a
          role="button"
          :class="'navbar-burger burger ' + (isActive ? 'is-active' : '')"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="burgerClick"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        :class="'navbar-menu ' + (isActive ? 'is-active' : '')"
      >
        <div class="navbar-start">
          <div
            class="navbar-item has-dropdown is-hoverable"
            v-if="gds.length > 0 && getCurrGD.length > 0"
          >
            <a class="navbar-link">{{ this.currgd.name }}</a>
            <div class="navbar-dropdown is-boxed">
              <a
                class="navbar-item"
                @click="changeItem(item)"
                v-for="(item, index) in getCurrGD"
                v-bind:key="index"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <!-- is-hidden-desktop -->
          <div class="navbar-item" v-show="showSearch">
            <Search />
          </div>
          <header-locales />
          <a
            class="navbar-item"
            target="_blank"
            rel="noopener"
            title="View on github"
            href="https://github.com/Aicirou/goindex-theme-acrou"
          >
            <i class="fab fa-github"></i>
          </a>
          <header-setting />
          <a
            class="navbar-item is-hidden-desktop"
            @click.stop="$refs.viewMode.toggleMode"
          >
            <view-mode ref="viewMode" />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import headerLocales from "@/layout/header-aside/components/header-locales";
import headerSetting from "@/layout/header-aside/components/header-setting";
import ViewMode from "@/layout/viewmode";
import Search from "./Search";
export default {
  components: {
    headerLocales,
    headerSetting,
    ViewMode,
    Search,
  },
  created() {
    this.siteName = document.getElementsByTagName("title")[0].innerText;
    if (window.gds && window.gds.length > 0) {
      this.gds = window.gds.map((item, index) => {
        return {
          name: item,
          id: "/" + index + ":/",
        };
      });
      this.chooseGD();
    }
  },
  data: function() {
    return {
      siteName: "",
      currgd: {},
      gds: [],
      isActive: false,
    };
  },
  methods: {
    chooseGD() {
      let index = this.$route.params.id;
      if (this.gds && this.gds.length >= index) {
        this.currgd = this.gds[index];
      }
    },
    changeItem(item) {
      this.currgd = item;
      this.$router.push({
        path: item.id,
      });
    },
    burgerClick() {
      this.isActive = !this.isActive;
    },
  },
  computed: {
    getCurrGD() {
      return this.gds.filter((item) => item.name !== this.currgd.name);
    },
    showSearch() {
      // 文件夹不支持搜索
      return window.MODEL ? window.MODEL.root_type < 2 : true;
    },
  },
  watch: {
    "$route.params.id": "chooseGD",
  },
};
</script>
