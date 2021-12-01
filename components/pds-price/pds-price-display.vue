<template>
	<view class="price">
		<span class="main">{{symbol}}{{price}}</span>
	</view>
</template>

<script>
	export default {
		name:'pds-price-display',
		props: {
			price:'',
		},
		data() {
			return {
				symbol:''
			}
		},
		mounted() {
			this.symbol = this.pdsSymbol
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.price{
		float: left;
		color: $u-type-error;
		.symbol{
			font-size: 24rpx;
		}
		.main{
			font-size: 36rpx;
			font-weight: bold;
		}
		.decimal{
			font-size: 24rpx;
		}
	}
</style>
