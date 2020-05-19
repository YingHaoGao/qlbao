<template>
  <div id="share">
  	<div class="text">
  		二维码分享给员工填写号码
  	</div>
  	<div class="img">
      <div id="qrcode" ref="qrcode"></div>
  	</div>
  	<div class="buttons">
  		<el-button type="primary" @click="onShare" round>分享微信好友</el-button>
  	</div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import CONFIG from "../config.js";
import TOOL from '../tools.js'

export default {
  name: 'share',
  props: {
    
  },
  mounted() {
    this.$nextTick(() => {
      this.qrcode();
    });
  },
  data () {
  	return {
  		code: ''
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

  .text {
  	text-align: center;
  }
  .img {
  	position: relative;
  	text-align: center;
  	height: 60%;
  	width: 100%;

  	#qrcode {
  		position: absolute;
  		width: 100%;
  		top: 50%;
  		left: 0;
  		transform: translate(0,-50%);
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
