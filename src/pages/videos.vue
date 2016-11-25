<template>
	<div class="videos">
		<h1>videos</h1>
		<ul>
			<li v-for="item in  items">
				<router-link :to="{name:'video', params:{id: item.id}}">
					<dl>
						<dt>{{item.title}}</dt>
						<dd>id: {{item.id}}</dd>
						<dd>{{item.content}}</dd>
						<dd>{{item.time}}</dd>
					</dl>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	data(){
		return {
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
	created:function() {
		console.log(this)
	}
}


</script>

<style>
	.videos ul li {
		border-bottom:1px solid #ddd;
		padding-bottom: 0.2rem;
		padding-top: 0.2rem;
	}
</style>