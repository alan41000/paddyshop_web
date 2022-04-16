<template>
	<view class="content">
		<scroll-view :scroll-y="true" class="scroll-box"  @scrolltolower="getGoodsHistoryList">
			<u-grid v-if="goodsList.length > 0" :col="2" :border="false">
				<u-grid-item bg-color="none" v-for="(item,index) in goodsList" :custom-style="index % 2 == 0 ? left : right">
					<navigator :url="'/pages/goods/goods?id=' + item.goodsInfo.id">
						<pds-goods-round
						:image="item.goodsInfo.home_recommended_images"
						:title="item.goodsInfo.title"
						:priceNormal="item.goodsInfo.price"
						:priceOriginal="item.goodsInfo.original_price">
						</pds-goods-round>
					</navigator>
				</u-grid-item>
			</u-grid>
			<u-loadmore  @loadmore="getGoodsHistoryList" :status="loadStatus" v-if="goodsList.length !== 0" />
			<view v-if="goodsList.length == 0">
				<u-empty text="没有足迹记录" mode="address"></u-empty>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import pdsGoodsRound from "@/components/pds-goods/pds-goods-round.vue"
	export default {
		components:{
			pdsGoodsRound
		},
		data() {
			return {
				goodsList:[],
				page:1,
				size:20,
				loadStatus:'loadmore',
				right:{padding:'10rpx 0rpx 10rpx 10rpx'},
				left:{padding:'10rpx 10rpx 10rpx 0rpx'}
			}
		},
		onLoad() {
			this.getGoodsHistoryList();
		},
		methods: {
			getGoodsHistoryList(){
				if(this.loadStatus == 'loadmore'){
					let data = {
						current:this.page,
						size:this.size,
					};
					this.$u.api.getGoodsHistoryList(data).then(res => {
						res.data.records.forEach(ret => {
							this.goodsList.push(ret)
						})
						if(res.data.total <= this.page * this.size){
							this.loadStatus = 'noremore';
						}
						this.page += 1;
					});
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $u-bg-color;
	}
	.content {
		// display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}
	.scroll-box{
		height: calc(100vh - var(--window-top) - 100rpx);
		padding-bottom: 20rpx;
	}
</style>
