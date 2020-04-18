import Vue from "vue";
import axios from "axios";
import { utc2beijing, formatFileSize } from "../utils/AcrouUtil";

var list = Vue.component("list", {
  data: function () {
    return {
      files: [],
      loading: false,
      columns: [
        { name: "文件", style: "" },
        {
          name: "修改时间",
          style: "width:20%",
          class: "is-hidden-mobile is-hidden-touch",
        },
        {
          name: "大小",
          style: "width:10%",
          class: "is-hidden-mobile is-hidden-touch",
        },
        {
          name: "下载",
          style: "width:6%",
          class: "is-hidden-mobile is-hidden-touch",
        },
      ],
      icon: {
        "application/vnd.google-apps.folder": "icon-morenwenjianjia",
        "video/mp4": "icon-mp",
        "video/x-matroska": "icon-mkv",
        "video/x-msvideo": "icon-avi",
        "video/webm": "icon-webm",
        "text/plain": "icon-txt",
        "text/markdown": "icon-markdown",
        "text/x-ssa": "icon-ASS",
        "application/x-subrip": "icon-srt",
      },
    };
  },
  methods: {
    render(path, param) {
      this.loading = true;
      var password = localStorage.getItem("password" + path);

      axios
        .post(path, { password: password, q: decodeURIComponent(param) })
        .then((res) => {
          var data = res.data;
          if (
            typeof data != "null" &&
            data.hasOwnProperty("error") &&
            data.error.code == "401"
          ) {
            var pass = prompt("目录加密，请输入密码", "");
            localStorage.setItem("password" + path, pass);
            if (pass != null && pass != "") {
              this.render(path);
            } else {
              history.go(-1);
            }
          } else if (typeof data != "null") {
            var exts = [
              "html",
              "php",
              "css",
              "go",
              "java",
              "js",
              "json",
              "txt",
              "sh",
              "md",
              "mp4",
              "webm",
              "mkv",
              "bmp",
              "jpg",
              "jpeg",
              "png",
              "gif",
            ];
            try {
              this.files = data.files.map((item) => {
                var p = path + item.name;
                // REDEME.md
                // if (item.name === "README.md") {
                //   this.$emit("head", {
                //     display: true,
                //     file: item,
                //     path: p,
                //   });
                // }

                // HEAD.md
                // if (item.name === "HEAD.md") {
                //   this.$emit("footer", {
                //     display: true,
                //     file: item,
                //     path: p
                //   });
                // }

                var ext = p.split(".").pop();
                if (exts.indexOf(`${ext}`) >= 0) {
                  p += "?a=view";
                } else {
                  if (item.mimeType === "application/vnd.google-apps.folder") {
                    p += "/";
                  }
                }
                return {
                  path: p,
                  ...item,
                  modifiedTime: utc2beijing(item.modifiedTime),
                  size: formatFileSize(item.size),
                };
              });
            } catch (e) {
              console.log(e);
            }
          }
          this.loading = false;
        })
        .catch((ex) => {
          this.loading = false;
        });
    },
    go(path, type = "view") {
      if (type === "down") {
        path = path.replace("?a=view", "");
      }
      location.href = path;
    },
    getIcon(type) {
      return "#" + (this.icon[type] ? this.icon[type] : "icon-weizhi");
    },
  },
  template: `
    <div>
      <progress v-if="loading" class="progress is-small is-primary" style="height: .25rem;" max="100">15%</progress>
      <table class="table is-hoverable" style="width:100%;">
          <thead>
          <tr>
              <th v-for="column in columns" :class="column.class" :style="column.style">{{column.name}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="file in files">
              <td @click="go(file.path)">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="getIcon(file.mimeType)"></use>
                </svg>
                {{file.name}}
              </td>
              <td class="is-hidden-mobile is-hidden-touch">{{file.modifiedTime}}</td>
              <td class="is-hidden-mobile is-hidden-touch">{{file.size}}</td>
              <td class="is-hidden-mobile is-hidden-touch" v-if="file.mimeType!=='application/vnd.google-apps.folder'">
                <span class="icon">
                  <i class="fa fa-download" @click="go(file.path,'down')"></i>
                </span>
              </td>
          </tr>
          </tbody>
      </table>
      </div>
    `,
});

export default list;
