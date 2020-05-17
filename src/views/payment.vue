<template>
  <div id="payment">
  	<div class="buttons">
  		<el-button type="primary" @click="onDredge">拟开通号码</el-button>
  		<el-button @click="onCreate">生成我的邀请卡</el-button>
  	</div>
  	<div class="names">
  		<div class="name" v-for="(item, idx) in list" :key="idx">
  			{{item.name}} {{item.phone}} {{item.operator}}
  		</div>
  	</div>
  	<div class="type">
  		状态：{{typeNC}}
  	</div>
  	<div class="code">
  		二维码分享给员工填写号码
  	</div>
  </div>
</template>

<script>
export default {
  name: 'payment',
  props: {
    
  },
  created () {
  	this.getInfo();
  },
  watch: {
  	type(val) {
  		let typeNC = ''
  		switch(val) {
  			case 0:
  				typeNC = '未提交';
  				break;
  			default:
  				typeNC = '获取失败';
  		}

  		this.typeNC = typeNC;
  	}
  },
  data () {
  	return {
  		list: [
  			{
  				name: 'dasdas',
  				phone: '18600408534',
  				operator: '中国联通'
  			},
  			{
  				name: 'dasdas',
  				phone: '18600408534',
  				operator: '中国联通'
  			},
  			{
  				name: 'dasdas',
  				phone: '18600408534',
  				operator: '中国联通'
  			},
  		],
  		type: '',
  		typeNC: ''
  	}
  },
  methods: {
  	// 获取信息
  	getInfo () {
  		// this.$axios.get('',{
    //     params:{
            
    //     }
	   //  }).then(function(res){
    //     this.list = res.data;
	   //  }).catch(function (error) {
    //     console.log(error);
	   //  });
  	},
  	// 拟开通号码
  	onDredge () {

  	},
  	// 生成我的邀请卡
  	onCreate () {

  	}
  }
}
</script>

<style lang="scss" scoped>
#payment {
  box-sizing: border-box;
  padding: 1rem 1rem 0rem 1rem;

	.buttons {
		button {
			width: 49%;
		}
		button:first-child {
			margin-right: 2%;
		}
		button:last-child {
			margin-left: 0;
		}
	}
	.names {
		padding-top: 1rem;
		margin-bottom: 1rem; 

		.name {
			font-size: 0.7rem;
		}
	}
	.type {
		padding: 2rem 0rem;
		text-align: center;
		font-size: 1.4rem;
	}
	.code {
		text-align: center;
		font-size: 0.8rem;
	}
}
</style>
