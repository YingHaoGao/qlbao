<template>
  <div id="account" :style="{ height: clientHeight + 'px' }">
    <!-- <div class="vessel" :style="{ height: height + 'px' }"> -->
    <div class="box">
      <div class="input">
        <span class="tag">请输入开通号码数量:</span>
        <el-input v-model="num" class="number" type="number" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入开通数量" v-focus @focus="selectFocus($event)">
          <span slot="suffix" class="suffix">个</span>
        </el-input>
      </div>
      <div class="radio">
        <el-radio v-model="radio" v-for="item in prices" :label="item.id" :key="item.id" border>{{item.level_name}}</el-radio>
      </div>
      <div class="tag text">
        计费说明：{{remarks}}
      </div>
    </div>
    <div class="footer" v-show="footerShow">
      <div class="money">
        订单金额：￥<span>{{money}}</span>
      </div>
      <el-button type="primary" @click="onSubmit" round>立即付款</el-button>
    </div>
  </div>
</template>

<script>
import TOOL from '../tools.js'
import CONFIG from '../../config'
export default {
  name: 'account',
  props: {
    
  },
  created() {
    let that = this;
    
    this.set = this.$route.query.set
    this.getPrices();
    this.orderStatus();

    var clientWidth = document.documentElement.clientWidth;
    this.height = this.clientHeight - ( 10 * 10*(clientWidth / 320) );
    
    TOOL.setShare(that)
  },
  data() {
  	return {
  		money: 0,
  		radio: 0,
  		num: '',
      remarks: '10元/人/月',
      prices: [],
      messageEvent: false,
      set: false,
      footerShow: true,
      clientHeight: document.documentElement.clientHeight,
      height: 0
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

      if (obj) {
        var num = isNaN(val) ? 0 : val;
        this.money = num * obj.price

        if (val >= 200) {
          this.messageErr('提示：请联系VIP专属客服 010-54123456');
        }
        else {
          if (this.messageEvent) this.messageEvent.close();
        }
      }
    }
  },
  directives: {
    // 获得焦点指令
    focus: {
      inserted: function(el) {
        el.children[0].focus();
      }
    }
  },
  methods: {
    GetQueryValue1(name) {
       let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      if(window.location.hash.indexOf("?") < 0){
              return null;
      }
      let r = window.location.hash.split("?")[1].match(reg); 　　
      if (r != null) return decodeURIComponent(r[2]); 
  　　    return null;
    },
    // 获得焦点后选中内容
    selectFocus(event) {
      event.currentTarget.select();
    },
    // 查询价格档位
    getPrices() {
      let that = this,
          agent_id = this.$root.agent_id,
          params = {
            type: 'selling',
            company_pid: 0
          }

      if (agent_id) {
        params.company_pid = agent_id;
      }

      this.$http.fetch('prices/getPrice', params)
        .then(res => {
          that.prices = res.data;

          if (res.data.length > 0) {
            that.radio = res.data[0].id;
          }
        })
    },
  	// 立即付款
  	onSubmit () {
      let company_id = this.GetQueryValue1('company_id')
      let tmp_uid = this.GetQueryValue1('tmp_uid')
      let that = this,
          radio = that.radio,
          num = parseInt(that.num),
          money = that.money,
          type = that.$route.query.type == 1 ? 'append' : 'create',
          obj = that.prices.find(item => item.id == radio );
      const form = {
        company_id, type, radio, num, money
      }

      if (radio == 0) {
        this.messageErr('请勾选开通周期');
        return
      }
      if (this.num == '' || isNaN(this.num)) {
        this.messageErr('请输入开通号码数量');
        return
      }
      if (this.num <= 0) {
        this.messageErr('开通号码数量必须大于0');
        return
      }
      if (this.num >= 200) {
        this.messageErr('提示：请联系VIP专属客服 010-54123456');
        return
      }
      else {
        if (this.messageEvent) this.messageEvent.close()
      }

      localStorage.setItem('payInfo', JSON.stringify({
        price_id: radio,
        level_name: obj.level_name,
        price: obj.price,
        remarks: obj.remarks,
        user_number: num,
        total_price: money,
        set: that.set,
        company_id: company_id,
        tmp_uid: tmp_uid
      }));
      this.$router.replace({path: '/pay', query: {
        price_id: radio,
        level_name: obj.level_name,
        price: obj.price,
        remarks: obj.remarks,
        user_number: num,
        total_price: money,
        set: that.set,
        company_id: company_id,
        tmp_uid: tmp_uid
      }});
  	},
    //根据临时用户ID查询订单
    orderStatus() {
      let company_id = this.GetQueryValue1('company_id')
      let tmp_uid = this.GetQueryValue1('tmp_uid')
      let that = this,
          params = {
            tmp_uid:tmp_uid,
            company_id: company_id
          };

TOOL.alert(' 根据临时用户ID查询订单 上传 = ' + JSON.stringify(params))
      this.$http.fetch('Order/stateus',params)
      .then(res => {
        if (res.errNo == 0) {
          let data = res.data;

          if (data) {
            let order_id = data.id;
            let order_code = data.order_code;
            let { price_id, level_name, price, user_number, total_price, remark } = data;
TOOL.alert(' 根据临时用户ID查询订单 = ' + JSON.stringify(data))
            if (data.state == 0) {
              this.$confirm('存在未支付的订单, 是否去支付?', {
                showClose: false,
                closeOnClickModal: false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {

                localStorage.setItem('payInfo', JSON.stringify({
                  price_id: price_id,
                  level_name: level_name,
                  price: price,
                  remarks: remark,
                  user_number: user_number,
                  total_price: total_price,
                  set: true,
                  company_id: company_id,
                }));
                that.$router.replace({path: '/pay', query: {
                  price_id: price_id,
                  level_name: level_name,
                  price: price,
                  remarks: remark,
                  user_number: user_number,
                  total_price: total_price,
                  company_id: company_id,
                  tmp_uid: tmp_uid,
                  set: true
                }});
              }).catch(() => {
                that.set = false;
                TOOL.alert(' 删除订单 order_id = ' + order_id)
                this.$http.fetch('Order/delOrderId',{ order_id: order_id}).then(res => {
                  TOOL.alert(' 删除订单回调 = ' + JSON.stringify(res))
                  window.location.href = CONFIG.SHARE;
                })
              })
            }
          }
        }
      }) 
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
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 3.5rem;

  .box {

    .radio {
    	text-align: center;
      overflow: hidden;
    }
    .input {
    	margin-bottom: 1.5rem;
      height: 2.2rem;
      position: relative;
    }
    .number {
      width: calc( 100% - 8.2rem );
      // width: 7.4rem;
      height: 2.2rem;
      position: absolute;
      right: 0rem;
      top: 50%;
      transform: translate(0, -50%);
    }
    .tag {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 400;
      color: rgba(51,51,51,1);
      line-height: 2.2rem;
      display: inline-block;
      width: 8rem;

      &.text {
        font-size: 0.6rem;
        font-weight: bold;
        color: rgba(51,51,51,1);
        line-height: 0.85rem;
      }
    }
    .suffix {
      line-height: 2.3rem;
      padding-right: 0.5rem;
      color: #333333;
    }
  }
  .money {
    color: #333333;
    font-size: 0.7rem;

  	span {
  		color: red;
      font-size: 1rem;
  	}
  }
  .footer {
    font-size: 0.7rem;
    margin: auto;
    width: 100%;
    position: absolute;
    bottom: 1.25rem;
    left: 50%;
    padding: 0 0.75rem;
    box-sizing: border-box;
    transform: translate(-50%, 0);

    button {
      margin-top: 0.75rem;
      font-size: 0.9rem;
      width: 100%;
      background: #79D4E4;
      border-color: #79D4E4;
    }
  }
}
</style>
