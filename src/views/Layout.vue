<template>
  <div>
    <Head></Head>
    <section class="section">
      <div class="container">
        <bread-crumb ref="breadcrumb"></bread-crumb>
        <!-- <keep-alive> -->
        <feb-alive>
          <router-view></router-view>
        </feb-alive>
        <!-- </keep-alive> -->
        <Footer></Footer>
      </div>
    </section>
  </div>
</template>

<script>
import Head from "./common/Head";
import BreadCrumb from "./common/BreadCrumb";
import Footer from "./common/Footer";
export default {
  data: function () {
    return {};
  },
  components: {
    Head,
    BreadCrumb,
    Footer: Footer,
  },
  methods: {},
};
</script>
