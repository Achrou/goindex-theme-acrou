<template>
  <div>
    <Head></Head>
    <section class="section">
      <div class="container">
        <feb-alive>
          <router-view></router-view>
        </feb-alive>
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
