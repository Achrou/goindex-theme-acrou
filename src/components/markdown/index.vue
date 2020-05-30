<template>
  <div class="component-markdown">
    <div class="spin-group" v-if="!markedHTML">
      <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
    <div class="markdown-body content" v-html="markedHTML"></div>
  </div>
</template>

<script>
import marked from "marked";
import bandupan from "./plugin/baidupan";
import { ComponentsMarkdownBase } from "@api/components.markdown";
export default {
  name: "markdown",
  props: {
    url: {
      type: String,
      required: false,
      default: "",
    },
    source: {
      type: String,
      required: false,
      default: "",
    },
    highlight: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 百度网盘分享链接特殊样式
    baidupan: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      getReadmePublicPath: "",
      markedHTML: "",
    };
  },
  mounted() {
    if (this.url) {
      this.initWithUrl();
    } else if (this.source) {
      this.initWithMd();
    } else {
      console.log("not mounted init");
    }
  },
  methods: {
    // 使用 md 初始化
    initWithMd() {
      this.markedHTML = this.marked(this.source);
    },
    // 使用 url 初始化
    async initWithUrl() {
      this.markedHTML = await this.getReadme(this.url);
    },
    // 从 url 加载原始数据
    async getReadme(url) {
      const data = await ComponentsMarkdownBase(url);
      console.log(data);
      return this.marked(data.data);
    },
    marked(data) {
      const renderer = new marked.Renderer();
      renderer.blockquote = (quote) => {
        // 百度网盘
        return (
          (this.baidupan && bandupan(quote, this.$baseUrl)) ||
          `<blockquote>${quote}</blockquote>`
        );
      };
      return marked(data, {
        renderer,
      });
    },
  },
};
</script>

<style lang="scss">
.component-markdown {
  .spin-group {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
// 百度云
$baidupanHeight: 30px;
$baidupanPadding: 10px;
.baidupan {
  overflow: hidden;
  margin-bottom: 16px;
  .container {
    height: $baidupanHeight + 2 * $baidupanPadding;
    border-radius: 4px;
    border: 1px solid #dfe2e5;
    padding: $baidupanPadding;
    float: left;
    cursor: pointer;
    &:hover {
      border: 1px solid purple;
      .line {
        background-color: purple;
      }
    }
    .icon {
      float: left;
      height: $baidupanHeight;
      text-align: center;
      width: 40px;
      margin-right: $baidupanPadding;
      img {
        width: 40px;
      }
    }
    .url {
      float: left;
      height: $baidupanHeight;
      line-height: $baidupanHeight;
      color: purple;
    }
    .line {
      float: left;
      height: $baidupanHeight + 2 * $baidupanPadding;
      width: 1px;
      margin: -$baidupanPadding $baidupanPadding;
      background-color: #dfe2e5;
    }
    .pwd {
      float: left;
      height: $baidupanHeight;
      line-height: $baidupanHeight;
    }
  }
}
</style>
