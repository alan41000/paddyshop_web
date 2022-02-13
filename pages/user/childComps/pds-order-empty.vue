<template>
	<view class="centre">
		<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
		<view class="explain">
			您还没有相关的订单
			<view class="tips">可以去看看有那些想买的</view>
		</view>
		<view @click="navigateTo('/pages/index/index')" class="btn">随便逛逛</view>
	</view>
</template>

<script>
	export default {
		name:"pds-order-empty",
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
