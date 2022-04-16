<template>
	<view class="content">
		<view class="search">
			<pds-search-bar @search="search"></pds-search-bar>
		</view>
		<view class="keyword" v-if="flag == 'keyword'">
			<view class="project" v-if="userSearchKeyword.length > 0">
				<view class="title">
					<u-icon name="clock-fill" :margin-right="20" color="#909399" label="最近搜索" :custom-style="{marginBottom:'20rpx'}"></u-icon>
				</view>
				<view class="contents">
					<view v-for="(item,index) in userSearchKeyword" class="item" @click="search(item.keyword)">
						{{item.keyword}}
					</view>
				</view>
			</view>
			<view class="project" v-if="hotSearchKeyword.length > 0">
				<view class="title">
					<u-icon name="star-fill" :margin-right="20" color="#909399" label="热门搜索" :custom-style="{marginBottom:'20rpx'}"></u-icon>
				</view>
				<view class="contents">
					<view v-for="(item,index) in hotSearchKeyword" class="item" @click="search(item)">
						{{item}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="goodsData.length > 0 && flag == 'data'">
			<pds-search-tools @priceSort="priceSort" @saleSort="saleSort"></pds-search-tools>
			<pds-search-goods v-if="goodsData.length > 0" :goodsData="goodsData"></pds-search-goods>
		</view>
		<u-empty v-if="goodsData.length == 0 && flag == 'data'" margin-top="200" text="没有找到相关宝贝" mode="search"></u-empty>
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
				flag:'keyword',
				goodsData:[],
				userSearchKeyword:[],
				hotSearchKeyword:[],
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
			this.getUserSearch();
			this.getHotSearch();
		},
		watch: {
			'params':{
				handler:function(newValue,oldValue){
					if(newValue.categoryId > 0 || newValue.keyword !== ''){
						this.flag = 'data';
						this.getGoodsSearch();
					}
				},
				deep:true,
			}
		},
		methods: {
			getHotSearch(){
				this.hotSearchKeyword = uni.getStorageSync('siteConfig')['website_hotsearch'];
				if(this.hotSearchKeyword){
					this.hotSearchKeyword = this.hotSearchKeyword.split(' ');
				}
			},
			getGoodsSearch(){
				this.$u.api.getGoodsSearch(this.params).then(res => {
					this.goodsData = res.data;
				});
			},
			getUserSearch(){
				let userInfo = uni.getStorageSync('userInfo');
				if(userInfo){
					this.$u.api.getUserSearch().then(res => {
						this.userSearchKeyword = res.data;
					});
				}
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
	.search,.keyword{
		width: 100%;
		padding:10rpx 20rpx;
		.item{
			float: left;
			padding: 10rpx 20rpx;
			background-color: $u-border-color;
			border-radius: 20rpx;
			margin: 10rpx;
		}
		.project,.title,.contents{
			width: 100%;
			float: left;
		}
		.project{
			margin: 20rpx 0rpx;
		}
	}

</style>
