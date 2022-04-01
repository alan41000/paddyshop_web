<template>
	<view class="centre">
		<u-icon name="coupon-fill" color="#ff714e" size="150"></u-icon>
		<view class="explain">
			您还没有相关的优惠券
			<!-- <view class="tips">可以去看看有那些想买的</view> -->
		</view>
		<view @click="navigateTo('/pages/index/index')" class="btn">随便逛逛</view>
	</view>
</template>

<script>
	export default {
		name:"pds-coupon-empty",
		components:{
			
		},
		props:{
			
		},
		data() {
			return {
				
			};
		},
		methods:{

		}
	}
</script>

<style lang="scss" scoped>
	.centre {
		text-align: center;
		margin: 200rpx auto;
		font-size: 32rpx;
		image {
			width: 164rpx;
			height: 164rpx;
			border-radius: 50%;
			margin-bottom: 20rpx;
		}
		.tips {
			font-size: 24rpx;
			color: #999999;
			margin-top: 20rpx;
		}
		.btn {
			margin: 80rpx auto;
			width: 200rpx;
			border-radius: 32rpx;
			line-height: 64rpx;
			color: #ffffff;
			font-size: 26rpx;
			background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
		}
	}
</style>
