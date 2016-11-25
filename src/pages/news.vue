<template>
	<div class="news">
		<h1>news</h1>
		<ul>
			<li v-for="item in  items">
				<router-link :to="{name:'new', params:{id: item.id}}">
					<dl>
						<dt>{{item.title}}</dt>
						<dd>{{item.content}}</dd>
						<dd>{{item.time}}</dd>
						<!-- <dd>{{item.detailed}}</dd> -->
					</dl>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
	data(){
		return {
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
	created:function() {
		console.log(this)
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