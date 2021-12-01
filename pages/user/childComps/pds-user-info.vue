<template>
	<view class="user-info">
		<u-row gutter="16" v-if="userInfo">
			<u-col span="3" text-align="center">
				<u-avatar class="avatar" :src="userInfo.avatar" size="120"></u-avatar>
			</u-col>
			<u-col span="7">
				<span class="nickname">{{userInfo.nickname}}</span>
			</u-col>
			<u-col span="2">
				<!-- <navigator url="/pages/user/setting">
					<u-icon name="setting" color="#909399" size="50"></u-icon>
				</navigator> -->
			</u-col>
		</u-row>
		<u-row gutter="16" v-else>			
			<u-col span="3" text-align="center">
				<navigator url="../login">
					<u-icon name="account" color="#2979ff" size="120"></u-icon>
				</navigator>
			</u-col>
			<u-col span="7">
				<navigator url="/pages/user/login">
					<span class="nickname">授权登录</span>
				</navigator>
			</u-col>
			<u-col span="2">
				<!-- <navigator url="/pages/user/setting">
					<u-icon name="setting" color="#909399" size="50"></u-icon>
				</navigator> -->
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name:'pds-user-info',
		props: {
			userInfo:{}
		},
		data() {
			return {

			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.user-info{
		width: 100%;
		margin: 40rpx 0rpx;
		.nickname{
			font-size: 32rpx;
			color: #FFFFFF;
		}
	}
</style>
