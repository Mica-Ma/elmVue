<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight': totalCount}">
						<span class="iconfont icon-gouwuche" ></span>
					</div>
					<div class="num" v-if="totalCount>0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight': totalPrice}">￥{{totalPrice}}元</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div class="pay" :class="payClass">{{payDesc}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props: {
			selectFoods: {
				type: Array,
				default () {
					return [];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		created () {
			// console.log(this.selectFoods)	
		},
		computed: {
			totalPrice () {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				})
				return total;
			},
			totalCount () {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				})
				return count;
			},
			payDesc () {
				if (this.totalPrice === 0){
					return `￥${this.minPrice}元起送`;
				}else if (this.totalPrice < this.minPrice) {
					return `还差￥${this.minPrice - this.totalPrice}元起送`;
				}else {
					return '去结算';
				}
			},
			payClass () {
				if (this.totalPrice >= this.minPrice) {
					return 'enough';
				} else {
					return 'not-enough';
				}
			}
		}
	}
</script>

<style lang="scss">
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 48px;
		.content{
			display: flex;
			background: #141d27;
			.content-left{
				flex: 1;
				font-size: 0;
				.logo-wrapper{
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					vertical-align: top;
					border-radius: 50%;
					background: #141d27;
					.logo{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background: #2b343c;
						text-align: center;

						.icon-gouwuche{
							font-size: 24px;
							color: #80858a;
							line-height: 44px;

						}
						&.highlight{
							background: rgb(0, 160, 220);
							.icon-gouwuche{
								color: #fff;
							}
						}
					}
					.num{
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 15px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-weight: 700;
						font-size: 10px;
						background: rgb(240, 20, 20);
						color: #fff;
						box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4)
					}
				}
				.price{
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin-top: 12px;
					box-sizing: border-box;
					padding-right: 12px;
					border-right: 1px solid rgba(255, 255, 255, 0.1);
					font-size: 16px;
					font-weight: 700;
					color: rgba(255, 255, 255, 0.4);
					&.highlight{
						color: #fff;
					}
				}
				.desc{
					display: inline-block;
					vertical-align: top;
					line-height: 24px;
					margin: 12px 0 0 12px;
					font-size: 13px;
					color: rgba(255, 255, 255, 0.4);

				}
			}
			.content-right{
				flex: 0 0 105px;
				width: 105px;
				.pay{
					line-height: 48px;
					height: 48px;
					text-align: center;
					font-size: 12px;
					color: rgba(255, 255, 255, 0.4);
					font-weight: 700;
					&.not-enough{
						background: #2b333b;
					}
					&.enough{
						background: #00b43c;
						color: #fff;
					}
				}
			}
		}
	}
</style>
