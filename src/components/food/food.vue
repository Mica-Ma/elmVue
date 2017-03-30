<template>
	<transition name="move">
		<div class="food" v-show="showFlag">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image"/>
				</div>
			</div>
		</div>
	</transition>
	
</template>

<script>
	export default{
		props: {
			food: {
				type: Object
			}
		},
		data () {
			return {
				showFlag: false
			}
		},
		methods: {
			show () {
				this.showFlag = true;
			}
		}
	}
</script>

<style lang="scss">
	.food{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background: #fff;
		&.move-enter-active, &.move-leave-active{
			transition: all 0.5s;
			transform: translate3d(0, 0, 0);
		}
		&.move-enter, &.move-leave-active{
			transform: translate3d(100%, 0, 0);
		}
		.image-header{
			position: relative;
			width: 100%;
			height: 0;
			padding-top: 100%;
			img{
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
			}
		}
	}
</style>
