<template>
	<view class="content">
		<view class="mt20">
			<pds-box class="mainBox">
				<view slot="content" class="main">
					<text class="symbol">¥</text><text class="money">{{walletInfo.normal_money}}</text>
					<u-button @click="navigateTo('/pages/wallet/recharge')" shape="circle" :custom-style="btnChargeStyle">充值</u-button>
				</view>
			</pds-box>
			<view class="mt20">
				<pds-box>
					<view slot="content">
						<u-cell-group>
							<u-cell-item @click="navigateTo('/pages/wallet/log')" :icon-style="{color:'#80b7f9'}" icon="heart-fill" title="资金流水"></u-cell-item>
							<u-cell-item @click="navigateTo('/pages/wallet/recharge-log')" :icon-style="{color:'#80b7f9'}" icon="map-fill" title="充值记录"></u-cell-item>
						</u-cell-group>
					</view>
				</pds-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnChargeStyle:{
					background:'none',
					border:'1px soild #FFFFFF',
					color:'#FFFFFF',
					width:'300rpx',
					marginTop:'40rpx'
				},
				walletInfo:{},
			}
		},
		methods: {
			getWalletInfo(){
				this.$u.api.getWalletInfo().then(res => {
					this.walletInfo = res.data;
				});
			}
		},
		onLoad() {
			this.getWalletInfo();
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $u-bg-color;		
	}
	.content {
		// display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}
	.mt20{
		margin-top: 20rpx;
	}
	.mainBox /deep/ .box{
		background-color: #2B85E4;
	}
	.main{
		color: #FFFFFF;
		text-align: center;
		height: 300rpx;
		.symbol{
			font-size: 60rpx;
		}
		.money{
			font-size: 100rpx;
		}
	}
</style>
