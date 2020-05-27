import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import { http } from './http.js'
import CONFIG from '../config'
import { Swipe, SwipeItem } from 'vant'
import VideoPlayer from 'vue-video-player'

import 'element-ui/lib/theme-chalk/index.css'

const wx = require("weixin-js-sdk");
require('./mock/index.js');
require('video.js/dist/video-js.css');

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VideoPlayer);
Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.prototype.$wx = wx;
Vue.prototype.$http = http;
Vue.prototype.$config = CONFIG;
Vue.prototype.$distributorId = 23;
Vue.prototype.$tmp_uid = false;
// 账号id
Vue.prototype.$client_id = 'msd0c28f00413d6c95';
// 账号密码
Vue.prototype.$secret = 'a89c4996d0c28f00413d6c95ff6e4a2a';
// token
Vue.prototype.$access_token = false;

var ua = navigator.userAgent.toLowerCase();  
if(ua.match(/MicroMessenger/i)=="micromessenger") {    
	Vue.prototype.$parm = returnCitySN["cip"];
	Vue.prototype.$browser = 'ip';
} else {  
  Vue.prototype.$parm = ''; 
	Vue.prototype.$browser = 'openid';
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
