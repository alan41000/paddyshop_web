<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.getSiteConfig();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
