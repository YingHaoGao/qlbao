<template>
  <div id="sign">
  	<el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="企业名称">
        <el-input placeholder="请输入企业名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input placeholder="请输入联系人信息" v-model="form.contacts"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input placeholder="请输入联系人手机" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="图形验证">
        <el-input placeholder="请输入验证码" v-model="form.graphics"></el-input>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-checkbox v-model="form.deal">
        请勾选
        <el-link type="primary">《协议》</el-link>
        ，否则无法提交
      </el-checkbox>
      <el-button type="primary" @click="onSubmit" round>提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign',
  props: {
    
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
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
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
