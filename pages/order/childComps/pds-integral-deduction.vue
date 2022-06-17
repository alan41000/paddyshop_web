<template>
	<pds-box title="积分抵现">
		<view slot="content" class="content">
			<view>
				<u-row gutter="0">
					<u-col span="8">
						当前积分：{{userIntegral}}  最高可用：{{maxCanUseIntegral}}
					</u-col>
					<u-col span="4" text-align="right">
						<u-checkbox :disabled="userIntegral == 0" @change="useIntegral" v-model="isUseIntegral" name="isUseIntegral" shape="circle">使用积分</u-checkbox>
					</u-col>
				</u-row>
				
			</view>
		</view>
	</pds-box>
</template>

<script>
	export default {
		name:"pds-integral-deduction",
		components:{
			
		},
		props:{
			maxCanUseIntegral:{
				type:Number,
				default:0
			},
			userIntegral:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				isUseIntegral:false,
			};
		},
		mounted() {
	
		},
		methods:{
			useIntegral(e){
				this.$emit('useInegral',e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		line-height: 2;
		padding: 0rpx!important;
		.title{
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
</style>