<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for=" item,$index in goods" class="menu-item border-1px" :class="{'current':currentIndex===$index}" @click="selectMenu($index, $event)">
					<span class="text">
						<span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for=" item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item border-1px" @click="selectFood(food,$event)">
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
								<div class="cartcontrol-wrapper">
									<v-cartcontrol :food="food"></v-cartcontrol>
								</div>
								
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="shop-cart">
			<v-shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" ref="shopcart"></v-shopcart>
		</div>
		<food :food="selectedFood" ref="food" ></food>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcart from 'components/shopcart/shopcart';
	import food from 'components/food/food';
	import cartcontrol from 'components/cartcontrol/cartcontrol';

	const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
				// selectFood: ‘’
			}
		},
		components: {
			"v-shopcart": shopcart,
			"v-cartcontrol": cartcontrol,
			food
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

			this.axios.get('/api/goods').then((response) => {
                // console.log(response.data);
                // this.seller = response.data
                if (response.data.errno === ERR_OK) {
                    // debugger
                    this.goods = response.data.data;
                    // console.log(this.goods)
                    this.$nextTick(() => {
                    	this._initScroll();
                    	this._calculateHeight();
                    })
                    
                };
                // console.log(this.goods);
            });
		},
		computed: {
			currentIndex () {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					if ((!height2 || this.scrollY >= height1 && this.scrollY < height2)) {
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
		      	let foods = []
		      	// console.log(this.goods)
		      	
		      	this.goods.forEach((good) => {
		        	good.foods.forEach((food) => {
		          		if (food.count) {
		            		foods.push(food)
		          		}
		        	})
		      	})
		      	return foods;  	
		    }
		},
		methods: {
			_initScroll () {
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
					probeType: 3,
					click: true
				});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight () {
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				// console.log(foodList);
				let height = 0;
				this.listHeight.push(height);
				for (let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
				// console.log(this.listHeight);
			},
			selectMenu (index, event) {
				if(!event._constructed) return;
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300);

				// let height = this.listHeight[index];
				// console.log(height);
				// this.foodsScroll.scrollTo(0, height, 300);
				
			},
			_drop (target) {
				// 优化异步执行动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				})
			},
			selectFood (food, event) {
				if(!event._constructed) return;
				this.selectedFood = food;
				this.$refs.food.show()
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
				&.current{
					position: relative;
					z-index: 10;
					margin-top: -1px;
					background-color: #fff;
					font-weight: 700;
					.text{
						@include border-none();
					}
				}
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
					@include border-bottom-1px(rgba(7, 17, 27, 0.1));
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
					@include border-bottom-1px(rgba(7, 17, 27, 0.1));
					&.last-child{
						@include border-none();
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
							line-height: 14px;
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
						.cartcontrol-wrapper{
							position: absolute;
							right: 12px;
							bottom: 12px;
						}
					}
				}
			}
		}
	}
</style>
