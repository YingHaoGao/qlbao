<template>
  <div id="app">
    <TabHead/>
    <router-view />
  </div>
</template>

<script>
  import TabHead from "./components/tabHead.vue"
  
  export default({
  components: {
    TabHead
  },
  data () {
    return {}
  },
})
</script>


<style>
  @import './assets/css/iconfont.css';
</style>
<style lang="scss">
html{
  font-size: 20px;

  &,body,#app{
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 100%;
  }

  #sign,
  #account,
  #pay,
  #payment,
  #share {
    height: calc( 100% - 2rem );
    padding: 0rem 0.75rem;
    box-sizing: border-box;
  }

  #qrcode img {
    margin: auto;
  }
  .el-message-box {
    width: 100% !important;
  }

  .el-message {
    min-width: 100%;
    width: 100%;
  }

  #sign {
    .el-form-item__label {
      width: 3rem !important;
      padding: 0rem;
      text-align: left;
      letter-spacing: 0.02rem;
    }
    .el-checkbox__inner {
      border-radius: 50%;
    }
    .el-form-item__content {
      margin-left: 4rem !important;
    }
    .el-input__inner {
      border: none;
      padding-left: 0rem;

    }
    .el-input__count-inner {
      color: #999999;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #333333;
    }
    .el-checkbox__label {
      font-size: 0.5rem;
    }
  }

  #account {
    .el-radio__input {
      display: none;
    }
    .el-radio.is-bordered {
      width: 32%;
      margin: 0rem;
      height: 2.8rem;
      line-height: 1.5rem;

      &:not(:last-child) {
        margin-right: 1%;
      }
    }
    .el-radio.is-bordered.is-checked {
      background:rgba(236,243,255, .5);
    }
  }
}
</style>
