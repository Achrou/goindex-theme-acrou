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
    option () {
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
    editor: import('@/components/ace-editor'),
  },
  methods: {
    editorInit (editor) {
      editor.setFontSize(18)
      editor.session.setUseWrapMode(false);
      import("brace/ext/language_tools"); //language extension prerequsite...
      import("brace/mode/html");
      import("brace/mode/javascript"); //language
      import("brace/mode/less");
      import("brace/theme/chrome");
      import("brace/snippets/javascript"); //snippet
    },
  }
}
</script>