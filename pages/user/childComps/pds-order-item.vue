<template>
	<view class="order">
		<view class="top">
			<view class="left">
				<!-- <u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
				<view class="store">paddyshop</view>
				<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon> -->
			</view>
			<view class="right" v-if="orderItem.status == 1">待付款</view>
		</view>
		<view @click="navigateTo('/pages/order/detail?id=' + orderItem.id)" v-for="(item, index) in orderItem.orderDetail" :key="index">
			<view class="item">
				<view class="left"><image :src="item.images" mode="aspectFill"></image></view>
				<view class="content">
					<view class="title u-line-2">{{ item.title }}</view>
					<view class="type">{{ item.sku }}</view>
					<!-- <view class="delivery-time">发货时间 {{ item.deliveryTime }}</view> -->
				</view>
				<view class="right">
					<view class="price">
						￥{{ item.price }}
					</view>
					<view class="number">x{{ item.qty }}</view>
					<view v-if="orderItem.status > 1 && item.refund_status == 0" class="aftersale" @click="navigateTo('/pages/order/aftersale?order_id=' + orderItem.id + '&detail_id=' + item.id + '&goods_id=' + item.goods_id)">申请售后</view>
					<view v-if="item.refund_status == 1" class="aftersale" @click="navigateTo('/pages/order/aftersale?order_id=' + orderItem.id + '&detail_id=' + item.id + '&goods_id=' + item.goods_id)">售后进度</view>
				</view>
			</view>
			<!-- <view style="width: 100%;">
				<view class="aftersale" @click="navigateTo('/pages/order/aftersale?order_id=' + orderItem.id + '&detail_id=' +item.id)">申请售后</view>
			</view>	 -->
		</view>
		
		<view class="total">
			共{{ orderItem.qty_total }}件商品 合计:
			<text class="total-price">
				￥{{ orderItem.total_price }}
			</text>
		</view>
		<view class="bottom">
			<!-- <view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view> -->
			<view class="logistics btn" v-if="orderItem.status == 3">查看物流</view>
			<view class="exchange btn" v-if="orderItem.status <= 1" @click="cancel">取消订单</view>
			<view class="pay btn" v-if="orderItem.status == 1" @click="pay">支付</view>
			<view class="evaluate btn" v-if="orderItem.status == 4 && orderItem.user_is_comments == 0" @click="navigateTo('/pages/order/comment?orderId='+orderItem.id)">评价</view>
			<view class="pay btn" v-if="orderItem.status == 3" @click="receipt">确认收货</view>			
		</view>
	</view>
</template>

<script>
	export default {
		name:"pds-order-item",
		components:{
			
		},
		props:{
			orderItem:{},
		},
		data() {
			return {
				
			};
		},
		mounted() {
			
		},
		computed: {

		},
		methods:{
			cancel(){
				this.$emit('cancel');
			},
			pay(){
				this.$emit('pay');
			},
			receipt(){
				this.$emit('receipt');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 20rpx;
		font-size: 28rpx;
		.top {
			display: flex;
			justify-content: space-between;
			.left {
				display: flex;
				align-items: center;
				.store {
					margin: 0 10rpx;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
			.right {
				color: $u-type-warning-dark;
			}
		}
		.item {
			display: flex;
			margin: 20rpx 0 0;
			.left {
				margin-right: 20rpx;
				image {
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
				}
			}
			.content {
				width: 50%;
				.title {
					font-size: 28rpx;
					line-height: 50rpx;
				}
				.type {
					margin: 10rpx 0;
					font-size: 24rpx;
					color: $u-tips-color;
				}
				.delivery-time {
					color: #e5d001;
					font-size: 24rpx;
				}
			}
			.right {
				margin-left: 10rpx;
				padding-top: 20rpx;
				text-align: right;
				.decimal {
					font-size: 24rpx;
					margin-top: 4rpx;
				}
				.number {
					color: $u-tips-color;
					font-size: 24rpx;
				}
				.aftersale{
					margin-top: 10rpx;
					font-size: 24rpx;
				}
			}
		}
		.total {
			margin-top: 20rpx;
			text-align: right;
			font-size: 24rpx;
			.total-price {
				font-size: 32rpx;
			}
		}
		.bottom {
			display: flex;
			margin-top: 40rpx;
			padding: 0 10rpx;
			justify-content: space-between;
			align-items: center;
			.btn {
				line-height: 52rpx;
				width: 160rpx;
				border-radius: 26rpx;
				border: 2rpx solid $u-border-color;
				font-size: 26rpx;
				text-align: center;
				color: $u-type-info-dark;
			}
			.evaluate {
				color: $u-type-warning-dark;
				border-color: $u-type-warning-dark;
			}
			.pay{
				background-color: $u-type-error;
				color:#FFFFFF;
			}
		}
	}
</style>
