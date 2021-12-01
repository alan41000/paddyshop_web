<template>
	<view class="navigation">
		<view class="left">
			<view class="item">
				<navigator url="/pages/index/index" open-type="switchTab">
					<u-icon name="/static/index.png" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">首页</view>
				</navigator>
			</view>
			<view class="item car">
				<navigator url="/pages/cart/cart" open-type="switchTab">
					<!-- <u-badge class="car-num" :count="9" type="error" :offset="[-3, -6]"></u-badge> -->
					<u-icon name="/static/cart.png" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</navigator>
			</view>
			<view class="item">
				<navigator url="/pages/user/user" open-type="switchTab">
					<u-icon name="/static/user.png" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">我的</view>
				</navigator>				
			</view>			
		</view>
		<view class="right">
			<view class="cart btn u-line-1" @click="buy('cart')">加入购物车</view>
			<view class="buy btn u-line-1" @click="buy('buyNow')">立即购买</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'pds-submit-bar',
	props:{
		goods_id:{
			type: Number,
			default: 1,
		},
		stock:{
			type: Number,
			default: 1,
		},
		skuValue:{
			type:Object,
			default:{}
		}
	},
	methods:{
		buy(buyType){
			this.$emit('buy',buyType)
		}
	}
};
</script>

<style lang="scss" scoped>
.navigation {
	display: flex;
	bottom: 0;
	position:fixed;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 16rpx 0;
	width: 100%;
	.left {
		display: flex;
		font-size: 20rpx;
		.item {
			margin: 0 30rpx;
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		display: flex;
		font-size: 28rpx;
		align-items: center;
		.btn {
			line-height: 66rpx;
			padding: 0 30rpx;
			border-radius: 36rpx;
			color: #ffffff;
		}
		.cart {
			background-color: #ed3f14;
			margin-right: 10rpx;
		}
		.buy {
			background-color: #ff7900;
		}
	}
}
</style>
