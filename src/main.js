import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import { http } from './http.js'
import CONFIG from '../config'
import { Swipe, SwipeItem } from 'vant'
import VideoPlayer from 'vue-video-player'
import { Lazyload } from 'vant';

import 'element-ui/lib/theme-chalk/index.css'

const wx = require("weixin-js-sdk");
require('./mock/index.js');
require('video.js/dist/video-js.css');

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VideoPlayer);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);

Vue.prototype.$wx = wx;
Vue.prototype.$http = http;
Vue.prototype.$config = CONFIG;

new Vue({
  router,
  data() {
  	return {
      // 代理商id
      agent_id: 0,
      // 企业id
      company_pid: false,
      // 临时用户id
      tmp_uid: false,
      // 账号id
      client_id: 'msd0c28f00413d6c95',
      // 账号密码
      secret: 'a89c4996d0c28f00413d6c95ff6e4a2a',
      // token
      access_token: false,
      browser: '',
      parm: ''
  	}
  },
  render: h => h(App)
}).$mount('#app')
