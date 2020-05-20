<template>
  <div id="payment">
  	<div class="buttons">
  		<el-button type="primary" @click="onNewPhone">添加新号码</el-button>
  		<el-button @click="onCreate">生成我的邀请卡</el-button>
  	</div>
  	<div class="names">
  		<div class="name" v-for="(item, idx) in list" :key="idx">
  			{{item.name}} {{item.phone}} {{item.operator}} {{typeToNc(item.type)}}
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
  mounted () {
    this.$alert('公司管理员可登陆 www.weuq.com 网页统一添加号码', '提示');
  },
  watch: {
  	type(val) {
  		let typeNC = ''
  		switch(val) {
  			case 0:
  				typeNC = '未提交';
  				break;
        case 1:
          typeNC = '审核中';
          break;
        case 2:
          typeNC = '审核失败';
          break;
        case 3:
          typeNC = '审核成功';
          break;
  			default:
  				typeNC = '获取失败';
  		}

  		this.typeNC = typeNC;
  	}
  },
  data () {
  	return {
  		list: [],
  		type: '',
  		typeNC: ''
  	}
  },
  methods: {
  	// 获取信息
  	getInfo () {
      let that = this,
          params = {
            distributorId: that.$distributorId
          };

  		this.$axios.get('/api/getType',{params})
        .then(function(res){
          that.list = res.data.list;
          that.type = res.data.type;
  	    });
  	},
  	// 添加新号码
  	onNewPhone () {
      this.$router.push({path: '/account', query: {type: 1}});
  	},
  	// 生成我的邀请卡
  	onCreate () {
      this.$router.push({path: '/share'});
  	},
    // 联系人状态转换
    typeToNc (t) {
      let typeNC = ''
      switch(t) {
        case 0:
          typeNC = '未提交';
          break;
        case 1:
          typeNC = '已提交';
          break;
      }

      return typeNC
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
