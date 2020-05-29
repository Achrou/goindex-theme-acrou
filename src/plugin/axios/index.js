import axios from "axios";
import store from '@/store'

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API ? process.env.VUE_APP_API : "",
    //   timeout: 30000,
});

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求设置cancel token
        config.cancelToken = new axios.CancelToken(cancel => {
            store.dispatch("acrou/cancelToken/push", cancel)
        })
        return config
    },
    error => {
        // 发送失败
        console.log(error)
        return Promise.reject(error)
    }
)

export default service;