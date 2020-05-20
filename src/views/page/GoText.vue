<template>
  <div class="content g2-content">
    <codemirror v-model="content" :options="cmOptions" />
  </div>
</template>

<script>
import { get_file, decode64 } from "@utils/AcrouUtil";
import { codemirror } from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'
// import language js
import 'codemirror/mode/javascript/javascript.js'
// import theme style
import 'codemirror/theme/base16-dark.css'
export default {
  data: function () {
    return {
      path: "",
      content: "",
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        // theme: 'base16-dark',
        lineNumbers: true,
        line: true
      }
    };
  },
  activated () {
    this.render();
  },
  computed: {
    url () {
      if (this.$route.params.path) {
        return decode64(this.$route.params.path);
      }
      return ''
    }
  },
  components: {
    codemirror
  },
  methods: {
    render () {
      let path = this.url;
      this.content = this.$t("page.text.loading");
      get_file({ path: path, file: {} }, data => {
        this.content = data;
      });
    }
  }
};
</script>
<style lang="scss">
.CodeMirror {
  height: 650px;
}
</style>