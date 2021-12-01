<template>
	<view>
		<u-toast ref="uToast" />
		<pds-address-item ref="address"></pds-address-item>
		<view class="btn">
			<u-button @click="addUserAddress" type="primary" shape="circle">确定</u-button>
		</view>
	</view>
</template>

<script>
	import pdsAddressItem from "@/components/pds-address-item/pds-address-item.vue"
	export default {
		components:{
			pdsAddressItem
		},
		data() {
			return {
				
			}
		},
		methods: {
			addUserAddress(){
				let data = {
					name:this.$refs.address.form.name,
					tel:this.$refs.address.form.tel,
					province:this.$refs.address.form.province,
					city:this.$refs.address.form.city,
					county:this.$refs.address.form.county,
					address:this.$refs.address.form.address,
					is_default:this.$refs.address.form.is_default == true ? 1 : 0,
					tag:this.$refs.address.form.tag,
				};
				this.$u.api.addUserAddress(data).then(res => {
					if(res.code == 200)
					{
						this.$refs.uToast.show({
							title: '添加成功',
							back:true,
						})
					}
					else
					{
						uni.showToast({
							title:res.msg
						})
					}
				});
			}
		},
	}
</script>

<style>
	.btn{
		padding: 20rpx;
	}
</style>
