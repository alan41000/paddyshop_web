<template>
	<view class="detail">
		<view class="">
			<view class="title" v-if="article.title">
				<text>{{article.title}}</text>
			</view>
			<view class="time">
				日期：{{article.update_time}}
			</view>
			<view class="content">
				<u-parse :html="article.content" @linkpress="clickLink"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article:{
					title: '',
					update_time: '',
					content: ''
				}
			}
		},
		onLoad(option) {
			if(option.articleId){
				let data = {
					articleId: option.articleId
				}
				this.$u.api.getArticleDetail(data).then(res => {
					this.article = res.data
				}).catch(e => {})
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		width: 100%;
		padding: 20rpx;
		font-size: 32rpx;
		.title{
			font-size: 40rpx;
			text-align: center;
			font-weight: 600;
			word-break: break-word;
		}
		.content{
			margin-top: 20rpx;
			width: 100%;
			word-break: break-word;
			// text-indent: 57rpx;
		}
		.name{
			margin-top: 20rpx;
			width: 100%;
			font-size: 26rpx;
		}
		.time{
			width: 100%;
			font-size: 26rpx;
			text-align: center;
			color: #939699;
			margin-top: 20rpx;
		}
	}
</style>
