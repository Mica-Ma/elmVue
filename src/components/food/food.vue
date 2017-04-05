<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image"/>
					<div class="back" @click="back">
						<i class="iconfont icon-zuojiantou"></i>	
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{food.price}}</span>
						<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<transition name="fade">
						<div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
					</transition>
				</div>
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<div class="text">{{food.info}}</div>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :select-form="'food'" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<!-- <li v-for="rating in food.ratings" class="rating-item border-1px" v-show="selectType == rating.rateType || selectType == 2"> -->
							<li v-for="rating in food.ratings" class="rating-item border-1px" v-show="needShow(rating.rateType, rating.text)">
								<div class="user">
									<div class="name">{{rating.username}}</div>
									<img :src="rating.avatar" width="12" height="12" class="avatar">
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<i class="iconfont" :class="{'icon-pingjia_haoping': rating.rateType === 0,'icon-pingjia_chaping': rating.rateType === 1}"></i>{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
	
</template>

<script>
	import BScroll from 'better-scroll';
	import Vue from 'vue'
	import cartcontrol from 'components/cartcontrol/cartcontrol';
	import ratingselect from 'components/ratingselect/ratingselect';
	import split from 'components/split/split';
	import {formatDate} from 'common/js/date';

	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default{
		props: {
			food: {
				type: Object
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		},
		created () {
			this.$root.eventHub.$on('ratingtypeSelect.food', this.selectTypeRating);
			this.$root.eventHub.$on('contentToggle.food', this.onlyContentRating);
			
		},
		computed: {

		},
		data () {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		filters: {
			formatDate (time) {
				let date = new Date(time);
				return formatDate(date, 'YYYY-MM-DD HH:mm')
			}
		},
		methods: {
			show () {
				this.showFlag = true;
				this.$nextTick(() => {
					if (!this.scroll){
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						})
					} else {
						// console.log(this.scroll)
						this.scroll.refresh();
					}
					
				})
			},
			back () {
				this.showFlag = false;
			},
			addFirst (event) {
				if(!event._constructed) return;
				Vue.set(this.food, 'count', 1);
				this.$root.eventHub.$emit('cart.add', event.target);
			},
			selectTypeRating (type) {
				// console.log(type)
				this.selectType = type;
				this.$nextTick(() => {
					// console.log(this)
					this.scroll.refresh();
				})
			},
			onlyContentRating (onlyContent) {
				this.onlyContent = onlyContent;
				this.$nextTick(() => {
					// console.log(this)
					this.scroll.refresh();
				})
			},
			needShow (type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			}
		}
	}
</script>

<style lang="scss">
	@import "../../common/sass/mixin.scss";
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
			.back{
				position: absolute;
				top: 10px;
				left: 0;
				.icon-zuojiantou{
					display: block;
					padding: 10px;
					font-size: 20px;
					color: #fff;
				}
			}
		}
		.content{
			padding: 18px;
			position: relative;
			.title{
				font-size: 14px;
				margin-bottom: 8px;
				line-height: 14px;
				font-weight: 700;
				color: rgb(7, 17, 27);
			}
			.detail{
				margin-bottom: 18px;
				line-height: 10px;
				font-size: 0;
				.sell-count, .rating{
					font-size: 10px;
					color: rgb(147, 153, 159);
				}
				.sell-count{
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
			.buy{
				position: absolute;
				right: 18px;
				bottom: 18px;
				z-index: 10;
				height: 26px;
				line-height: 26px;
				padding: 0 12px;
				box-sizing: border-box;
				font-size: 10px;
				border-radius: 12px;
				color: #fff;
				background: rgb(0, 160, 220);
				&.fade-enter-active, &.fade-leave-active{
					transition: all 0.2s;
					opacity: 1;
				}
				&.fade-enter, &.fade-leave-active{
					opacity: 0;
				}
			}
		}
		.info{
			padding: 18px;
			.title{
				line-height: 14px;
				font-size: 14px;
				margin-bottom: 6px;
				color: rgb(7, 17, 27);
			}
			.text{
				line-height: 24px;
				padding: 0 8px;
				font-size: 12px;
				color: rgb(77, 85, 93);
			}
		}
		.rating{
			padding-top: 18px;
			.title{
				line-height: 14px;
				font-size: 14px;
				margin-left: 18px;
				color: rgb(7, 17, 27);
			}
			.rating-wrapper{
				padding: 0 18px;
				.rating-item{
					position: relative;
					padding: 16px 0;
					@include border-bottom-1px(rgba(7, 17, 27, 0.1));
					.user{
						position: absolute;
						right: 0;
						top: 16px;
						font-size: 0;
						line-height: 12px;
						.name{
							color: rgb(147, 153, 159);
							display: inline-block;
							vertical-align: top;
							font-size: 10px;
							margin-right: 6px;
						}
						.avatar{
							border-radius: 50%;
						}
					}
					.time{
						margin-bottom: 6px;
						font-size: 10px;
						line-height: 12px;
						color: rgb(147, 153, 159);
					}
					.text{
						line-height: 16px;
						font-size: 12px;
						color: rgb(7, 17, 27);
						.icon-pingjia_haoping, .icon-pingjia_chaping{
							margin-right: 4px;
							line-height: 16px;
							font-size: 12px;
						}
						.icon-pingjia_haoping{
							color: rgb(0, 160, 220);
						}
						.icon-pingjia_chaping{
							color: rgb(147, 153, 159);
						}
					}
				}
				.no-rating{
					padding: 16px 0;
					font-size: 12px;
					color: rgb(147, 153, 159);
				}
			}
		}
	}
</style>
