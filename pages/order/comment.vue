<template>
	<view class="content">
		<scroll-view scroll-y class="scroll">
			<view v-if="orderGoodsData.length > 0" v-for="(item,index) in orderGoodsData">
				<view class="goods">
					<u-row gutter="16">
						<u-col span="4">
							<u-image width="200" height="200" :src="item.home_recommended_images"></u-image>
						</u-col>
						<u-col span="8">
							<view class="title">{{item.title}}</view>
						</u-col>
					</u-row>
				</view>
				<view class="score">
					<test>宝贝评分</test>
					<u-rate :count="5" v-model="formData[index]['rating']" size="40" class="rate"></u-rate>
				</view>
				<view class="content">
					<u-input v-model="formData[index]['content']" type="textarea" border="true" height="200" auto-height="true" />
				</view>
			</view>
		</scroll-view>
		<view class="tools" style="width: 100%; line-height: 2;">
			<view class="anonymous">
				<u-checkbox 
					v-model="anonymous.checked" 
					:name="anonymous.name"
					shape="circle"
				>匿名评价</u-checkbox>
			</view>
			<view>
				<u-button @click="addOrderComment" type="primary" shape="circle">提交评价</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				anonymous:{
					checked:false,
					name:'anonymous'
				},
				orderGoodsData:{},
				formData:{},
				orderId:0,
			}
		},
		methods: {
			initFormData() {
				const formData = this.orderGoodsData.map(item => {
				  return {
					id: item.id,
					rating: 0,
					content: '',
					image: [],
				  }
				})
				this.formData = formData
				
			},
			getOrderCommentsInfo(orderId){
				let data = {
					orderId:orderId
				}
				this.$u.api.getOrderCommentsInfo(data).then(res => {
					this.orderGoodsData = res.data.commentsGoodsInfo;
					this.initFormData();
				});
			},
			addOrderComment(){
				let data = {
					orderId:this.orderId,
					goods:this.formData,
					isAnonymous:this.anonymous.checked
				}
				this.$u.api.addOrderComments(data).then(res => {
					uni.showToast({
						title:'评价成功'
					});
					setTimeout(uni.navigateBack({}),1000);
				});
			}
		},
		onLoad(option) {
			if(option.orderId){
				this.orderId = option.orderId;
				this.getOrderCommentsInfo(option.orderId);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		// display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}
	.scroll{
		height: calc(100vh - var(--window-top) - 200rpx);
		width: 100%;
	}
	.goods{
		.title{
			font-size: 32rpx;
			line-height: 1.5;
		}		
	}
	.score{
		padding: 40rpx;
		font-size: 32rpx;
		.rate{
			margin-left: 40rpx;
		}
	}
	.tools{
		.anonymous{
			text-align: right;
			margin-bottom: 20rpx;
		}
	}
</style>
