<template>
	<pds-box>
		<view slot="content" class="content">
			<view v-for="(item,index) in orderExtensionData">
				<u-row gutter="0">
					<u-col span="6">
						{{item.name}}:
					</u-col>
					<u-col span="6" text-align="right">
						{{item.tips}}
					</u-col>
				</u-row>
				<u-gap margin-top="20" margin-bottom="20" height="1" bg-color="#e4e7ed" v-if="index !== orderExtensionData.length - 1"></u-gap>
			</view>
		</view>
	</pds-box>
</template>

<script>
	export default {
		name:"pds-confirm-orderinfo",
		components:{
			
		},
		props:{
			orderExtensionData:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				
			};
		},
		mounted() {
	
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		line-height: 2;
		padding: 0rpx!important;
	}
</style>