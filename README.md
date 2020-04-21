![GoIndex](https://raw.githubusercontent.com/donwa/goindex/master/themes/logo.png)  

GoIndex  
====
Google Drive Directory Index  
Combining the power of [Cloudflare Workers](https://workers.cloudflare.com/) and [Google Drive](https://www.google.com/drive/) will allow you to index you files on the browser on Cloudflare Workers.    

[index.js](https://github.com/donwa/goindex/) is the content of the Workers script.  

## Demo  
acrou: [https://oss.achirou.workers.dev/](https://oss.achirou.workers.dev/) 

## 使用

主题文件在dist目录可以下载下来上传到自己cdn或者使用下面的链接也可以

修改goindex的index.js中所使用的app.js为(https://cdn.jsdelivr.net/gh/Aicirou/goindex-theme-acrou/dist/app.mini.js)

goindex作者的`index.js`不支持搜索，需要搜索功能请使用[index.js](https://oss.achirou.workers.dev/go2index/index.js?a=view)

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
