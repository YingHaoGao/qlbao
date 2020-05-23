<template>
  <div id="sign" v-loading="loading">
  	<div class="vessel">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-input placeholder="请输入企业名称" v-model="form.name"
            @blur="checkName"
            maxlength="16"
            show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入联系人信息" v-model="form.contacts"
            @blur="checkContacts"
            maxlength="8"
            show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入联系人手机" v-model="form.phone"
            @blur="checkPhone"
            maxlength="11"
            show-word-limit></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="codeInput" placeholder="请输入验证码" v-model="form.code"></el-input>
          <el-button type="text" class="codeBtn" v-show="!coded" @click="getCode">获取验证码</el-button>
          <el-button type="text" class="codeTime" v-show="coded" style="color: #999999;" disabled>{{codeTime}}s</el-button>
        </el-form-item>
        <!-- <el-form-item label="图形验证">
          <el-input placeholder="请输入图形验证码" v-model="form.graphics">
            <span slot="suffix" class="graphics" @click="getGraphics">{{graphics}}</span>
          </el-input>
        </el-form-item> -->
      </el-form>
      <div class="el-form-item ringtone">
        <el-checkbox-group v-model="form.ringtone">
          <el-checkbox label="是否为联系人自动开通" name="type"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="footer" v-show="showBtn">
        <el-checkbox v-model="form.deal" class="check">
          请勾选
          <el-link type="primary">《云美摄直客协议》</el-link>
          ，否则无法提交
        </el-checkbox>
        <el-button type="primary" @click="onSubmit" :disabled="disabled" round>提交</el-button>
      </div> 
    </div>
  </div>
</template>

<script>
import TOOL from '../tools.js'
import $ from 'jquery'

export default {
  name: 'sign',
  props: {
    
  },
  created() {
    // this.getGraphics();

    var that = this;
    var olbHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    //navigator.userAgent.indexOf用来判断浏览器类型
    var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    // if (isAndroid){//如果是安卓手机的浏览器
    if (true){//如果是安卓手机的浏览器
      window.addEventListener("resize", function() {
        var newHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        console.log('resize', olbHeight, newHeight, olbHeight > newHeight)
        if ( olbHeight > newHeight ){
          that.showBtn = false;
        }else{
           that.showBtn = true;
        }
      });
    }
  },
  data () {
    return {
      form: {
        name: '',
        contacts: '',
        phone: '',
        code: '',
        // graphics: '',
        ringtone: ['是否为联系人自动开通'],
        deal: false
      },
      disabled: true,
      // graphics: '',
      checkInterval: '',
      codeTime: 60,
      coded: false,
      codeVal: '',
      codeInterval: '',
      messageEvent: false,
      showBtn: true,
      loading: false
    }
  },
  watch: {
    codeTime(val) {
      if (val == 0) {
        this.coded = false;
        clearInterval(this.codeInterval);
        this.codeTime = 60;
      }
    },
    'form.name'(val) {
      let form = this.form;
      if (
        val != '' && val &&
        form.contacts != '' && form.contacts &&
        form.phone != '' && form.phone &&
        form.code != '' && form.code 
        // && form.graphics != '' && form.graphics
        ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    'form.contacts'(val) {
      let form = this.form;
      if (
        val != '' && val &&
        form.name != '' && form.name &&
        form.phone != '' && form.phone &&
        form.code != '' && form.code 
        // && form.graphics != '' && form.graphics
        ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    'form.phone'(val) {
      let form = this.form;
      if (
        val != '' && val &&
        form.contacts != '' && form.contacts &&
        form.name != '' && form.name &&
        form.code != '' && form.code 
        // && form.graphics != '' && form.graphics
        ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    'form.code'(val) {
      let form = this.form;
      if (
        val != '' && val &&
        form.contacts != '' && form.contacts &&
        form.phone != '' && form.phone &&
        form.name != '' && form.name 
        // && form.graphics != '' && form.graphics
        ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    'form.graphics'(val) {
      let form = this.form;
      if (
        val != '' && val &&
        form.contacts != '' && form.contacts &&
        form.phone != '' && form.phone &&
        form.code != '' && form.code &&
        form.graphics != '' && form.graphics
        ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    showBtn(val) {
      console.log('showBtn', val)
    }
  },
  methods: {
    // 获取验证码
    getCode() {
      let that = this;
      this.checkPhone(false, () => {
        this.loading = true;

        that.$http.fetch('/sms/send',{
          phone: that.form.phone,
          type: 1
        }, that)
        .then(res => {
          console.log(res)
          if (res.errNo == 0) {
            this.$message({
              message: '验证码已发送',
              type: 'success'
            });
            that.coded = true;
            that.codeInterval = setInterval(() => {
              that.codeTime -= 1
            }, 1000)
          }
        })
      })
    },
    // 获取图形码
    getGraphics() {
      let that = this;
      that.$http.fetch('/api/getGraphics')
        .then(res => {
          that.graphics = res.data.graphics
        })
    },
    // 提交
    onSubmit() {
      let that = this;
      let form = this.form;
      let distributorId = this.$distributorId;
      console.log(form)

      // 企业名称
      if (form.name == '' || !form.name || form.name.length > 16) {
        this.messageErr('请重新输入企业名称')
        return
      }
      // 联系人
      else if (form.contacts == '' || !form.contacts || form.contacts.length > 8) {
        this.messageErr('请重新输入联系人')
        return
      }
      // 联系电话
      else if (!TOOL.detection(0, this.form.phone)) {
        this.messageErr('请重新输入联系电话')
        return
      }
      // 验证码
      else if (form.code == '') {
        this.messageErr('请重新输入验证码')
        return
      }
      // // 图形码
      // else if (this.graphics == '' || form.graphics.toLocaleLowerCase() != this.graphics.toLocaleLowerCase()) {
      //   this.messageErr('请重新输入图形码')
      //   return
      // }
      // 协议
      else if (!form.deal) {
        this.messageErr('请查阅并勾选《云美摄直客协议》')
        return
      }
      else {
        if (this.messageEvent) this.messageEvent.close();
      }

      form.distributorId = distributorId;
      form.isRingtone = form.ringtone.length > 0;

      this.$http.post('/company/register', {
        contact_telephone: Number(form.phone),
        verification_code: Number(form.code),
        company_name: form.name,
        contact_name: form.contacts,
        open_user: form.isRingtone ? 1 : 0,
        company_pid: distributorId
      }, that)
        .then(res => {
          if (res.errNo == 0) {
            this.$distributorId = res.data.company_id;
            // this.$tmp_uid = res.data.user_id;
            this.$message({
              message: '提交成功！',
              type: 'success'
            });
            this.$router.push({path: '/account'});
          }
        })
    },
    // 验证企业名称
    checkName() {
      let form = this.form;
      if (form.name == '' || !form.name || !TOOL.detection(1, form.name) || form.name.length > 16) {
        this.messageErr('请重新输入企业名称')
      } else {
        if (this.messageEvent) this.messageEvent.close();
      }
    },
    // 验证联系人
    checkContacts() {
      let form = this.form;
      if (form.contacts == '' || !form.contacts || !TOOL.detection(1, form.contacts) || form.contacts.length > 8) {
        this.messageErr('请重新输入联系人')
      } else {
        if (this.messageEvent) this.messageEvent.close();
      }
    },
    // 验证数字
    checkPhone(e, fn) {
      if (!TOOL.detection(0, this.form.phone)) {
        this.messageErr('请重新输入手机号')
      } else if (fn) {
        fn();
      } else if (this.messageEvent) {
        this.messageEvent.close()
      }
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

<style lang="scss" scoped>
#sign {

  .vessel {
    position: absolute;
    top: calc( 50% + 1rem );
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .el-form-item {
    height: 2.3rem;
    box-sizing: border-box;
    font-size: 0.7rem;
    margin-bottom: 0rem;

    &:not(:first-child){
      margin-top: 0.5rem;
    }

    .codeInput {
      width: calc( 100% - 5.6rem );
    }
    .codeBtn,.codeTime {
      margin-left: 0.5rem;
      width: 5.1rem;
      height: 2.3rem;
      border: solid 0.05rem #fff;
      border-radius: 2.3rem;
      color: #FD3B44 !important;
    }

    input {
      border: none;
    }
  }
  .graphics {
    padding: 0.25rem 0.5rem;
    background: #F2F2F2;
  }
  .ringtone {
    line-height: 2rem;
    border-bottom: none;
  }
  .footer {
    width: 100%;
    margin-top: 3.5rem;

    .check {
      font-size: .6rem;
    }
    .el-link.el-link--primary {
      color: red;
    }

    button {
      margin-top: 0.5rem;
      width: 100%;
      font-size: 0.9rem;
      background: #5E43FA;
      border-color: #5E43FA;
    }
  }
}
</style>
