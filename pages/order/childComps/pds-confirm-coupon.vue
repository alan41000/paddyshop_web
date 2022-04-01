<template>	
	<pds-box>
		<view slot="content" class="content">
			<view>
				<u-row gutter="0">
					<u-col span="3">
						优惠券
					</u-col>
					<u-col span="6" text-align="left">
						<text v-if="qty == 0">无优惠券可用</text>
						<text v-if="preferential_price > 0" @click="useCoupon">-￥{{preferential_price}}</text>
						<text v-if="qty > 0 && preferential_price == 0" @click="useCoupon">有{{qty}}张优惠券可用</text>
					</u-col>
					<u-col span="3" text-align="left">
						<text class="choose" v-if="qty > 0" @click="useCoupon">选择优惠券</text>
					</u-col>
				</u-row>
			</view>
		</view>
	</pds-box>
</template>

<script>
	export default {
		name:"pds-confirm-coupon",
		components:{
			
		},
		props:{
			qty:{
				type:Number,
				default:0
			},
			preferential_price:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				
			};
		},
		mounted() {

		},
		methods:{
			useCoupon(){
				this.$emit('couponPopupShow');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.more{
		font-size: 28rpx;
		color: $u-tips-color;
	}
	.content{
		line-height: 2;
		padding: 0rpx!important;
		.title{
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
	.left{
		float: left;
	}
	.right{
		float: right;
	}
	.choose{
		color:#fa3534;
	}
</style>
