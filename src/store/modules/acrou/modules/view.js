export default {
  namespaced: true,
  state: {
    // 视图模式
    mode: "list",
  },
  actions: {
    /**
     * @description 从持久化数据读取视图模式设置
     * @param {Object} context
     */
    load({ state, dispatch, commit }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        // store 赋值
        state.mode = await dispatch(
          "acrou/db/get",
          {
            dbName: "sys",
            path: "view.mode.value",
            defaultValue: "list",
            user: true,
          },
          { root: true }
        );
        // 应用
        commit("set", state.mode);
        // end
        resolve();
      });
    },
    /**
     * @description 切换视图模式
     * @param {Object} context
     */
    toggle({ state, dispatch, commit }, mode) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        // store 赋值
        state.mode = mode || "list";
        // 持久化
        await dispatch(
          "acrou/db/set",
          {
            dbName: "sys",
            path: "view.mode.value",
            value: state.mode,
            user: true,
          },
          { root: true }
        );
        // 应用
        commit("set", state.mode);
        // end
        resolve();
      });
    },
  },
  mutations: {
    /**
     * @description 设置 store 里的视图模式
     * @param {Object} state state
     * @param {Boolean} mode mode
     */
    set(state, mode) {
      state.mode = mode;
    },
  },
};
