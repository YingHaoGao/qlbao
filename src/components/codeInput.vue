<template>
	<div class="code">
		<input id="first" class="inputStyle" @focus="focus($event)" v-model="code[0]"
		style="border-top-left-radius: 12px;
		border-bottom-left-radius: 12px;"
		type="text"/>
		<input id="second" class="inputStyle" @focus="focus($event)" v-model="code[1]" style="border-left:1px solid #c6c6c6;" type="text"/>
		<input id="third" class="inputStyle" @focus="focus($event)" v-model="code[2]" style="border-left:1px solid #c6c6c6;" type="text"/>
		<input id="forth" class="inputStyle" @focus="focus($event)" v-model="code[3]" style="border-left:1px solid #c6c6c6;" type="text"/>
		<!-- <input id="fifth" class="inputStyle" v-model="code[4]"
			style="border-top-right-radius: 12px;
			border-bottom-right-radius: 12px;
			border-left:1px solid #c6c6c6;" 
			maxlength="1"
			type="text"/> -->
	</div>
</template>

<script>
export default {
	data (){
    return {       
      smsCode:'',
	    code:new Array(4),
	    codeId:['first','second','third','forth']
    }
  },
	watch:{
		code:function(newValue,oldValue){
			console.log(newValue)
			let tempValue=''
			let location=0
			for(let i=0;i<newValue.length;i++){
				if(i == 4){
					break
				}

				if(newValue[i] && i < 4) {
					location++
				}else{
					newValue[i]=''
				}

				if(newValue[i]) {
					tempValue = tempValue + newValue[i]
				}
			}
			this.smsCode=tempValue

			// let m=tempValue.split("")
			// let location=0
			// for(let i=0;i<newValue.length;i++){
			// 	if(m[i]&&i<4){
			// 		location++
			// 		newValue[i]=m[i]
			// 	}else{
			// 		newValue[i]=''
			// 	}
			// }
			if(location<1){
				location=1
			}else if(location>3){
				location=3
			}
			let code = this.smsCode.slice(0, 4);
			this.$emit('change', code)
			document.getElementById(this.codeId[location]).focus()
		}
	},
	methods: {
		focus:function(event){
    	event.currentTarget.select();
    }
	}
}
</script>

<style lang="scss" scoped>
.inputStyle{
	width:20%;
	height:100%;
	text-align:center;
	border:none;
}
</style>