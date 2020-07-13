<template>
  <div
    id="home"
    :autoresize="true"
    style="height: none !important;"
    ref="home"
    :class="{full: size > 3.2}"
    v-loading="loading"
  >
    <!-- v-lazy:background-image="background" -->
    <img style="width: 100%" src="../assets/img/background1.png" alt />
    <!-- <div class="background_top"></div> -->
    <!-- <div class="background_center"></div> -->
    <!-- <div class="background_bottom"> -->
    <div class="infoBox" ref="infoBox">
      <van-swipe
        class="my-swipe"
        indicator-color="#79D4E4"
        @change="onChange"
        :loop="true"
        :width="310"
      >
        <van-swipe-item
          v-for="(item,index) in swiperList"
          :key="index"
          :class="seiperIndex == index ? 'active-item-one': 'videoPlayer1'"
        >
          <div class="box-item">
            <p class="iphoneNum">{{item.phone}}</p>
            <p class="text">{{item.text}}</p>
            <video-player
              class="video-player vjs-custom-skin"
              :ref="item.ref"
              :playsinline="true"
              :options="playerOptions[index]"
              x5-video-player-type="h5"
              x5-video-orientation="portraint"
              webkit-playsinline="true"
            ></video-player>
            <div class="thumbnail" v-if="index != seiperIndex || thumbnailShow">
              <img class="img" :src="require('../assets/thumb/thumbnail_' + index + '.jpg')">
              <img class="play" src="../assets/img/play.png" @click="play(index)">
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- </div> -->

    <div class="footer" v-if="!noBtn">
      <div class="item">
        <div class="view" @click="viewNumber" v-if="btnType == 2">查看号码</div>
      </div>
      <div class="item">
        <div class="open" @click="openNow" v-if="btnType == 0">立即开通</div>
      </div>
      <div class="item">
        <div class="continue" @click="continueOpen" v-if="btnType == 1">继续开通</div>
      </div>
      <div></div>
    </div>
    <!-- <iframe :src="src" frameborder="0" sandbox="allow-scripts allow-top-navigation allow-same-origin"></iframe> -->
    <div class="info certificate">
      <img src="../assets/img/证书.png" alt />
      <div class="info-inner">
        <van-swipe indicator-color="#1F71CE" :loop="true">
          <van-swipe-item>
            <img src="../assets/img/zhizhao.png" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img src="../assets/img/zhizhao2.png" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img src="../assets/img/zhizhao3.png" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img src="../assets/img/zhizhao4.png" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="info">
      <img src="../assets/img/理由.png" alt />
    </div>
    <div class="info contact">
      <img src="../assets/img/联系我们.png" alt />
      <div class="info-inner">
        <div>
          <p>联系人：罗云</p>
          <p>联系方式：15201203405</p>
          <p>邮箱：luo_yun@newautogroup.cn</p>
          <div class="qr-cord">
            <img src="../assets/img/qr-cord.png" alt />
            <div>更多问题请扫码联系我们</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TOOL from "../tools.js";
import CONFIG from "../../config/index.js";
import axios from "axios";
import $ from "jquery";
// import Swiper from "swiper"
import Background from "../assets/img/background0.png";
import thumbnail_0 from "../assets/thumb/thumbnail_0.jpg";
import thumbnail_1 from "../assets/thumb/thumbnail_1.jpg";
import thumbnail_2 from "../assets/thumb/thumbnail_2.jpg";
import thumbnail_3 from "../assets/thumb/thumbnail_3.jpg";

const wx = require("weixin-js-sdk");

export default {
  name: "Video",

  data() {
    return {
      company_id: false,
      tmp_uid: false,
      loading: true,
      background: Background,
      banner: ["1", "2", "3"],
      paystate: "",
      userIp: "",
      userId: "",
      thumbnailShow: true,
      usertype: "",
      playerOptions: [
        {
          playbackRates: false, //播放速度
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
              src: require("../assets/mp4/贵州酒中酒集团.mp4") // 本地
            }
          ],
          // poster: "../../static/video.png", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            fullscreenToggle: true //全屏按钮
          }
        },
        {
          playbackRates: false, //播放速度
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
              src: require("../assets/mp4/江西竹可健竹汁饮料有限公司.mp4") // 本地
            }
          ],
          // poster: "../../static/video.png", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            fullscreenToggle: true //全屏按钮
          }
        },
        {
          playbackRates: false, //播放速度
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
              src: require("../assets/mp4/燕之屋.mp4") // 本地
            }
          ],
          width: document.documentElement.clientWidth,
          notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            fullscreenToggle: true //全屏按钮
          }
        },
        {
          playbackRates: false, //播放速度
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
              src: require("../assets/mp4/铭门盛宴.mp4") // 本地
            }
          ],
          width: document.documentElement.clientWidth,
          notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
            remainingTimeDisplay: false,
            fullscreenToggle: true //全屏按钮
          }
        }
      ],
      load: false,
      size: false,
      // ip or openid
      codeType: "ip",
      // 显示按钮
      btnType: 0,
      src: "",
      noBtn: false,

      // Boxin Star
      seiperIndex: 0,
      swiperList: [
        {
          phone: "158****3456",
          text: "对方已振铃",
          ref: "videoPlayer1"
        },
        {
          phone: "158****3456",
          text: "对方已振铃",
          ref: "videoPlayer2"
        },
        {
          phone: "158****3456",
          text: "对方已振铃",
          ref: "videoPlayer3"
        },
        {
          phone: "158****3456",
          text: "对方已振铃",
          ref: "videoPlayer4"
        }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(_this => {
      _this.getAccessToken();
    });
  },
  created() {
    // this.$global.agent_id = this.getUrlKey("id");
    let id = this.GetQueryValue1('id');

    if(id != null && id != '') {
      this.$global.agent_id = id;
    }else {
      this.$global.agent_id = parseInt(this.getQueryStringByName('id'));
    }
    // this.noBtn = this.getUrlKey("no_btn");
    let no_btn = this.GetQueryValue1('no_btn');

    if(no_btn != null && no_btn != '') {
      this.no_btn = no_btn;
    }else {
      this.no_btn = parseInt(this.getQueryStringByName('no_btn'));
    }
    if (this.noBtn) return;

    this.load = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });

    if (TOOL.getFacility() == "Weixin") {
      let openid = this.getUrlKey("openid");
      // let openid = 'olWi6wv5MGVNfYTHb-dj86bFkqF8';
      TOOL.alert("url openid = " + openid);
      if (openid) {
        this.$global.parm = openid;
        this.$global.browser = "openid";
        localStorage.setItem("openid", openid);
        // TOOL.alert('openid = ' + openid)
        this.getId(openid, "openid");
      } else {
        // this.accredit();
        alert("openid获取失败，请刷新重试");
      }
    } else {
      // TOOL.alert('ip')
      this.getIp();
    }
  },
  mounted() {
    let offsetHeight = this.$refs.home.offsetHeight;
    let offsetWidth = this.$refs.home.offsetWidth;
    console.log(offsetHeight, offsetWidth);
    this.size = offsetHeight / offsetWidth;
    this.$refs.infoBox.style.paddingLeft = (offsetWidth - 288) / 2 + "px";
    this.$refs.infoBox.style.paddingRight = (offsetWidth - 288) / 2 + "px";
  },
  methods: {
    GetQueryValue1(name) {
       let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      if(window.location.hash.indexOf("?") < 0){
              return null;
      }
      let r = window.location.hash.split("?")[1].match(reg); 　　
      if (r != null) return decodeURIComponent(r[2]); 
  　　    return null;
    },
    //获取url参数
    getUrlKey(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    getQueryStringByName(name) {
      var result = location.href.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
      if (result == null || result.length < 1) {
          return "";
      }
      return result[1];
    },
    //获取IP
    getIp() {
      let that = this,
        params = {};
      this.$http.fetch("TmpUser/getip").then(res => {
        this.userIp = res.data.ip;
        that.$global.parm = res.data.ip;
        that.$global.browser = "ip";
        this.getId(res.data.ip, "ip");
      });
    },
    //获取id
    getId(parm, type) {
      let that = this,
        params = {
          parm: parm,
          type: type
        };
      // TOOL.alert('根据 ' + type + ' = ' + parm + ' 开始获取tmp_uid')

      this.$http
        .fetch("TmpUser/getTmpUserId", params)
        .then(res => {
          if (res.errNo == 0) {
            that.$global.tmp_uid = res.data.tmp_uid;
            that.tmp_uid = res.data.tmp_uid;
            TOOL.alert(
              "根据 " +
                type +
                " = " +
                parm +
                " 获取到company_id = " +
                res.data.company_id
            );
            if (that.load) {
              that.load.close();
            }
            if (res.data && res.data.company_id != null) {
              that.btnType = 1;
              this.userId = res.data.tmp_uid;
              that.$global.company_id = res.data.company_id;
              this.company_id = res.data.company_id;
              // TOOL.alert('tmp_uid = ' + that.$global.tmp_uid + ', company_id = ' + res.data.company_id)
              that.orderStatus();
            } else {
              // 初次开通
              this.btnType = 0;
            }
          }
        })
        .catch(() => {
          if (that.load) {
            that.load.close();
          }
        });
    },

    // 查询用户注册状态
    inquireSign(fn) {
      let that = this;
      // TOOL.alert('根据 ' + that.$global.browser + ' = ' + that.$global.parm + ' 查询用户注册状态')
      that.$http
        .fetch("TmpUser/getTmpUserId", {
          parm: that.$global.parm,
          type: that.$global.browser
        })
        .then(res => {
          if (res.errNo == 0) {
            if (res.data && !!fn && res.data.company_id != null) {
              that.btnType = 1;
              that.$global.tmp_uid = res.data.tmp_uid;
              that.tmp_uid = res.data.tmp_uid;
              that.$global.company_id = res.data.company_id;
              that.company_id = res.data.company_id;
              TOOL.alert("company_id = " + res.data.company_id);
              fn();
            } else {
              // 初次开通
              this.btnType = 0;
            }
          }
        });
    },
    //根据临时用户ID查询订单
    orderStatus() {
      let that = this,
        params = {
          tmp_uid: that.userId,
          company_id: that.company_id
        };

      TOOL.alert("tmp_uid = " + params.tmp_uid);
      this.$http.fetch("Order/stateus", params).then(res => {
        if (res.errNo == 0 && res.data && res.data.length > 0) {
          TOOL.alert("订单id = " + JSON.stringify(res.data));

          this.btnType = 2;
          res.data.some(order => {
            if (order.state == 0) {
              // 未支付
              this.btnType = 1;
              return true;
            }
            return false;
          });
        }
      });
    },
    // 获取access_token
    getAccessToken(fn) {
      let that = this;

      that.$http
        .fetch(
          "/accessToken",
          {
            client_id: that.$global.client_id,
            secret: that.$global.secret
          },
          that,
          true
        )
        .then(res => {
          if (res.errNo == 0) {
            localStorage.setItem("access_token", res.access_token);
            // that.custom();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 微信授权
    accredit() {
      let that = this;

      that.src = `http://api.meisheapp.com/v1/weixin/authorize?access_token=${localStorage.getItem(
        "access_token"
      )}&redirect=${encodeURIComponent(location.href.split("#")[0])}`;
      TOOL.alert(that.src);
    },

    onTouchStart(e) {
      // this.clickIndex = 0; // 为了兼容安卓部分情况而加，如果不需要可忽略
      this.clickFlag = false;
    },
    // 用于判断滑动还是点击
    onTouchMove(e) {
      this.clickFlag = true;
    },
    onTouchEnd(position) {
      if (this.clickFlag) {
        // 滑动
        // console.log('滑动');
      } else {
        // 点击
        // console.log('点击');
        this.handleShowPic(position);
      }
    },
    // 点击缩略图
    play(index) {
      this.thumbnailShow = false;

      if (index === 1) {
        this.$refs.videoPlayer1[0].player.pause();
        this.$refs.videoPlayer3[0].player.pause();
        this.$refs.videoPlayer4[0].player.pause();
        this.$refs.videoPlayer2[0].player.play();
      } else if (index === 2) {
        this.$refs.videoPlayer1[0].player.pause();
        this.$refs.videoPlayer2[0].player.pause();
        this.$refs.videoPlayer4[0].player.pause();
        this.$refs.videoPlayer3[0].player.play();
      } else if (index === 3) {
        this.$refs.videoPlayer3[0].player.pause();
        this.$refs.videoPlayer1[0].player.pause();
        this.$refs.videoPlayer2[0].player.pause();
        this.$refs.videoPlayer4[0].player.play();
      } else if (index === 0) {
        this.$refs.videoPlayer2[0].player.pause();
        this.$refs.videoPlayer3[0].player.pause();
        this.$refs.videoPlayer4[0].player.pause();
        this.$refs.videoPlayer1[0].player.play();
      }
    },
    //页面滑动视频停止播放
    onChange(index) {
      this.seiperIndex = index;
      this.thumbnailShow = true;
      // console.log(this.$refs.videoPlayer1[0]);
      if (this.seiperIndex === 1) {
        this.$refs.videoPlayer1[0].player.pause();
        this.$refs.videoPlayer3[0].player.pause();
        this.$refs.videoPlayer4[0].player.pause();
      } else if (this.seiperIndex === 2) {
        this.$refs.videoPlayer1[0].player.pause();
        this.$refs.videoPlayer2[0].player.pause();
        this.$refs.videoPlayer4[0].player.pause();
      } else if (this.seiperIndex === 3) {
        this.$refs.videoPlayer3[0].player.pause();
        this.$refs.videoPlayer1[0].player.pause();
        this.$refs.videoPlayer2[0].player.pause();
      } else if (this.seiperIndex === 0) {
        this.$refs.videoPlayer2[0].player.pause();
        this.$refs.videoPlayer3[0].player.pause();
        this.$refs.videoPlayer4[0].player.pause();
      }
      if (index == 0) {
        setTimeout(() => {
          let w1 = $(".infoBox .van-swipe__track").width();
          let w2 = $(".infoBox .active-item-one").width();

          $(".infoBox .van-swipe__track").attr(
            "style",
            "width:" + w1 + "px;transform: translateX(0px)"
          );
          $(".infoBox .active-item-one").attr(
            "style",
            "width:" + w2 + "px;transform: translateX(0px)"
          );
        }, 300);
      }
      // this.$refs.videoPlayer1.player.pause();
    },
    viewNumber() {
      let that = this;
      //  this.$router.push({ path: "/payment" ,query:{
      //   company_id: this.company_id
      // } });
      window.location.href = `${CONFIG.SHARE}#/payment?company_id=${that.company_id}&tmp_uid=${that.tmp_uid}&form=home`;
    },
    openNow() {
      let that = this;
      // this.$router.push({ path: "/sign", query: {
      //  tmp_uid: that.tmp_uid,
      //   company_id: that.company_id
      // } });
      window.location.href = `${CONFIG.SHARE}#/sign?company_id=${that.company_id}&tmp_uid=${that.tmp_uid}`;
    },
    continueOpen() {
      let that = this;

      // this.$router.push({ path: window.location.href.split('?')[0] + "/account", query: {
      //    company_id: that.company_id
      // } });
      window.location.href = `${CONFIG.SHARE}#/account?company_id=${that.company_id}&tmp_uid=${that.tmp_uid}`;
      // window.location.href = `${
      //   window.location.href.split("?")[0]
      // }#/account?company_id=${that.company_id}&tmp_uid=${that.tmp_uid}`;
    }
  }
};
</script>

<style lang="scss" scoped>
#home {
  background: #DFFAFF;
}
.thumbnail {
  position: absolute;
  top: 7.7rem;
  left: .2rem;
  width: 14rem;
  height: 8rem;
  margin: 0 auto;
  z-index: 1;

  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .play {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
  }
}
#home {
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  position: relative;
  background-size: cover;
  top: 2rem;
  overflow: hidden;

  &.full {
    background-size: 100% 100% !important;
  }

  iframe {
    display: none;
  }

  .background_top {
    height: 25.8rem;
    width: 100%;
    background-size: cover;
  }
  .background_center {
    background-color: #29224e;
    height: 4.35rem;
    width: 100%;
  }
  .van-swipe-item {
    float: left;
  }

  /deep/.van-swipe__indicators {
    width: 100%;
    text-align: center;
  }
  /deep/.van-swipe__indicator {
    display: inline-block;
    border-radius: 50%;
    &:last-child {
      margin-right: 0 !important;
    }
  }

  .infoBox {
    padding-top: 20px;
    background: url(../assets/img/bg.png) no-repeat center;
    background-size: cover;

    .van-swipe-item .box-item {
      width: 14.4rem;
      height: 25.75rem;
      background: url(../assets/img/phone.png) no-repeat center;
      background-size: cover;
      border-radius: 2rem;
      position: relative;
    }
    /deep/.van-swipe__indicators {
      width: 100%;
      text-align: center;
    }
    /deep/.van-swipe__indicator {
      height: 8px;
      width: 8px;
      background: #ffffff;
      margin-right: 10px;
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
      height: 8rem;
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
      width: 4rem;
      height: 4rem;
      border: none;
      border-radius: 2rem;
      line-height: 4rem;
    }
    /deep/.vjs_video_3 {
      width: 14rem;
      height: 7.9rem;
    }
    /deep/.vjs-custom-skin > .video-js {
      width: 14rem;
      height: 8rem;
    }
  }

  .footer {
    width: 14rem;
    margin: auto;
    position: fixed;
    bottom: 0.8rem;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 10;

    .open {
      background: #FE772D;
      font-weight: bold;
      letter-spacing: 4px;
    }
    .view {
      background: #FE772D;
      font-weight: bold;
      letter-spacing: 4px;
    }
    .continue {
      background: #FE772D;
      font-weight: bold;
      letter-spacing: 4px;
    }
    .item div {
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      font-size: 0.9rem;
      color: #fff;
      border-radius: 1rem;
      text-align: center;
    }
  }

  .info {
    padding: 10px;
    position: relative;
    > img {
      width: 100%;
    }
    .info-inner {
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
    }
  }
  .certificate {
    .info-inner {
      overflow: hidden;
      .van-swipe {
        text-align: center;
        margin-top: 30%;
      }
      img {
        width: 90%;
      }
    }
    /deep/.van-swipe__indicator {
      height: 12px;
      width: 12px;
      background: #79d4e4;
      margin-right: 30px;
    }
  }

  .contact {
    padding-bottom: 70px;
    color: #333;
    font-size: 15px;
    font-weight: bold;
    .info-inner {
      > div {
        margin-top: 12%;
        > p {
          margin-left: 12%;
          margin-bottom: 1%;
        }
        .qr-cord {
          margin-top: 6%;
          text-align: center;
          img {
            width: 104px;
          }
          div {
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
