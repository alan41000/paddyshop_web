<template>
	<view class="goods-item">
		<view class="img">
			<u-image
			 width="300"
			 height="300"
			 mode="widthFix"
			 :src="image">
			</u-image>
		</view>
		<view class="title">
			{{title}}
		</view>
		<view class="bottom">
			<pds-price-display class="mr" :price="priceNormal"></pds-price-display>
			<pds-price-original v-if="priceOriginal > 0" :price="priceOriginal"></pds-price-original>
		</view>
	</view>
</template>

<script>
	export default {
		name:'pds-goods-round',
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
