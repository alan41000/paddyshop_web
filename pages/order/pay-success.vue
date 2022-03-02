<template>
	<view class="container">
		<view class="content">
			<u-row gutter="16">
				<u-col span="1" offset="2">
					<u-icon name="checkmark-circle-fill" color="#67d751" label="支付成功" label-size="36" label-pos="bottom" size="150"></u-icon>
				</u-col>
				<u-col span="9">
					<u-button v-if="orderId > 0" @click="navigateTo('/pages/order/detail?id=' + orderId)" :custom-style="btnClass" type="primary" shape="circle">查看订单详情</u-button>
					<u-button @click="navigateTo('/pages/index/index')" :custom-style="btnClass" shape="circle">返回首页</u-button>
				</u-col>
			</u-row>			
		</view>
		<pds-goods-recommend v-if="recommendGoodsList.length > 0" name="精选推荐" :goodsList="recommendGoodsList"></pds-goods-recommend>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnClass:{
					marginTop: '20rpx',
					width:'300rpx'
				},
				orderId:0,
				recommendGoodsList:[],
			}
		},
		methods: {
			
		},
		onLoad(option) {
			if(option.orderId){
				this.orderId = option.orderId
			}
			this.getGoodsRecommend(this).then(val=>{ this.recommendGoodsList = val });
		}
	}
</script>

<style lang="scss" scoped>
.container{
	text-align: center;	
	.content{
		margin-top: 170rpx!important;
		padding-bottom: 40rpx;
	}
}
</style>
