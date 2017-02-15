<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for=" item in goods" class="menu-item border-1px">
					<span class="text">
						<span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for=" item in goods" class="food-list">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img :src="food.icon" width="57" height="57">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: {}
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

			this.axios.get('/api/goods').then((response) => {
                // console.log(response.data);
                // this.seller = response.data
                if (response.data.errno === ERR_OK) {
                    // debugger
                    this.goods = response.data.data;
                    this.$nextTick(() => {
                    	this._initScroll();
                    })
                    
                };
                // console.log(this.goods);
            });
		},
		methods: {
			_initScroll () {
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{});
			}
		}
	}
</script>

<style lang="scss">
@import "../../common/sass/mixin.scss";
	.goods{
		display: flex;
		overflow: hidden;
		position: absolute;
		width: 100%;
		top: 174px;
		bottom: 46px;
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background-color: #f3f5f7;
			.menu-item{
				display: table;
				height: 54px;
				width: 56px;
				line-height: 14px;
				padding: 0 12px;
				.icon{
					display: inline-block;
					width: 12px;
					height: 12px;
					margin-right: 2px;
					background-size: 12px 12px;
					background-repeat: no-repeat;
					vertical-align: top;
					&.decrease{
						@include bg-image('decrease_3');
					}
					&.discount{
						@include bg-image('discount_3');
					}
					&.special{
						@include bg-image('special_3');
					}
					&.invoice{
						@include bg-image('invoice_3');
					}
					&.guarantee{
						@include bg-image('guarantee_3');
					}
				}
				.text{
					font-size: 12px;
					display: table-cell;
					width: 56px;
					vertical-align: middle;
					@include border-bottom-1px(rgba(7, 17, 27, 0.1))
				}
			}
		}
		.foods-wrapper{
			flex: 1;
			.food-list{
				.title{
					padding-left: 14px;
					height: 26px;
					line-height: 26px;
					border-left: 2px solid #d9dde1;
					font-size: 12px;
					color: rgb(147, 153, 159);
					background: #f3f5f7;
				}
				.food-item{
					display: flex;
					padding: 18px;
					@include border-bottom-1px(rgba(7, 17, 27, 0.1))
					&.last-child{
						@include border-none()
					}
					.icon{
						flex: 0 0 57px;
						margin-right: 10px;
					}
					.content{
						flex: 1;
						.name{
							font-size: 14px;
							margin: 2px 0 8px 0;
							height: 14px;
							line-height: 14px;
							color: rgb(7, 17, 27);
						}
						.desc, .extra{
							line-height: 10px;
							font-size: 10px;
							color: rgb(147, 153, 159);
						}
						.desc{
							margin-bottom: 8px;
						}
						.extra{
							.count{
								margin-right: 12px;
							}
						}
						.price{
							font-weight: 700;
							line-height: 24px;
							.now{
								margin-right: 8px;
								font-size: 14px;
								color: rgb(240, 20, 20);
							}
							.old{
								text-decoration: line-through;
								font-size: 10px;
								color: rgb(147, 153, 159); 
							}
						}
					}
				}
			}
		}
	}
</style>
