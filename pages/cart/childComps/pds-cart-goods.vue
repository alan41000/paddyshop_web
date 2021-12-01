<template>
	<view class="cart-goods-item">
		<u-row gutter="16">
			<u-col span="1">
				<view class="checkbox" @click="selectGoods">
					<u-checkbox
						v-model="cartGoodsData.checked" 
						:name="cartGoodsData.id"
						shape="circle"
					></u-checkbox>
				</view>
			</u-col>
			<u-col span="3">
				<view @click="navigateTo('/pages/goods/goods?id=' + cartGoodsData.goods_id)">
					<u-image width="150rpx" height="150rpx" :src="cartGoodsData.images"></u-image>
				</view>
			</u-col>
			<u-col span="8">
				<view class="goods">
					<view class="title" @click="navigateTo('/pages/goods/goods?id=' + cartGoodsData.goods_id)">{{cartGoodsData.title}}</view>
					<view class="sku" @click="navigateTo('/pages/goods/goods?id=' + cartGoodsData.goods_id)">{{cartGoodsData.sku.name}}</view>
					<view>
						<pds-price-normal :price="cartGoodsData.price"></pds-price-normal>
						<u-number-box class="fr" :min="1" v-model="cartGoodsData.qty" @minus="qtyChange" @plus="qtyChange"></u-number-box>
					</view>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import pdsPriceNormal from "../../../components/pds-price/pds-price-normal.vue"
	export default {
		name:'pds-cart-goods',
		props: {
			cartGoodsData: {
				type: Object,
				default: {}
			},
		},
		components:{
			pdsPriceNormal,
		},
		data() {
			return {
				checked:false,
			}
		},
		mounted() {
			
		},
		methods: {
			qtyChange(e){
				let data = {
					id:this.cartGoodsData.id,
					qty:e['value']
				};
				this.$u.api.updateCartNum(data).then(res => {
					this.cartGoodsData.qty = e['value']
				});
			},
			selectGoods()
			{
				this.$emit('selectGoods')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cart-goods-item{
		width: 100%;
		height: 200rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		.goods{
			line-height: 1.8;
		}
		.title{
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
		.sku{
			color: $u-tips-color;
			min-height: 40rpx;
		}
		.checkbox{
			padding-top: 50rpx;
		}
	}
	.fr{
		float: right;
	}
</style>
