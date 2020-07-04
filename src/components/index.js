import Vue from 'vue'
import notify from './notification'

Vue.prototype.$notify = notify

Vue.component('markdown', () => import('./markdown'))
