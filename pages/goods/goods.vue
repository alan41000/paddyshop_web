<template>
	<view>
		<u-toast ref="uToast" />
		<pds-coupon @close="couponShow = false" :show="couponShow" :list="goodsCouponList"></pds-coupon>
		<pds-barrage :list="barrageList" :top="barrageTop" :left="35" color="#ffffff" background="#000000" :opacity="0.7"></pds-barrage>
		<echone-sku
			:show="popupShow" 
			 mode="forbidden"
			:theme-color="themeColor" 
			:combinations="goodsData.skuValue" 
			:specifications="goodsData.skuAttribute" 
			:default-select-index="selectedIndex" 
			:combinations-props="combinationsProps"
			:specifications-props="specificationsProps"
			:buyType="buyType"
			@close="handleClose" 
			@confirm="handleConfirm"
		></echone-sku>
		<view class="banner">
			<u-swiper @click="bannerView" :list="goodsData.goodsImages" name="url" :height="bannerHeight"></u-swiper>
			<u-icon @click="closeVideo" v-if="videoPlay" class="video-close" name="close-circle" color="#c0c4cc" size="100"></u-icon>
			<u-icon @click="playVideo" v-if="goodsData.video" class="video-play" name="play-circle" color="#c0c4cc" size="130"></u-icon>
			<view class="video-main" v-if="videoPlay">
				<video :autoplay="true" :loop="true" :style="{height:bannerHeight+'rpx',width:'100%'}" id="myVideo" :src="goodsData.video" controls></video>
			</view>
		</view>
		<view class="title center">
			{{goodsData.title}}
		</view>
		<view class="price">
			<pds-price-normal :price="goodsData.price"></pds-price-normal>
			<pds-price-original v-if="goodsData.original_price > 0" tag="原价" :price="goodsData.original_price"></pds-price-original>
			<view class="tools">
				<view class="coupon" @click="couponShow = true">领券</view>
				<u-icon @click="delFavorites()" v-if="hasFavorites" color="#ff7900" name="star-fill" size="50"></u-icon>
				<u-icon @click="addFavorites()" v-else color="#ff7900" name="star" size="50"></u-icon>
			</view>
		</view>
		<view class="info">
			<u-grid :col="3" :border="false">
				<u-grid-item :custom-style="{color:'#909399',fontSize:'24rpx', padding:'40rpx 0rpx'}">
					库存：{{goodsData.inventory}}{{goodsData.inventory_unit}}
				</u-grid-item>
				<u-grid-item :custom-style="{color:'#909399',fontSize:'24rpx', padding:'40rpx 0rpx'}">
					销量：{{goodsData.sales_count}}{{goodsData.inventory_unit}}
				</u-grid-item>
				<u-grid-item @click="navigateTo('/pages/goods/comment?goodsId='+id)" :custom-style="{color:'#909399',fontSize:'24rpx', padding:'40rpx 0rpx'}">
					评价：{{goodsData.comments_count}}
				</u-grid-item>
			</u-grid>
		</view>
		<view class="content">
			<view class="title">产品介绍</view>
			<u-parse :html="goodsData.content"></u-parse>
		</view>
		<pds-goods-recommend v-if="recommendGoodsList.length > 0" name="精选推荐" :goodsList="recommendGoodsList"></pds-goods-recommend>
		<view class="copyright">
			<pds-copyright></pds-copyright>
		</view>
		<pds-submit-bar @buy="selectSku" :goods_id="Number(id)" :stock="1" :skuValue="skuValueData"></pds-submit-bar>
	</view>
</template>

<script>
	import echoneSku from '@/components/echone-sku/echone-sku';
	import pdsSubmitBar from "./childComps/pds-submit-bar.vue";
	import pdsBarrage from './childComps/pds-barrage.vue';
	import pdsCoupon from './childComps/pds-coupon.vue';
	export default {
		components:{
			pdsSubmitBar,
			echoneSku,
			pdsBarrage,
			pdsCoupon
		},
		data() {
			return {
				id:0,
				goodsData:{},
				bannerHeight:0,
				hasFavorites:false,
				favoritesId:0,
				//===========sku==============
				skuValueData:{},
				themeColor: '#ff7900',
				popupShow: false,
				combinationsProps: {
					id: 'skuId',
					value: 'sku',
					image: 'image',
					price: 'price',
					stock: 'inventory'
				},
				specificationsProps: {
					id: 'id',
					list: 'item',
					name: 'name'
				},
				combinations: [],
				specifications: [],
				selectedIndex: 0,
				buyType:'buyNow',
				barrageTop:20,
				barrageList: [],
				recommendGoodsList:[],
				// playVideoBtn:true,
				videoPlay:false,
				couponShow:false,
				goodsCouponList:[],
			}
		},
		methods: {
			closeVideo(){
				this.videoPlay = false;
			},
			playVideo(){
				this.videoPlay = true;
			},
			getGoodsCouponList(){
				this.$u.api.getGoodsCouponList({goods_id:this.id}).then(res => {
					this.goodsCouponList = res.data;
				});
			},
			getOrderRecordBarrage(){
				this.$u.api.getOrderRecordBarrage({id:this.id}).then(res => {
					this.barrageList = res.data;
				});
			},
			bannerView(index){
				let arr = []
				for(var i = 0; i < this.goodsData.goodsImages.length; i++){
					arr.push(this.goodsData.goodsImages[i].url)
				}
				uni.previewImage({
					current:index,
					urls: [...arr],
				});
			},
			checkHasFavorites(){
				let userInfo = uni.getStorageSync('userInfo');
				if(userInfo !== ''){
					this.$u.api.checkHasFavorites({goods_id:this.id}).then(res => {
						if(res.data.hasFavorites)
						{
							this.hasFavorites = true;
							this.favoritesId = res.data.favorites_id;
						}
					});
				}
			},
			addFavorites(){
				this.$u.api.addFavorites({goods_id:this.id}).then(res => {
					this.hasFavorites = true;
					this.favoritesId = res.data.id;
				});
			},
			delFavorites(){
				this.$u.api.delFavorites({favorites_id:this.favoritesId}).then(res => {
					this.hasFavorites = false;
					this.favoritesId = 0;
				});
			},
			getGoodsData(){
				this.$u.api.getGoodsData({id:this.id}).then(res => {
					this.goodsData = res.data;
					this.getSkuValueData();
				});
			},
			getSkuValueData(){
				this.skuValueData = this.goodsData.skuValue[0];
			},
			addToCart(obj){
				let data = {
					goods_id:obj.goods_id,
					qty:obj.count,
					sku_value_id:obj.id,
				}
				this.$u.api.addToCart(data).then(res => {
					this.$refs.uToast.show({
						title: '添加成功，在购物车等亲~',
					})
				});
			},
			buyNow(obj){
				let goods = [{
					goods_id:obj.goods_id,
					qty:obj.count,
					sku_value_id:obj.id,
				}]
				uni.navigateTo({
					url:'/pages/order/confirm?buyType=buyNow&goods=' + encodeURI(JSON.stringify(goods))
				})
			},
			async init(option){
				if(option.id)
				{
					this.id = option.id;
					await this.getGoodsData();
					this.getOrderRecordBarrage();
					this.getGoodsCouponList();
					// this.getSkuValueData();
					this.checkHasFavorites();
					this.getGoodsRecommend(this).then(val=>{ this.recommendGoodsList = val });
				}
				else
				{
					uni.showToast({
						title:'参数有误',
						icon:'none'
					})
				}
			},
			selectSku(buyType) {
				this.buyType = buyType
				this.popupShow = true
			},
			handleClose() {
				this.popupShow = false
			},
			handleConfirm(obj) {
				if(this.buyType == 'buyNow')
				{
					this.buyNow(obj);
				}
				if(this.buyType == 'cart')
				{
					this.addToCart(obj)
				}
				this.popupShow = false
			}
		},
		onLoad(option) {
			this.bannerHeight = this.pdsSystemInfo.screenWidth * 2;
			this.init(option);
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: $u-bg-color;
	}
	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}
	.title{
		background-color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bold;
	}
	.price,.info{
		padding: 0rpx 20rpx;
		background-color: #FFFFFF;
	}
	.tools{
		.coupon{
			float: left;
			width: 100rpx;
			font-size: 32rpx;
			color: $u-type-error;
		}
		float: right;
		width: 200rpx;
	}
	.content{
		.title{
			text-align: center;
			font-size: 32rpx;
			font-weight: normal;
			line-height: 3;
		}
		width: 100%;
		background-color: #FFFFFF;
	}
	.copyright{
		height: 250rpx;
	}
	.banner{
		position: relative;
		.video-play{
			bottom: 20rpx;
			left: 20rpx;
			position: absolute;
			z-index: 7000;
		}
		.video-close{
			top: 20rpx;
			right: 20rpx;
			position: absolute;
			z-index: 10000;
		}
		.video-main{
			width: 100%;
			position: absolute;
			z-index: 8000;
			top: 0rpx;
		}
		
	}	
</style>
