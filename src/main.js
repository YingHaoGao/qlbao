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

require('./mock/index.js');
require('video.js/dist/video-js.css');

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VideoPlayer);
Vue.use(Swipe);
Vue.use(SwipeItem);

Vue.prototype.$http = http;
Vue.prototype.$config = CONFIG;
Vue.prototype.$distributorId = 23;
Vue.prototype.$tmp_uid = false;

var ua = navigator.userAgent.toLowerCase();  
if(ua.match(/MicroMessenger/i)=="micromessenger") {    
	Vue.prototype.$parm = returnCitySN["cip"];
	Vue.prototype.$browser = 'ip';
} else {  
  Vue.prototype.$parm = returnCitySN["cip"]; 
	Vue.prototype.$browser = 'openid';
}  

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
