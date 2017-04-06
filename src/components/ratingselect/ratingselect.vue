<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span @click="select(2, $event)" class="block positive" :class="{'active': mySelectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0, $event)" class="block positive" :class="{'active': mySelectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1, $event)" class="block negative" :class="{'active': mySelectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="toggleContent" class="swich" :class="{'on': myOnlyContent}">
			<span class="iconfont icon-tubiaozongjie31"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default{
		props: {
			ratings: {
				type: Array,
				default () {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default () {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			},
			selectForm: {
				type: String,
				default: ''
			}
		},
		computed: {
			positives () {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				})
			},
			negatives () {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				})
			}
		},
		data () {
			return {
				mySelectType: this.selectType,
				myOnlyContent: this.onlyContent
			}
		},
		methods: {
			select (type, event) {
				if(!event._constructed) return;
				this.mySelectType = type;
				this.$root.eventHub.$emit(`ratingtypeSelect.${this.selectForm}`, type);
				// console.log(this.selectType)
			},
			toggleContent (event) {
				if(!event._constructed) return;
				this.myOnlyContent = !this.myOnlyContent;
				this.$root.eventHub.$emit(`contentToggle.${this.selectForm}`, this.myOnlyContent);
			}
		},
		watch: {
			// selectType (val) {
			// 	this.mySelectType = val;
			// },
			// mySelectType (val) {
			// 	this.$root.eventHub.$emit('ratingtype.select', val);
			// }
		}
	}
</script>

<style lang="scss">
	@import "../../common/sass/mixin.scss";
	.ratingselect{
		.rating-type{
			padding: 18px 0;
			margin: 0 18px;
			@include border-bottom-1px(rgba(7, 17, 27, 0.1));
			font-size: 0;
			.block{
				font-size: 12px;
				display: inline-block;
				padding: 8px 12px;
				margin-right: 8px;
				border-radius: 1px;
				color: rgb(77, 85, 93);
				&.active{
					color: #fff
				}
				&.positive{
					background: rgba(0 ,160, 220, 0.2);
					&.active{
						background: rgba(0 ,160, 220, 1);
					}
				}
				&.negative{
					background: rgba(77, 85, 93, 0.2);
					&.active{
						background: rgba(77, 85, 93, 1);
					}
				}
				.count{
					font-size: 8px;
					margin-left: 2px;
					line-height: 16px;
				}
			}
		}
		.swich{
			padding: 12px 18px;
			line-height: 24px;
			border-bottom: 1px solid rgba(7, 17, 27, 0.1);
			color: rgb(147, 153, 159);
			font-size: 0;
			&.on{
				.icon-tubiaozongjie31{
					color: rgb(0 ,160, 220)
				}
			}
			.icon-tubiaozongjie31{
				display: inline-block;
				vertical-align: middle;
				font-size: 24px;
				margin-right: 4px;
			}
			.text{
				font-size: 12px;
				display: inline-block;
				vertical-align: middle;
			}
		}
	}
</style>
