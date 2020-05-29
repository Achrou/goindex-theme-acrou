import axios from "@/plugin/axios";
let Base64 = require("js-base64").Base64;

const text_exts = [
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
];
const video_exts = ["mp4", "webm", "mkv", "m3u8"];
const image_exts = ["bmp", "jpg", "jpeg", "png", "gif"];
const pdf_exts = ["pdf"];

export const encodePath = (path) => {
  return path.replace(/(.*)/, (p1, p2) => {
    return p2
      .replace()
      .replace(/\//g, "%2F")
      .replace(/#/g, "%23");
  });
  //return path.replace().replace("/", "%2F").replace("#", "%23")
};

export const checkoutPath = (path, file) => {
  path = encodePath(path);
  if (file.mimeType === "application/vnd.google-apps.folder") {
    if (path.substr(-1) !== "/") {
      path += "/";
    }
  }
  return path;
};

export const checkView = (path) => {
  let name = path.split("/").pop();
  let ext = name
    .split(".")
    .pop()
    .toLowerCase();
  let base64Path = encode64(path);
  if (text_exts.indexOf(`${ext}`) != -1) {
    path = path.replace(/\/(\d+:)\/.*/, (p1, p2) => {
      return `/${p2}text/${base64Path}`;
    });
  }

  if (pdf_exts.indexOf(`${ext}`) != -1) {
    path = path.replace(/\/(\d+:)\/.*/, (p1, p2) => {
      return `/${p2}pdf/${base64Path}`;
    });
  }

  if (video_exts.indexOf(`${ext}`) != -1) {
    path = path.replace(/\/(\d+:)\/.*/, (p1, p2) => {
      return `/${p2}video/${base64Path}`;
    });
  }

  if (image_exts.indexOf(`${ext}`) != -1) {
    path = path.replace(/\/(\d+:)\/.*/, (p1, p2) => {
      return `/${p2}image/${base64Path}`;
    });
  }
  return path;
};

export const checkExtends = (path) => {
  let name = path.split("/").pop();
  let ext = name
    .split(".")
    .pop()
    .toLowerCase();
  let exts = text_exts.concat(...video_exts,...image_exts,...pdf_exts);
  return exts.indexOf(`${ext}`) != -1;
};

export const encode64 = (str) => {
  return Base64.encodeURI(str);
};

export const decode64 = (str) => {
  return Base64.decode(str);
};

export function get_file(option, callback) {
  var path = option.path;
  var modifiedTime = option.file.modifiedTime;
  var key = "file_path_" + path + modifiedTime;
  var data = localStorage.getItem(key);
  if (data) {
    return callback(data);
  } else {
    axios.get(path).then((res) => {
      var data = res.data;
      localStorage.setItem(key, data);
      callback(data);
    });
  }
}

export function get_filex(path, callback) {
  axios.get(path).then((res) => {
    var data = res.data;
    callback(data);
  });
}

//时间转换
export function utc2beijing(utc_datetime) {
  // 转为正常的时间格式 年-月-日 时:分:秒
  var T_pos = utc_datetime.indexOf("T");
  var Z_pos = utc_datetime.indexOf("Z");
  var year_month_day = utc_datetime.substr(0, T_pos);
  var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
  var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

  // 处理成为时间戳
  var timestamp = new Date(Date.parse(new_datetime));
  timestamp = timestamp.getTime();
  timestamp = timestamp / 1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  var unixtimestamp = timestamp + 8 * 60 * 60;

  // 时间戳转为时间
  unixtimestamp = new Date(unixtimestamp * 1000);
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
}

export function formatFileSize(bytes) {
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
}

/** 日期格式化
 * @param {Number String Date}
 * @param {String} 'YYYY-MM-DD HH:mm:ss EEE' 年(Y)、月(M)、日(D)、12小时(h)、24小时(H)、分(m)、秒(s)、毫秒(S)、周(E)、季度(q)
 * @return {String}
 * @example XDate.format(new Date(), "YYYY-MM-DD") ==> 2017-08-23
 */
export function formatDate(date, fmt) {
  fmt = fmt || "YYYY-MM-DD HH:mm:ss";
  if (typeof date === "string") {
    // date = new Date(date.replace(/-/g, '/'))
    date = new Date(date);
  }
  if (typeof date === "number") {
    date = new Date(date);
  }
  var o = {
    "M+": date.getMonth() + 1,
    "D+": date.getDate(),
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  var week = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d",
  };
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (RegExp.$1.length > 1
        ? RegExp.$1.length > 2
          ? "\u661f\u671f"
          : "\u5468"
        : "") + week[date.getDay() + ""]
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
