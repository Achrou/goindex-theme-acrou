<template>
  <div class="content" v-html="content"></div>
</template>

<script>
import { get_file } from "@utils/AcrouUtil"
import MarkdownIt from 'markdown-it'
export default {
  props: {
    option: {},
  },
  watch: {
    option () {
      this.render()
    },
  },
  data: function () {
    return {
      content: `
        <center>
            <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
            <span class="sr-only">Loading...</span>
        </center>
      `,
    };
  },
  components: {},
  methods: {
    render () {
      const md = new MarkdownIt()
      // if (window.md == undefined) {
      //   window.md = window.markdownit();
      // }
      get_file(this.option, (data) => {
        this.content = md.render(data);
      });
    },
  }
}
</script>