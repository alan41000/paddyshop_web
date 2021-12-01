<template>
	<popup-bottom :show="show" @close="closeSkuBox">
		<view class="sku-box">
				<view class="sku-header container">
					<image class="goods-img" :src="selectSkuInfo[cbImage]"></image>
					
					<view class="sku-goods-info">
						<view class="money" :style="{color:themeColor}">
							<text class="symbol fs-26">￥</text>
							<text class="amount fs-38">{{selectSkuInfo[cbPrice] | toFixed2}}</text>
						</view>
						<view class="stock fs-24">
							库存{{selectSkuInfo[cbStock]}}件
						</view>
						<view class="fs-24" v-if="selectSkuInfo[cbValue]">
							已选："{{selectSkuInfo[cbValue]}}"
						</view>
					</view>
				</view>
				<scroll-view class="sku-list" scroll-y="true">
					<view class="sku-item container" v-for="(sku,sIndex) in mySpecifications" :key="sku[speId]">
						<view class="sku-name">{{sku[speName]}}</view>
						<view class="sku-content">
							<text 
								class="sku-content-item" 
								v-for="(item,index) in sku[speList]"
								:key="index" 
								:style="{
									borderColor: index===sku.sidx? themeColor: '',
									color:index===sku.sidx?themeColor:'',
									backgroundColor: index===sku.sidx?'white':'#f5f5f5' }" 
								@click="selectSku(sIndex,index)"
							>{{item}}</text>
						</view>
					</view>
				</scroll-view>
				<view class="sku-item container count">
					<view class="sku-name">数量</view>
					<view class="count-box">
						<text class="minus" :class="{disabled:buyCount<=1}" @click="handleBuyCount('minus')">-</text>
						<input class="count-content" v-model="buyCount" :disabled="selectSkuInfo[cbStock]<=0"/>
						<text class="add" :class="{disabled:buyCount>=selectSkuInfo[cbStock]}" @click="handleBuyCount('add')">+</text>
					</view>
				</view>
				<view class="confirm-btn container" :class="{disabled:selectSkuInfo[cbStock]==0}" :style="{backgroundColor:themeColor}" @click="handleConfirm">
					{{buyType=='buyNow' ? (selectSkuInfo[cbStock] > 0 ? '立即购买':'缺货中') : (selectSkuInfo[cbStock] > 0 ? '加入购物车':'缺货中')}}
				</view>
			</view>
	</popup-bottom>
</template>

<script>
	import PopupBottom from './popup-bottom'
	export default {
		components:{
			PopupBottom
		},
		filters: {
			toFixed2: function (value) {
			  if(!value) return '0.00'
			  return Number(value).toFixed(2)
			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			buyType: {
				type: String,
				default: 'buyNow'
			},
			themeColor: {
				type: String,
				default: '#1ac792'
			},
			combinations: {
				type: Array,
				default(){
					return []
				}
			},
			specifications: {
				type: Array,
				default(){
					return []
				}
			},
			defaultSelectIndex: {
				type: Number,
				default: 0
			},
			combinationsProps: {
				type: Object,
				default(){
					return {
						id: 'id',
						value: 'value',
						image: 'image',
						price: 'price',
						stock: 'stock'
					}
				}
			},
			specificationsProps: {
				type: Object,
				default(){
					return {
						id: 'id',
						list: 'list',
						name: 'name'
					}
				}
			},
		},
		data() {
			return {
				buyCount: 1,
				selectedIndex: 0,
				borderWidth: uni.upx2px(2),
				mySpecifications: [],
				selectSkuInfo: {},
			}
		},
		watch:{
			specifications(val){
				this.initSkuData()
			}
		},
		computed: {
			speId() {
				return this.specificationsProps.id
			},
			speList() {
				return this.specificationsProps.list
			},
			speName() {
				return this.specificationsProps.name
			},
			cbValue() {
				return this.combinationsProps.value
			},
			cbImage() {
				return this.combinationsProps.image
			},
			cbPrice() {
				return this.combinationsProps.price
			},
			cbStock() {
				return this.combinationsProps.stock
			}
		},
		created() {
			if(this.specifications.length) {
				this.initSkuData()
			}
		},
		methods: {
			initSkuData() {
				this.selectedIndex = this.defaultSelectIndex
				this.selectSkuInfo = this.combinations[this.selectedIndex]
				this.mySpecifications = JSON.parse(JSON.stringify(this.specifications))
				this.mySpecifications.forEach((item,idx) => {
					//当前规格组合值
					const selects = this.combinations[this.selectedIndex][this.cbValue].split('-')
					//每类规格对应其列表的下标 并记录在属性sidx在mySpecifications的子对象中
					const sIndex = item[this.speList].indexOf(selects[idx])
					if(sIndex === -1) {
						uni.showToast({
							title:"默认规格值不存在"
						})
						return
					}
					this.$set(item,'sidx',sIndex)
				})
			},
			selectSku(sIndex,index) {
				this.mySpecifications[sIndex].sidx = index
				const selectInfo = this.mySpecifications.reduce((prev,cur) => {
					if(prev) {
						return prev+'-'+cur[this.speList][cur.sidx]
					}else {
						return cur[this.speList][cur.sidx]
					}
				},'')
				this.selectedIndex = this.combinations.findIndex(item => item[this.cbValue] === selectInfo)
				this.selectSkuInfo = this.combinations[this.selectedIndex]
				if(this.selectSkuInfo[this.cbStock] === 0) {
					this.buyCount = 0
				}
				if(this.selectSkuInfo[this.cbStock] !== 0 && this.buyCount*1 === 0) {
					this.buyCount = 1
				}
			},
			handleBuyCount(type) {
				if(type === 'minus') {
					if(this.buyCount <= 1) return
					this.buyCount = this.buyCount*1 - 1
				}
				if(type === 'add') {
					if(this.buyCount >= this.selectSkuInfo[this.cbStock]) return
					this.buyCount = this.buyCount*1 + 1
				}
			},
			closeSkuBox() {
				this.$emit('close')
			},
			handleConfirm() {
				if(this.selectSkuInfo[this.cbStock] > 0)
				{
					const result = this.selectSkuInfo
					
					result.count = this.buyCount*1
					this.$emit('confirm', result)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex-center {
		display: flex;
		align-items: center;
	}

	.flex-center-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	$font-color-light: #999999;
	$page-bg-color-grey: #f5f5f5;

	.fs-24 {
		font-size: 24upx;
	}

	.fs-26 {
		font-size: 26upx;
	}

	.fs-38 {
		font-size: 38upx;
	}

	.container {
		width: 690upx;
		margin: 0 auto;
	}

	.sku-box {
		min-height: 500upx;
		background-color: white;
		padding-bottom: 20upx;
		font-size: 28upx;
		color: #333333;
		.sku-header {
			display: flex;
			padding: 40upx 0 20upx;
			.goods-img {
				width: 200upx;
				height: 200upx;
				border-radius: 6upx;
				border: 4upx solid white;
				flex: none;
				margin-top: -80upx;
			}
		}
		.sku-goods-info {
			margin-left: 20upx;
			.money {
				border: none;
				padding-bottom: 0;
			}
			.stock {
				color: $font-color-light;
			}
		}
		.sku-list {
			max-height: 500upx;
		}
		.sku-item {
			padding: 30upx 0;
			.sku-name {
				font-size: 30upx;
			}
			.sku-content {
				border-bottom: 2upx solid $page-bg-color-grey;
				padding: 20upx 0;
				@extend .flex-center;
				flex-wrap: wrap;
				.sku-content-item {
					padding: 16upx 20upx;
					border-radius: 6upx;
					margin: 0 30upx 20upx 0;
					border: 2upx solid transparent;
				}
			}
			&.count {
				@extend .flex-center;
				justify-content: space-between;
				.count-box {
					@extend .flex-center;
					text,.count-content {
						@extend .flex-center-center;
						width: 70upx;
						height: 70upx;
						font-size: 32upx;
						border: 2upx solid $page-bg-color-grey;
					}
					.add,.minus {
						font-size: 44upx;
					}
					.count-content {
						border-width: 2upx 0;
						text-align: center;
					}
				}
			}
		}
		.confirm-btn {
			@extend .flex-center-center;
			height: 80upx;
			border-radius: 80upx;
			color: white;
			font-size: 32upx;
			margin-top: 10upx;
		}
	}

	[class*=disabled] {
		color: $font-color-light;
		opacity: .7;
	}
</style>
