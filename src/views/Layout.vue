<template>
  <div>
    <Head></Head>
    <section class="section">
      <div class="container">
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
import Footer from "./common/Footer";
export default {
  data: function () {
    return {};
  },
  components: {
    Head,
    Footer: Footer,
  },
  methods: {},
};
</script>
