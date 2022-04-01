<template>
	<view class="coupon" v-bind:class="{ 'isGray': isGray }">
		<u-row gutter="16">
			<u-col span="8">
				<view class="type" v-if="type == 0">满减券</view>
				<view class="type" v-if="type == 1">折扣券</view>
				<view class="contents">
					<view class="value" v-if="type == 0">
						<span class="symbol">{{symbol}}</span><span class="main">{{value}}</span>
					</view>
					<view class="value" v-if="type == 1">
						<span class="main">{{value}}</span><span class="discount">折</span>
					</view>
					<view class="limit">
						满{{min_order_price}}元使用
					</view>
				</view>
				<view class="tips" v-if="expire_type == 0">
					领取后{{expire_hour}}小时内有效
				</view>
				<view class="tips" v-if="expire_type == 1">
					使用时间：<br>{{start_time}} 至 {{end_time}}
				</view>
			</u-col>
			<u-col span="4">
				<u-button v-if="!isUse" @click="receiveCoupon" :custom-style="btnStyle">立即领取</u-button>
				<u-button v-if="isUse" @click="useCoupon" :custom-style="btnStyle">立即使用</u-button>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name:'pds-coupon-card',
		props:{
			coupon_id:{
				type:Number,
				default:0
			},
			coupon_user_id:{
				type:Number,
				default:0
			},
			type:{
				type:Number,
				default:0
			},
			value:{
				type:Number,
				default:0
			},
			min_order_price:{
				type:Number,
				default:0
			},
			expire_type:{
				type:Number,
				default:0
			},
			expire_hour:{
				type:Number,
				default:0
			},
			start_time:{
				type:String,
				default:''
			},
			end_time:{
				type:String,
				default:''
			},
			isUse:{
				type:Boolean,
				default:false
			},
			goUse:{
				type:Boolean,
				default:false
			},
			isGray:{
				type:Boolean,
				default:false
			},
		},
		data(){
			return {
				symbol:'',
				btnStyle:{
					color:'#f63053',
					marginTop:'60rpx'
				}
			}
		},
		mounted() {
			this.symbol = this.pdsSymbol
		},
		methods:{
			receiveCoupon(){				
				this.$u.api.receiveCoupon({coupon_id:this.coupon_id}).then(res => {
					uni.showToast({
						title:'领取成功'
					})
				});
			},
			useCoupon(){
				this.$emit('useCoupon',{coupon_id:this.coupon_id,coupon_user_id:this.coupon_user_id})
			}
		}
	}
</script>

<style lang="scss">
	.coupon{
		border: 2rpx solid #f6d6e1;
		border-radius: 30rpx;
		padding: 30rpx;
		background-color: #fdf9fa;		
	}
	.isGray{
		filter: grayscale(100%);
	}
	.type{
		width: 100rpx;
		height: 50rpx;
		background-color: #fcedf2;
		color: #f63053;
	}
	.contents{
		color: #f63053;
		width: 100%;
		float: left;
		.value{
			float: left;
			width: 150rpx;
			.symbol,.discount{
				font-size: 32rpx;
			}
			.main{
				font-size: 52rpx;
				font-weight: bold;
			}
		}
		.limit{
			margin-top: 30rpx;
			color: #f63053;
			float: left;
		}
	}	
	.tips{
		margin-top: 10rpx;
		float: left;
		width: 100%;
	}
</style>
