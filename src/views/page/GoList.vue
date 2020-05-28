<template>
  <div>
    <headmd :option="headmd" v-if="renderHeadMD && headmd.display"></headmd>
    <div class="golist">
      <list-view
        :data="files"
        v-if="mode === 'list'"
        :icons="getIcon"
        :action="action"
        :copy="copy"
      />
      <grid-view
        class="g2-content"
        :data="files"
        v-if="mode !== 'list'"
        :getIcon="getIcon"
        :action="action"
        :thum="thum"
      />
      <infinite-loading
        :identifier="infiniteId"
        @infinite="infiniteHandler"
      ></infinite-loading>
      <div
        v-show="files.length === 0"
        class="has-text-centered no-content"
      ></div>
      <center>
        <!-- <span v-if="page.page_token === null && files.length !== 0" class="tag">
          {{ $t("list.total") }} {{ files.length }} {{ $t("list.item") }}
        </span>-->
      </center>
    </div>
    <div
      class="is-divider"
      :data-content="
        $t('list.total') + ' ' + files.length + ' ' + $t('list.item')
      "
    ></div>
    <readmemd
      :option="readmemd"
      v-if="renderReadMeMD && readmemd.display"
    ></readmemd>

    <viewer
      v-if="viewer && images && images.length > 0"
      :images="images"
      class="is-hidden"
      ref="viewer"
      :options="{ toolbar: true, url: 'data-source' }"
      @inited="inited"
    >
      <img
        v-for="image in images"
        :src="thum(image.thumbnailLink)"
        :data-source="image.path"
        :key="image.path"
        :alt="image.name"
        class="image"
      />
    </viewer>
  </div>
</template>

<script>
import {
  formatDate,
  formatFileSize,
  checkoutPath,
  checkView,
  checkExtends,
} from "@utils/AcrouUtil";
import axios from "@/utils/axios";
import { mapState } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import ListView from "./components/list";
import GridView from "./components/grid";
import Markdown from "../common/Markdown";
export default {
  name: "GoList",
  components: {
    InfiniteLoading,
    ListView,
    GridView,
    Headmd: Markdown,
    Readmemd: Markdown,
  },
  data: function() {
    return {
      infiniteId: +new Date(),
      page: {
        page_token: null,
        page_index: 0,
      },
      files: [],
      viewer: false,
      icon: {
        "application/vnd.google-apps.folder": "icon-morenwenjianjia",
        "video/mp4": "icon-mp",
        "video/x-matroska": "icon-mkv",
        "video/x-msvideo": "icon-avi",
        "video/webm": "icon-webm",
        "text/plain": "icon-txt",
        "text/markdown": "icon-markdown",
        "text/x-ssa": "icon-ASS",
        "text/html": "icon-html",
        "text/x-python-script": "icon-python",
        "text/x-java": "icon-java1",
        "text/x-sh": "icon-SH",
        "application/x-subrip": "icon-srt",
        "application/zip": "icon-zip",
        "application/rar": "icon-rar",
        "application/pdf": "icon-pdf",
        "application/json": "icon-JSON1",
        "application/x-yaml": "icon-YML",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          "icon-word",
        "image/bmp": "icon-img",
        "image/jpeg": "icon-img",
        "image/png": "icon-img",
      },
      headmd: { display: false, file: {}, path: "" },
      readmemd: { display: false, file: {}, path: "" },
    };
  },
  computed: {
    ...mapState("acrou/view", ["mode"]),
    images() {
      return this.buildFiles.filter(
        (file) => file.mimeType.indexOf("image") != -1
      );
    },
    renderHeadMD() {
      return window.themeOptions.render.head_md || false;
    },
    renderReadMeMD() {
      return window.themeOptions.render.readme_md || false;
    },
  },
  methods: {
    infiniteHandler($state) {
      // TODO 异步请求的原因，导致数据响应在下个页面。需要终止上次请求
      this.page.page_index++;
      console.log("滚动加载了", this.page.page_index, this.$route.path);
      this.render($state);
    },
    render($state) {
      this.headmd = { display: false, file: {}, path: "" };
      this.readmemd = { display: false, file: {}, path: "" };
      var path = this.$route.path;
      var password = localStorage.getItem("password" + path);
      let q = this.$route.query.q;
      var p = {
        q: q ? decodeURIComponent(q) : "",
        password: password || null,
        ...this.page,
      };
      this.axios
        .post(path, p)
        .then((res) => {
          var body = res.data;
          if (body) {
            // 判断响应状态
            if (body.error && body.error.code == "401") {
              this.checkPassword(path);
              return;
            }
            var data = body.data;
            if (!data) return;
            this.page = {
              page_token: body.nextPageToken,
              page_index: body.curPageIndex,
            };
            if (scroll) {
              this.files = this.buildFiles(this.files.concat(data.files));
            } else {
              this.files = this.buildFiles(data.files);
            }
            if (data.files) {
              this.renderMd(data.files, path);
            }
          }
          if (body.nextPageToken) {
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch((e) => {
          $state.loaded();
          console.log(e);
        });
    },
    buildFiles(files) {
      var path = this.$route.path;
      return !files
        ? []
        : files
            .map((item) => {
              var p = path + checkoutPath(item.name, item);
              let isFolder =
                item.mimeType === "application/vnd.google-apps.folder";
              let size = isFolder ? "-" : formatFileSize(item.size);
              return {
                path: p,
                ...item,
                modifiedTime: formatDate(item.modifiedTime),
                size: size,
                isFolder: isFolder,
              };
            })
            .sort((a, b) => {
              if (a.isFolder && b.isFolder) {
                return 0;
              }
              return a.isFolder ? -1 : 1;
            });
    },
    checkPassword(path) {
      var pass = prompt(this.$t("list.auth"), "");
      localStorage.setItem("password" + path, pass);
      if (pass != null && pass != "") {
        this.render(path);
      } else {
        this.$router.go(-1);
      }
    },
    copy(path) {
      let origin = window.location.origin;
      console.log(path);
      path = origin + encodeURI(path);
      this.$copyText(path)
        .then(() => {
          this.$notify({
            title: this.$t("notify.title"),
            message: this.$t("copy.success"),
            type: "success",
          });
        })
        .catch(() => {
          this.$notify.error({
            title: this.$t("notify.title"),
            message: this.$t("copy.error"),
          });
        });
    },
    thum(url) {
      return url ? `/${this.$route.params.id}:view?url=${url}` : "";
    },
    inited(viewer) {
      this.$viewer = viewer;
    },
    action(file, target) {
      if (file.mimeType.indexOf("image") != -1) {
        this.viewer = true;
        this.$nextTick(() => {
          let index = this.images.findIndex((item) => item.path === file.path);
          this.$viewer.view(index);
        });
        return;
      }
      let cmd = this.$route.params.cmd;
      if (cmd && cmd === "search") {
        this.goSearchResult(file, target);
        return;
      }
      this.target(file, target);
    },
    target(file, target) {
      let path = file.path;
      if (target === "_blank") {
        window.open(path);
        return;
      }
      if (target === "copy") {
        this.copy(path);
        return;
      }
      if (target === "down" || (!checkExtends(path) && !file.isFolder)) {
        location.href = path.replace(/^\/(\d+:)\//, "/$1down/");
        return;
      }
      if (target === "view") {
        this.$router.push({
          path: checkView(path),
        });
        return;
      }
      if (file.mimeType === "application/vnd.google-apps.folder") {
        this.$router.push({
          path: path,
        });
        return;
      }
    },
    renderMd(files, path) {
      var cmd = this.$route.params.cmd;
      if (cmd) {
        return;
      }
      files.forEach((item) => {
        // HEAD.md
        if (item.name === "HEAD.md") {
          this.headmd = {
            display: true,
            file: item,
            path: path + item.name,
          };
        }
        // REDEME.md
        if (item.name === "README.md") {
          this.readmemd = {
            display: true,
            file: item,
            path: path + item.name,
          };
        }
      });
    },
    goSearchResult(file, target) {
      this.loading = true;
      let id = this.$route.params.id;
      axios
        .post(`/${id}:id2path`, { id: file.id })
        .then((res) => {
          this.loading = false;
          let data = res.data;
          if (data) {
            file.path = `/${id}:${data}`;
            this.target(file, target);
          }
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
    getIcon(type) {
      return "#" + (this.icon[type] ? this.icon[type] : "icon-weizhi");
    },
  },
};
</script>
