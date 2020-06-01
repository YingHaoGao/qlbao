<template>
  <div id="payment">
    <div class="pay-status-box">
      <div class="status-left">
        <div class="status-name">状态</div>
        <div class="status-type">{{typeNC}}</div>
      </div>
      <!-- <div class="status-img-right">
        <img src="../../static/icon/book.png">
      </div> -->
    </div>
    <div class="buttons">
      <el-button @click="onNewPhone" round>追加开通新号码</el-button>
      <el-button @click="onCreate" round>生成我的邀请卡</el-button>
    </div>
    <!-- <div class="names">
  		<div class="name" v-for="(item, idx) in list" :key="idx">
  			<div class="name-title">{{item.user_name}}</div>
        <div class="name-phone">{{item.telephone}}</div>
        <div class="name-type">{{telepToNc(item.telephone_type)}}</div>
  		</div>
  	</div> -->
    <el-table
      :data="list"
      stripe
      style="width: 100%;margin-top: 1rem;">
      <el-table-column
        prop="user_name"
        label="姓名">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="telephone"
        label="手机号"
        :width="width">
      </el-table-column>
      <el-table-column
        header-align="right"
        align="right"
        prop="telephoneNc"
        label="服务商">
      </el-table-column>
    </el-table>
  	<!-- <div class="code">
  		二维码分享给员工填写号码
  	</div> -->
  </div>
</template>

<script>
import TOOL from '../tools.js'
export default {
  name: 'payment',
  props: {
    
  },
  created () {
    let that = this;

  	this.getInfo();
    this.getOrder();
    TOOL.setShare(that);

    var clientWidth = document.documentElement.clientWidth;
    this.width = 13 * 10*(clientWidth / 320);
  },
  mounted () {
    this.$alert('公司管理员可登陆 www.weuq.com 网页统一添加号码', '提示');
  },
  watch: {
  	type(val) {
  		let typeNC = ''
  		switch(val) {
        case 0:
          typeNC = '未支付';
          break;
        case 1:
          typeNC = '已支付';
          break;
        case 2:
          typeNC = '支付失败';
          break;
        case 3:
          typeNC = '退款中';
          break;
        case 4:
          typeNC = '已退款';
          break;
  		}

  		this.typeNC = typeNC;
  	}
  },
  data () {
  	return {
  		list: [],
  		type: '',
  		typeNC: '',
      width: 0
  	}
  },
  methods: {
  	// 获取信息
  	getInfo () {
      let that = this,
          params = {
            company_id: that.$root.company_pid
          };

  		this.$http.fetch('/user/getList',params)
        .then(function(res){
          // that.list = res.data;
          let newList = [];
          res.data.map(item => {
            newList.push({
              ...item,
              telephoneNc: that.telepToNc(item.telephone_type)
            })
          });
          that.list = newList;
  	    });
  	},
    // 查询订单状态
    getOrder () {
      let that = this;

      // 通过订单id查询状态
      if (that.$route.query.order_id && that.$route.query.order_id != "") {
        this.$http.fetch('/order/stateusByOrderId',{
          order_id: that.$route.query.order_id
        })
        .then(function(res){
          if (res.errNo == 0 && res.data) {
            that.type = res.data.state;
          }
        });
      }
      // 通过临时用户id查询状态
      else if (that.$root.tmp_uid && that.$root.tmp_uid != "") {
        that.$http.fetch('/Order/stateus', {
          tmp_uid: that.$root.tmp_uid,
          company_id: that.$root.company_pid
        })
          .then(res => {
            if (res.errNo == 0) {
              that.type = res.data.state;
            }
          })
      }
      else if (process.env.NODE_ENV === "development") {
        this.$message.error({
          showClose: true,
          message: '获取订单id、用户id失败'
        });
        this.typeNC = '获取失败'
      }
    },
  	// 添加新号码
  	onNewPhone () {
      this.$router.push({path: '/account', query: {add: true}});
  	},
  	// 生成我的邀请卡
  	onCreate () {
      this.$router.push({path: '/share'});
  	},
    // 运营商转换
    telepToNc (t) {
      let typeNC = ''
      switch(t) {
        case 1:
          typeNC = '移动';
          break;
        case 2:
          typeNC = '联通';
          break;
        case 3:
          typeNC = '电信';
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
  padding: 2rem 0rem 0rem 0rem;
  background-color: #F2F2F2;

  .pay-status-box{
    width: 100%;
    height: 5.8rem;
    padding: 0 0.75rem;
    // background:linear-gradient(228deg,rgba(210,210,255,1) 0%,rgba(161,161,249,1) 100%);
    background-image: url('../../static/icon/payment_head.png');
    background-size: 100% 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .status-left{
      width: 50%;

      .status-name {
        font-size: .8rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 1.1rem;
      }
      .status-type{
        font-size:1.2rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height: 1.65rem;
        margin-top: .5rem;
      }
    }
    .status-img-right{
      width: 50%;
      img{
        width: 50%;
        height: audo;
        margin-left: 35%;
      }
    }
  }

	.buttons {
    width: 100%;
    padding: 1rem 0.75rem;
    box-sizing: border-box;
    text-align: center;
    background: #fff;
    color: #FFFFFF;

		button {
			width: 7rem;
      display: inline-block;
      color: #fff;

      &:first-child {
        background: linear-gradient(180deg,rgba(253,188,124,1) 0%,rgba(254,121,119,1) 100%);
      }
      &:last-child {
        background: linear-gradient(180deg,rgba(124,193,253,1) 0%,rgba(127,119,254,1) 100%);
      }
		}
	}

	.names {
		background:rgba(255,255,255,1);
    width: 100%;
    // height: 4.2rem;
    padding: .75rem;
    box-sizing: border-box;

		.name {
			font-size: 0.8rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:1.1rem;
      margin-top: 0.5rem;
      display: flex;
      
      .name-title{
        width: 2.5rem;
        text-align: left;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .name-phone{
        width: 5.2rem;
        margin: 0 1.5rem 0 1rem
      }
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
