<template>	
	<pds-box title="商品信息">
		<view slot="content" class="content">
			<view v-for="(item,index) in goods_list">
				<u-row gutter="0">
					<u-col span="4">
						<u-image 
						:src="item.goodsImages[0]['url']"
						width="200"
						height="200"
						mode="widthFix"
						></u-image>
					</u-col>
					<u-col span="8" text-align="left">
						<view class="title">{{item.title}}</view>
						<view v-if="item.skuValue_selected.sku">规格：{{item.skuValue_selected.sku}}</view>
						<view class="left">¥{{item.skuValue_selected.price}}</view>
						<view class="right">x{{item.skuValue_selected.qty}}</view>
					</u-col>
				</u-row>
				<u-gap margin-top="20" margin-bottom="20" height="1" bg-color="#e4e7ed" v-if="index !== goods_list.length - 1"></u-gap>
			</view>
		</view>
	</pds-box>
</template>

<script>
	export default {
		name:"pds-confirm-goods",
		components:{
			
		},
		props:{
			goods_list:[]
		},
		data() {
			return {
				
			};
		},
		mounted() {

		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.more{
		font-size: 28rpx;
		color: $u-tips-color;
	}
	.content{
		line-height: 2;
		padding: 0rpx!important;
		.title{
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
	.left{
		float: left;
	}
	.right{
		float: right;
	}
</style>
