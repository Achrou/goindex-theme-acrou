<template>
  <div>
    <headmd :option="headmd" v-if="headmd.display"></headmd>
    <div
      class="golist"
      v-loading="loading"
      v-infinite-scroll="pageLoad"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <list-view
        :data="buildFiles"
        v-if="mode === 'list'"
        :icons="getIcon"
        :go="go"
        :copy="copy"
      />
      <grid-view
        class="g2-content"
        :data="buildFiles"
        v-if="mode !== 'list'"
        :getIcon="getIcon"
        :go="go"
        :thum="thum"
      />
      <div
        v-show="files.length === 0"
        class="has-text-centered no-content"
      ></div>
      <center>
        <div :class="!busy ? 'is-hidden' : ''">
          <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <span v-if="page.page_token === null && files.length !== 0" class="tag">
          {{ $t("list.total") }} {{ files.length }} {{ $t("list.item") }}
        </span>
      </center>
    </div>
    <hr />
    <readmemd :option="readmemd" v-if="readmemd.display"></readmemd>

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
} from "@utils/AcrouUtil";
import axios from "@/utils/axios";
import { mapState } from "vuex";
import ListView from "./components/list";
import GridView from "./components/grid";
import Markdown from "../common/Markdown";
export default {
  name: "GoList",
  components: {
    ListView,
    GridView,
    Headmd: Markdown,
    Readmemd: Markdown,
  },
  data: function() {
    return {
      busy: false,
      page: {
        page_token: null,
        page_index: 0,
      },
      files: [],
      loading: true,
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
    buildFiles() {
      var path = this.$route.path;
      return this.files
        .map((item) => {
          var p = path + checkoutPath(item.name, item);
          let isFolder = item.mimeType === "application/vnd.google-apps.folder";
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
    images() {
      return this.buildFiles.filter(
        (file) => file.mimeType.indexOf("image") != -1
      );
    },
  },
  created() {
    this.render();
  },
  methods: {
    pageLoad() {
      if (!this.page.page_token) return;
      this.page.page_index++;
      this.render("scroll");
    },
    render(scroll) {
      if (scroll) {
        this.busy = true;
      } else {
        this.loading = true;
      }
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
            try {
              if (scroll) {
                this.files = this.files.concat(data.files);
              } else {
                this.files = data.files;
              }
              this.renderMd(data.files, path);
            } catch (e) {
              console.log(e);
            }
          }
          this.loading = false;
          this.busy = false;
        })
        .catch(() => {
          this.loading = false;
          this.busy = false;
          this.$router.go(-1);
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
    go(file, target) {
      if (file.mimeType.indexOf("image") != -1) {
        this.viewer = true;
        this.$nextTick(() => {
          this.$viewer.show();
        });
        return;
      }
      let path = file.path;
      let cmd = this.$route.params.cmd;
      if (cmd && cmd === "search") {
        this.goSearchResult(file, target);
        return;
      }
      if (target === "_blank") {
        window.open(path);
        return;
      }
      if (target === "down") {
        let temp_path = this.$route.params.path ? this.$route.params.path : "";
        location.href = `/${this.$route.params.id}:down/${temp_path}/${file.name}`;
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
      let cur = window.current_drive_order;
      axios
        .post(`/${cur}:id2path`, { id: file.id })
        .then((res) => {
          this.loading = false;
          let data = res.data;
          if (data) {
            var href = `/${cur}:${data}`;
            href = checkoutPath(href, file);
            if (target === "_blank") {
              window.open(href);
            } else {
              this.$router.push({
                path: checkView(href),
              });
            }
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
