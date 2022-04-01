<template>
	<view class="container">
		<u-popup v-model="popShow" mode="bottom" :closeable="true" @close="close()" close-icon-size="50" border-radius="30" height="1000">			
			<scroll-view :scroll-y="true" style="height: 850rpx; margin-top: 80rpx;">
				<view v-if="list.length > 0">
					<view  v-for="(res, index) in list" class="item">
						<pds-coupon-card
							:coupon_id="res.id"
							:type="res.type"
							:value="res.value"
							:min_order_price="res.min_order_price"
							:expire_type="res.expire_type"
							:expire_hour="res.expire_hour"
							:start_time="res.start_time"
							:end_time="res.end_time"
						></pds-coupon-card>
					</view>
				</view>
				<view v-else>
					no data
				</view>
			</scroll-view>
		</u-popup>
	</view>
</template>

<script>
	import pdsCouponCard from "@/components/pds-coupon-card/pds-coupon-card.vue"
	export default {
		components:{
			pdsCouponCard
		},
		name:'pds-coupon',
		props: {
			show:false,
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
