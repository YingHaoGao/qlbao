<template>
  <div id="tabHead">
  	<div class="left">
  		<div class="back" @click="toBack">
	  		<i class="iconfont" v-html="'&#xe653;'"></i>
	  	</div>
	  	<div class="close" @click="toClose">
	  		<i class="iconfont" v-html="'&#xe61a;'"></i>
	  	</div>
  	</div>
  	<div class="title">{{title}}</div>
  	<div class="right">
  		<div v-if="isShare" class="share" @click="toShare">
	  		<i class="iconfont" v-html="'&#xe639;'"></i>
	  	</div>
  	</div>
  </div>
</template>

<script>
import TOOL from '../tools.js'

export default {
  name: 'tabHead',
  created() {
  	this.isShare = this.$route.meta.isShare;
  },
  data () {
  	var title = this.$route.meta.title
  	return {
  		title: title,
  		isShare: false
  	}
  },
  watch: {
	  $route: {
	    handler: function(val, oldVal){
	      this.title = val.meta.title;
	      this.isShare = this.$route.meta.isShare;
	    },
	    deep: true
	  }
	},
	methods: {
		// 返回
		toBack () {
			this.$router.go(-1);
		},
		// 关闭
		toClose () {
			window.open("about:blank","_self").close()
		},
		// 分享
		toShare () {
			TOOL.share();
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#tabHead{
	height: 2rem;
	box-sizing: border-box;
	width: 100%;
	padding: 0.25rem 0rem;
	font-size: 1rem;
	position: relative;
	overflow: hidden;
	line-height: 1.5rem;

	.left,.right {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		z-index: 1;
	}
	.left {
		left: 0rem;
	}
	.right {
		right: 0rem;
	}
	.back,.close,.share {
		display: inline-block;
		padding: 0rem 0.25rem 0rem 0.5rem;
		cursor: pointer;
		transform: all 300ms;

		&:hover {
			// background-color: rgba(173,225,245,.6);
		}

		.iconfont {
			font-size: 1rem;
		}
	}
	.share{
		padding: 0rem 0.5rem 0rem 0.25rem;
	}
	.title {
		width: 100%;
		text-align: center;
	}
}
</style>
