import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import { http } from './http.js'
import CONFIG from '../config'

import 'element-ui/lib/theme-chalk/index.css'

require('./mock/index.js');

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$http = http;
Vue.prototype.$config = CONFIG;
Vue.prototype.$distributorId = 23;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
