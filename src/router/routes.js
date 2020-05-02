// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const frameIn = [
  { path: '/:id:/*.(html|php|css|go|java|py|js|json|txt|sh|md)', component: _import('page/GoText') },
  { path: '/:id:/*.(mp4|webm|mkv)', component: _import('page/GoVideo') },
  { path: '/:id:/*.(bmp|jpg|jpeg|png|gif)', component: _import('page/GoImg') },
  { path: '/:id::cmd?(/?/??.*)', component: _import('page/GoList') },
]

export default frameIn
