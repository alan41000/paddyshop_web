<template>
	<view class="tools">
		<u-row gutter="40">
			<u-col span="3">
				<view class="selectAll">
					<u-checkbox
						@change="checkboxChange"
						v-model="isSelectAllData" 
						shape="circle"
					>全选</u-checkbox>
				</view>
			</u-col>
			<u-col span="5">
				<view>
					<span class="total">合计：</span>
					<pds-price-normal :price="totalPriceData"></pds-price-normal>
				</view>
			</u-col>
			<u-col span="4">
				<view class="checkbox">
					<u-button @click="settlement" type="primary" shape="circle">结算</u-button>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name:'pds-cart-tools',
		props: {
			totalPrice: {
				type: Number,
				default: 0
			},
			isSelectAll: {
				type: Boolean,
				default: false
			},
		},
		components:{
			
		},
		data() {
			return {
				isSelectAllData:false,
				totalPriceData:0,
			}
		},
		mounted() {
			
		},
		methods: {
			checkboxChange(e)
			{
				this.$emit('selectAll',e['value'])
			},
			settlement()
			{
				this.$emit('settlement')
			}
		},
		watch:{
			totalPrice(newval,oldval){
				this.totalPriceData = newval
			},
			isSelectAll(newval,oldval){
				this.isSelectAllData = newval
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tools{
		width: 100%;
		padding: 20rpx;
		border-top:1px solid $u-border-color;
		.selectAll{
			margin-top: 5rpx;
		}
		.total{
			float:left;
			margin-top: 10rpx;
			font-size: 28rpx;
		}
	}
</style>
