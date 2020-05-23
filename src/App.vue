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
    padding: 1rem 0.5rem;
    box-sizing: border-box;
    background-image: url('../static/icon/background.png');
    background-size: cover;

    .vessel {
      width: calc( 100% - 1rem );
      box-sizing: border-box;
      margin: auto;
      padding: 1.25rem 0.75rem;
      background-color: rgba(242,242,242,0.4);
    }
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
      padding: 0rem;
      text-align: left;
      font-size: 0.7rem;
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
      margin-bottom: 0.5rem;
      height: 2.8rem;
      line-height: 1.5rem;
      float: left;

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
