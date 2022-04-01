<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="couponItem" v-if="couponUserList[0].length > 0" v-for="(res,index) in couponUserList[0]" :key="res.id">
								<pds-coupon-card
									@useCoupon="navigateTo('/pages/index/index')"
									:isUse="true"
									:type="res.couponInfo.type"
									:value="res.couponInfo.value"
									:min_order_price="res.couponInfo.min_order_price"
									:expire_type="res.couponInfo.expire_type"
									:expire_hour="res.couponInfo.expire_hour"
									:start_time="res.couponInfo.start_time"
									:end_time="res.couponInfo.end_time"
								></pds-coupon-card>
							</view>
							<u-loadmore v-if="couponUserList[0].length > 0" :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="couponUserList[0].length == 0">
								<pds-coupon-empty></pds-coupon-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="couponItem" v-if="couponUserList[1].length > 0" v-for="(res,index) in couponUserList[1]" :key="res.id">
								<pds-coupon-card
									:isUse="true"
									:isGray="true"
									:type="res.couponInfo.type"
									:value="res.couponInfo.value"
									:min_order_price="res.couponInfo.min_order_price"
									:expire_type="res.couponInfo.expire_type"
									:expire_hour="res.couponInfo.expire_hour"
									:start_time="res.couponInfo.start_time"
									:end_time="res.couponInfo.end_time"
								></pds-coupon-card>
							</view>
							<u-loadmore v-if="couponUserList[1].length > 0" :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="couponUserList[1].length == 0">
								<pds-coupon-empty></pds-coupon-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view class="couponItem" v-if="couponUserList[2].length > 0" v-for="(res,index) in couponUserList[2]" :key="res.id">
								<pds-coupon-card
									:isUse="true"
									:isGray="true"
									:type="res.couponInfo.type"
									:value="res.couponInfo.value"
									:min_order_price="res.couponInfo.min_order_price"
									:expire_type="res.couponInfo.expire_type"
									:expire_hour="res.couponInfo.expire_hour"
									:start_time="res.couponInfo.start_time"
									:end_time="res.couponInfo.end_time"
								></pds-coupon-card>
							</view>
							<u-loadmore v-if="couponUserList[2].length > 0" :status="loadStatus[2]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="couponUserList[2].length == 0">
								<pds-coupon-empty></pds-coupon-empty>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import pdsCouponCard from "@/components/pds-coupon-card/pds-coupon-card.vue";
	import pdsCouponEmpty from "./childComps/pds-coupon-empty.vue";
	export default {
		components:{
			pdsCouponCard,
			pdsCouponEmpty
		},
		data() {
			return {
				couponUserList: [[], [], []],
				list: [
					{
						name: '未使用'
					},
					{
						name: '已使用'
					},
					{
						name: '已过期'
					}
				],
				current: 0,
				swiperCurrent: 0,
				tabsHeight: 0,
				dx: 0,
				size:10,
				page:[1,1,1],
				loadStatus: ['loadmore','loadmore','loadmore'],
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
			this.getCouponUserList(this.current);
		},
		methods: {
			paramsInit(){
				this.page = [1,1,1];
				this.couponUserList =  [[], [], []];
			},
			reachBottom() {
				if(this.loadStatus[this.current] == 'loadmore')
				{
					this.page[this.current] = ++this.page[this.current];
					this.getCouponUserList(this.current);
				}
			},
			// 页面数据
			getCouponUserList(idx) {
				let data = {
					current:this.page[idx],
					type:Number(idx),
				};
				
				this.$u.api.getCouponUserList(data).then(res => {
					for(let i = 0; i < res.data.records.length; i++)
					{
						this.couponUserList[idx].push(res.data.records[i]);
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
				this.page = [1,1,1];
				this.couponUserList[index] = [];
				this.loadStatus[index] = 'loading';
				this.swiperCurrent = index;
				this.getCouponUserList(index);
			},
			transition({ detail: { dx } }) {
				this.$refs.tabs.setDx(dx);
			},
			animationfinish({ detail: { current } }) {
				this.$refs.tabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
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
.couponItem{
	width: 95%;
	margin: 20rpx auto;
}
</style>
