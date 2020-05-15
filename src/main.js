import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/icon.css'
import 'element-ui/lib/theme-chalk/notification.css'
import 'element-ui/lib/theme-chalk/loading.css'
import axios from '@utils/axios'
import VueAxios from 'vue-axios'
import router from './router'
import i18n from './i18n'
// store
import store from '@/store/index'
import VueClipboard from 'vue-clipboard2'
import infiniteScroll from 'vue-infinite-scroll'
import "@/assets/style/theme/register.scss"

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios,axios)
Vue.use(VueClipboard)
Vue.use(infiniteScroll)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  mounted() {
    this.$store.dispatch('acrou/view/load')
  }
}).$mount('#app')
