import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from '@utils/axios'
import VueAxios from 'vue-axios'
import router from './router'
import i18n from './i18n'
import "@/assets/style/theme/register.scss"

document.write('<div id="app"></div>')

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VueAxios,axios)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
