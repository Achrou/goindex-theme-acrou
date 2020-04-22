import axios from "axios";

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.GOINEX_APP_API ? process.env.GOINEX_APP_API : "",
//   timeout: 30000,
});

export default service;
