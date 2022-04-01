<template>
	<u-popup v-model="popShow" mode="bottom" :closeable="true" @close="close()" close-icon-size="50" border-radius="30" height="1000">			
		<scroll-view :scroll-y="true" style="height: 850rpx; margin-top: 80rpx;">
			<view v-if="list.length > 0">
				<view  v-for="(res, index) in list" class="item">
					<pds-coupon-card
						:coupon_id="res.coupon_id"
						:coupon_user_id="res.id"
						:type="res.couponInfo.type"
						:value="res.couponInfo.value"
						:min_order_price="res.couponInfo.min_order_price"
						:expire_type="res.couponInfo.expire_type"
						:expire_hour="res.couponInfo.expire_hour"
						:start_time="res.start_time"
						:end_time="res.end_time"
						:isUse="true"
						@useCoupon="useCoupon"
					></pds-coupon-card>
				</view>
			</view>
		</scroll-view>
	</u-popup>
</template>

<script>
	import pdsCouponCard from "@/components/pds-coupon-card/pds-coupon-card.vue"
	export default {
		components:{
			pdsCouponCard
		},
		name:'pds-coupon-popup',
		props: {
			show:{
				type:Boolean,
				default:false
			},
			list:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				popShow:false,
			}
		},
		watch: {
		  show(val) {
			this.popShow = val;
		  },
		},
		mounted() {
			
		},
		methods: {
			useCoupon(e){
				this.$emit('useCoupon',e)
			},
			close(){
				this.$emit('close')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding: 50rpx 40rpx;
	}
	.item{
		width: 95%;
		margin: 20rpx auto;
	}
</style>
