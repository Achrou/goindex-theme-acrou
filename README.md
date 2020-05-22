# GoIndex-theme-acrou

Google Drive Directory Index  
Combining the power of [Cloudflare Workers](https://workers.cloudflare.com/) and [Google Drive](https://www.google.com/drive/) will allow you to index you files on the browser on Cloudflare Workers.    

[goindex/index.js](https://github.com/Aicirou/goindex-theme-acrou/go2index) is the content of the Workers script.  

[README](README.md) | [中文文档](README_zh.md)

## Demo  

Acrou: [https://oss.achirou.workers.dev/](https://oss.achirou.workers.dev/) 

## Feature

- [x] Multi drive switching
- [x] Http Basic Auth

- [x] Grid view mode
- [x] Paging load
- [x] i18n
- [x] Html render 

## TODO

- [ ] More file format preview

## Deployment  

1.Install `rclone` software locally  
2.Follow [https://rclone.org/drive/]( https://rclone.org/drive/) bind a drive  
3.Execute the command`rclone config file` to find the file `rclone.conf` path  
4.Open `rclone.conf`,find the configuration `root_folder_id` and `refresh_token`  
5.Download index.js in https://github.com/Aicirou/goindex-theme-acrou/tree/master/go2index and fill in root and refresh_token  
6.Deploy the code to [Cloudflare Workers](https://www.cloudflare.com/)

## Quick Deployment
1.Open https://goindex-quick-install.glitch.me
2.Auth and get the code 
3.Deploy the code to [Cloudflare Workers](https://www.cloudflare.com/)

## About  
Cloudflare Workers allow you to write JavaScript which runs on all of Cloudflare's 150+ global data centers.  
