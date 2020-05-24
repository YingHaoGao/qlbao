<template>
  
  <div id="home" :options="option" :autoresize="true" v-loading="loading">
     <vue-element-loading :active="isActive" :is-full-screen="true"/>
    <div class="background_top"></div>
    <div class="background_center"></div>
    <div class="background_bottom">
      <div class="infoBox">
        <van-swipe class="my-swipe" indicator-color="white" @change="onChange">
          <van-swipe-item >
            <div class="box-item">
              <p class="iphoneNum">158****3456</p>
              <p class="text">对方已振铃</p>
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer1"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
            </div>
            </van-swipe-item>
             <div class="custom-indicator" slot="indicator">
             </div>
             <van-swipe-item>
            <div class="box-item">
              <p class="iphoneNum">158****3456</p>
              <p class="text">对方已振铃</p>
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer2"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
            </div>
          </van-swipe-item>
           <van-swipe-item>
            <div class="box-item">
              <p class="iphoneNum">158****3456</p>
              <p class="text">对方已振铃</p>
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer2"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
            </div>
             <div class="custom-indicator" slot="indicator">
        
              </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="box-item">
              <p class="iphoneNum">158****3456</p>
              <p class="text">对方已振铃</p>
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer2"
                :playsinline="true"
                :options="playerOptions"
              ></video-player>
            </div>
           
          </van-swipe-item>

        </van-swipe>
      </div>
    </div>

    <div class="footer">
      <div class="item">
      	<div class="view" @click="viewNumber" v-if="isView">查看号码</div>  
      </div>
      <div class="item">
      	<div class="open" @click="openNow" v-if="isOpen">立即开通</div>
      </div>
      <div class="item">
        <div class="continue" @click="continueOpen" v-if="isContinue" >继续开通</div>
      </div>
    </div>
    
  </div>
  
</template>

<script>
import {
    Loading
}
from 'element-ui'
export default {
  name: "Video",
  
  data() {
    return {
       loading: true,
       banner:["1","2","3"],
       isView :false,
       isOpen :false,
       isContinue:false,
       paystate:"",
       userIp :'',
       userId:'',
       usertype:'',
       order_id:'',
       playerOptions: {
        playbackRates:false, //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            type: "video/ogg",
            src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //url地址
          }
        ],
        poster:
          "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true,//全屏按钮
        }
      }
    };
  },
  beforeCreate(){
   
  },
  created(){
    this.loading=true
    this.getIp();
   },
  mounted(){
   
    this.loading=false;
    
    },
  methods:{
   startLoading: function() {
    loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
    })
  },
   endLoading: function() {
    loading.close()
    },
   yiDong:function() {
      var u = navigator.userAgent;
      var ua = window.navigator.userAgent.toLowerCase();//微信
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android終端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios終端
     if(ua.match(/MicroMessenger/i) == 'micromessenger'){
       this.usertype = "openid"
       getUrlParam();
       getCode ();
       getOpenId();
     } 
     else{
      this.usertype = "ip"
     }
    },
   
   //获取IP
    getIp () {
      let that = this,
       params = {
          }
      this.$http.fetch('TmpUser/getip')
        .then(res => {
          this.userIp = res.data.ip;
          this.getId();
        })
    },
  //获取id
    getId () {
      let that = this,
          params = {
           parm:this.userIp,
           type:"ip"
          }
      this.$http.fetch('TmpUser/getTmpUserId',params)
        .then(res => {
           this.userId =res.data.tmp_uid
           this.orderStatus();
           window.sessionStorage.setItem('distributor',this.userId);
           vue.prototype.$distributorId = this.userId;
           vue.prototype.$tmp_uid = this.userId;
        })
    },
  //根据临时用户ID查询订单
    orderStatus(){
      let that = this,
          params = {
           tmp_uid:this.userId,
          }
      this.$http.fetch('Order/stateus',params)
        .then(res => {
          this.order_id = res.id;
          if(res.state == undefined){
            this.isOpen=true;
            this.isContinue =false;
            this.isView =false;
          }
          else if(res.state == 0){
            this.isOpen=false;
            this.isContinue =true;
            this.isView =false;
          }
          else {
            this.isOpen=false;
            this.isContinue =false;
            this.isView =true;
          }
        }) 
      },
     getUrlParam(name) {//封装方法
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
       },
      getCode () { // 非静默授权，第一次有弹框
        const code = GetUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
        const local = window.location.href
        if (code == null || code === '') {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + window.APPID + '&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
        } else {
            this.getOpenId(code) //把code传给后台获取用户信息
        }
        },
      getOpenId (code) { // 通过code获取 openId等用户信息，/api/IDuserId/wechat/login 为后台接口
            let _this = this
            this.$http.post('/api/user/wechat/login', {code: code}).then((res) => {
                let datas = res.data
                if (datas.code === 0 ) {
                    console.log('成功')
                }
            }).catch((error) => {
                console.log(error)
            })
        },
     onTouchStart (e) {
        // this.clickIndex = 0; // 为了兼容安卓部分情况而加，如果不需要可忽略
        this.clickFlag = false;
      },
      // 用于判断滑动还是点击
      onTouchMove (e) {
        this.clickFlag = true;
        // 为了兼容安卓部分情况而加的判断，如果不需要可忽略，若需要，注释上面一行代码，打开下面三行代码
        // this.clickIndex = this.clickIndex + 1;
        // if (this.clickIndex > 2) {
        //   this.clickFlag = true;
        // }
      },
      onTouchEnd (position) {
        if (this.clickFlag) { // 滑动
          // console.log('滑动');
        } else { // 点击
          // console.log('点击');
          this.handleShowPic(position);
        }
      },
   
    //页面滑动视频停止播放
    onChange(index){
     this.$refs.videoPlayer1.player.pause()
    },  
    viewNumber() {
      this.$router.push({ path: "/payment" ,query:{
       order_id:this.order_id
    } });
    },
    openNow() {
     this.$router.push({ path: "/sign" });
    },
    continueOpen() {
      this.$router.push({ path: "/account",query:{
       order_id:this.order_id
    } });
    },

  }
};
</script>

<style lang="scss" scoped>
#home {
   box-sizing: border-box;
   width:100%;
   margin: 0 auto;
   position: relative;
  .background_top {
    height: 25.8rem;
    width: 100%;
    background: url(../assets/img/background_top.png) no-repeat center;
    background-size: cover;
  }
  .background_center {
    background-color: #29224e;
    height: 4.35rem;
    width: 100%;
  }
  .background_bottom {
    background: url(../assets/img/background_botom.png) no-repeat center;
    background-size: cover;
    width: 100%;
    height: 28.25rem;
    position: relative;
    .infoBox {
      position: absolute;
      top: -3.6rem;
      left: 0;
      width: 100%;
      height: 25.75rem;
      overflow: hidden;
    }
  }
  /deep/.van-swipe__indicators{
    background: #29224e !important;
  }
  .footer {
    width: 14rem;
    position: absolute;
    left: 50%;
    bottom: 2rem;
    transform: translate(-50%, 0);
    .open{
      background: #FD3B44;
    }
    .view{
      background: #FE772D;
    }
    .continue{
      background: -webkit-linear-gradient(left, #FE772D 0%,#FD3B44 100%);
    }
    }
    }
 .footer .item div{
   width: 100%;
   height: 2rem;
   line-height: 2rem;
   font-size: 0.8rem;
   color: #fff;
   border-radius: 1rem;
   text-align: center;
 }
.van-swipe-item {
  width: 100%;
  height: 25.75rem;
  float: left;
}
.van-swipe-item .box-item {
  margin: 0 auto;
  width: 14.4rem;
  height: 25.75rem;
  background: url(../assets/img/phone.png) no-repeat center;
  background-size: cover;
  border-radius: 2rem;
  position: relative;
}
/deep/.van-swipe__indicators{
  position: absolute;
  left: 50%;
  bottom:-1rem;
  transform: translate(-50%,0);
  height:0.4rem;
   width: 100%;
}
/deep/.van-swipe__indicator{
   height:1rem;
   width: 1rem;
   background: #29224e;
 }
.van-swipe-item .box-item .iphoneNum {
  position: absolute;
  left: 50%;
  top: 2.5rem;
  transform: translate(-50%);
  color: #ffff;
  font-size: 1.1rem;
}

.van-swipe-item .box-item .text {
  position: absolute;
  top: 4.5rem;
  left: 50%;
  transform: translate(-50%);
  color: #cacaca;
  font-size: 0.75rem;
}
.van-swipe-item .box-item .video-player {
  position: absolute;
  top: 7.7rem;
  left: 0.2rem;
  width: 14rem;
  height: 7.9rem;
  margin: 0 auto;
  .vjs_video_3 {
    width: 14rem;
    height: 7.9rem;
  }
}
/deep/.video-js .vjs-big-play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width:4rem;
  height: 4rem;
  border:none;
  border-radius:2rem;
  line-height: 4rem;
}
/deep/.vjs_video_3 {
  width: 14rem;
  height: 7.9rem;
}
/deep/.vjs-custom-skin > .video-js {
  width: 14rem;
  height: 7.9rem;
}
</style>