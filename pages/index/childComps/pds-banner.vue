<template>
	<view class="banner">
		<u-swiper :list="bannerData" name='images_url' height="380" @click="bannerLink"></u-swiper>
	</view>
</template>

<script>	
	export default {
		name:'pds-banner',
		props: {
			bannerData:{}
		},
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
			bannerLink(index){
				if(this.bannerData[index]['event_type'] == 1)
				{
					uni.navigateTo({
						url:this.bannerData[index]['event_value']
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.banner{
		width: 100%;
	}
</style>
