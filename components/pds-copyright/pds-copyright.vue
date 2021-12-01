<template>
	<view class="copyright">
		<p class="paddyshop">由PaddyShop提供技术支持</p>
		<p class="slogon">全网免费的多平台电商系统</p>
	</view>
</template>

<script>
	export default {
		name:'pds-copyright',
		props: {
			
		},
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
			
		},
	}
</script>

<style lang="scss" scoped>
	.copyright{
		padding: 20rpx 0rpx;
		color: #909399;
		text-align: center;
		line-height: 1.5;
		.paddyshop{
			font-size: 28rpx;
		}
		.slogon{
			font-size: 24rpx;
		}
	}
</style>
