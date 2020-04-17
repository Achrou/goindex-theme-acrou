import Vue from 'vue'
import axios from 'axios'

var list = Vue.component("list", {
  data: function () {
    return {
      files: [],
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
      var password = localStorage.getItem('password' + path);
      axios.post(path, { password: password }).then(res => {
        res.data = [
          {
            id: "1A9IFKx3m40VSlFejm1KCJ5w51JxjqzUy",
            name: "Bad.Boys.for.Life.2020.1080p.HDRip.x264.AAC2.0-STUTTERSHIT",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-01T20:10:29.875Z",
          },
          {
            id: "1UvBiMgXL2Lb15LHzJ_sK8a3VNLVynv6_",
            name: "Chung.King.Express.1994.CHINESE.1080p.BluRay.H264.AAC-VXT",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-13T19:46:26.447Z",
          },
          {
            id: "1yE1K_iP3qepikTGZSPJbHh1xt0E699z9",
            name: "Just.Mercy.2019.1080p.WEBRip.x264-RARBG",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-01T19:37:16.045Z",
          },
          {
            id: "1fy40Z_P7ZdPpqMJp8ddfLl0cIDcdeqQB",
            name: "The Avengers (2012) [1080p]",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-10T20:12:43.899Z",
          },
          {
            id: "10bcSdNU9oH-XK5UElI--apAzeiKIERtB",
            name: "一树梨花压海棠.Lolita.1997.1080p.BluRay.x264.YIFY",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-10T02:41:02.206Z",
          },
          {
            id: "1O3t9DUvYGeolHYXITtQh0z15m7Do34vi",
            name: "乔乔的异想世界",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-01T07:41:50.884Z",
          },
          {
            id: "14HGUpv2N3idF0Zju4lvUdPG7d34b4sn-",
            name: "咒怨2020.The.Grudge.2020.720p.BRRip.XviD.AC3-XVID",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-02T14:15:35.852Z",
          },
          {
            id: "1dicbCgG1iYnj6aUNWdbuAaTkH8wNW9an",
            name: "小丑",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-01T10:35:51.349Z",
          },
          {
            id: "1e3K0tB5bt-3RFocTaYb26IJ5X8PFiuM1",
            name: "梨泰院Class",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-03-14T14:41:04.173Z",
          },
          {
            id: "13sciJs9Zm8fKLk8_wkSHfT1sbKknaC7I",
            name: "汉尼拔",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-02T14:14:42.063Z",
          },
          {
            id: "1cR5rueFLK0KnKlTf76AQqCU5i-OKUvVU",
            name: "沉默的羔羊",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-01T00:41:17.477Z",
          },
          {
            id: "1kFBePc6OrTKR0FcYpMrK9B62SblJ4YqD",
            name:
              "波西米亚狂想曲.Bohemian.Rhapsody.2018.1080p.WEB-DL.x264.[1.9GB].[MP4]",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-02T14:15:12.582Z",
          },
          {
            id: "15NsNhohRjjL6a6LdVFE-03Jlay6-QWV3",
            name: "王国2",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-03-18T02:20:11.308Z",
          },
          {
            id: "18Luznm_h7GisB2UajcyyMPAQnW_FxGgS",
            name: "西部世界 第三季",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-02T14:13:57.810Z",
          },
          {
            id: "1r9tggRgDZLpLEu3juNoQ2UFtyWqALm4v",
            name: "饥饿站台",
            mimeType: "application/vnd.google-apps.folder",
            modifiedTime: "2020-04-01T00:41:34.910Z",
          },
          {
            id: "1cFvZDdJtXk2i-VR43FqlQg_oc6-gMf2N",
            name: "Billie Eilish - bad guy (Donald Trump Cover).webm",
            mimeType: "video/webm",
            modifiedTime: "2020-04-11T15:56:59.907Z",
            size: "19577958",
          },
          {
            id: "18wm2d9d8fe5KljHCleOtBAjShhZTwyYm",
            name: "HEAD.md",
            mimeType: "text/plain",
            modifiedTime: "2020-04-02T02:58:58.272Z",
            size: "91",
          },
          {
            id: "1SlojtUkokn7Qpg1hM9OT8JBzZ_reE7Tw",
            name: "README.md",
            mimeType: "text/markdown",
            modifiedTime: "2020-04-04T04:49:28.988Z",
            size: "447",
          },
          {
            id: "1hr2_kE3tRGUUiVMJTGolDqDmV154M0iR",
            name: "绅士们.The Gentlemen.2020.1080P.mp4",
            mimeType: "video/mp4",
            modifiedTime: "2020-03-29T06:41:16.000Z",
            size: "1640995589",
          },
        ];
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
      })
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
      <table class="table is-hoverable" style="width: 100%;">
          <thead>
          <tr>
              <th>文件</th>
              <th>修改时间</th>
              <th>大小</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="file in files">
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
    `
});

export default list