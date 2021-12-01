<template>
	<view class="nav">
		<u-grid :col="5" :border='false'>
			<u-grid-item v-for="(item,index) in navData" @click="navClick(item)">
				<u-icon :name="item.images_url" :size="90"></u-icon>
				<view class="grid-text">{{item.name}}</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
	export default {
		name:'pds-nav',
		props: {
			navData:{
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
			navClick(item){
				if(item.event_type == 1){
					
				}
				switch(item.event_type){
					case 0:
						this.navigateTo('/pages/web-view/web-view?url='+item.event_value)
						break;
					
					case 1:
						this.navigateTo(item.event_value);
						break;
						
					default:
						uni.showToast({
							title:'参数有误'
						})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav{
		width: 100%;
		margin-top: 20rpx;
	}
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: #000000;
	}
</style>
