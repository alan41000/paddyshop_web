<template>
	<view class="order">		
		<pds-box title="我的订单">
			<view slot="title-right" class="more">
				<navigator url="/pages/user/order?type=4">
					全部订单 >
				</navigator>
			</view>
			<view slot="content">
				<u-row gutter="16">
					<u-col span="3" text-align="center">
						<navigator url="/pages/user/order?type=0">
							<view class="position">
								<u-icon name="/static/icon-order-pending.png" size="80"></u-icon>
								<u-badge type="error" :count="orderCounts[0]" :is-center="true"></u-badge>
							</view>
							<view>
								待付款
							</view>
						</navigator>
					</u-col>
					<u-col span="3" text-align="center">
						<navigator url="/pages/user/order?type=1">
							<view class="position">
								<u-icon name="/static/icon-order-undeliver.png" size="80"></u-icon>
								<u-badge type="error" :count="orderCounts[1]" :is-center="true"></u-badge>
							</view>
							<view>
								待发货
							</view>	
						</navigator>
					</u-col>
					<u-col span="3" text-align="center">
						<navigator url="/pages/user/order?type=2">
							<view class="position">
								<u-icon name="/static/icon-order-delivered.png" size="80"></u-icon>
								<u-badge type="error" :count="orderCounts[2]" :is-center="true"></u-badge>
							</view>
							<view>
								待收货
							</view>	
						</navigator>
					</u-col>
					<u-col span="3" text-align="center">
						<navigator url="/pages/user/order?type=3">
							<view class="position">
								<u-icon name="/static/icon-order-comment.png" size="80"></u-icon>
								<u-badge type="error" :count="orderCounts[3]" :is-center="true"></u-badge>
							</view>
							<view>
								待评价
							</view>	
						</navigator>
					</u-col>
				</u-row>
			</view>
		</pds-box>
	</view>
</template>

<script>	
	export default {
		name:"pds-order",
		components:{
			
		},
		props:{
			orderCounts:{
				type:Array,
				default:[0,0,0,0]
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.position{
		position: relative;
	}
	.order{
		width: 100%;
		height: 300rpx;
		.more{
			font-size: 28rpx;
			color: $u-tips-color;
		}
	}
</style>
