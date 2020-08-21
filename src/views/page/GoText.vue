<template>
  <div class="content g2-content">
    <codemirror
      v-if="!ismd || isEdit || loaded"
      v-show="!ismd || isEdit"
      v-model="content"
      :options="options"
    />
    <markdown
      v-if="ismd"
      v-show="!isEdit"
      :source="content"
    />
    <a
      v-if="ismd"
      class="g2-content-edit is-hidden-mobile"
      @click="edit"
    >
      <i
        :class="'fa' + (isEdit ? ' fa-eye' : ' fa-pencil-square-o')"
        aria-hidden="true"
      ></i>
    </a>
  </div>
</template>

<script>
import { get_file, decode64 } from "@utils/AcrouUtil";
import { codemirror } from "vue-codemirror";

// import base style
import "codemirror/lib/codemirror.css";
// import language js
import "codemirror/mode/javascript/javascript.js";
// import theme style
import "codemirror/theme/base16-dark.css";
export default {
  data: function() {
    return {
      path: "",
      content: "",
      options: {
        tabSize: 4,
        mode: "text/javascript",
        // theme: 'base16-dark',
        lineNumbers: true,
        line: true,
      },
      isEdit: false,
      loaded: false,
    };
  },
  activated() {
    this.render();
  },
  computed: {
    url() {
      if (this.$route.params.path) {
        return decode64(this.$route.params.path);
      }
      return "";
    },
    ismd() {
      return this.url.match(".*\\.(md|MD)$");
    },
  },
  components: {
    codemirror,
  },
  methods: {
    render() {
      let path = this.url;
      this.content =  `<center>
        <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
        <span class="sr-only">Loading...</span>
      </center>`;
      get_file({ path: path, file: {} }, (data) => {
        this.content = data;
      });
    },
    edit() {
      this.loaded = true;
      this.isEdit = !this.isEdit;
    },
  },
};
</script>
<style lang="scss">
.CodeMirror {
  height: 650px;
}
</style>
<style lang="scss" scoped>
.g2-content-edit {
  position: absolute;
  top: 10px;
  right: 0;
}
</style>
