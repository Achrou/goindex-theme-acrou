<template>
  <div id="app">
    <Layout ref="layout" />
  </div>
</template>

<script>
import util from "@/libs/util";
import Layout from "./views/Layout";

export default {
  name: "App",
  components: {
    Layout,
  },
  data: function() {
    return {
      github: "https://github.com/Aicirou/goindex-theme-acrou",
    };
  },
  watch: {
    "$i18n.locale": "i18nHandle",
  },
  created() {
    this.i18nHandle(this.$i18n.locale);
  },
  mounted() {
    this.checkVersion();
  },
  methods: {
    i18nHandle(val) {
      util.cookies.set("lang", val);
      document.querySelector("html").setAttribute("lang", val);
    },
    checkVersion() {
      let g2index_version = window.gdconfig.version;
      let app_version = process.env.VUE_APP_G2INDEX_VERSION;
      if (!g2index_version || app_version !== g2index_version) {
        this.$notify({
          title: this.$t("notify.title"),
          dangerouslyUseHTMLString: true,
          message: this.$t("checkVersion.tips").replace("${url}", this.github),
          duration: 0,
          type: "success",
        });
      }
    },
  },
};
</script>
