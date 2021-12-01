<template>
	<view class="box">
		<view class="title">
			{{title}}
			<view class="title-right">
				<slot name="title-right"></slot>
			</view>
		</view>
		<view class="content">
			<slot name="content"></slot>
		</view>		
	</view>
</template>

<script>
	export default {
		name:"pds-box",
		props: {
			title:{
				type:String,
				default:''
			},
		},
		data() {
			return {

			};
		},
	}
</script>

<style lang="scss">
	.box{
		width: 100%;
		height: auto;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		.title{
			font-size: 32rpx;
			width: 100%;
		}
		.title-right{
			float: right;
		}
		.content{
			margin-top: 20rpx;
			padding: 0rpx!important;
		}
	}
</style>
