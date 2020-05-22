<template>
  <div id="pay">
    <div class="text">请选择支付方式</div>
  	<div class="footer">
      <div class="item">
        <div class="payBtn weixinColor" :class="form.pay_mode == 2 ? 'active' : ''" @click="onWeiXin">
          <i class="iconfont">&#xe607;</i>
          <span>微信支付</span>
        </div>
      </div>
      <div class="item">
        <div class="payBtn alipayColor" :class="form.pay_mode == 1 ? 'active' : ''" @click="onAliPay">
          <i class="iconfont">&#xe629;</i>
          <span>支付宝</span>
        </div>
      </div>
      <div class="item">
        <div class="payBtn duifongColor" :class="form.pay_mode == 3 ? 'active' : ''" @click="onDuiGong">
          <img :src="ICONdg"/>
          <span>对公转账</span>
        </div>
      </div>
    </div>
    <div class="infoBox">
      <div class="duigong" v-show="pay_mode == 3">
        <p>开户行：中国工商银行股份有限公司北京紫竹桥支行</p>
        <p>账  号：0200 2355 0920 1067 897</p>
        <p>名  称：北京云摄美网络科技有限公司</p>
        <p>税  号：91110108MA018DH561</p>
        <p>地  址：北京市海淀区西四环北路131号院1号楼2层203室</p>
      </div>
    </div>
  </div>
</template>

<script>
import ICONdg from '../../static/icon/duigong.png'
export default {
  name: 'pay',
  props: {
    
  },
  created() {
    this.money = this.$route.query.money;
  },
  data() {
    return {
      money: 0,
      ICONdg: ICONdg,
      active: 0,
      form: {
        user_id: '',
        price_id: '',
        level_name: '',
        price: '',
        user_number: '',
        total_price: '',
        pay_mode: '',
        tmp_uid: '',
      }
    }
  },
  methods: {
  	onWeiXin () {
      this.form.pay_mode = 1;

      this.createOrder()
  	},
  	onAliPay () {
      this.form.pay_mode = 2;

      this.createOrder()
  	},
  	onDuiGong () {
      this.form.pay_mode = 3;
      
      // this.createOrder()
  	},
    // 创建订单
    createOrder () {
      let distributorId = this.$distributorId;
      let form = this.form;

      this.$http.post('/Order/create', {
        ...form,
        company_pid: distributorId
      }, that)
        .then(res => {
          if (res.errNo == 0) {
            this.$message({
              message: '提交成功！',
              type: 'success'
            });
            this.$router.push({path: '/account'});
          }
        })
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
  .text {
    font-size: 0.7rem;
    border-bottom: solid 0.05rem #F2F2F2;
    padding: 0.75rem 0rem;
    color: #999999;
  }
  .infoBox {
    min-height: 4rem;

    .duigong{
      font-size: .6rem;
    }
  }
  .payBtn {
    padding: 0.4rem 0rem;
    border: solid 0.05rem #CDCDCD;
    border-radius: 0.2rem;
    font-size: 0.7rem;
    width: 9.5rem;
    text-align: center;
    margin: auto;
    margin-bottom: 0.75rem;
    height: 2.7rem;
    box-sizing: border-box;
    position: relative;

    &.active {
      border: solid 0.1rem #4B8AF3;
    }
    &.active.duifongColor::after {
      content: '';
      display: block;
      position: absolute;
      bottom: -0.3rem;
      left: .5rem;
      width: 0.5rem;
      height: 0.5rem;
      border: solid 0.1rem #4B8AF3;
      transform: rotate(45deg);
      z-index: 1;
      background-color: #fff;
    }
    &.active.duifongColor::before {
      content: '';
      display: block;
      position: absolute;
      bottom: 0rem;
      left: 0rem;
      width: 2rem;
      height: 0.8rem;
      z-index: 10;
      background-color: #fff;
    }
  }
  .weixinColor,.alipayColor,.duifongColor {
    span {
      position: relative;
      top: -0.3rem;
      left: 0.5rem;
    }
  }
  .weixinColor {
    .iconfont {
      color: #00C901;
      font-size: 1.7rem;
    }
  }
  .alipayColor {
    .iconfont {
      color: #00A2E9;
      font-size: 1.7rem;
    }
  }
  .duifongColor {
    img {
      width: 1.7rem;
      height: 1.7rem;
    }
    span {
      top: -0.5rem;
    }
  }
  .footer {
    width: 90%;
    margin: auto;
    padding-top: 1rem;
    text-align: center;

    button {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
}
</style>
