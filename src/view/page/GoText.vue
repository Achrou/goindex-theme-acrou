<template>
  <div class="content">
    <editor
      ref="myEditor"
      v-model="content"
      @init="editorInit"
      lang="html"
      theme="chrome"
      width="100%"
      height="600"
    ></editor>
  </div>
</template>

<script>
import { get_file } from "@utils/AcrouUtil"
export default {
  props: {
    option: {
      path: "",
      file: {},
    },
  },
  watch: {
    option (val) {
      this.content = "加载中...";
      get_file(this.option, (data) => {
        this.content = data;
      });
    },
  },
  data: function () {
    return {
      content: "",
    };
  },
  components: {
    editor: require("vue2-ace-editor"),
  },
  methods: {
    render (path) { },
    editorInit (editor) {
      editor.setFontSize(18)
      editor.session.setUseWrapMode(false);
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
    },
  }
}
</script>