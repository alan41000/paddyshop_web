<template>
	<view class="content">
		<scroll-view scroll-y class="scroll"  @scrolltolower="getGoodsComments">
			<!-- <view v-if="orderGoodsData.length > 0" v-for="(item,index) in orderGoodsData"> -->
				<view class="mt20" v-for="(item,index) in commentsList">
					<pds-box>
						<view slot="content">
							<view>
								<u-row gutter="30">
									<u-col span="2">
										<u-image shape="circle" width="100" height="100" :src="item.avatar"></u-image>
									</u-col>
									<u-col span="10">
										<view class="name">{{item.nickname}}</view>
									</u-col>
								</u-row>
							</view>
							<view class="mt20">
								<u-row gutter="16">
									<u-col span="6">
										<test>评分</test>
										<u-rate :count="5" v-model="item.rating" size="40" class="rate"></u-rate>
									</u-col>
									<u-col span="6" text-align="right">
										{{item.create_time}}
									</u-col>
								</u-row>
							</view>
							<view class="mt20">
								<u-row gutter="16">
									<u-col span="12">
										{{item.content}}
									</u-col>
								</u-row>
								<u-row gutter="16" v-if="item.reply">
									<u-col span="12">
										商家回复：{{item.reply}}
									</u-col>
								</u-row>
							</view>
						</view>
					</pds-box>
				</view>
				<view class="mt20">
					<u-loadmore @loadmore="commentsList" :status="loadStatus" v-if="commentsList.length !== 0" />
				</view>
				<view v-if="commentsList.length == 0">
					<u-empty text="还没有评价" mode="address"></u-empty>
				</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsId:0,
				loadStatus:'loadmore',
				page:1,
				size:10,
				commentsList:[]
			}
		},
		methods: {
			getGoodsComments(){
				let data = {
					current:this.page,
					size:this.size,
					goodsId:this.goodsId
				};
				this.$u.api.getGoodsComments(data).then(res => {
					this.page += 1;
					res.data.records.forEach(ret => {
						this.commentsList.push(ret)
					})
					if(res.data.total <= this.page * this.size){
						this.loadStatus = 'noremore';
					}
				})
			}
		},
		onLoad(option) {
			if(option.goodsId){
				this.goodsId = option.goodsId;
				this.getGoodsComments(option.goodsId);
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: $u-bg-color;
	}
	.content {
		// display: flex;
		background-color: $u-bg-color;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}
	.scroll{
		height: calc(100vh - var(--window-top));
		width: 100%;
	}
	.name{
		font-size: 32rpx;
		margin-top: 20rpx;
	}
	.mt20{
		margin-top: 20rpx!important;
	}
</style>
