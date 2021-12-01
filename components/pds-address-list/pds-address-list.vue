<template>
	<view class="container">
		<pds-dialog
		@cancel="addressDelShow = false" 
		@confirm="delAddress" 
		:show="addressDelShow" 
		title="确认要删除此地址吗？"
		></pds-dialog>
		<scroll-view :scroll-y="true" style="height: 800rpx;">
			<view v-if="addressList.length > 0" class="item" v-for="(res, index) in addressList" :key="res.id">
				<view class="top">					
					<u-row gutter="16">
						<u-col span="3" @click="chooseAddress(res)">
							{{ res.name }}
						</u-col>
						<u-col span="5" @click="chooseAddress(res)">
							{{ res.tel }}
						</u-col>
						<u-col span="4" v-if="isHandle">
							<u-icon v-if="res.is_default == 1" size="40" name="checkmark-circle-fill" label="默认地址"></u-icon>
							<u-icon @click="setDefaultAddress(res.id)" v-if="res.is_default == 0" size="40" name="minus-circle" label="设为默认"></u-icon>
							<u-icon @click="delAddressDialog(res.id)" size="40" name="close-circle-fill" label="删除"></u-icon>
						</u-col>
					</u-row>
				</view>
				<view class="bottom">
					<view @click="chooseAddress(res)">{{res.province_name}} {{res.city_name}} {{res.county_name}} {{res.address}}</view>
					<u-icon @click="navigateTo('/pages/user/address-edit?id=' + res.id)" name="edit-pen" :size="40" color="#999999"></u-icon>
				</view>
			</view>
			<view v-if="addressList.length == 0" @click="addAddress">
				<u-empty text="没有收货地址" mode="address"></u-empty>
			</view>
		</scroll-view>
		<view class="addSite" @tap="addAddress">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"pds-address-list",
		props:{
			addressList: {
				type: Array,
				default: []
			},
			isHandle:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				addressDelShow:false,
				addressHandleId:0,
			};
		},
		mounted() {

		},
		methods:{			
			addAddress(){
				uni.navigateTo({
				    url: '/pages/user/address-add'
				});
			},
			chooseAddress(item){
				this.$emit('chooseAddress',item)
			},
			setDefaultAddress(address_id){
				this.$emit('setDefaultAddress',address_id)
			},
			// cancelDelAddress(){
			// 	this.addressDelShow = false;
			// },
			delAddress(){
				this.addressDelShow = false;
				this.$emit('delAddress',this.addressHandleId)
			},
			delAddressDialog(address_id){
				this.addressDelShow = true;
				this.addressHandleId = address_id;
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	padding: 50rpx 40rpx;
}
.item {
	padding: 20rpx 20rpx;
	.top {
		font-size: 34rpx;
		// .phone {
		// 	margin-left: 60rpx;
		// }
		// .tag {
		// 	// display: flex;
		// 	// font-weight: normal;
		// 	// font-size: 28rpx;
		// 	// align-items: right;
		// 	text-align: right;
		// 	text {
		// 		display: block;
		// 		width: 60rpx;
		// 		height: 34rpx;
		// 		line-height: 34rpx;
		// 		color: #ffffff;
		// 		font-size: 20rpx;
		// 		border-radius: 6rpx;
		// 		text-align: center;
		// 		margin-left: 30rpx;
		// 		background-color:rgb(49, 145, 253);
		// 	}
		// 	.red{
		// 		background-color:red
		// 	}
		// }
	}
	.bottom {
		display: flex;
		margin-top: 20rpx;
		font-size: 28rpx;
		justify-content: space-between;
		color: #999999;
	}
}
.addSite {
	display: flex;
	justify-content: space-around;
	width: 600rpx;
	line-height: 100rpx;
	position: absolute;
	bottom: 30rpx;
	left: 80rpx;
	background-color: red;
	border-radius: 60rpx;
	font-size: 30rpx;
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		.icon{
			margin-right: 10rpx;
		}
	}
}
</style>
