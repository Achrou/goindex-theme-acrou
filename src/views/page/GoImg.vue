<template>
  <div class="content">
    <hr/>
    <figure class="image">
      <img :src="imgurl" :class="!display?'is-hidden':''" @load="loading" />
      <center :class="display?'is-hidden':''">
        <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        <span class="sr-only">Loading...</span>
      </center>
    </figure>
    <hr/>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      imgurl: "",
      display: false
    };
  },
  mounted() {
    let path = window.location.pathname;
    // 便于开发环境调试
    path = process.env.NODE_ENV === "development" ? "/api" + path : "";
    this.imgurl = path;
  },
  methods: {
    // render(path) {
    //   this.imgurl = path;
    // },
    loading(event) {
      if (event.target.complete == true) {
        this.display = true;
      }
    }
  }
};
</script>