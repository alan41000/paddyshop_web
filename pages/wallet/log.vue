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
						类型
					</u-col>
					<u-col span="8">
						<text v-if="detailInfo.business_type == 0">系统</text>
						<text v-if="detailInfo.business_type == 1">充值</text>
						<text v-if="detailInfo.business_type == 2">提现</text>
						<text v-if="detailInfo.business_type == 3">消费</text>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						流水号
					</u-col>
					<u-col span="8">
						{{detailInfo.serial_no}}
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						原始金额
					</u-col>
					<u-col span="8">
						{{detailInfo.original_money}}
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						操作金额
					</u-col>
					<u-col span="8">
						{{detailInfo.operation_money}}
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						最新金额
					</u-col>
					<u-col span="8">
						{{detailInfo.latest_money}}
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						变更说明
					</u-col>
					<u-col span="8">
						{{detailInfo.msg}}
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="4">
						时间
					</u-col>
					<u-col span="8">
						{{detailInfo.create_time}}
					</u-col>
				</u-row>
			</view>
		</pds-dialog>
		<scroll-view :scroll-y="true" class="scroll-box"  @scrolltolower="getWalletLogList">
			<view v-if="walletLogList.length > 0" class="item">
				<u-row gutter="16" class="title">
					<u-col span="3">
						类型
					</u-col>
					<u-col span="3">
						操作金额
					</u-col>
					<u-col span="3">
						最新金额
					</u-col>
					<u-col span="3">
						更多
					</u-col>
				</u-row>
				<u-row gutter="16" v-for="(res, index) in walletLogList" :key="res.id">
					<u-col span="3">
						<text v-if="res.business_type == 0">系统</text>
						<text v-if="res.business_type == 1">充值</text>
						<text v-if="res.business_type == 2">提现</text>
						<text v-if="res.business_type == 3">消费</text>
					</u-col>
					<u-col span="3">
						{{res.operation_money}}
					</u-col>
					<u-col span="3">
						{{res.latest_money}}
					</u-col>
					<u-col span="3" @click="showDetail(res)">
						点击查看
					</u-col>
				</u-row>
				<u-loadmore  @loadmore="getWalletLogList" :status="loadStatus" v-if="walletLogList.length !== 0" />
			</view>
			<view v-if="walletLogList.length == 0">
				<u-empty text="没有数据" mode="data"></u-empty>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				walletLogList:[],
				detailInfo:[],
				page:1,
				size:15,
				loadStatus:'loadmore',
				detailShow:false,
			}
		},
		methods: {
			getWalletLogList() {
				let data = {
					current:this.page,
					size:this.size,
				};
				this.$u.api.getWalletLogList(data).then(res => {
					res.data.records.forEach(ret => {
						this.walletLogList.push(ret)
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
			this.getWalletLogList();
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
