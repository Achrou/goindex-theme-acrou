import axios from "./axios";

const exts = ["html", "php", "css", "go", "java", "js", "json", "py", "txt", "sh", "md", "mp4", "webm", "mkv", "bmp", "jpg", "jpeg", "png", "gif"];


export const checkoutPath = (path, file) => {
  var ext = path.split(".").pop();
  if (exts.indexOf(`${ext}`) >= 0) {
    path += "?a=view";
  } else {
    if (file.mimeType === "application/vnd.google-apps.folder") {
      path += "/";
    }
  }
  return path
}

export const getQueryString = (path, param) => {
  if (!path) {
    return "";
  }
  var args = getURLParameters(path);
  return args[param] ? args[param] : "";
};

export const getURLParameters = (url) =>
  url
  .match(/([^?=&]+)(=([^&]*))/g)
  .reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ), {}
  );

// console.log(getURLParameters("/Movies/xx.mp4?a=view&y=123"));

//console.log(getQueryString("/Movies/xx.mp4?a=view&y=123", "y"));

export function get_file(option, callback) {
  var path = option.path;
  var modifiedTime = option.file.modifiedTime;
  var key = "file_path_" + path + modifiedTime;
  var data = localStorage.getItem(key);
  data = "";
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