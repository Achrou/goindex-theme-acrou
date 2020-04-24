import Vue from 'vue'
import App from './App.vue'
import axios from '@utils/axios'
import VueAxios from 'vue-axios'
// import bulma from 'bulma'

var styles = [
  // 'https://cdn.jsdelivr.net/npm/bulma@0.8.1/css/bulma.min.css',
  // 'https://cdn.jsdelivr.net/npm/bulma-tooltip@3.0.2/dist/css/bulma-tooltip.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',
]
styles.forEach(item=>{
  document.write(`<link rel="stylesheet" href="${item}">`);
})

// document.write(
//   `<style>.icon{width:2em;height:2em;vertical-align:-0.5em;fill:currentColor;overflow:hidden;}th,td{border:0 !important;}.breadcrumb:not(:last-child){margin:0.5rem 0;padding:0 0.75em;}.breadcrumb ul{flex-wrap:inherit;}.breadcrumb li:not(:first-child):not(:last-child){margin:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
//     body {
//       overflow: hidden;
//     }
//     .section {
//       padding: 0.5rem 0.5rem 1.5rem 0.5rem;
//     }
//     .container {
//       max-width: 980px !important;
//     }
//     .table{
//       width:100%;
//       table-layout: fixed;
//     }
//     .table td{
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//     }
//     .no-content {
//       background: url(https://s1.hdslb.com/bfs/static/jinkela/search/asserts/no-data.png) no-repeat 50% 50%;
//       height: 240px;
//       line-height: 240px;
//       text-align: center;
//       margin-top: 20px;
//     }
//   </style>`
// );

Vue.config.productionTip = false
// Vue.use(bulma)
Vue.use(VueAxios,axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
