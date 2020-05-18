<template>
  <div id="pay">
    <div class="infoBox">
      <div class="duigong" v-show="duigong">
        <p>开户行：中国工商银行股份有限公司北京紫竹桥支行</p>
        <p>账  号：0200 2355 0920 1067 897</p>
        <p>名  称：北京云摄美网络科技有限公司</p>
        <p>税  号：91110108MA018DH561</p>
        <p>地  址：北京市海淀区西四环北路131号院1号楼2层203室</p>
      </div>
    </div>
  	<div class="footer">
      <div class="item">
      	<el-button type="success" @click="onWeiXin" round>微信付款</el-button>
      	<!-- <div class="text">调用微信付款页面</div> -->
      </div>
      <div class="item">
      	<el-button type="primary" @click="onAliPay" round>支付宝付款</el-button>
      	<!-- <div class="text">展示支付宝二维码提示扫码支付</div> -->
      </div>
      <div class="item">
      	<el-button type="warning" @click="onDuiGong" round>对公转账</el-button>
      	<!-- <div class="text">单击按钮展示对公账号信息</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pay',
  props: {
    
  },
  created() {
    this.money = this.$route.query.money;
  },
  data() {
    return {
      duigong: false,
      money: 0
    }
  },
  methods: {
  	onWeiXin () {
      this.duigong = false;

      this.confirm()
  	},
  	onAliPay () {
      this.duigong = false;

      this.confirm()
  	},
  	onDuiGong () {
      this.duigong = !this.duigong;
  	},
    confirm (s) {
      var r=confirm('模拟进入支付完成页')
      if (r==true) {
          this.$router.push({path: '/payment'});
        }
    }
  }
}
</script>

<style lang="scss" scoped>
#pay {
  box-sizing: border-box;
  padding: 2rem 1rem 0rem 1rem;

  .infoBox {
    min-height: 4rem;

    .duigong{
      font-size: .6rem;
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
