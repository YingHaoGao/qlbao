<template>
  <div id="account">
    <div class="box">
      <div class="input">
        <span class="tag gray">请输入开通号码数量</span>
        <el-input v-model="num" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入开通号码数量">
          <span slot="suffix" class="suffix">个</span>
        </el-input>
      </div>
      <div class="tag">
        计费说明：{{remarks}}
      </div>
      <div class="radio">
        <el-radio v-model="radio" v-for="item in prices" :label="item.id" :key="item.id" border>{{item.level_name}}</el-radio>
      </div>
    </div>
    <div class="footer">
      <div class="money">
      	订单金额：
      	<span>￥{{money}}</span>
      </div>
      <el-button type="primary" @click="onSubmit">立即付款</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  props: {
    
  },
  created() {
    this.getPrices();
  },
  data() {
  	return {
  		money: 0,
  		radio: 0,
  		num: 0,
      remarks: '10元/人/月',
      prices: [],
      messageEvent: false
  	}
  },
  watch: {
    radio(val) {
      var obj = (this.prices.find(item => item.id == val));
      var num = isNaN(this.num) ? 0 : this.num;
      this.money = obj.price * num;
      this.price = obj.price;
      this.remarks = obj.remarks;
    },
    num(val) {
      var obj = (this.prices.find(item => item.id == this.radio));
      var num = isNaN(val) ? 0 : val;
      this.money = num * obj.price

      if (val >= 200) {
        this.messageErr('提示：请联系VIP专属客服 010-54123456');
      }
      else {
        if (this.messageEvent) this.messageEvent.close();
      }
    }
  },
  methods: {
    // 查询价格档位
    getPrices() {
      let that = this,
          params = {
            type: 'selling',
            company_pid: that.$distributorId
          }
      this.$http.fetch('prices/getPrice', params)
        .then(res => {
          that.prices = res.data
        })
        // that.prices = [
        //     {
        //       level_name: '3个月',
        //           type: '',
        //           id: 3,
        //           seller_id: 3,
        //           price: 3,
        //           remarks: '30元/人'
        //     },
        //     {
        //       level_name: '6个月',
        //           type: '',
        //           id: 6,
        //           seller_id: 6,
        //           price: 6,
        //           remarks: '60元/人'
        //     },
        //     {
        //       level_name: '12个月',
        //           type: '',
        //           id: 12,
        //           seller_id: 12,
        //           price: 12,
        //           remarks: '120元/人/月'
        //     }
        //   ]
    },
  	// 立即付款
  	onSubmit () {
      let that = this,
          radio = that.radio,
          num = parseInt(that.num),
          money = that.money,
          type = that.$route.query.type == 1 ? 'append' : 'create',
          distributorId = that.$distributorId;
      const form = {
        distributorId, type, radio, num, money
      }
      console.log(form)
      if (radio == 0) {
        this.messageErr('请勾选开通周期');
        return
      }
      if (this.num == '' || isNaN(this.num)) {
        this.messageErr('请输入开通号码数量');
        return
      }
      if (this.num >= 200) {
        this.messageErr('提示：请联系VIP专属客服 010-54123456');
        return
      }
      else {
        if (this.messageEvent) this.messageEvent.close()
      }

      // this.$axios.post('/api/statement', form)
      //   .then(res => {
      //     this.$router.push({path: '/pay', query: {money: form.money}});
      //   })
      this.$router.push({path: '/pay', query: {money: form.money}});
  	},
    // 错误提示
    messageErr(msg) {
      if (this.messageEvent) this.messageEvent.close();
      this.messageEvent = this.$message.error({
        duration: 0,
        showClose: true,
        message: msg
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#account {

  .box {
    padding: 0.75rem 0rem 1rem;
    border-bottom: solid 0.05rem #F2F2F2;

    .radio {
    	text-align: center;
      overflow: hidden;
    }
    .input {
    	margin-bottom: 0.5rem;
    }
    .tag {
      display: inline-block;
      font-size: 0.7rem;
      color: rgba(0,0,0,.5);
      margin-bottom: 0.5rem;

      &.gray {
        color: #999999;
      }
    }
    .suffix {
      line-height: 2rem;
      padding-right: 0.5rem;
      color: #333333;
    }
  }
  .money {
  	span {
      font-weight: 600;
      font-size: 1rem;
  		color: red;
  	}
  }
  .footer {
    font-size: 0.7rem;
    width: 100%;
    margin: auto;
    margin-top: 1rem;

    button {
      margin-top: 0.75rem;
      width: 100%;
    }
  }
}
</style>
