<template>
  <div id="pay">
  	<div class="footer">
      <div class="item">
      	<el-button type="success" @click="onWeiXin" round>微信付款</el-button>
      	<div class="text">调用微信付款页面</div>
      </div>
      <div class="item">
      	<el-button type="primary" @click="onAliPay" round>支付宝付款</el-button>
      	<div class="text">展示支付宝二维码提示扫码支付</div>
      </div>
      <div class="item">
      	<el-button type="warning" @click="onDuiGong" round>对公转账</el-button>
      	<div class="text">单击按钮展示对公账号信息</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pay',
  props: {
    
  },
  methods: {
  	onWeiXin () {

  	},
  	onAliPay () {

  	},
  	onDuiGong () {

  	}
  }
}
</script>

<style lang="scss" scoped>
#pay {
  box-sizing: border-box;
  padding: 2rem 1rem 0rem 1rem;

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
