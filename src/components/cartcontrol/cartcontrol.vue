<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
				<span class="inner icon-anonymous-iconfont iconfont"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="car-add icon-jia iconfont" @click="addCart">
		</div>		
	</div>
</template>

<script>
	import Vue from 'vue';
	export default{
		props: {
			food: {
				type: Object
			}
		},
		created () {
			// console.log(this.food)
		},
		methods: {
			addCart (evevt) {
				if(!event._constructed) return;
				// console.log(this.food.count)
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1)
					// this.food.setter('count',1)
					// this.food.count = 1;
				} else {
					this.food.count ++;
				}
			},
			decreaseCart (event) {
				if(!event._constructed) return;
				if (this.food.count > 0) {
					this.food.count --;
				}
			}
		}
	}
</script>

<style lang="scss">
	.cartcontrol{
		font-size: 0;
		.cart-decrease{
			display: inline-block;
			padding: 6px;
			.inner{
				display: inline-block;
				line-height: 24px;
				font-size: 24px;
				color: rgb(0, 160, 220);
				transition: all .4s linear;
			}
			&.move-enter-active, &.move-leave-active{
				transition: all .4s linear;
			}
			&.move-enter, &.move-leave-active{
				opacity: 0;
			 	transform: translate3d(24px, -4px, 0);
				.inner{
					transform: rotate(180deg);
					// transform: translateY(-1px)
				}
			}
			// &.move-transition{
			// 	opacity: 1;
			// }
		}
		.cart-count{
			display: inline-block;
			vertical-align: top;
			width: 12px;
			line-height: 24px;
			text-align: center;
			padding-top: 6px;
			font-size: 10px;
			color: rgb(147, 153, 159);
		}
		.car-add{
			display: inline-block;
			padding: 6px;
			line-height: 24px;
			font-size: 24px;
			color: rgb(0, 160, 220);
		}
	}
</style>
