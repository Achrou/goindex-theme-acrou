export default {
  namespaced: true,
  state: {
    player: null,
    audios: [],
  },
  actions: {
    set({ state }, player) {
      state.player = player;
    },
    add({ state, dispatch }, { audio, play }) {
      return new Promise((resolve) => {
        for (var i = 0; i < state.audios.length; i++) {
          var s = state.audios[i];
          if (s.id === audio.id) {
            state.audios.splice(i, 1);
            state.player.list.remove(i);
            i--;
          }
        }
        state.player.list.add(audio);
        state.audios.push(audio);
        if (play) {
          var index = state.audios.length;
          state.player.list.switch(index - 1);
          state.player.play();
        }
        dispatch(
          "acrou/db/set",
          {
            path: "audio.list",
            value: state.audios,
          },
          { root: true }
        );
        resolve();
      });
    },
    load({ state, dispatch }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        var audio = await dispatch(
          "acrou/db/get",
          {
            path: "audio.list",
            defaultValue: [],
          },
          { root: true }
        );
        state.audios = audio;
        resolve();
      });
    },
  },
};
