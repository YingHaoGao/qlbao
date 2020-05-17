<template>
  <div id="share">
  	<div class="text">
  		二维码分享给员工填写号码
  	</div>
  	<div class="img">
  		<img :src="code">
  	</div>
  	<div class="buttons">
  		<el-button type="primary" @click="onShare" round>分享微信好友</el-button>
  		<el-button type="primary" @click="onSave" round>长按保存</el-button>
  	</div>
  </div>
</template>

<script>
import code from '../assets/logo.png'
export default {
  name: 'share',
  props: {
    
  },
  created () {
  	this.getCode();
  },
  data () {
  	return {
  		code: ''
  	}
  },
  methods: {
  	// 获取二维码
  	getCode () {
  		this.code = code
  	},
  	// 长按保存
  	onSave () {

  	},
  	// 分享微信好友
  	onShare () {

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

  	img {
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
