import Vue from "vue";
import { get_file } from "../utils/AcrouUtil";

var gomarkdown = Vue.component("gomarkdown", {
  props: {
    option: {},
  },
  watch: {
    option(val) {
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
    render() {
      if (window.md == undefined) {
        window.md = window.markdownit();
      }
      get_file(this.option, (data) => {
        this.content = md.render(data);
      });
    },
  },
  template: `
    <div class="content" v-html="content">
    </div>
  `,
});

export default gomarkdown;
