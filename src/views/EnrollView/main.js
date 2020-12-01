import Vue from 'vue'
import '@/common/vant'
import 'normalize.css/normalize.css'
import App from './index.vue'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
