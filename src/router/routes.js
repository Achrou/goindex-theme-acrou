// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require("@/libs/util.import." + process.env.NODE_ENV);

const frameIn = [
  { path: "/:id:(text)/:path", component: _import("page/GoText"), props: true },
  { path: "/:id:(pdf)/:path", component: _import("page/GoPdf"), props: true },
  { path: "/:id:(video)/:path", component: _import("page/GoVideo") },
  { path: "/:id:(image)/:path", component: _import("page/GoImg") },
  { path: "/:id::cmd?(/?/??.*/)", component: _import("page/GoList") },
];

export default frameIn;
