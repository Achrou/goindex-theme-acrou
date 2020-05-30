<template>
  <div class="content" v-html="content"></div>
</template>

<script>
import { get_file } from "@utils/AcrouUtil";
import marked from "marked";
export default {
  props: {
    option: {}
  },
  watch: {
    option() {
      this.render();
    }
  },
  mounted() {
    this.render();
  },
  data: function() {
    return {
      content: ''
    };
  },
  computed: {
    defaultContent() {
      return `
        <center>
            <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
            <span class="sr-only">Loading...</span>
        </center>
      `
    }
  },
  methods: {
    render() {
      this.content = this.defaultContent
      get_file(this.option, data => {
        this.content = marked(data);
      });
    }
  }
};
</script>