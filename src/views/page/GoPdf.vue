<template>
  <object :data="url" type="application/pdf" name="test.pdf">
    <embed :src="url" type="application/pdf" />
  </object>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  mounted() {},
  watch: {
    $route: "render"
  },
  methods: {
    render() {
      let path = window.location.pathname;
    }
  }
};
</script>