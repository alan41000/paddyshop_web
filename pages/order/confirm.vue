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
		<pds-submit ref="submit" :total_price="orderInfo.price_data.total_price" @pay="addOrder"></pds-submit>
	</view>
</template>

<script>
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
				orderInfo:{},
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
				}
				this.$u.api.payOrder(data).then(res => {
					if(res.data.hasOwnProperty('status') && res.data.status == 2){
						this.navigateTo('/pages/order/pay-success?orderId='+res.data.id);
						return false;
					}
					this.wechatPay(res.data,order_id);
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
