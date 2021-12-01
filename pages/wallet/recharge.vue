<template>
	<view class="content">
		<view class="mt20">
			<pds-box title="充值金额">
				<view slot="content" class="content">
					<u-input v-model="money" type="number" border="false" placeholder="请输入充值金额" />
				</view>
			</pds-box>
		</view>
		<view class="mt20">
			<pds-box title="支付方式">
				<view slot="content" class="content">
					<u-radio-group v-model="payment" @change="radioGroupChange">
						<u-cell-group>
							<u-cell-item :arrow="false" :icon-style="{color:'#07c160'}" icon-size="70" icon="weixin-fill" title="微信支付" :title-style="{fontSize:'36rpx'}">
								<u-radio 
									@change="radioChange"
									slot="right-icon" 
									name="1"
									:disabled="false">
								</u-radio>
							</u-cell-item>
						</u-cell-group>
					</u-radio-group>
				</view>
			</pds-box>
		</view>
		<view class="mt20">
			<u-button @click="submit" type="primary">确定</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:'',
				payment:'1',
			}
		},
		methods: {
			submit(){
				let data = {
					money:Number(this.money),
					payment:this.payment
				}
				this.$u.api.createRecharge(data).then(res => {
					this.pay(res.data);
				})
			},
			pay(payData){
				let data = {
					rechargeId:payData.id,
					payment:payData.payment
				}
				this.$u.api.payRecharge(data).then(res => {
					this.wechatPay(res.data,0);
				});
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $u-bg-color;
	}
	.mt20{
		margin-top: 20rpx;
	}
	.content {
		// display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}
</style>
