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
      <table class="table is-hoverable" v-if="mode === 'list'">
        <thead>
          <tr>
            <th
              v-for="(column, index) in columns"
              v-bind:key="index"
              :class="column.class"
              :style="column.style"
            >
              {{ column.name }}
              <span class="caret-wrapper">
                <i class="sort-caret ascending"></i>
                <i class="sort-caret descending"></i>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(file, index) in buildFiles" v-bind:key="index">
            <td
              @click="
                go(
                  file,
                  file.mimeType !== 'application/vnd.google-apps.folder'
                    ? 'view'
                    : ''
                )
              "
            >
              <svg class="iconfont" aria-hidden="true">
                <use :xlink:href="getIcon(file.mimeType)" />
              </svg>
              {{ file.name }}
              <span class="has-text-grey g2-file-desc">{{
                file.description
              }}</span>
            </td>
            <td class="is-hidden-mobile is-hidden-touch">
              {{ file.modifiedTime }}
            </td>
            <td class="is-hidden-mobile is-hidden-touch">{{ file.size }}</td>
            <td class="is-hidden-mobile is-hidden-touch">
              <span class="icon" @click.stop="copy(file.path)">
                <i
                  class="fa fa-copy faa-shake animated-hover"
                  :title="$t('list.opt.copy')"
                  aria-hidden="true"
                ></i>
              </span>
              <span class="icon" @click.stop="go(file, '_blank')">
                <i
                  class="fa fa-external-link faa-shake animated-hover"
                  :title="$t('list.opt.newTab')"
                  aria-hidden="true"
                ></i>
              </span>
              <span
                class="icon"
                @click.stop="go(file, 'down')"
                v-if="file.mimeType !== 'application/vnd.google-apps.folder'"
              >
                <i
                  class="fa fa-download faa-shake animated-hover"
                  aria-hidden="true"
                  :title="$t('list.opt.download')"
                ></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <grid-view
        class="g2-content"
        :data="buildFiles"
        v-if="mode !== 'list'"
        :getIcon="getIcon"
        :go="go"
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
import GridView from "./components/grid";
import Markdown from "../common/Markdown";
export default {
  name: "GoList",
  components: {
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
    columns() {
      return [
        { name: this.$t("list.title.file"), style: "" },
        {
          name: this.$t("list.title.moditime"),
          style: "width:20%",
          class: "is-hidden-mobile is-hidden-touch",
        },
        {
          name: this.$t("list.title.size"),
          style: "width:10.5%",
          class: "is-hidden-mobile is-hidden-touch",
        },
        {
          name: this.$t("list.title.operation"),
          style: "width:13.5%",
          class: "is-hidden-mobile is-hidden-touch",
        },
      ];
    },
    buildFiles() {
      var path = this.$route.path;
      return this.files.map((item) => {
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
      });
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
    go(file, target) {
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
        location.href = path;
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
