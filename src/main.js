import Vue from 'vue'
import App from './App.vue'
import axios from '@utils/axios'
import VueAxios from 'vue-axios'
import router from './router'
import i18n from './i18n'
import "@/assets/style/theme/register.scss"

Vue.config.productionTip = false
Vue.use(VueAxios,axios)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
