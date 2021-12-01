<template>	
	<pds-box title="收货地址">
		<view v-if="hasChooseFunction" slot="title-right" class="more">
			<view @click="addressChoose">
				选择其他 >
			</view>
		</view>
		<view slot="content" class="content" v-if="addressInfo">
			<u-row gutter="0">
				<u-col span="6" text-align="left">
					{{addressInfo.name}}
				</u-col>
				<u-col span="6" text-align="left">
					{{addressInfo.tel}}
				</u-col>
			</u-row>
			<u-row gutter="0">
				<u-col span="12" text-align="left">
					{{addressInfo.province_name}} {{addressInfo.city_name}} {{addressInfo.county_name}} {{addressInfo.address}}
				</u-col>
			</u-row>
		</view>
		<view slot="content" class="content" v-else>
			<view class="addAddress">
				<navigator url="/pages/user/address-add">
					添加地址
				</navigator>
			</view>
		</view>
	</pds-box>
</template>

<script>
	export default {
		name:"pds-address",
		components:{
			
		},
		props:{
			addressInfo:{},
			hasChooseFunction:false,
		},
		data() {
			return {
			};
		},
		mounted() {
		},
		methods:{
			addressChoose(){
				this.$emit('addressChoose')
			},
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
		.addAddress{
			text-align: center;
			font-size: 32rpx;
		}
	}	
</style>
