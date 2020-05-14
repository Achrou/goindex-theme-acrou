<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
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
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control has-icons-left is-dark" style="width:100%;">
                <input
                  class="input is-rounded search-input"
                  @keyup.enter="query"
                  v-model="param"
                  type="search"
                  :placeholder="$t('search.placeholder')"
                  style="background-color: rgb(68, 66, 66);border-color: #272727;"
                />
                <span class="icon is-small is-left" style="padding:0 5px;">
                  <!-- <i class="fas fa-search"></i> -->
                  <img :src="eyes" />
                </span>
              </p>
            </div>
          </div>
          <header-locales />
          <a
            class="navbar-item"
            target="_blank"
            rel="noopener"
            title="Download on GitHub"
            href="https://github.com/Aicirou/goindex-theme-acrou"
          >
            <i class="fab fa-github"></i>
          </a>
          <header-setting />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import headerLocales from "@/layout/header-aside/components/header-locales";
import headerSetting from "@/layout/header-aside/components/header-setting";
export default {
  components: {
    headerLocales,
    headerSetting,
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
    if (window.MODEL) {
      this.param = window.MODEL.q ? window.MODEL.q : "";
    }
  },
  data: function() {
    return {
      siteName: "",
      param: "",
      currgd: {},
      gds: [],
      isActive: false,
      eyes: 'data:image/png;base64,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'
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
    query() {
      if (this.param) {
        this.$router.push({
          path: this.currgd.id.match("/[0-9]+:") + "search?q=" + this.param,
        });
      }
    },
    burgerClick() {
      this.isActive = !this.isActive;
    },
  },
  computed: {
    getCurrGD() {
      return this.gds.filter((item) => item.name !== this.currgd.name);
    },
  },
  watch: {
    "$route.params.id": "chooseGD",
  },
};
</script>
