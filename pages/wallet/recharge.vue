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
					<u-radio-group style="width: 100%;" v-model="payment" @change="radioGroupChange">
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
	// #ifdef H5
	import wx from '@/common/libs/jweixin.js'
	// #endif
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
					payment:payData.payment,
					// #ifdef H5
					isH5:true,
					// #endif
				}
				this.$u.api.payRecharge(data).then(res => {
					// #ifdef MP-WEIXIN
						this.wechatPay(res.data,0);
					// #endif
					// #ifdef H5
						this.wechatPay(res.data,0,wx);
					// #endif
				});
			},
			wx_config(){
				let params = {url: window.location.href.split('#')[0]}
				this.$u.api.getWechatSignPackage(params).then(res => {
					let data = res.code === 200 ? res.data : {}
					wx.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: data.appId, // 必填，公众号的唯一标识
						timestamp: data.timestamp, // 必填，生成签名的时间戳
						nonceStr: data.nonceStr, // 必填，生成签名的随机串
						signature: data.signature, // 必填，签名
						jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
					})
					wx.ready(function() {
						// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
						wx.checkJsApi({
							jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
							success: function(res) {
								// 以键值对的形式返回，可用的api值true，不可用为false
								// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
							},
						});
					});
					wx.error(function(res){
					  // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
						console.log('接口验证失败',res)
					});
				}).catch(err => {
					// console.log(err)
				})
			}
		},
		// #ifdef H5
		onReady(){
			this.wx_config();
		}
		// #endif
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
