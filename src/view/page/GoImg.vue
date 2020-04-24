<template>
  <div class="content">
    <figure class="image">
      <img :src="imgurl" />
    </figure>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      imgurl: "",
    };
  },
  methods: {
    render (path) {
      this.imgurl = path;
    },
  }
}
</script>