import Vue from 'vue'
import Vuex from 'vuex'

import acrou from './modules/acrou'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    acrou
  }
})
