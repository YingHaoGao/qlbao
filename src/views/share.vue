<template>
  <div id="share">
  	<div class="text">
  		二维码分享给员工填写号码
  	</div>
  	<div class="img">
      <a href="javascript:void(0);" v-if="isIOS">
        <div id="qrcode" ref="qrcode"></div>
      </a>
      <div id="img" v-if="!isIOS">
        <img :src="img" style="width: 100%;">
      </div>
  	</div>
  	<div class="buttons">
  		<el-button type="primary" @click="onShare" round>分享微信好友</el-button>
  	</div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import CONFIG from "../../config/index.js";
import TOOL from '../tools.js'
import IMG from '../../public/code.jpg'

export default {
  name: 'share',
  props: {
    
  },
  created() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

    if (isAndroid) {
      this.isIOS = false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.qrcode();
    });
  },
  data () {
  	return {
      img: IMG,
  		code: '',
      isIOS: true
  	}
  },
  methods: {
  	// 分享微信好友
  	onShare () {
      TOOL.share();
  	},
    // 生成二维码参数
    qrcode () {
      let that = this;
      let clientWidth = document.body.clientWidth,
          width = clientWidth * 0.8;

      let qrcode = new QRCode("qrcode", {
          width: width, // 二维码宽度，单位像素
          height: width, // 二维码高度，单位像素
          text: CONFIG.HTTP + "/sign.html?distributorId=" + this.$distributorId
        });
      console.log('分享链接： ' + CONFIG.HTTP + "/sign.html?distributorId=" + this.$distributorId)
    }
  }
}
</script>

<style lang="scss" scoped>
#share {
  box-sizing: border-box;
  padding: 1rem 1rem 0rem 1rem;
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;

  .text {
  	text-align: center;
  }
  .img {
  	position: relative;
  	text-align: center;
  	height: 60%;
  	width: 100%;

  	#qrcode,#img {
  		width: 100%;
      margin-top: 1rem;
  	}
  }
  .buttons {
  	button {
  		display: block;
  		width: 100%;
  		margin: 0rem;
  		margin-bottom: 1rem;
  	}
  }
}
</style>
