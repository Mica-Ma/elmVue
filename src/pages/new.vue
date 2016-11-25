<template>
	<div class="new">
		<h1>{{$route.params.id}}</h1>
		<h2>new</h2>
		<p>{{item.content}}</p>


		<ul>
			<li v-for="(list, index) in item.detailed">
				<span @click="showHide(index)">{{list.type}}</span>
				<p v-show="list.show">{{list.text}}</p>
			</li>
		</ul>
		
	</div>
</template>
<script>
export default {
	data(){
		return {
			show:true,
			item:{},
			items:[]
		}
	},
	computed:{
		items(){
			return this.$store.state.data.newdata
		}
		// ...mapState([
		// 	"data"
		// ])
	},
	created: function(){
		
		for(let i = 0; i < this.items.length; i ++){
			if(this.items[i].id == this.$route.params.id){
				this.item = this.items[i]
			}
		}
		// for(let i = 0; i < this.item.detailed.length; i ++){
		// 	this.item.detailed[i].show = true
		// }
	},
	methods:{
		showHide:function(index){
			console.log(index)
			console.log(this.item.detailed)

			this.item.detailed[index].show = !this.item.detailed[index].show;
			if(this.item.detailed[index].type == '[+]') {
				this.item.detailed[index].type = '[ - ]'
			}else{
				this.item.detailed[index].type = '[+]'
			}

			
		}
	}
}


</script>
<style>
	
</style>