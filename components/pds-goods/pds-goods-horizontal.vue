<template>
	<view class="goods-item">
		<u-row gutter="16">
			<u-col span="4">
				<view class="img">
					<u-image
					 width="200"
					 height="200"
					 mode="widthFix"
					 :src="image">
					</u-image>
				</view>
			</u-col>
			<u-col span="8">
				<view class="title">
					{{title}}
				</view>
				<view class="bottom">
					<pds-price-display class="mr" :price="priceNormal"></pds-price-display>
					<pds-price-original :price="priceOriginal"></pds-price-original>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name:'pds-goods-horizontal',
		props: {
			image:'',
			title:'',
			priceNormal:'',
			priceOriginal:'',
		},
		components:{
		},
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
	
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item{
		padding: 20rpx;
		width: 100%;
		height: 500rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		.img{
			
		}
		.title{
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.bottom{
			margin-top: 10rpx;
		}
	}
	.mr{
		margin-right: 20rpx;
		float: left;
	}
</style>
