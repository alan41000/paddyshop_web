<template>
	<view class="search">
		<u-search @search="search" @custom="search" :action-style="actionStyle" bg-color="#ffffff" placeholder="输入商品名称搜索" v-model="keyword"></u-search>
	</view>	
</template>

<script>
	export default {
		name:'pds-search-bar',
		data() {
			return {
				actionStyle:{color:'#000000'},
				keyword:''
			}
		},
		onLoad() {
		},
		methods: {
			search(){
				if(this.keyword !== ''){
					this.$emit('search',this.keyword)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search{
		width: 100%;
	}
</style>