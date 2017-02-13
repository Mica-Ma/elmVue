<template>
	<div class="tab">
		<div class="tab-item"><a v-link="{ path: '/foo' }">商品</a></div>
		<div class="tab-item"><a v-link="{ path: '/foo' }">评论</a></div>
		<div class="tab-item"><a v-link="{ path: '/foo' }">商家</a></div>
	</div>
</template>

<script>
	export default {
    };
</script>

<style lang="scss">
	.tab{
		display: flex;
		line-height: 40px;
		.tab-item{
			flex: 1;
			text-align: center;
		}
	}
</style>

