<template>
  <div id="account">
  	<div class="radio">
  		<el-radio-group v-model="radio">
	      <el-radio-button label="3个月">3个月</el-radio-button>
	      <el-radio-button label="6个月">6个月</el-radio-button>
	      <el-radio-button label="12个月">12个月</el-radio-button>
	    </el-radio-group>
  	</div>
    <div class="input">
    	<el-input v-model="num" placeholder="请输入开通号码数量"></el-input>
    </div>
    <div class="text">
    	计费说明：10元/人/月
    </div>
    <div class="footer">
      <div class="money">
      	订单金额：
      	<span>￥{{money}}</span>
      </div>
      <el-button type="primary" @click="onSubmit" round>立即付款</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  props: {
    
  },
  data() {
  	return {
  		money: 0,
  		radio: '',
  		num: ''
  	}
  },
  methods: {
  	// 立即付款
  	onSubmit () {

  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#account {
  box-sizing: border-box;
  padding: 2rem 1rem 0rem 1rem;

  .radio {
  	text-align: center;
  	margin-bottom: 2rem;
  }
  .input {
  	margin-bottom: 1rem;
  }
  .text {
  	font-size: 0.8rem;
  	color: rgba(0,0,0,.5)
  }
  .money {
  	span {
  		color: red;
  	}
  }
  .footer {
    width: 14rem;
    position: fixed;
    left: 50%;
    bottom: 2rem;
    transform: translate(-50%, 0);

    button {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
}
</style>
