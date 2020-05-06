<template>
  <div>
    <Head></Head>
    <section class="section">
      <div class="container">
        <bread-crumb ref="breadcrumb"></bread-crumb>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <Footer></Footer>
      </div>
    </section>
  </div>
</template>

<script>
import Head from "./common/Head"
import BreadCrumb from "./common/BreadCrumb";
import Footer from "./common/Footer"
export default {
  data: function () {
    return {
      path: "",
      show: "list",
      text: { file: {}, path: "" },
      headmd: { display: false, file: {}, path: "" },
      readmemd: { display: false, file: {}, path: "" },
    };
  },
  components: {
    Head,
    BreadCrumb,
    Footer: Footer,
  },
  methods: {
    setHeadmd (val) {
      this.headmd = val;
    },
    setReadmemd (val) {
      this.readmemd = val;
    }
  }
}
</script>
