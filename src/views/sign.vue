<template>
  <div id="sign">
	sign
  <button @click="routerTo">to pay</button>
  </div>
</template>

<script>
export default {
  name: 'sign',
  props: {
    
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    routerTo () {
      this.$router.push({ name: 'Pay'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
