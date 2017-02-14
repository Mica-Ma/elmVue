<template>
	<div class="header">
		<!-- <mt-header fixed title="固定在顶部">mint-header</mt-header> -->
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div class="supports" v-if="seller.supports">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="supports-count" v-if="seller.supports">
				<span class="count">{{seller.supports.length}}</span>
				<i></i>
			</div>
			
		</div>
		<div class="notice-wrapper">
			
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		created () {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
		}
    };
</script>

<style lang="scss">
@import "../../common/sass/mixin.scss";
	.header{
		color: #fff;
		background-color: #000;
		.content-wrapper{
			padding: 24px 12px 18px 24px;
			font-size: 0;
			.avatar{
				display: inline-block;
				vertical-align: top;
				img{
					border-radius: 2px;
				}
			}
			.content{
				display: inline-block;
				margin-left: 16px;
				font-size: 14px;
				.title{
					margin: 2px 0 8px 0;
				}
				.brand{
					display: inline-block;
					width: 30px;
					height: 18px;
					@include bg-image('brand');
					background-size: 30px 18px;
					background-repeat: no-repeat;
					vertical-align: top;
				}
				.name{
					margin-left: 6px;
					font-size: 16px;
					line-height: 18px;

				}
				.description{
					margin-bottom: 10px;
					line-height: 12px;
					font-size: 12px;
				}
				.supports{
					.icon{
						display: inline-block;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						background-size: 12px 12px;
						background-repeat: no-repeat;
						vertical-align: middle;
						&.decrease{
							@include bg-image('decrease_1');
						}
						&.discount{
							@include bg-image('discount_1');
						}
						&.special{
							@include bg-image('special_1');
						}
						&.invoice{
							@include bg-image('invoice_1');
						}
						&.guarantee{
							@include bg-image('guarantee_1');
						}
					}
					.text{
						line-height: 12px;
						font-size: 10px;
					}
				}
			}
		}
	}
</style>
