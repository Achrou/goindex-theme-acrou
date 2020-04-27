import Vue from 'vue'
import App from './App.vue'
import axios from '@utils/axios'
import VueAxios from 'vue-axios'

var styles = [
  // 'https://cdn.jsdelivr.net/npm/bulma@0.8.1/css/bulma.min.css',
  // 'https://cdn.jsdelivr.net/npm/bulma-tooltip@3.0.2/dist/css/bulma-tooltip.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',
]
styles.forEach(item=>{
  document.write(`<link rel="stylesheet" href="${item}">`);
})

document.write('<div id="app"></div>');

Vue.config.productionTip = false
Vue.use(VueAxios,axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
