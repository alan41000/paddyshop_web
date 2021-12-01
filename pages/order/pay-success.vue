<template>
	<view class="container">
		<view class="content">
			<u-icon name="checkmark-circle-fill" color="#67d751" label="支付成功" label-size="36" label-pos="bottom" size="200"></u-icon>
			<u-button v-if="orderId > 0" @click="navigateTo('/pages/order/detail?id='+orderId)" :custom-style="btnClass" type="primary" shape="circle">查看订单详情</u-button>
			<u-button @click="navigateTo('/pages/index/index')" :custom-style="btnClass" shape="circle">返回首页</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnClass:{
					marginTop: '40rpx',
					width:'300rpx'
				},
				orderId:0,
			}
		},
		methods: {
			
		},
		onLoad(option) {
			if(option.orderId){
				this.orderId = option.orderId
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	text-align: center;	
	.content{
		margin-top: 400rpx!important;
	}
}
</style>
