import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/index.scss'

import * as filters from './filters'; // 全局vue filter
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
