<template>
	<view>
		<pds-dialog
		@cancel="orderCancelDialogShow = false" 
		@confirm="cancelOrder" 
		:show="orderCancelDialogShow" 
		title="真的要残忍取消我吗？"
		>
		</pds-dialog>
		<pds-dialog
		@cancel="orderReceiptShow = false" 
		@confirm="receiptOrder" 
		:show="orderReceiptShow" 
		title="确认收到货了吗？"
		>
		</pds-dialog>
		<u-popup v-model="paymentChooseShow" mode="bottom" :closeable="true" close-icon-size="50" border-radius="30" height="380">
			<pds-payment ref="paymentRef" @paymentChoose="pay"></pds-payment>
		</u-popup>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- <swiper-item class="swiper-item" v-for="(listItem,index) in list">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[current].length > 0" v-for="(res,index) in orderList[current]" :key="res.id">
								<pds-order-item :orderItem="res"></pds-order-item>
							</view>
							<u-loadmore v-if="orderList[current].length > 0" :status="loadStatus[current]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[current].length == 0">
								<pds-order-empty></pds-order-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item> -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[0].length > 0" v-for="(res,index) in orderList[0]" :key="res.id">
								<pds-order-item @pay="paymentChoose(res.id)" @cancel="cancelOrderDialog(res.id)" :orderItem="res"></pds-order-item>
							</view>
							<u-loadmore v-if="orderList[0].length > 0" :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[0].length == 0">
								<pds-order-empty></pds-order-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[1].length > 0" v-for="(res,index) in orderList[1]" :key="res.id">
								<pds-order-item :orderItem="res"></pds-order-item>
							</view>
							<u-loadmore v-if="orderList[1].length > 0" :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[1].length == 0">
								<pds-order-empty></pds-order-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view v-if="orderList[2].length > 0" v-for="(res,index) in orderList[2]" :key="res.id">
								<pds-order-item @receipt="receiptConfirm(res.id)" :orderItem="res"></pds-order-item>
							</view>
							<u-loadmore v-if="orderList[2].length > 0" :status="loadStatus[2]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[2].length == 0">
								<pds-order-empty></pds-order-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[3].length > 0" v-for="(res,index) in orderList[3]" :key="res.id">
								<pds-order-item :orderItem="res"></pds-order-item>
							</view>
							<u-loadmore v-if="orderList[3].length > 0" :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[3].length == 0">
								<pds-order-empty></pds-order-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[4].length > 0" v-for="(res,index) in orderList[4]" :key="res.id">
								<pds-order-item @pay="paymentChoose(res.id)" @cancel="cancelOrderDialog(res.id)" :orderItem="res"></pds-order-item>
							</view>
							<u-loadmore v-if="orderList[4].length > 0" :status="loadStatus[4]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[4].length == 0">
								<pds-order-empty></pds-order-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	// #ifdef H5
	import wx from '@/common/libs/jweixin.js'
	// #endif
	import pdsOrderItem from "./childComps/pds-order-item.vue";
	import pdsOrderEmpty from "./childComps/pds-order-empty.vue";
	import pdsPayment from "@/pages/order/childComps/pds-payment.vue";
	export default {
		components:{
			pdsOrderItem,
			pdsOrderEmpty,
			pdsPayment,
		},
		data() {
			return {
				orderList: [[], [], [], [],[]],
				list: [
					{
						name: '待付款'
					},
					{
						name: '待发货'
					},
					{
						name: '待收货'
					},
					{
						name: '待评价',
					},
					{
						name: '全部',
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				size:10,
				page:[1,1,1,1,1],
				loadStatus: ['loadmore','loadmore','loadmore','loadmore','loadmore'],
				orderCancelDialogShow:false,
				paymentChooseShow:false,
				orderReceiptShow:false,
				handle_order_id:0,
			};
		},
		onLoad(option) {
			if(option.type)
			{
				this.current = option.type;
				this.swiperCurrent = option.type;
				this.dx = option.type;
			}
		},
		onShow() {
			this.paramsInit();
			this.getOrderList(this.current);
		},
		onReady(){
			// #ifdef H5
				this.wx_config();
			// #endif
		},
		methods: {
			paramsInit(){
				this.page = [1,1,1,1,1];
				this.orderList =  [[], [], [], [],[]];
			},
			cancelOrderDialog(order_id){
				this.handle_order_id = order_id;
				this.orderCancelDialogShow = true;
			},
			paymentChoose(order_id){
				// #ifdef MP-WEIXIN
				this.$refs.paymentRef.payment = 'payment';
				// #endif
				this.handle_order_id = order_id;
				this.paymentChooseShow = true;
			},
			receiptConfirm(order_id){
				this.handle_order_id = order_id
				this.orderReceiptShow = true;
			},
			receiptOrder(){
				let data = {
					order_id:this.handle_order_id,
				}
				this.$u.api.receiptOrder(data).then(res => {
					this.orderReceiptShow = false;
					uni.showToast({
						title:'确认收货成功'
					});
					this.paramsInit();
					this.getOrderList(2);
				});
			},
			pay(payment_id){
				let data = {
					order_id:this.handle_order_id,
					payment_id:payment_id,
					// #ifdef H5
					isH5:true,
					// #endif
				}
				this.$u.api.payOrder(data).then(res => {
					if(res.data.hasOwnProperty('status') && res.data.status == 2){
						this.navigateTo('/pages/order/pay-success?orderId=' + res.data.id);
						return false;
					}
					// #ifdef MP-WEIXIN
						this.wechatPay(res.data,this.handle_order_id);
					// #endif
					// #ifdef H5
						this.wechatPay(res.data,this.handle_order_id,wx);
					// #endif
				});
			},
			cancelOrder(){
				let data = {
					order_id:this.handle_order_id,
				}
				this.$u.api.cancelOrder(data).then(res => {
					this.orderCancelDialogShow = false;
					uni.showToast({
						title:'取消成功'
					});
					this.paramsInit();
					this.getOrderList(0);
				});
			},
			reachBottom() {
				if(this.loadStatus[this.current] == 'loadmore')
				{
					this.page[this.current] = ++this.page[this.current];
					this.getOrderList(this.current);
				}
			},
			// 页面数据
			getOrderList(idx) {
				let data = {};
				if(idx == 4){
					data = {
						current:this.page[idx],
					}
				}else{
					data = {
						current:this.page[idx],
						status:Number(idx) + 1
					}
				}
				
				this.$u.api.getUserOrder(data).then(res => {
					for(let i = 0; i < res.data.records.length; i++)
					{
						this.orderList[idx].push(res.data.records[i]);
					}
					if(res.data.total <= this.page[idx] * this.size)
					{
						this.loadStatus[idx] = 'nomore';
					}
					else
					{
						this.loadStatus[idx] = 'loadmore';
					}
				});
			},
			
			// tab栏切换
			change(index) {
				this.page = [1,1,1,1,1];
				this.orderList[index] = [];
				this.loadStatus[index] = 'loading';
				this.swiperCurrent = index;
				this.getOrderList(index);
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
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
			},
		}
	};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
