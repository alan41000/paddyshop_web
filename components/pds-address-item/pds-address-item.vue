<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input v-model="form.name" type="text" placeholder-class="line" placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input v-model="form.tel" type="text" placeholder-class="line" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input v-model="form.region" disabled type="text" placeholder-class="line" placeholder="省市区县、乡镇等" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea v-model="form.address" type="text" placeholder-class="line" placeholder="街道、楼牌等" />
			</view>
			<!-- <view class="site-clipboard">
				<textarea placeholder-class="line" value="" placeholder="粘贴文本,可自动识别姓名和地址等" />
				<view class="clipboard">
					地址粘贴板
					<u-icon name="arrow-down" class="icon" :size="20"></u-icon>
				</view>
			</view> -->
		</view>
		<view class="bottom">
			<!-- <view class="tag">
				<view class="left">标签</view>
				<view class="right">
					<text class="tags">家</text>
					<text class="tags">公司</text>
					<text class="tags">学校</text>
					<view class="tags plus"><u-icon size="22" name="plus"></u-icon></view>
				</view>
			</view> -->
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right"><u-switch v-model="form.is_default" color="red"></u-switch></view>
			</view>
		</view>
		<select-address ref="seleAds" @selectAddress="selectAddress" :pickerSize="3"></select-address>
		<!-- <u-picker mode="region" ref="uPicker" v-model="show" /> -->
		<!-- <u-select value-name="id" label-name="name"  v-model="show" mode="mutil-column-auto" :list="addressList" @confirm="confirm"></u-select> -->
	</view>
</template>

<script>
	import selectAddress from "@/components/selectAddress/selectAddress.vue"
	export default {
		name:"pds-address-item",
		props:{
			formData:{
				id:0,
				name:'',
				tel:'',
				region:'',
				province:0,
				city:0,
				county:0,
				address:'',
				is_default:0,
				tag:'',
			},
		},
		components:{
			selectAddress
		},
		data() {
			return {
				show: false,
				form:{
					id:0,
					name:'',
					tel:'',
					region:'',
					province:0,
					city:0,
					county:0,
					address:'',
					is_default:0,
					tag:'',
				},
				addressList:[],
			};
		},
		mounted() {			
			let that = this;
			setTimeout(()=>{
				if(that.formData !== null && that.formData.id > 0)
				{
					that.form = that.formData
				}
			},100)
		},
		methods: {
			showRegionPicker() {
				this.$refs.seleAds.show();				
			},
			selectAddress(e){
				this.form.province = e[0].value || 0;
				this.form.city = e[1].value || 0;
				this.form.county = e[2].value || 0;
				
				let provinceLable = e[0].label || '';
				let city = e[1].label || '';
				let county = e[2].label || '';
				
				this.form.region = provinceLable + ' ' + city +  ' ' + county;
			}
		}
	}
</script>

<style lang="scss" scoped>
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
				width: 600rpx;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
</style>

