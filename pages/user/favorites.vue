<template>
	<view class="content">
		<pds-dialog @cancel="favoritesDialogShow = false" @confirm="delFavorites" :show="favoritesDialogShow" title="真的要残忍删除我吗？"></pds-dialog>		
		<view class="page-box" v-if="favoritesList.length > 0">
			<pds-favorites-item v-for="(item,index) in favoritesList"
			:image="item.goodsInfo.home_recommended_images"
			:title="item.goodsInfo.title"
			:priceNormal="item.goodsInfo.price"
			:priceOriginal="item.goodsInfo.original_price"
			@del="delDialog(item.id)"
			@goGoods="navigateTo('/pages/goods/goods?id='+item.goodsInfo.id)">
			</pds-favorites-item>
			<view class="loadmore">
				<u-loadmore class="loadmore" v-if="favoritesList.length > 0" :status="loadStatus"></u-loadmore>
			</view>			
		</view>
		<view class="empty" v-else>
			<u-empty text="收藏夹空空如也" mode="favor"></u-empty>
			<u-button @click="navigateTo('/pages/index/index',true)" :custom-style="{marginTop:'20rpx'}" size="medium" type="primary" shape="circle">去逛逛</u-button>
		</view>
		<pds-goods-recommend v-if="recommendGoodsList.length > 0" name="精选推荐" :goodsList="recommendGoodsList"></pds-goods-recommend>
	</view>
</template>

<script>
	import pdsFavoritesItem from "./childComps/pds-favorites-item.vue"
	export default {
		components:{
			pdsFavoritesItem
		},
		data() {
			return {
				favoritesList:[],
				favoritesDialogShow:false,
				delete_id:0,
				page:1,
				loadStatus:'loadmore',
				recommendGoodsList:[],
			}
		},
		onLoad() {
			this.getFavoritesList();
			this.getGoodsRecommend(this).then(val=>{ this.recommendGoodsList = val });
		},
		onReachBottom() {
			this.reachBottom();
		},
		methods:{
			delDialog(id){
				this.favoritesDialogShow = true;
				this.delete_id = id;
			},
			delFavorites(){
				this.$u.api.delFavorites({favorites_id:this.delete_id}).then(res => {
					this.favoritesDialogShow = false;
					uni.showToast({
						title:'删除成功'
					})
					this.paramsInit();
					this.getFavoritesList();
				});
			},
			getFavoritesList(){
				this.loadStatus = 'loading'
				this.$u.api.getFavoritesList({current:this.page,size:20}).then(res => {
					this.favoritesList = res.data.records;
					if(this.favoritesList.length >= res.data.total){
						this.loadStatus = 'nomore'
					}
				});
			},
			reachBottom() {
				if(this.loadStatus == 'loadmore')
				{
					this.page = ++this.page;
					this.getFavoritesList();
				}
			},
			paramsInit()
			{
				this.favoritesList = [];
				this.favoritesDialogShow = false;
				this.delete_id = 0;
				this.page = 1;
				this.loadStatus = 'loadmore';
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: $u-bg-color;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.empty{
		padding-top: 200rpx;
		text-align: center;
	}
	.loadmore{
		padding: 40rpx 0rpx;
	}
</style>
