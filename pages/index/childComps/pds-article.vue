<template>
	<view class="article">
		<u-row gutter="10" justify="center">
			<u-col span="3">
				<text>最新资讯</text>
			</u-col>
			<u-col span="9">
				<swiper class="swiper" circular :autoplay="true" :interval="3000" :vertical="true" :circular="true">
					<swiper-item v-for="(item,index) in articleData">
						<navigator :url="'/pages/article/detail?articleId=' + item.id">
							<text>{{item.title}}</text>
						</navigator>
					</swiper-item>
				</swiper>
			</u-col>
		</u-row>
	</view>
</template>

<script>	
	export default {
		name:'pds-article',
		props: {
			articleData:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.article{
		width: 100%;
		margin: 20rpx 0rpx;
		background-color: #fff;
		border-radius: 20rpx;
		padding-left: 40rpx;
		line-height: 2;
	}
	.swiper {
		height: 60rpx;
	}
</style>
