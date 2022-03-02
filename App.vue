<script>
	export default {
		onLaunch: function() {
			console.log('欢迎使用PaddyShop开源电商系统！')
			this.getSiteConfig();
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
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
