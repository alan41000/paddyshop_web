<template>
	<view class="content">
		<view @click="search">
			<pds-search-bar></pds-search-bar>
		</view>
		<pds-banner :bannerData="bannerData"></pds-banner>
		<pds-nav :navData="navData"></pds-nav>
		<pds-goods-floor :floorData="goodsIndexList"></pds-goods-floor>
		<pds-copyright></pds-copyright>
	</view>
</template>

<script>
	import pdsSearchBar from "@/components/pds-search-bar/pds-search-bar.vue";
	import pdsBanner from "./childComps/pds-banner.vue";
	import pdsNav from "./childComps/pds-nav.vue";
	import pdsGoodsFloor from "./childComps/pds-goods-floor.vue";
	export default {
		components:{
			pdsBanner,
			pdsSearchBar,
			pdsNav,
			pdsGoodsFloor,
		},
		data() {
			return {
				bannerData:[],
				goodsIndexList:[],
				navData:[],
			}
		},
		onLoad() {
			this.getBanner();
			this.getNavigation();
			this.getGoodsFloor();
		},
		methods: {
			// 获取海报数据
			getBanner(){
				this.$u.api.getBanner().then(res => {
					this.bannerData = res.data;
				});
			},
			getNavigation(){
				let data = {
					position:'index'
				};
				this.$u.api.getNavigation(data).then(res => {
					this.navData = res.data.records;
				});
			},
			getGoodsFloor(){
				this.$u.api.getGoodsIndexList().then(res => {
					this.goodsIndexList = res.data;
				});
			},
			search(e)
			{
				this.navigateTo('/pages/search/search')
			}
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
</style>
