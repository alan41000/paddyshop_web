<template>
	<view class="goods-item">
		<u-row gutter="16">
			<u-col span="4" @click="goGoods">
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
				<view class="title" @click="goGoods">
					{{title}}
				</view>
				<view class="price" @click="goGoods">
					<pds-price-display class="mr" :price="priceNormal"></pds-price-display>
					<pds-price-original :price="priceOriginal"></pds-price-original>
				</view>
				<view class="tools">
					<u-button @click="del()" type="error" size="mini" shape="circle" plain>删除</u-button>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name:'pds-favorites-item',
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
		methods: {
			del(){
				this.$emit('del');
			},
			goGoods(){
				this.$emit('goGoods');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item{
		padding: 20rpx;
		width: 100%;
		height: auto;
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
		.price{
			float: left;
			width: 100%;
			margin-top: 10rpx;
		}
		.tools{
			float: left;
			width: 100%;
			margin-top: 10rpx;
			text-align: right;
		}
	}
	.mr{
		margin-right: 20rpx;
		float: left;
	}
</style>
