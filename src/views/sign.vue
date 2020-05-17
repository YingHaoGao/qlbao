<template>
  <div id="sign">
  	<el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="企业名称">
        <el-input placeholder="请输入企业名称" v-model="form.name"
          maxlength="16"
          show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input placeholder="请输入联系人信息" v-model="form.contacts"
          @blur="checkNC"
          maxlength="8"
          show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input placeholder="请输入联系人手机" v-model="form.phone"
          @blur="checkPhone"
          maxlength="11"
          show-word-limit>
          <el-button v-show="!coded" slot="append" @click="getCode">获取验证码</el-button>
          <el-button v-show="coded" slot="append">{{codeTime}}s</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <CodeInput @change="codeChange"/>
      </el-form-item>
      <el-form-item label="图形验证">
        <el-input placeholder="请输入验证码" v-model="form.graphics">
          <el-button slot="append" @click="getGraphics">{{graphics}}</el-button>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-checkbox v-model="form.deal">
        请勾选
        <el-link type="primary">《云美摄直客协议》</el-link>
        ，否则无法提交
      </el-checkbox>
      <el-button type="primary" @click="onSubmit" round>提交</el-button>
    </div>
  </div>
</template>

<script>
import CodeInput from '../components/codeInput'
import TOOL from '../tools.js'

export default {
  name: 'sign',
  props: {
    
  },
  components:{ CodeInput },
  created() {
    this.getGraphics();
  },
  data () {
    return {
      form: {
        name: '',
        contacts: '',
        phone: '',
        code: '',
        graphics: '',
        deal: false
      },
      graphics: '',
      checkInterval: '',
      codeTime: 60,
      coded: false,
      codeVal: '',
      codeInterval: '',
      messageEvent: false
    }
  },
  watch: {
    codeTime(val) {
      if (val == 0) {
        this.coded = false;
        clearInterval(this.codeInterval);
        this.codeTime = 60;
      }
    }
  },
  methods: {
    // 获取验证码
    getCode() {
      let that = this;
      this.checkPhone(false, () => {
        that.$axios.get('/api/getCode',{
          params:{
              phone: that.phone
          }
        })
        .then(res => {
          console.log(res)
          that.codeVal = res.data.code;
          that.coded = true;
          that.codeInterval = setInterval(() => {
            that.codeTime -= 1
          }, 1000)
        })
      })
    },
    // 获取图形码
    getGraphics() {
      let that = this;
      this.$axios.get('/api/getGraphics')
        .then(res => {
          that.graphics = res.data.graphics
        })
    },
    // 提交
    onSubmit() {
      let form = this.form;
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
      else if (this.codeVal == '' || form.code != this.codeVal) {
        this.messageErr('请重新输入验证码')
        return
      }
      // 图形码
      else if (this.graphics == '' || form.graphics.toLocaleLowerCase() != this.graphics.toLocaleLowerCase()) {
        this.messageErr('请重新输入图形码')
        return
      }
      // 协议
      else if (!form.deal) {
        this.messageErr('请查阅并勾选《云美摄直客协议》')
        return
      }
      else {
        if (this.messageEvent) this.messageEvent.close();
      }

      this.$axios.post('/api/sign', form)
        .then(res => {
          console.log(res.data)
          this.$message({
            message: '提交成功！',
            type: 'success'
          });
        })
    },
    // 获取输入的验证码
    codeChange(val) {
      this.form.code = val;
    },
    // 验证只输入中文
    checkNC() {
      this.form.contacts = this.form.contacts.replace(/[^\u4E00-\u9FA5]/g, '')
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
  box-sizing: border-box;
  padding: 3rem 1rem 0rem 1rem;

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
