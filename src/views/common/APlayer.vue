<template>
  <div id="aplayer" v-show="show"></div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.load();
    Promise.all([
      import("aplayer/dist/APlayer.min.css"),
      import("aplayer"),
    ]).then((values) => {
      var APlayer = values[1].default;
      this.set(new APlayer(this.options));
    });
  },
  computed: {
    ...mapState("acrou/aplayer", ["player", "audios", "openedAudios"]),
    container() {
      return document.getElementById("aplayer");
    },
    options() {
      var options = window.themeOptions.audio;
      return {
        autoplay: false,
        loop: "all",
        order: "list",
        preload: "auto",
        ...options,
        container: this.container,
        fixed: true,
        audio: this.audios || [],
      };
    },
    show() {
      return (this.audios && this.audios.length > 0) || (this.openedAudios && this.openedAudios.length > 0);
    },
  },
  methods: {
    ...mapActions("acrou/aplayer", ["load", "set"]),
  },
};
</script>
