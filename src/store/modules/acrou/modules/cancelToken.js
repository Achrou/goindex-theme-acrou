export default {
    namespaced: true,
    state: {
        cancelToken: [],
    },
    actions: {
        push({
            commit
        }, cancelToken) {
            return new Promise(resolve => {
                commit("push", cancelToken);
                resolve()
            })
        },
        cancel({
            commit
        }) {
            return new Promise(resolve => {
                commit("clear");
                resolve()
            })
        },
    },
    mutations: {
        push(state, cancelToken) {
            state.cancelToken.push(cancelToken)
        },
        clear(state) {
            console.log(state.cancelToken)
            state.cancelToken.forEach(cancel => {
                cancel('路由跳转取消请求');
            });
            state.cancelToken = [];
        }
    },
};