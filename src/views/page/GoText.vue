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
import { get_file, decode64 } from "@utils/AcrouUtil";
export default {
  data: function() {
    return {
      path: "",
      content: ""
    };
  },
  created() {
    this.render();
  },
  computed: {
    url() {
      return decode64(this.$route.params.path);
    }
  },
  components: {
    editor: require("@/components/ace-editor")
  },
  methods: {
    render() {
      let path = this.url;
      this.content = this.$t("page.text.loading");
      get_file({ path: path, file: {} }, data => {
        this.content = data;
      });
    },
    editorInit(editor) {
      editor.setFontSize(18);
      editor.session.setUseWrapMode(false);
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
    }
  }
};
</script>