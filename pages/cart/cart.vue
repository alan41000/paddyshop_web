<template>
	<view class="content">
		<pds-dialog @cancel="delDialogShow = false" @confirm="delCart" :show="delDialogShow" title="真的要残忍删除我吗？"></pds-dialog>
		<view class="tools" v-if="cartList.length > 0">
			<u-button @click="editCart" size="mini" shape="circle">{{isEditCart == true ? '取消编辑' : '编辑'}}</u-button>
		</view>
		<view class="scroll-view">
			<view v-if="cartList.length > 0">
				<pds-cart-goods @selectGoods="selectGoods(item.id,index)" v-for="(item,index) in cartList" :cartGoodsData="item"></pds-cart-goods>
			</view>
			<view class="empty" v-else>
				<u-empty text="购物车空空如也" mode="car"></u-empty>
				<u-button @click="navigateTo('/pages/index/index')" :custom-style="{margin:'20rpx 0rpx 30rpx 0rpx'}" size="medium" type="primary" shape="circle">去逛逛</u-button>
			</view>
		</view>
		<view v-if="cartList.length > 0" style="padding-bottom: 120rpx;">
			<pds-goods-recommend v-if="recommendGoodsList.length > 0" name="精选推荐" :goodsList="recommendGoodsList"></pds-goods-recommend>
		</view>
		<view v-else>
			<pds-goods-recommend v-if="recommendGoodsList.length > 0" name="精选推荐" :goodsList="recommendGoodsList"></pds-goods-recommend>
		</view>
		<view class="tool-box" v-if="cartList.length > 0">
			<pds-cart-edit v-if="isEditCart" :isSelectAll="isSelectAll" @moveFavorites="moveFavorites" @del="delCartShow" @selectAll="selectAll"></pds-cart-edit>
			<pds-cart-tools v-else :isSelectAll="isSelectAll" @settlement="settlement" @selectAll="selectAll" :totalPrice="Number(totalPrice)"></pds-cart-tools>
		</view>
	</view>
</template>

<script>
	import pdsCartGoods from "./childComps/pds-cart-goods.vue";
	import pdsCartTools from "./childComps/pds-cart-tools.vue";
	import pdsCartEdit from "./childComps/pds-cart-edit.vue";	
	export default {
		components:{
			pdsCartGoods,
			pdsCartTools,
			pdsCartEdit
		},
		data() {
			return {
				cartList:[],
				selected_ids:[],
				selected_list:[],
				totalPrice:0,
				isSelectAll:false,
				isEditCart:false,
				delDialogShow:false,
				recommendGoodsList:[],
			}
		},
		watch:{
			selected_ids(newValue, oldValue) {
				this.calTotalPrice();
			},
		},
		methods: {
			paramsInit(){
				this.cartList = [];
				this.selected_ids = [];
				this.selected_list = [];
				this.totalPrice = 0;
				this.isSelectAll = false;
				this.isEditCart = false;
				this.delDialogShow = false;
			},
			moveFavorites(){
				let data = {
					ids:this.selected_ids
				}
				this.$u.api.moveFavorites(data).then(res => {
					this.paramsInit();
					uni.showToast({
						title:'操作成功',
					})
					this.getCartList();
				});
			},
			delCart(){
				let data = {
					ids:this.selected_ids
				}
				this.$u.api.delCart(data).then(res => {
					this.paramsInit();
					uni.showToast({
						title:'删除成功',
					})
					this.getCartList();
				});
			},
			delCartShow(){
				if(this.selected_ids.length == 0)
				{
					uni.showToast({
						title:'请选择删除的宝贝',
						icon:'none'
					})
					return false
				}
				this.delDialogShow = true
			},
			editCart(){
				this.isEditCart = !this.isEditCart;
			},
			// 获取购物车数据
			getCartList(){
				this.$u.api.getCartList().then(res => {
					for(var i = 0; i < res.data.length; i++)
					{
						this.cartList.push(res.data[i]);
					}
				});
			},
			// 选择商品
			selectGoods(cartId,index) {
				const isCheck = this.selected_ids.findIndex(id => id === cartId)
				if(isCheck < 0)
				{
					this.selected_ids.push(cartId)
					this.cartList[index].checked = true
				}
				else
				{
					this.selected_ids.splice(isCheck, 1)
					this.cartList[index].checked = false
				}
			},
			// 全选
			selectAll() {
				if(this.selected_ids.length == this.cartList.length)
				{
					this.selected_ids = [];
					this.isSelectAll = false;
					this.cartList.forEach(item => item.checked = false)
				}
				else
				{
					this.selected_ids = this.cartList.map(item => item.id);
					this.isSelectAll = true;
					this.cartList.forEach(item => item.checked = true)
				}
			},
			//计算购物车总金额
			calTotalPrice(){
				this.selected_list = this.cartList.filter(item => {return this.inArray(item.id, this.selected_ids) === true})				
				let tempPrice = 0;
				this.selected_list.forEach(item => {
				  const unitPrice = item.price * 100
				  tempPrice += unitPrice * item.qty
				})
				this.totalPrice = (tempPrice / 100).toFixed(2)
			},
			settlement(){
				this.selected_list.forEach(item => {
					item.sku_value_id = item.sku.sku_value_id
				})
				uni.navigateTo({
					url:'/pages/order/confirm?buyType=cart&goods=' + encodeURI(JSON.stringify(this.selected_list))
				})
			},
			init(){
				this.cartList = [];
				this.selected_ids = [];
				this.totalPrice = 0;
				this.isSelectAll = false;
			}
		},
		onShow() {
			this.init();
			this.getCartList();
			this.getGoodsRecommend(this).then(val=>{ this.recommendGoodsList = val });
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: $u-bg-color;
		height: 100%;
	}
	.content {
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;
		// padding: 20rpx;
	}
	.scroll-view{
		height: auto;
		width: 100%;
	}
	.empty{
		padding-top: 20rpx;
		text-align: center;
	}
	.tools{
		text-align: right;
		margin-top: 20rpx;
		padding: 0rpx 20rpx;

	}
	.tool-box{
		width: 100%;
		height: 120rpx;
		line-height: 2;
		position: fixed;
		bottom: 0rpx;
		background-color: #FFFFFF;
		z-index: 10000;
	}
</style>
