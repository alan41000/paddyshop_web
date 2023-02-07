<script>
	export default {
		onLaunch: function() {
			console.log('欢迎使用PaddyShop开源电商系统！')
			this.getSiteConfig();
			// #ifdef MP-WEIXIN
			// 微信小程序静默登录
			this.wechatMiniAppAuth();
			// #endif
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		},
		methods:{
			getSiteConfig(){
				this.$u.api.getSiteConfig().then(res => {
					uni.setStorageSync('siteConfig',res.data);
				});
			},
			wechatMiniAppAuth(){
				uni.login({
					provider: "weixin",
					success: (res => {
						let data = {
							authcode:res.code
						}
						this.$u.api.wechatMiniAppAuth(data).then(res => {
							if(Object.keys(res.data).length > 0){
								uni.setStorageSync('userInfo',res.data);
							}
						});
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
