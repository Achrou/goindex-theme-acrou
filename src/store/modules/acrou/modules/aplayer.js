export default {
  namespaced: true,
  state: {
    player: null,
    audios: [],
    openedAudios: [],
    customAudios: window.themeOptions.audio.audios || [],
  },
  actions: {
    set({ state }, player) {
      state.player = player;
    },
    add({ state, dispatch }, { audio, play }) {
      return new Promise((resolve) => {
        var index = state.openedAudios.findIndex((s) => s.id === audio.id);
        if (index >= 0) {
          state.openedAudios.splice(index, 1);
          state.player.list.remove(index + state.customAudios.length || 0);
        }
        state.player.list.add(audio);
        state.openedAudios.push(audio);
        if (play) {
          var length = state.player.list.audios.length || 1;
          state.player.list.switch(length - 1);
          state.player.play();
        }
        dispatch(
          "acrou/db/set",
          {
            path: "audio.list",
            value: state.openedAudios,
          },
          { root: true }
        );
        resolve();
      });
    },
    load({ state, dispatch }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        var openedAudios = await dispatch(
          "acrou/db/get",
          {
            path: "audio.list",
            defaultValue: [],
          },
          { root: true }
        );
        state.openedAudios = openedAudios
        state.audios = state.customAudios.concat(openedAudios);
        resolve();
      });
    },
  },
};
