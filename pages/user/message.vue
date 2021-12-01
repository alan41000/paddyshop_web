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
					<u-col span="2">
						标题
					</u-col>
					<u-col span="10">
						{{detailInfo.title}}
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="2">
						类型
					</u-col>
					<u-col span="10">
						<text v-if="detailInfo.type == 0">默认</text>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="2">
						业务
					</u-col>
					<u-col span="10">
						<text v-if="detailInfo.business_type == 0">默认</text>
						<text v-if="detailInfo.business_type == 1">订单</text>
						<text v-if="detailInfo.business_type == 2">充值</text>
						<text v-if="detailInfo.business_type == 3">提现</text>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="2">
						详情
					</u-col>
					<u-col span="10">
						{{detailInfo.detail}}
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="2">
						状态
					</u-col>
					<u-col span="10">
						<text v-if="detailInfo.is_read == 0">未读</text>
						<text v-if="detailInfo.is_read == 1">已读</text>
					</u-col>
				</u-row>
				<u-row gutter="16">
					<u-col span="2">
						时间
					</u-col>
					<u-col span="10">
						{{detailInfo.create_time}}
					</u-col>
				</u-row>
			</view>
		</pds-dialog>
		<scroll-view :scroll-y="true" class="scroll-box"  @scrolltolower="getUserMessageList">
			<view v-if="messageList.length > 0" class="item">
				<u-row gutter="16" class="title">
					<u-col span="9">
						详情
					</u-col>
					<u-col span="3">
						更多
					</u-col>
				</u-row>
				<u-row gutter="16" v-for="(res, index) in messageList" :key="res.id">
					<u-col span="9">
						{{res.detail}}
					</u-col>
					<u-col span="3" @click="showDetail(res)">
						点击查看
					</u-col>
				</u-row>
				<u-loadmore  @loadmore="getUserMessageList" :status="loadStatus" v-if="messageList.length !== 0" />
			</view>
			<view v-if="messageList.length == 0">
				<u-empty text="没有消息数据" mode="address"></u-empty>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				messageList:[],
				page:1,
				size:15,
				loadStatus:'loadmore',
				detailShow:false,
				detailInfo:[],
			}
		},
		methods: {
			getUserMessageList() {
				let data = {
					current:this.page,
					size:this.size,
				};
				this.$u.api.getUserMessageList(data).then(res => {
					res.data.records.forEach(ret => {
						this.messageList.push(ret)
					})
					if(res.data.total <= this.page * this.size){
						this.loadStatus = 'noremore';
					}
				});
			},
			showDetail(item){
				this.detailShow = true;
				this.detailInfo = item;
			}
		},
		onLoad() {
			this.getUserMessageList();
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding: 50rpx 40rpx;
		line-height: 2;
	}
	.title{
		font-size: 32rpx;
		font-weight: bold;
	}
	.detail{
		padding: 0rpx 40rpx;
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
