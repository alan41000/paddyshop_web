<template>
	<view class="goods-floor">
		<view class="goods-floor-item" v-for="(item,index) in floorData">
			<view class="title">{{item.name}}</view>
			<view class="contents">
				<u-grid :col="2" :border="false">
					<u-grid-item bg-color="none" v-for="(goods_item,goods_index) in item.GoodsList" :custom-style="goods_index % 2 == 0 ? left : right">
						<navigator :url="'/pages/goods/goods?id=' + goods_item.id">
							<pds-goods-round
							:image="goods_item.home_recommended_images"
							:title="goods_item.title"
							:priceNormal="goods_item.price"
							:priceOriginal="goods_item.original_price">
							</pds-goods-round>
						</navigator>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	import pdsGoodsRound from "../../../components/pds-goods/pds-goods-round.vue"
	export default {
		name:'pds-goods-floor',
		props: {
			floorData:{},
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
		created() {
			
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.goods-floor{
		width: 100%;
		.goods-floor-item{
			margin: 20rpx 0rpx;
			.title{
				font-size: 40rpx;
				text-align: center;
			}
			.contents{
				width: 100%;
				margin-top: 10rpx;
			}
		}
	}
</style>
