<template>
	<view>
		<u-modal
		v-model="modalShow" 
		confirm-text="确定" 
		:title="title"
		:content="contents"
		:show-cancel-button="true"
		:title-style="{fontSize:'32rpx'}"
		:async-close="true"
		ref="uModal"
		:z-index="9999"
		@confirm="confirm"
		@cancel="cancel" 
		>
			<slot name="content"></slot>
		</u-modal>
	</view>
</template>

<script>
	export default {
		name:"pds-dialog",
		props:{
			show: {
				type: Boolean,
				default: false
			},
			contents: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				modalShow:false,
			};
		},
		watch:{
			show(val)
			{
				this.modalShow = val;
			}
		},
		methods:{
			cancel(){
				this.$emit('cancel');
			},
			confirm(){
				this.$refs.uModal.clearLoading();
				this.$emit('confirm');
			},
		},
		created() {
			
		}
	}
</script>

<style lang="scss">

</style>
