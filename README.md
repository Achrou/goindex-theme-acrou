![GoIndex](https://raw.githubusercontent.com/donwa/goindex/master/themes/logo.png)  

# GoIndex-theme-acrou

[README](README.md) | [中文文档](README_zh.md)

## Demo  

Acrou: [https://oss.achirou.workers.dev/](https://oss.achirou.workers.dev/) 

## Log

### 2020-4-29

- Support multi disk switching
- Add version detection
- Optimize search results
- Optimize page display

## Use

Since the original author of `goindex` has deleted the `donwa/goindex` warehouse, the extension and modification will be made on this version [yanzai/goindex](https://github.com/yanzai/goindex) in the future

1. Replace `index.js` with [index.js](https://ossdev.achirou.workers.dev/0:/go2index/index.js?a=view)
2. Modify the app.js used in index.js of goindex to `https://cloud.jsonpop.cn/go2index/last/app.mini.js`

> The theme file is in the dist directory

## TODO

- [x] Drive switch
- [ ] Pagination display
- [ ] Picture list display
- [ ] More file format preview

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
