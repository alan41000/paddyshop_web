<template>
	<view>
		<pds-address-list :isHandle="true" @delAddress="delAddress" @setDefaultAddress="setDefaultAddress" :addressList="addressList"></pds-address-list>
	</view>
</template>

<script>
	import pdsAddressList from "@/components/pds-address-list/pds-address-list.vue"
	export default {
		components:{
			pdsAddressList,
		},
		data() {
			return {
				addressList:[]
			};
		},
		methods:{
			getUserAddressList() {
				this.$u.api.getUserAddressList().then(res => {
					this.addressList = res.data.records;
				});
			},
			setDefaultAddress(address_id){
				this.$u.api.setUserDefaultAddress({address_id:address_id}).then(res => {
					this.getUserAddressList();
				});
			},
			delAddress(address_id){
				this.$u.api.delUserAddress({id:address_id}).then(res => {
					this.getUserAddressList();
				});
			}
		},
		onShow() {
			this.getUserAddressList();
		}
	}
</script>

<style lang="scss">

</style>
