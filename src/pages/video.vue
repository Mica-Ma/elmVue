<template>
	<div class="video">
		<div class="new">
		<h1>{{$route.params.id}}</h1>
		<h2>video</h2>
		<p>{{item.content}}</p>
		<ul>
			<li v-for="(list, index) in item.detailed">
				<span @click="showHide(index)">{{list.type}}</span>
				<p v-show="list.show">{{list.text}}</p>
			</li>
		</ul>
	</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			item:{},
			items:[]
		}
	},
	computed:{
		items(){
			return this.$store.state.data.videodata
		}
		// ...mapState([
		// 	"data"
		// ])
	},
	created: function(){
		console.log(this.items)
		console.log(this.$route.params.id)
		for(let i = 0; i < this.items.length; i ++){
			if(this.items[i].id == this.$route.params.id){
				this.item = this.items[i]
			}
		}


	},
	methods:{
		showHide:function(index){
			console.log(index)
			console.log(this.item.detailed)
			
			this.item.detailed[index].show = !this.item.detailed[index].show
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
	.news ul li {
		border-bottom:1px solid #ddd;
		padding-bottom: 0.2rem;
		padding-top: 0.2rem;
	}
</style>