<template>
  <div>
    <progress
      v-if="loading"
      class="progress is-small is-primary"
      style="height: .25rem;"
      max="100"
    >15%</progress>
    <table class="table is-hoverable">
      <thead>
        <tr>
          <th
            v-for="(column,index) in columns"
            v-bind:key="index"
            :class="column.class"
            :style="column.style"
          >{{column.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(file,index) in files" v-bind:key="index">
          <td @click="go(file.path)">
            <svg class="icon" aria-hidden="true">
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
            <!-- <span class="icon" @click="copy(file.path)">
              <i class="fa fa-copy" title="copy link" aria-hidden="true"></i>
            </span> -->
            <span class="icon">
              <i class="fa fa-download" title="Download" @click="go(file.path,'down')"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-show="files.length==0" class="has-text-centered no-content"></div>
  </div>
</template>

<script>
import { utc2beijing, formatFileSize } from "@utils/AcrouUtil";
export default {
  data: function() {
    return {
      page: {
        page_token: null,
        page_index: 0
      },
      files: [],
      loading: false,
      columns: [
        { name: "文件", style: "" },
        {
          name: "修改时间",
          style: "width:20%",
          class: "is-hidden-mobile is-hidden-touch"
        },
        {
          name: "大小",
          style: "width:10.5%",
          class: "is-hidden-mobile is-hidden-touch"
        },
        {
          name: "下载",
          style: "width:6%",
          class: "is-hidden-mobile is-hidden-touch"
        }
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
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "icon-word",
        "image/bmp": "icon-img",
        "image/jpeg": "icon-img",
        "image/png": "icon-img"
      }
    };
  },
  methods: {
    render(path, param) {
      this.loading = true;
      var password = localStorage.getItem("password" + path);
      var p = {
        q: param,
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
            var exts = [
              "html",
              "php",
              "css",
              "go",
              "java",
              "js",
              "json",
              "py",
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
              "gif"
            ];
            try {
              this.files = data.files.map(item => {
                var p = path + item.name;
                // HEAD.md
                if (item.name === "HEAD.md") {
                  this.$emit("headmd", {
                    display: true,
                    file: item,
                    path: p
                  });
                }
                // REDEME.md
                if (item.name === "README.md") {
                  this.$emit("readmemd", {
                    display: true,
                    file: item,
                    path: p
                  });
                }

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
                  size: formatFileSize(item.size)
                };
              });
            } catch (e) {
              console.log(e);
            }
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    checkPassword(path) {
      var pass = prompt("目录加密，请输入密码", "");
      localStorage.setItem("password" + path, pass);
      if (pass != null && pass != "") {
        this.render(path);
      } else {
        history.go(-1);
      }
    },
    copy(path) {
      path = path.replace("?a=view", "");
      // TODO
    },
    go(path, type = "view") {
      if (type === "down") {
        path = path.replace("?a=view", "");
      }
      location.href = path;
    },
    getIcon(type) {
      return "#" + (this.icon[type] ? this.icon[type] : "icon-weizhi");
    }
  }
};
</script>