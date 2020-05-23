<template>
  <div id="pay">
    <div class="background_top"></div>
    <div class="background_center"></div>
    <div class="background_bottom">
      <div class="infoBox">
        <van-swipe class="my-swipe" indicator-color="white" @change="onChange">
          <van-swipe-item>
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
      <!-- <div class="item">
      	<el-button type="success" @click="viewNumber" round>查看号码</el-button>
      </div>
      <div class="item">
      	<el-button type="primary" @click="openNow" round>立即开通</el-button>
      </div>-->
      <div class="item">
        <el-button type="warning" @click="continueOpen" round>继续开通</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Video",
  data() {
    return {
       userIp :"",
       userId:'',
       usertype:'',
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
 mounted(){
    this.getIp()
  },
  methods:{
    getIp () {
      let that = this,
       params = {
          }
      this.$http.fetch('TmpUser/getip')
        .then(res => {
          console.log(res);
          this.userIp = res.data.ip;
          this.getId();
        })
    },
    getId () {
      let that = this,
          params = {
           parm:this.userIp,
           type:"ip"
          }
      this.$http.fetch('TmpUser/getTmpUserId',params)
        .then(res => {
          console.log(res);
        })
    },
     getUrlParam(name) {//封装方法
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
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
        getOpenId (code) { // 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口
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
    


  //  页面滑动视频停止播放
   onChange(index){
     this.$refs.videoPlayer1.player.pause()
    },  
    viewNumber() {
      this.$router.push({ path: "/payment" });
    },
    openNow() {
      this.$router.push({ path: "/" });
    },
    continueOpen() {
      this.$router.push({ path: "/account" });
    },

  }
};
</script>

<style lang="scss" scoped>
#pay {
  box-sizing: border-box;
  width: 18.75rem;
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
      width: 18.75rem;
      height: 25.75rem;
      overflow: hidden;
    }
  }

  .footer {
    width: 14rem;
    position: absolute;
    left: 50%;
    bottom: 2rem;
    transform: translate(-50%, 0);
    button {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
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