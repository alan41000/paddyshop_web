<template>
	<view class="content">
		<u-popup v-model="paymentChooseShow" mode="bottom" :closeable="true" close-icon-size="50" border-radius="30" height="450">
			<pds-payment @paymentChoose="pay()"></pds-payment>
		</u-popup>
		<view class="mt20">
			<pds-box>
				<view slot="content">
					<u-steps :list="stepList" :current="Number(orderInfo.status - 1)"></u-steps>
				</view>
			</pds-box>
		</view>
		<view class="mt20">
			<pds-address :hasChooseFunction="false" :addressInfo="orderInfo.addressInfo"></pds-address>
		</view>
		<view class="mt20">
			<pds-detail-goods :goods_list="orderInfo.orderDetail"></pds-detail-goods>
		</view>
		<view class="mt20">
			<pds-box title="订单信息">
				<view slot="content">
					<u-cell-group>
						<u-cell-item title="订单号" :arrow="false" :value="orderInfo.order_no">
							<u-button :custom-style="{marginLeft:'20rpx'}" @click="copy" size="mini" slot="right-icon" shape="circle">复制</u-button>
						</u-cell-item>
						<u-cell-item title="支付方式" :arrow="false" :value="orderInfo.payment_name"></u-cell-item>
						<u-cell-item title="下单时间" :arrow="false" :value="orderInfo.create_time"></u-cell-item>
						<u-cell-item title="付款时间" :arrow="false" :value="orderInfo.pay_time == null ? '' : orderInfo.pay_time"></u-cell-item>
						<u-cell-item title="发货时间" :arrow="false" :value="orderInfo.delivery_time == null ? '' : orderInfo.delivery_time"></u-cell-item>
						<u-cell-item v-if="orderInfo.delivery_time > 0" title="快递" :arrow="false" :value="orderInfo.express_id"></u-cell-item>
						<u-cell-item v-if="orderInfo.delivery_time > 0" title="快递单号" :arrow="false" :value="orderInfo.express_number"></u-cell-item>
						<u-cell-item title="留言" :arrow="false" :value="orderInfo.user_note"></u-cell-item>
					</u-cell-group>
				</view>
			</pds-box>
		</view>
		<view class="pay">
			<u-row gutter="80">
				<u-col span="12">
					<u-button v-if="orderInfo.status == 0 || orderInfo.status == 1" :custom-style="{float:'right'}" size="medium" :disabled="submitDisable" type="primary" shape="circle" @click="paymentChooseShow = true">{{submitText}}</u-button>
				</u-col>
			</u-row>
		</view>
	</view>
</template>

<script>
	import pdsAddress from "./childComps/pds-address.vue"
	import pdsDetailGoods from "./childComps/pds-detail-goods.vue"
	import pdsPayment from "@/pages/order/childComps/pds-payment.vue";
	export default {
		components:{
			pdsAddress,
			pdsDetailGoods,
			pdsPayment
		},
		data() {
			return {
				orderInfo:{},
				stepList: [
					{ name: '待付款' }, 
					{ name: '待发货' }, 
					{ name: '已发货' }, 
					{ name: '待评价' }, 
				],
				submitText:'支付',
				submitDisable:false,
				paymentChooseShow:false,
			};
		},
		onLoad(option) {
			if(option.id){
				this.getOrderDetail(option.id);
			}
			else{
				uni.showToast({
					title:"参数有误",
					icon:'none'
				})
			}
		},
		methods:{
			copy(){
				uni.setClipboardData({
					data:this.orderInfo.order_no,
					success:()=>{
						uni.showToast({
							title:"订单号复制成功",
							icon:'none'
						})
					}
				});
			},
			getOrderDetail(order_id){
				let data = {
					order_id:order_id
				}
				this.$u.api.getOrderDetail(data).then(res => {
					this.orderInfo = res.data;
					if(this.orderInfo.payment_id == 1)
					{
						this.orderInfo.payment_name = '微信支付';
					}
					if(this.orderInfo.payment_id == 2)
					{
						this.orderInfo.payment_name = '钱包支付';
					}
				});
			},
			paymentChoose(){
				this.paymentChooseShow = true;
			},
			pay(payment_id){
				let data = {
					order_id:this.orderInfo.id,
					payment_id:payment_id,
				}
				this.$u.api.payOrder(data).then(res => {
					if(res.data.hasOwnProperty('status') && res.data.status == 2){
						this.navigateTo('/pages/order/pay-success?orderId='+res.data.id);
						return false;
					}
					this.wechatPay(res.data,this.orderInfo.id);
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
		padding: 20rpx 20rpx 180rpx 20rpx;
	}
	.pay {
		z-index: 100000;
		width: 100%;
		bottom: 0rpx;
		position:fixed;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 30rpx 0;
	}
</style>
