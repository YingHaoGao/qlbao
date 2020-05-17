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

  .el-message {
    min-width: 100%;
    width: 100%;
  }
}
</style>
