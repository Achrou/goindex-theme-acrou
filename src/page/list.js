import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';

var list = Vue.component("list", {
  data: function () {
    return {
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
        "application/x-subrip": "icon-srt",
      }
    };
  },
  methods: {
    render (path) {
      this.loading = true
      var password = localStorage.getItem('password' + path);
      axios.post(path, qs.stringify({ password: password })).then(res => {
        var data = res.data
        if (typeof data != 'null' && data.hasOwnProperty('error') && data.error.code == '401') {
          var pass = prompt("目录加密，请输入密码", "");
          localStorage.setItem('password' + path, pass);
          if (pass != null && pass != "") {
            list(path);
          } else {
            history.go(-1);
          }
        } else if (typeof data != 'null') {
          var exts = ['html', 'php', 'css', 'go', 'java', 'js', 'json', 'txt', 'sh', 'md', 'mp4', 'webm', 'mkv', 'bmp', 'jpg', 'jpeg', 'png', 'gif']
          this.files = data.files.map(item => {
            var p = path + item.name
            var ext = p.split('.').pop()
            if (exts.indexOf(`${ext}`) >= 0) {
              p += "?a=view";
            } else {
              p += '/'
            }
            return {
              path: p,
              ...item
            }
          })
        }
        this.loading = false
      }).catch(ex=>{
        this.loading = false
      })
    },
    go(path){
      location.href = path
    },
    //时间转换
    utc2beijing (utc_datetime) {
      // 转为正常的时间格式 年-月-日 时:分:秒
      var T_pos = utc_datetime.indexOf("T");
      var Z_pos = utc_datetime.indexOf("Z");
      var year_month_day = utc_datetime.substr(0, T_pos);
      var hour_minute_second = utc_datetime.substr(
        T_pos + 1,
        Z_pos - T_pos - 1
      );
      var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

      // 处理成为时间戳
      var timestamp = new Date(Date.parse(new_datetime));
      timestamp = timestamp.getTime();
      timestamp = timestamp / 1000;

      // 增加8个小时，北京时间比utc时间多八个时区
      var unixtimestamp = timestamp + 8 * 60 * 60;

      // 时间戳转为时间
      var unixtimestamp = new Date(unixtimestamp * 1000);
      var year = 1900 + unixtimestamp.getYear();
      var month = "0" + (unixtimestamp.getMonth() + 1);
      var date = "0" + unixtimestamp.getDate();
      var hour = "0" + unixtimestamp.getHours();
      var minute = "0" + unixtimestamp.getMinutes();
      var second = "0" + unixtimestamp.getSeconds();
      return (
        year +
        "-" +
        month.substring(month.length - 2, month.length) +
        "-" +
        date.substring(date.length - 2, date.length) +
        " " +
        hour.substring(hour.length - 2, hour.length) +
        ":" +
        minute.substring(minute.length - 2, minute.length) +
        ":" +
        second.substring(second.length - 2, second.length)
      );
    },
    formatFileSize (bytes) {
      if (bytes >= 1000000000) {
        bytes = (bytes / 1000000000).toFixed(2) + " GB";
      } else if (bytes >= 1000000) {
        bytes = (bytes / 1000000).toFixed(2) + " MB";
      } else if (bytes >= 1000) {
        bytes = (bytes / 1000).toFixed(2) + " KB";
      } else if (bytes > 1) {
        bytes = bytes + " bytes";
      } else if (bytes == 1) {
        bytes = bytes + " byte";
      } else {
        bytes = "";
      }
      return bytes;
    },
    getIcon (type) {
      return '#' + (this.icon[type] ? this.icon[type] : 'icon-weizhi');
    },
  },
  template: `
    <div>
      <progress v-if="loading" class="progress is-small is-primary" style="height: .25rem;" max="100">15%</progress>
      <table class="table is-hoverable" style="width: 100%;">
          <thead>
          <tr>
              <th>文件</th>
              <th>修改时间</th>
              <th>大小</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="file in files" @click="go(file.path)">
              <td>
              <svg class="icon" aria-hidden="true">
                  <use :xlink:href="getIcon(file.mimeType)"></use>
              </svg>
              {{file.name}}
              </td>
              <td>{{utc2beijing(file.modifiedTime)}}</td>
              <td>{{formatFileSize(file.size)}}</td>
          </tr>
          </tbody>
      </table>
      </div>
    `
});

export default list