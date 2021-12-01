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
			<u-col span="9">
				<view class="checkbox">
					<u-button :custom-style="{margin:'0rpx 10rpx'}" @click="moveFavorites" size="mini" shape="circle">移至收藏夹</u-button>
					<u-button :custom-style="{margin:'0rpx 10rpx'}" @click="del" size="mini" shape="circle">删除</u-button>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name:'pds-cart-edit',
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
			checkboxChange(e){
				this.$emit('selectAll',e['value'])
			},
			del(){
				this.$emit('del')
			},
			moveFavorites(){
				this.$emit('moveFavorites')
			}
		},
		watch:{
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
		.checkbox{
			text-align: right;
		}
	}
</style>
