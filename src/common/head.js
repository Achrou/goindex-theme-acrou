import Vue from "vue";
import { get_file } from "../utils/AcrouUtil";

var gohead = Vue.component("gohead", {
  props: {
    option: {
      path: "",
      file: {},
    },
  },
  watch: {
    option(val) {
      get_file(this.option, (data) => {
        this.content = data
      });
    },
  },
  data: function () {
    return {
      content: "",
    };
  },
  components: {
  },
  methods: {
    render(path) {},
  },
  template: `
    
  `,
});

export default gohead;
