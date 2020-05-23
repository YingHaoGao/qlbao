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
      <div v-for="item in bank" :key="item.id" class="duigong" v-show="form.pay_mode == 3">
        <p>开户行：{{item.bank_name}}</p>
        <p>账  号：{{item.card_number}}</p>
        <p>名  称：{{item.account_name}}</p>
        <p>税  号：{{item.address}}</p>
        <p>地  址：{{item.address}}</p>
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
    this.form.price_id = this.$route.query.price_id;
    this.form.level_name = this.$route.query.level_name;
    this.form.price = this.$route.query.price;
    this.form.user_number = this.$route.query.user_number;
    this.form.total_price = this.$route.query.total_price;

    this.getBank()
  },
  data() {
    return {
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
      },
      bank: [
        {
          id: '',
          bank: '',
          bank_name: '',
          account_name: '',
          card_number: '',
          tax_num: '',
          address: ''
        }
      ]
    }
  },
  methods: {
    // 获取对公转账信息
    getBank () {
      let that = this,
          params = {
            type: 'selling',
            company_pid: that.$distributorId
          }
      this.$http.fetch('BankAccount/getList')
        .then(res => {
          that.bank = res.data
        })
    },
  	onWeiXin () {
      this.form.pay_mode = 2;

      this.createOrder()
  	},
  	onAliPay () {
      this.form.pay_mode = 1;

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
      let that = this;

      this.$http.post('/Order/create', {
        ...form,
        company_pid: distributorId
      }, that)
        .then(res => {
          if (res.errNo == 0) {
            this.$message({
              message: '创建订单成功',
              type: 'success'
            });
            this.$router.push({path: '/payment', query: {
              order_id: res.data.order_id,
              order_code: res.data.order_code
            }});
          }
        })
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
      padding: 0.25rem;
      border-bottom: solid 0.02rem #F2F2F2;
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
