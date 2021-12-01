<template>
	<view class="container">
		<pds-dialog
		@cancel="detailShow = false" 
		@confirm="detailShow = false"
		:show="detailShow" 
		>
			<view slot="content" class="detail">
				<view class="detail-title">详情</view>
				<u-row gutter="16">
					<u-col span="4">
						状态
					</u-col>
					<u-col span="8">
						<text v-if="detailInfo.status == 0">未支付</text>
						<text v-if="detailInfo.status == 1">已支付</text>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						流水号
					</u-col>
					<u-col span="8">
						{{detailInfo.recharge_no}}
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						充值金额
					</u-col>
					<u-col span="8">
						{{detailInfo.money}}
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						充值时间
					</u-col>
					<u-col span="8">
						{{detailInfo.create_time}}
					</u-col>
				</u-row>
			</view>
		</pds-dialog>
		<scroll-view :scroll-y="true" class="scroll-box"  @scrolltolower="getRechargeLogList">
			<view v-if="rechargeLogList.length > 0" class="item">
				<u-row gutter="16" class="title">
					<u-col span="4">
						充值金额
					</u-col>
					<u-col span="6">
						时间
					</u-col>
					<u-col span="2">
						状态
					</u-col>
				</u-row>
				<u-row @click="showDetail(res)" gutter="16" v-for="(res, index) in rechargeLogList" :key="res.id">
					<u-col span="4">
						{{res.money}}
					</u-col>
					<u-col span="6">
						{{res.create_time}}
					</u-col>
					<u-col span="2">
						<text v-if="res.status == 0">已支付</text>
						<text v-if="res.status == 1">未支付</text>
					</u-col>
				</u-row>
				<u-loadmore  @loadmore="getRechargeLogList" :status="loadStatus" v-if="rechargeLogList.length !== 0" />
			</view>
			<view v-if="rechargeLogList.length == 0">
				<u-empty text="没有数据" mode="data"></u-empty>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rechargeLogList:[],
				detailInfo:[],
				page:1,
				size:15,
				loadStatus:'loadmore',
				detailShow:false,
			}
		},
		methods: {
			getRechargeLogList() {
				let data = {
					current:this.page,
					size:this.size,
				};
				this.$u.api.getRechargeLogList(data).then(res => {
					res.data.records.forEach(ret => {
						this.rechargeLogList.push(ret)
					})
					if(res.data.total <= this.page * this.size){
						this.loadStatus = 'noremore';
					}
					this.page += 1;
				});
			},
			showDetail(item){
				this.detailShow = true;
				this.detailInfo = item;
			}
		},
		onLoad() {
			this.getRechargeLogList();
		}
	}
</script>

<style lang="scss">
	.container{
		padding: 50rpx 40rpx;
		line-height: 2;
	}
	.title{
		font-size: 32rpx;
		font-weight: bold;
	}
	.detail{
		padding: 0rpx 20rpx;
	}
	.detail-title{
		text-align: center;
		font-size: 32rpx;
	}
	.scroll-box{
		height: calc(100vh - var(--window-top) - 100rpx);
		padding-bottom: 20rpx;
	}
</style>
