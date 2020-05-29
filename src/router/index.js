import Vue from "vue";
import febAlive from "feb-alive";
import VueRouter from "vue-router";
// 路由数据
import routes from "./routes";
import store from '@/store/index';

// 在router实例化之前重写history
febAlive.resetHistory();

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return VueRouterPush.call(this, location).catch((err) => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return VueRouterReplace.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  mode: "history",
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
  routes,
});

Vue.use(febAlive, { router });

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log("before:");
    console.log(to, from);
  }
  store.dispatch("acrou/cancelToken/cancel")
  next();
});

router.afterEach((to) => {
  if (process.env.NODE_ENV === "development") {
    console.log("after:");
    console.log(to);
  }
});

export default router;
