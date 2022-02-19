<template>
	<pds-box title="留言">
		<view slot="content" class="content">
			<u-input v-model="notes" type="textarea" :border="border" height="100" :auto-height="true" />
		</view>
	</pds-box>
</template>

<script>
	export default {
		name:"pds-notes",
		components:{
			
		},
		data() {
			return {
				notes:'',
				border: false
			};
		}
	}
</script>

<style lang="scss" scoped>
	.more{
		font-size: 28rpx;
		color: $u-tips-color;
	}
	.content{
		line-height: 2;
		padding: 0rpx!important;
	}
	.left{
		float: left;
	}
	.right{
		float: right;
	}
</style>
