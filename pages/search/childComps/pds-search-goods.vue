<template>
	<view class="goods">
		<u-grid :col="2" :border="false">
			<u-grid-item v-for="(item,index) in goodsData" bg-color="none" :custom-style="{padding:'10rpx 10rpx 10rpx 0rpx'}">
				<navigator :url="'/pages/goods/goods?id=' + (item.goods_id || item.id)">
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
</template>

<script>
	import pdsGoodsRound from "@/components/pds-goods/pds-goods-round.vue"
	export default {
		components:{
			pdsGoodsRound,
		},
		props: {
			goodsData:{
				type:Array,
				default:[],
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.goods {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}
</style>
