<template>
	<view class="record">
		<pds-box>
			<view slot="content">
				<u-row gutter="16">
					<u-col span="3" text-align="center">
						<navigator url="/pages/wallet/wallet">
							<view class="number">
								{{wallet}}
							</view>
							<view>
								我的余额
							</view>
						</navigator>
					</u-col>
					<u-col span="3" text-align="center">
						<navigator url="/pages/user/coupon">
							<view class="number">
								{{coupon}}
							</view>
							<view>
								优惠券
							</view>	
						</navigator>
					</u-col>
					<u-col span="3" text-align="center">
						<navigator url="/pages/user/integral-log">
							<view class="number">
								{{integral}}
							</view>
							<view>
								我的积分
							</view>	
						</navigator>
					</u-col>
					<u-col span="3" text-align="center">
						<navigator url="/pages/user/favorites">
							<view class="number">
								{{favorites}}
							</view>
							<view>
								我的收藏
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
		name:"pds-user-record",
		components:{
			
		},
		props:{
			wallet:{
				type:Number,
				default:0
			},
			coupon:{
				type:Number,
				default:0
			},
			integral:{
				type:Number,
				default:0
			},
			favorites:{
				type:Number,
				default:0
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.number{
		position: relative;
		font-size: 40rpx;
	}
	.record{
		width: 100%;
	}
</style>
