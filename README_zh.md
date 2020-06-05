# GoIndex-theme-acrou

结合 [Cloudflare Workers](https://workers.cloudflare.com/) 和 [Google Drive](https://www.google.com/drive/) 的力量，你可以在Cloudflare Workers的浏览器上建立你的文件索引。

[goindex/index.js](https://github.com/Aicirou/goindex-theme-acrou/go2index) 是Workers脚本的内容。

这个主题的goindex目前是基于 [yanzai/goindex](https://github.com/yanzai/goindex/)

[README](README.md) | [中文文档](README_zh.md)

## 预览  

Acrou: [https://oss.achirou.workers.dev/](https://oss.achirou.workers.dev/) 

## 特色

- [x] 👑 页面级缓存，浏览器前进后退不刷新秒加载（mac用户使用触控板体验更佳）
- [x] 🗂 多盘切换
- [x] 🔐 Http Basic Auth
- [x] 🎨 网格视图模式（文件预览）
- [x] 🎯 分页加载
- [x] 🌐 I18n（多国语言）
- [x] 🛠 html渲染
- [x] 🖥 视频在线播放(mp4,mkv,webm,flv,m3u8)
- [x] 🕹 支持自定义视频播放器（API）
- [x] 🚀 拥有更快的速度

## TODO

- [ ] 更多文件格式预览
- [ ] 让Goindex不只是一个目录索引

## 快速部署

1. 打开https://install.achirou.workers.dev 或者 https://goindex-quick-install.glitch.me  
2. 授权并获取授权码
3. 将代码部署到 [Cloudflare Workers](https://www.cloudflare.com/)

## 部署

1. 开启[Google Drive API](https://console.developers.google.com/apis/api/drive.googleapis.com/overview)
2. 创建一个 [OAuth client ID](https://console.developers.google.com/apis/credentials/oauthclient)
3. 本地安装[rclone](https://rclone.org/downloads/)
4. 使用`rclone`获取`refresh_token`
5. 下载`index.js` (https://github.com/Aicirou/goindex-theme-acrou/tree/master/go2index) 然后替换`client_id`,`client_secret`,`refresh_token` 为你刚刚获取到的
6. 把代码部署到[Cloudflare Workers](https://www.cloudflare.com/)

> 如果你写了一篇不错的文章，想分享给大家，请提交Issues，我会把链接贴在这里。

## 更新日志

### 2020-06-02

- 添加清理文件缓存
- 支持自定义视频播放器（API）
- 美化：网格模式文件无预览图时显示图标
- 美化：调整HEAD.md渲染位置
- 解决搜索不能预览的文件点击无法直接下载 [#30](https://github.com/Aicirou/goindex-theme-acrou/issues/30)
- 解决文件名中有#无法打开的问题 [#20](https://github.com/Aicirou/goindex-theme-acrou/issues/20)
- 解决当前页面加载中切换页面会回退的问题 [#37](https://github.com/Aicirou/goindex-theme-acrou/issues/37) (感谢[@PedroZhang](https://github.com/PedroZhang)帮忙找出的问题原因)

### 2020-5-20

- 程序改为单页应用

- 添加页面级缓存（浏览器前进后退不刷新秒加载，mac用户使用触控板体验更佳）
- 添加 http basic auth（每个盘符可单独配置用户名和密码，可以保护该盘下所有子文件和子文件夹）
- 添加网格视图模式（文件预览）
- 添加分页加载
- 添加 i18n多国语言
- 添加 html渲染
- 添加 渲染文件夹/文件的描述 （用途自行挖掘）
- 添加可选配置
- 支持快速部署（帮助小白的利器）
- 支持PDF在线预览
- 更换文本编辑器
- 解决url编码问题 [#20](https://github.com/Aicirou/goindex-theme-acrou/issues/20) [#23](https://github.com/Aicirou/goindex-theme-acrou/issues/23) [#25](https://github.com/Aicirou/goindex-theme-acrou/issues/25)
- 解决其他已知问题

### 2020-4-29

- 支持多盘切换
- 添加版本检测
- 优化搜索结果
- 优化页面显示

## 关于

这个项目一开始仅仅是为了满足我个人观感体验开发的，当这个项目收获了第一个start、第一个fork、第一个issues，再到大家不断开始提建议，让我有了更新下去的动力。非常感谢大家的支持，得以有了现在的2.0版本。

## Lisense

[MIT](LICENSE)