<template>
	<view class="content">
		<u-popup v-model="addressChooseShow" mode="bottom" :closeable="true" close-icon-size="50" border-radius="30" height="1000">
			<pds-address-list :addressList="addressList" @chooseAddress="chooseAddress"></pds-address-list>
		</u-popup>
		<view>
			<pds-address :hasChooseFunction="true" :addressInfo="addressInfo" @addressChoose="addressChoose()"></pds-address>
		</view>
		<view class="mt20">
			<pds-confirm-goods :goods_list="orderInfo.goods_list"></pds-confirm-goods>
		</view>
		<view class="mt20">
			<pds-notes ref="notes"></pds-notes>
		</view>
		<view class="mt20">
			<pds-payment @paymentChoose="paymentChoose"></pds-payment>
		</view>
		<pds-submit ref="submit" :total_price="orderInfo.price_data.total_price.toString()" @pay="addOrder"></pds-submit>
	</view>
</template>

<script>
	// #ifdef H5
	import wx from '@/common/libs/jweixin.js'
	// #endif
	import pdsAddressList from "@/components/pds-address-list/pds-address-list.vue"
	import pdsAddress from "./childComps/pds-address.vue"
	import pdsConfirmGoods from "./childComps/pds-confirm-goods.vue"
	import pdsNotes from "./childComps/pds-notes.vue"
	import pdsPayment from "./childComps/pds-payment.vue"
	import pdsSubmit from "./childComps/pds-submit.vue"
	export default {
		components:{
			pdsAddressList,
			pdsAddress,
			pdsConfirmGoods,
			pdsNotes,
			pdsPayment,
			pdsSubmit
		},
		data() {
			return {
				addressChooseShow:false,
				addressInfo:{
					name:'',
					tel:'',
					province_name:'',
					city_name:'',
					county_name:'',
					address:'',
				},
				addressList:[],
				goods:[],
				orderInfo:{
					price_data:{
						total_price:'0'
					}
				},
				stock:0,
				skuValue:'',
				buyType:'',
				payment_id:0,
			}
		},
		methods: {
			paymentChoose(e){
				this.payment_id = e;
			},
			addressChoose(){
				this.addressChooseShow = true
			},
			chooseAddress(data){
				this.addressInfo = data;
				this.addressChooseShow = false;
			},
			getUserAddressList() {
				this.$u.api.getUserAddressList().then(res => {
					this.addressList = res.data.records;
				});
			},
			getUserDefaultAddress(){
				this.$u.api.getUserDefaultAddress().then(res => {
					this.addressInfo = res.data
				})
			},
			addOrder(){
				let data = {
					buy_type:this.buyType,
					payment_id:this.payment_id,
					goods:JSON.stringify(this.goods),
					user_note:this.$refs.notes.notes,
					address:JSON.stringify(this.addressInfo),
				}			
				this.$u.api.addOrder(data).then(res => {
					this.pay(res.data.id)
				}).catch(res => {
					// 还原支付按钮
					this.$refs.submit.submitText = '确认支付';
					this.$refs.submit.submitDisable = false;
				})
			},
			pay(order_id){
				let data = {
					order_id:order_id,
					// #ifdef H5
					isH5:true,
					// #endif
				}
				this.$u.api.payOrder(data).then(res => {
					if(res.data.hasOwnProperty('status') && res.data.status == 2){
						this.navigateTo('/pages/order/pay-success?orderId='+res.data.id);
						return false;
					}
					// #ifdef MP-WEIXIN
						this.wechatPay(res.data,order_id);
					// #endif
					// #ifdef H5
						this.wechatPay(res.data,order_id,wx);
					// #endif
				}).catch(res => {
					// 还原支付按钮
					this.$refs.submit.submitText = '确认支付';
					this.$refs.submit.submitDisable = false;
				});
			},
			orderConfirm(){
				let data = {
					buy_type:this.buyType,
					goods:JSON.stringify(this.goods),
				}
				this.$u.api.getOrderConfirm(data).then(res => {
					this.orderInfo = res.data;
				});
			},
			wx_config(){
				let params = {url: window.location.href.split('#')[0]}
				this.$u.api.getWechatSignPackage(params).then(res => {
					// console.log("配置参数3333",res.data)
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
								// console.log('checkJsApi11111111',res)
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
		onLoad(option) {
			this.checkLogin();
			if(option.buyType)
			{
				this.buyType	= option.buyType;
				this.goods		= JSON.parse(decodeURI(option.goods)) || '';
				this.orderConfirm();
			}
		},
		onShow() {
			this.getUserDefaultAddress();
			this.getUserAddressList();
		},
		onReady(){
			// #ifdef H5
				// this.wx_config();
			// #endif
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
		padding: 20rpx 20rpx 180rpx 20rpx;
	}
</style>
