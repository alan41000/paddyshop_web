<template>
	<view class="goods-recommend">
		<view class="title">{{name}}</view>
		<view class="content">
			<u-grid :col="2" :border="false">
				<u-grid-item bg-color="none" v-for="(item,index) in goodsList" :custom-style="index % 2 == 0 ? left : right">
					<navigator :url="'/pages/goods/goods?id=' + item.id">
						<pds-goods-round
						:image="item.home_recommended_images"
						:title="item.title"
						:priceNormal="item.price"
						:priceOriginal="item.original_price">
						</pds-goods-round>
					</navigator>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	import pdsGoodsRound from "@/components/pds-goods/pds-goods-round.vue"
	export default {
		name:'pds-goods-recommend',
		props: {
			name:{
				type: String,
				default:'热门推荐'
			},
			goodsList:{
				type: Array,
				default () {
					return []
				}
			}
		},
		components:{
			pdsGoodsRound
		},
		data() {
			return {
				right:{padding:'10rpx 0rpx 10rpx 10rpx'},
				left:{padding:'10rpx 10rpx 10rpx 0rpx'}
			}
		},
		onLoad() {
		},
		methods: {
	
		}
	}
</script>

<style lang="scss">
	.goods-recommend{
		width: 100%;
		padding: 20rpx;
		background-color: $u-bg-color;
		.title{
			font-size: 40rpx;
			text-align: center;
		}
		.content{
			width: 100%;
			margin-top: 10rpx;
		}
	}
</style>
