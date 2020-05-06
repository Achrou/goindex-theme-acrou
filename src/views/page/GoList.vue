<template>
  <div>
    <headmd :option="headmd" v-show="headmd.display"></headmd>
    <div class="golist">
      <table class="table is-hoverable">
        <thead>
          <tr>
            <th
              v-for="(column,index) in columns"
              v-bind:key="index"
              :class="column.class"
              :style="column.style"
            >
              {{column.name}}
              <span class="caret-wrapper">
                <i class="sort-caret ascending"></i>
                <i class="sort-caret descending"></i>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(file,index) in files" v-bind:key="index">
            <td @click="go(file, 'view')">
              <svg class="iconfont" aria-hidden="true">
                <use :xlink:href="getIcon(file.mimeType)" />
              </svg>
              {{file.name}}
            </td>
            <td class="is-hidden-mobile is-hidden-touch">{{file.modifiedTime}}</td>
            <td class="is-hidden-mobile is-hidden-touch">{{file.size}}</td>
            <td
              class="is-hidden-mobile is-hidden-touch"
              v-if="file.mimeType!=='application/vnd.google-apps.folder'"
            >
              <span class="icon" @click.stop="copy(file.path)">
                <i
                  class="fa fa-copy faa-shake animated-hover"
                  :title="$t('list.opt.copy')"
                  aria-hidden="true"
                ></i>
              </span>
              <span class="icon" @click.stop="go(file,'_blank')">
                <i
                  class="fa fa-external-link faa-shake animated-hover"
                  :title="$t('list.opt.newTab')"
                  aria-hidden="true"
                ></i>
              </span>
              <span class="icon" @click.stop="go(file,'down')">
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
      <div v-show="files.length==0" class="has-text-centered no-content"></div>
      <div v-show="loading" class="pageloader is-active">
        <span class="title">{{$t('list.loading')}}</span>
      </div>
    </div>
    <hr />
    <readmemd :option="readmemd" v-show="readmemd.display"></readmemd>
  </div>
</template>

<script>
import {
  formatDate,
  formatFileSize,
  checkoutPath,
  checkView
} from "@utils/AcrouUtil";
import axios from "@/utils/axios";
import Markdown from "../common/Markdown";
import * as clipboard from "clipboard-polyfill";
export default {
  name: "GoList",
  components: {
    Headmd: Markdown,
    Readmemd: Markdown
  },
  data: function() {
    return {
      page: {
        page_token: null,
        page_index: 0
      },
      files: [],
      loading: true,
      copyTooltip: "",
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
        "image/png": "icon-img"
      },
      headmd: { display: false, file: {}, path: "" },
      readmemd: { display: false, file: {}, path: "" }
    };
  },
  computed: {
    columns() {
      return [
        { name: this.$t("list.title.file"), style: "" },
        {
          name: this.$t("list.title.moditime"),
          style: "width:20%",
          class: "is-hidden-mobile is-hidden-touch"
        },
        {
          name: this.$t("list.title.size"),
          style: "width:10.5%",
          class: "is-hidden-mobile is-hidden-touch"
        },
        {
          name: this.$t("list.title.operation"),
          style: "width:13%",
          class: "is-hidden-mobile is-hidden-touch"
        }
      ];
    }
  },
  mounted() {
    this.render();
  },
  methods: {
    cellClass(row) {
      if (row.columnIndex != 0) {
        return "is-hidden-mobile is-hidden-touch has-text-drak";
      }
    },
    render() {
      let path = window.location.pathname;
      this.loading = true;
      var password = localStorage.getItem("password" + path);
      // var param = window.location.search;
      let q = this.$route.query.q;
      var p = {
        q: q ? decodeURIComponent(q) : "",
        password: password || null,
        ...this.page
      };
      this.axios
        .post(path, p)
        .then(res => {
          var body = res.data;
          if (body) {
            // 判断响应状态
            if (body.error && body.error.code == "401") {
              this.checkPassword(path);
              return;
            }
            let data = body.data;
            if (!data) return;
            this.page = {
              page_token: body.nextPageToken,
              page_index: body.curPageIndex
            };
            try {
              this.files = data.files.map(item => {
                var p =
                  path.replace("search", "search/") +
                  checkoutPath(item.name, item);
                if (!path.match("/[0-9]+:search")) {
                  // HEAD.md
                  if (item.name === "HEAD.md") {
                    this.headmd = {
                      display: true,
                      file: item,
                      path: path + item.name
                    };
                  }
                  // REDEME.md
                  if (item.name === "README.md") {
                    this.readmemd = {
                      display: true,
                      file: item,
                      path: path + item.name
                    };
                  }
                }
                return {
                  path: p,
                  ...item,
                  modifiedTime: formatDate(item.modifiedTime),
                  size: formatFileSize(item.size)
                };
              });
            } catch (e) {
              console.log(e);
            }
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    checkPassword(path) {
      var pass = prompt(this.$t("list.auth"), "");
      localStorage.setItem("password" + path, pass);
      if (pass != null && pass != "") {
        this.render(path);
      } else {
        history.go(-1);
      }
    },
    copy(path) {
      let origin = window.location.origin;
      path = origin + path;
      clipboard.writeText(path);
    },
    go(file, target) {
      let path = file.path;
      if (path.match("/[0-9]+:search/")) {
        this.goSearchResult(file, target);
        return;
      }
      if (target === "down") {
        location.href = path;
        return;
      }
      if (target === "view") {
        this.$router.push({
          path: checkView(path)
        });
        return;
      }
      if (file.mimeType === "application/vnd.google-apps.folder") {
        this.$router.push({
          path: path
        });
        return;
      }
      if (target === "_blank") {
        window.open(path);
        return;
      }
    },
    goSearchResult(file, target) {
      this.loading = true;
      let cur = window.current_drive_order;
      axios
        .post(`/${cur}:id2path`, { id: file.id })
        .then(res => {
          this.loading = false;
          let data = res.data;
          if (data) {
            var href = `/${cur}:${data}`;
            href = checkoutPath(href, file);
            if (target === "_blank") {
              window.open(href);
            } else {
              this.$router.push({
                path: href
              });
            }
          }
        })
        .catch(e => {
          this.loading = false;
          console.log(e);
        });
    },
    getIcon(type) {
      return "#" + (this.icon[type] ? this.icon[type] : "icon-weizhi");
    }
  },
  watch: {
    $route(to, from) {
      // 后退设置page_token为空
      if (to.path.length < from.path.length) {
        this.page.page_token = null;
      }
      if (to.path.substr(-1) === '/') {
				this.render();
			}
    }
  }
};
</script>
