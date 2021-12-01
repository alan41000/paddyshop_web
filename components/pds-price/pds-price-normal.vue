<template>
	<view class="price">
		<span class="symbol">{{symbol}}</span><span class="main">{{price_integer}}.</span><span class="decimal">{{price_decimal}}</span>
	</view>
</template>

<script>
	export default {
		name:'pds-price-normal',
		props: {
			price:{
				type:String,
				default:'0.00'
			},
		},
		data() {
			return {
				price_decimal:0,
				price_integer:0,
				symbol:''
			}
		},
		watch:{
			price(newVal,oldVal){
				this.priceHandle(newVal)
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init(){
				var that = this;
				that.symbol = that.pdsSymbol
				setTimeout(function(){
					that.priceHandle(that.price)
				},500)
			},
			priceHandle(val){
				let tmp = val.split('.');
				this.price_integer = tmp[0];
				this.price_decimal = tmp[1] || '00';
			}
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
