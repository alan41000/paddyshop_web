<template>
	<view class="price">
		<span class="tag" v-if="tag">{{tag}}: </span>
		<span class="main">{{symbol}}{{price}}</span>
	</view>
</template>

<script>
	export default {
		name:'pds-price-original',
		props: {
			tag:'',
			price:0,
		},
		data() {
			return {
				symbol:''
			}
		},
		mounted() {
			this.symbol = this.pdsSymbol
		}
	}
</script>

<style lang="scss" scoped>
	.price{
		float: left;
		color: $u-tips-color;
		line-height: 2;
		.main{
			font-size: 24rpx;
			text-decoration: line-through;
		}
		.tag{
			font-size: 24rpx;
			margin-right: 10rpx;
		}
	}
</style>
