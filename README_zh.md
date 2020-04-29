![GoIndex](https://raw.githubusercontent.com/donwa/goindex/master/themes/logo.png)  

# GoIndex-theme-acrou

[README](README.md) | [中文文档](README_zh.md)

## 预览  

Acrou: [https://oss.achirou.workers.dev/](https://oss.achirou.workers.dev/) 

## 更新日志

### 2020-4-29

- 支持多盘切换
- 添加版本检测
- 优化搜索结果
- 优化页面显示

## 使用

由于`goindex`原作者已将`donwa/goindex`仓库删除，以后将在这个版本上[yanzai/goindex](https://github.com/yanzai/goindex)进行扩展修改

1. 替换`index.js`为[index.js](https://ossdev.achirou.workers.dev/0:/go2index/index.js?a=view)
2. 修改goindex的index.js中所使用的app.js为(https://cdn.jsdelivr.net/gh/Aicirou/goindex-theme-acrou/dist/app.mini.js)

> 主题文件在dist目录

## 即将支持

- [x] 多盘切换
- [ ] 分页显示
- [ ] 图片列表显示
- [ ] 更多文件格式预览

GoIndex  
====

Google Drive Directory Index  
Combining the power of [Cloudflare Workers](https://workers.cloudflare.com/) and [Google Drive](https://www.google.com/drive/) will allow you to index you files on the browser on Cloudflare Workers.    

[index.js](https://github.com/donwa/goindex/) is the content of the Workers script.  

## Deployment  

1.Install `rclone` software locally  
2.Follow [https://rclone.org/drive/]( https://rclone.org/drive/) bind a drive  
3.Execute the command`rclone config file` to find the file `rclone.conf` path  
4.Open `rclone.conf`,find the configuration `root_folder_id` and `refresh_token`  
5.Download index.js in https://github.com/donwa/goindex and fill in root and refresh_token  
6.Deploy the code to [Cloudflare Workers](https://www.cloudflare.com/)

## Quick Deployment  

1.Open https://installen.gd.workers.dev/  
2.Auth and get the code  
3.Deploy the code to [Cloudflare Workers](https://www.cloudflare.com/)  



## About  

Cloudflare Workers allow you to write JavaScript which runs on all of Cloudflare's 150+ global data centers.  