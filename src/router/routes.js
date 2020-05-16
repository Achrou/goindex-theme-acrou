// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require("@/libs/util.import." + process.env.NODE_ENV);

const meta = {
  // keepAlive: true
  disableCache: false
}

const frameIn = [{
    path: "/:id(\\d)::cmd(text)/:path",
    component: _import("page/GoText"),
    meta: {
      ...meta,
      view: 'text'
    }
  },
  {
    path: "/:id(\\d)::cmd(pdf)/:path",
    component: _import("page/GoPdf"),
    meta: {
      ...meta,
      view: 'pdf'
    }
  },
  {
    path: "/:id(\\d)::cmd(video)/:path",
    component: _import("page/GoVideo"),
    meta: {
      ...meta,
      view: 'video'
    }
  },
  {
    path: "/:id(\\d)::cmd(image)/:path",
    component: _import("page/GoImg"),
    meta: {
      ...meta,
      view: 'image'
    }
  },
  {
    path: "/:id(\\d)::cmd(search)(/?q=)*",
    component: _import("page/GoList"),
    meta: {
      ...meta,
      view: 'list'
    }
  },
  {
    path: "/:id(\\d):/:path*",
    component: _import("page/GoList"),
    meta: {
      ...meta,
      view: 'list'
    }
  },
];

export default frameIn;