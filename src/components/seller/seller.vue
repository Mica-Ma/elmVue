<template>
	<div class="seller" ref="seller">
		<div class="seller-contnet">
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc ">
					<star :size="36" :score="seller.score"></star>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<i class="iconfont icon-xin-copy" :class="{'active': favorite}"></i>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<div class="content">{{seller.bulletin}}</div>
				</div>
				<ul v-if="seller.supports" class="supports">
					<li class="supports-item border-1px" v-for="item in seller.supports">
						<span class="icon" :class="classMap[item.type]"></span>
						<span class="text">{{item.description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title border-1px">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
	
<script>
	import {saveToLocal, loadFromLocal} from "common/js/store"
	import BScroll from "better-scroll"
	import star from "components/star/star";
	import split from "components/split/split";
	export default {
		props: {
			seller: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data () {
			return {
				favorite: (() => {
					return loadFromLocal(this.seller.id, 'favorite', false)
				})()
			}
		},
		computed: {
			favoriteText () {
				return this.favorite ? '已收藏' : '收藏'
			}
		},
		components: {
			star,
			split
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		mounted () {
			// this.$nextTick(() => {
				// debugger
				// console.log(this.$refs.seller)
				// this.scroll = new BScroll(this.$refs.seller, {
				// 	click: true
				// })
				// if(!this.seller) return;
				this._initScroll();	
				// console.log(this.$refs.seller)
			// })
		},
		watch: {
			seller () {
				// console.log(this.seller)
				this._initScroll();
			}
		},
		methods: {
			_initScroll () {
				// debugger
				// console.log(this.seller)
				// console.log(this.seller)
				if(this.scroll) {
					this.scroll.destroy();
					this.$delete(this.scroll, 'scroll')
				}
				// console.log(this)
				// if(!this.scroll) {
					this.$nextTick(() => {
						// console.log(this.$refs.seller)
						// console.log(this.scroll)
						this.scroll = new BScroll(this.$refs.seller, {
							click: true
						})
					})
					
				// }else {
				// 	console.log(this.scroll)
				// 	this.scroll.refresh();
				// }
				this._initPicScroll()
			},
			_initPicScroll () {
				if(this.picScroll) return;
				if(this.seller.pics){
					const picWidth = 120;
					const margin = 6;
					let width = (picWidth + margin) * this.seller.pics.length - margin + 'px';
					this.$refs.picList.style.width = width;
					this.picScroll = new BScroll(this.$refs.picWrapper, {
						scrollX: true,
						eventPassthrough: 'vertical'
					})

				}
				
			},
			toggleFavorite (event) {
				// console.log(event)
				if(!event._constructed) return;
				// console.log(this.favorite)
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id, 'favorite', this.favorite)
			}
		}
	}
</script>

<style lang="scss">
	@import "../../common/sass/mixin.scss";
	.seller{
		position: absolute;
		width: 100%;
		top: 174px;
		left: 0;
		bottom: 0;
		overflow: hidden;
		.overview{
			padding: 18px;
			position: relative;
			.title{
				margin-bottom: 8px;
				line-height: 14px;
				color: rgb(7, 17, 27);
				font-size: 14px;
			}
			.desc{
				padding-bottom: 18px;
				font-size: 0;
				@include border-bottom-1px(rgba(7, 17, 27, 0.1));
				.star{
					display: inline-block;
					margin-right: 8px;
					vertical-align: top;
				}
				.text{
					display: inline-block;
					line-height: 18px;
					margin-right: 12px;
					font-size: 10px;
					vertical-align: top;
					color: rgb(77, 85, 93);
				}
			}
			.remark{
				display: flex;
				padding-top: 18px;
				.block{
					flex: 1;
					text-align: center;
					border-right: 1px solid rgba(7, 17, 27, 0.1);
					&:last-child{
						border-right: none;
					}
					h2{
						line-height: 10px;
						font-size: 10px;
						margin-bottom: 10px;
						color: rgb(147, 153, 159);
					}
					.content{
						line-height: 24px;
						font-size: 10px; 
						color: rgb(7, 17, 27);
						.stress{
							font-size: 24px;
						}
					}
				}
			}
			.favorite{
				position: absolute;
				right: 8px;
				top: 18px;
				text-align: center;
				font-size: 0;
				.icon-xin-copy{
					display: block;
					margin-bottom: 4px;
					color: #d4d6d9;
					line-height: 24px;
					font-size: 24px;
					&.active{
						color: rgb(240, 20, 20);
					}
				}
				.text{
					font-size: 10px;
					line-height: 10px;
					color: rgb(77, 85, 93);
					display: block;
    				width: 50px;
				}
			}
		}
		.bulletin{
			padding: 18px 18px 0 18px;
			.title{
				margin-bottom: 8px;
				line-height: 14px;
				color: rgb(7, 17, 27);
				font-size: 14px;
			}
			.content-wrapper{
				padding: 0 12px 16px 12px;
				@include border-bottom-1px(rgba(7, 17, 27, 0.1));
				.content{
					line-height: 24px;
					font-size: 12px;
					color: rgb(240, 20, 20);
				}
			}
			.supports{
				.supports-item{
					padding: 16px 12px;
					font-size: 0;
					@include border-bottom-1px(rgba(7, 17, 27, 0.1));
					&:last-child{
					@include border-none();
					}
					.icon{
						display: inline-block;
						width: 16px;
						height: 16px;
						vertical-align: top;
						margin-right: 6px;
						background-size: 16px 16px;
						background-repeat: no-repeat;
						&.decrease{
							@include bg-image('decrease_4');
						}
						&.discount{
							@include bg-image('discount_4');
						}
						&.special{
							@include bg-image('special_4');
						}
						&.invoice{
							@include bg-image('invoice_4');
						}
						&.guarantee{
							@include bg-image('guarantee_4');
						}
					}
					.text{
						line-height: 16px;
						font-size: 12px;
					}
				}
			}
		}
		.pics{
			padding: 18px;
			.title{
				margin-bottom: 12px;
				line-height: 14px;
				color: rgb(7, 17, 27);
				font-size: 14px;
			}
			.pic-wrapper{
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				.pic-list{
					font-size: 0;
					.pic-item{
						display: inline-block;
						margin-right: 6px;
						width: 120px;
						height: 90px;
						&:last-child{
							margin-right: 0;
						}
					}
				}
			}
		}
		.info{
			padding: 18px 18px 0 18px;
			color: rgb(7, 17, 27);
			.title{
				padding-bottom: 12px;
				line-height: 14px;
				@include border-bottom-1px(rgba(7, 17, 27, 0.1));
				font-size: 14px;
			}
			.info-item{
				padding: 16px 12px;
				line-height: 16px;
				font-size: 12px;
				@include border-bottom-1px(rgba(7, 17, 27, 0.1));
				&:last-child{
					@include border-none();
				}
			}
		}
	}
</style>
