<template>
	<view class="submit">
		<u-row gutter="80">
			<u-col span="8">
				<view class="total">
					<span class="total-text">合计：</span>
					<pds-price-normal :price="total_price"></pds-price-normal>
				</view>
			</u-col>
			<u-col span="4">
				<u-button :disabled="submitDisable" type="primary" shape="circle" @click="addOrder">{{submitText}}</u-button>
			</u-col>
		</u-row>
	</view>
</template>

<script>
export default {
	name:'pds-submit',
	props:{
		total_price:0
	},
	data() {
		return {
			submitText:'确认支付',
			submitDisable:false,
		};
	},
	methods:{
		addOrder(){
			this.submitText ='支付中...';
			this.submitDisable = true;
			this.$emit('pay');
		},
	}
};
</script>

<style lang="scss" scoped>
.submit {
	width: 100%;
	bottom: 0rpx;
	position:fixed;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 30rpx 0;
	.total{
		font-size: 38rpx;
		text-align: right;
		line-height: 2;
	}
	.total-text{
		float:left;
		margin-top: 10rpx;
		font-size: 28rpx;
	}
}
</style>
