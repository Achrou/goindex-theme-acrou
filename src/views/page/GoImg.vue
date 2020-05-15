<template>
  <div class="content g2-content">
    <figure class="image">
      <img :src="imgurl" :class="!display?'is-hidden':''" @load="loading" />
      <center :class="display?'is-hidden':''">
        <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        <span class="sr-only">Loading...</span>
      </center>
    </figure>
    <hr />
  </div>
</template>

<script>
import { decode64 } from "@utils/AcrouUtil";
export default {
  data: function() {
    return {
      imgurl: "",
      display: false
    };
  },
  computed: {
    url() {
      if (this.$route.params.path) {
        return decode64(this.$route.params.path);
      }
      return ''
    }
  },
  activated() {
    this.render();
  },
  methods: {
    render() {
      let path = this.url;
      // 便于开发环境调试
      // path = process.env.NODE_ENV === "development" ? "/api" + path : "";
      this.imgurl = path;
    },
    loading(event) {
      if (event.target.complete == true) {
        this.display = true;
      }
    }
  }
};
</script>