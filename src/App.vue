<template>
  <div id="app">
    <Layout ref="layout" />
  </div>
</template>

<script>
import Layout from "./views/Layout";

export default {
  name: "App",
  components: {
    Layout
  },
  data: function() {
    return {
      config: {
        siteName: "",
        title: "",
        path: ""
      }
    };
  },
  mounted() {
    let scripts = ["https://at.alicdn.com/t/font_1760192_zf96psu0uo.js"];
    scripts.map(item => {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src = item;
      document.getElementsByTagName("head")[0].appendChild(script);
    });

    let path = window.location.pathname;
    this.config.path = path;
    this.config.siteName = document.getElementsByTagName("title")[0].innerText;
    this.config.title = this.siteName + "-" + decodeURI(path);
    // this.$refs.layout.render(this.config);
  }
};
</script>