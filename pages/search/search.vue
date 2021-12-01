<template>
	<view class="content">
		<view class="search">
			<pds-search-bar @search="search"></pds-search-bar>
		</view>
		<pds-search-tools @priceSort="priceSort" @saleSort="saleSort"></pds-search-tools>
		<pds-search-goods v-if="goodsData.length > 0" :goodsData="goodsData"></pds-search-goods>
		<u-empty v-else margin-top="200" text="没有找到相关宝贝" mode="search"></u-empty>
	</view>
</template>

<script>
	import pdsSearchBar from "@/components/pds-search-bar/pds-search-bar.vue";
	import pdsSearchGoods from "./childComps/pds-search-goods.vue";
	import pdsSearchTools from "./childComps/pds-search-tools.vue";
	
	export default {
		components:{
			pdsSearchBar,
			pdsSearchGoods,
			pdsSearchTools
		},
		data() {
			return {
				goodsData:[],
				params:{
					categoryId:0,
					keyword:'',
					priceSort:null,
					saleSort:null,
				},
			}
		},
		onLoad(option) {
			this.params = this.$u.deepMerge(this.params, option);
		},
		watch: {
			'params':{
				handler:function(newValue,oldValue){
					this.getGoodsSearch();
				},
				deep:true,
			}
		},
		methods: {
			getGoodsSearch(){
				this.$u.api.getGoodsSearch(this.params).then(res => {
					this.goodsData = res.data;
				});
			},
			search(e){
				this.params['keyword'] = e;
			},
			priceSort(e){
				this.params['priceSort'] = e;
			},
			saleSort(e){
				this.params['saleSort'] = e;
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: $u-bg-color;
	}
	.search{
		width: 100%;
		padding:10rpx 20rpx;
	}

</style>
