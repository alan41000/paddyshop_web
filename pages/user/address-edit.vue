<template>
	<view>
		<u-toast ref="uToast" />
		<pds-address-item ref="address" :formData="form"></pds-address-item>
		<view class="btn">
			<u-button @click="editUserAddress" type="primary" shape="circle">确定</u-button>
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
				form:{
					id:0,
					name:'',
					tel:'',
					region:'',
					province:0,
					city:0,
					county:0,
					address:'',
					is_default:0,
					tag:'',
				},
			}
		},
		onLoad(option) {
			if(option.id)
			{
				this.getUserAddressInfo(option.id)
			}
		},
		methods: {
			getUserAddressInfo(address_id){
				let data = {
					id:address_id
				}
				this.$u.api.getOneUserAddress(data).then(res => {
					this.form = res.data
					this.form.region = res.data.province_name + ' ' + res.data.city_name + ' ' + res.data.county_name
					console.log('this.form',this.form)
				});
			},
			editUserAddress(){
				let data = {
					id:this.$refs.address.form.id,
					name:this.$refs.address.form.name,
					tel:this.$refs.address.form.tel,
					province:this.$refs.address.form.province,
					city:this.$refs.address.form.city,
					county:this.$refs.address.form.county,
					address:this.$refs.address.form.address,
					is_default:this.$refs.address.form.is_default == true ? 1 : 0,
					tag:this.$refs.address.form.tag,
				};
				this.$u.api.editUserAddress(data).then(res => {
					if(res.code == 200)
					{
						this.$refs.uToast.show({
							title: '编辑成功',
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
