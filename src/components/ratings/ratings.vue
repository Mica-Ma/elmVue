<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="rating in ratings">
						<div class="avatar">
							<img :src="rating.avatar" width="28" height="28">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<i class="iconfont icon-pingjia-haoping"></i>
								<span v-for="item in rating.recommend">{{item}}</span>
							</div>
							<div class="time">{{rating.rateTime | formatDate}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import star from "components/star/star";
	import ratingselect from 'components/ratingselect/ratingselect';
	import {formatDate} from "common/js/date.js"
	import split from 'components/split/split';

	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	const ERR_OK = 0;

	export default {
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			star,
			split,
			ratingselect
		},
		data () {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			};
		},
		filters: {
			formatDate (time) {
				let date = new Date(time);
				return formatDate(date, 'YYYY-MM-DD HH:mm')
			}
		},
		created () {
			// let _this = this;
			this.axios.get('/api/ratings').then((response) => {
				if (response.data.errno === ERR_OK) {
                    // debugger
                    this.ratings = response.data.data;

                    this.$nextTick(() => {
                    	// console.log(this.$refs.ratings)
	                    this.scroll = new BScroll(this.$refs.ratings, {
	                    	click: true
	                    })	
                    })
                    
                    // console.log(this.goods)
                    // this.$nextTick(() => {
                    // 	this._initScroll();
                    // 	this._calculateHeight();
                    // })
                    
                };
			})
		}
	}

</script>

<style lang="scss">
	.ratings{
		position: absolute;
		width: 100%;
		top: 174px;
		left: 0;
		bottom: 0;
		overflow: hidden;
		.overview{
			display: flex;
			padding: 18px 0;
			.overview-left{
				flex: 0 0 137px;
				width: 137px;
				border-right: 1px solid rgba(7, 17, 27, 0.1);
				text-align: center;
				padding: 6px 0;
				@media only screen and (max-width: 320px) {
					flex: 0 0 120px;
					width: 120px;
				}
				.score{
					margin-bottom: 6px;
					line-height: 28px;
					font-size: 24px;
					color: rgb(255, 153, 0);
				}
				.title{
					margin-bottom: 8px;
					line-height: 12px;
					font-size: 12px;
					color: rgb(7, 17, 27);
				}
				.rank{
					font-size: 10px;
					line-height: 10px;
					color: rgb(147, 153, 159);
				}
			}
			.overview-right{
				flex: 1;
				padding: 6px 0 6px 24px;
				@media only screen and (max-width: 320px) {
					padding-left: 6px;
				}
				.score-wrapper{
					margin-bottom: 8px;
					font-size: 0;
					.title{
						line-height: 18px;
						font-size: 12px;
						color: rgb(7, 17, 27);
						display: inline-block;
						vertical-align: top;
					}
					.star{
						display: inline-block;
						margin: 0 12px;
						vertical-align: top;
						@media only screen and (max-width: 320px) {
							margin: 0 6px;
						}
					}
					.score{
						line-height: 18px;
						display: inline-block;
						vertical-align: top;
						font-size: 12px;
						color: rgb(255, 153, 0);
					}
				}
				.delivery-wrapper{
					font-size: 0;
					.title{
						line-height: 18px;
						font-size: 12px;
						color: rgb(7, 17, 27);
					}
					.delivery{
						margin-left: 12px;
						line-height: 18px;
						font-size: 12px;
						color: rgb(147, 153, 159);
					}
				}
			}
		}
		.rating-wrapepr{
			padding: 0 18px;
			.rating-item{
				display: flex;
				
			}
		}
	}
</style>
