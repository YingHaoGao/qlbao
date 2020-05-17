<template>
  <div id="tabHead">
  	<div class="back"></div>
  	<div class="close"></div>
  	<div class="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'tabHead',
  props: {
    
  },
  data () {
  	var title = this.$route.meta.title
  	return {
  		title: title
  	}
  },
  watch: {
	  $route: {
	    handler: function(val, oldVal){
	      this.title = val.meta.title
	    },
	    deep: true
	  }
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
