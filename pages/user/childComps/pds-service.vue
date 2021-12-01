<template>
	<view class="service">		
		<pds-box title="我的服务">
			<view slot="content">
				<u-cell-group>
					<u-cell-item @click="navigateTo('/pages/user/favorites')" :icon-style="{color:'#80b7f9'}" icon="heart-fill" title="我的收藏"></u-cell-item>
					<u-cell-item @click="navigateTo('/pages/user/address-list')" :icon-style="{color:'#80b7f9'}" icon="map-fill" title="我的地址"></u-cell-item>
					<u-cell-item @click="navigateTo('/pages/wallet/wallet')" :icon-style="{color:'#80b7f9'}" icon="rmb-circle-fill" title="我的钱包"></u-cell-item>
					<u-cell-item @click="navigateTo('/pages/user/message')" :icon-style="{color:'#80b7f9'}" icon="rmb-circle-fill" title="我的消息"></u-cell-item>
				</u-cell-group>
			</view>
		</pds-box>
	</view>
</template>

<script>
	import pdsBox from "../../../components/pds-box/pds-box.vue"
	export default {
		name:"pds-service",
		components:{
			pdsBox
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.service{
		width: 100%;
		height: 300rpx;
		.more{
			font-size: 28rpx;
			color: $u-tips-color;
		}
	}
</style>
