<template>
	<view class="container">
		<view class="logo">
			<u-image
			 shape="square"
			 width="300"
			 height="300"
			 mode="widthFix"
			 :src="siteConfig.website_logo"></u-image>
			 {{siteConfig.website_name}}
		</view>
		<view class="tools">
			<u-button :disabled="disabled" @click="login" type="primary">微信用户快捷登录</u-button>
			<u-checkbox 
				shape="circle"
				v-model="privacy.checked"
				label-size="24"
			>点击“注册/登录”即表示您同意《{{siteConfig.website_name}}用户服务条款》和《隐私政策》</u-checkbox>
			<u-button :custom-style="{marginTop:'250rpx'}" @click="navigateTo('/pages/index/index',true)" type="info" plain>暂不登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code:'',
				loading:false,
				disabled:false,
				privacy:{
					checked: true,
				},
				siteConfig:{},
			};
		},
		onLoad(){
			this.siteConfig = uni.getStorageSync('siteConfig');
		},
		methods:{
			getCode(){
				this.$nextTick(function(){
					var that = this;
					uni.login({
						provider:uni.getProvider,
						success:(login_res => {
							that.code = login_res.code;
						}),
					})
				})
			},
			login(){
				var that = this;
				if(that.privacy.checked)
				{
					that.getCode();
					uni.getUserProfile({
						desc:'授权获取您的公开信息',
						success(res) {
							that.loading = true;
							that.disabled = true;
							let data = {
								authcode : that.code,
								rawData : res.rawData,
								iv:res.iv,
								encryptedData:res.encryptedData,
							};
							that.$u.api.wechatMiniAppAuth(data).then(res => {
								uni.setStorageSync('userInfo',res.data);
								uni.navigateBack({});
							});
						},
						fail(fail_res){
							console.log('fail_res',fail_res)
						}
					});
				}
				else
				{
					uni.showToast({
						title:'请阅读并同意相关协议',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.container{
	text-align: center;
	width: 90%;
	margin: auto;
	.logo{
		width: 300rpx;
		height: 300rpx;
		margin: 100rpx auto;
	}
	.tools{
		width: 100%;
		text-align: left;
		margin-top: 400rpx;
	}
}
</style>
