<template>
	<view class="tools">
		<u-row gutter="16">
			<u-col span="6" text-align="center">
				<view class="filter">
					<u-icon @click="priceSortFun('asc')" v-if="priceSort == 'default'" label="价格" label-pos="left" name="/static/search-default-icon.png" size="28"></u-icon>
					<u-icon @click="priceSortFun('desc')" v-if="priceSort == 'asc'" label="价格" label-pos="left" name="/static/search-asc-icon.png" size="28"></u-icon>
					<u-icon @click="priceSortFun('default')" v-if="priceSort == 'desc'" label="价格" label-pos="left" name="/static/search-desc-icon.png" size="28"></u-icon>
				</view>
			</u-col>
			<u-col span="6" text-align="center">
				<view class="filter">
					<u-icon @click="saleSortFun('asc')" v-if="saleSort == 'default'" label="销量" label-pos="left" name="/static/search-default-icon.png" size="28"></u-icon>
					<u-icon @click="saleSortFun('desc')" v-if="saleSort == 'asc'" label="销量" label-pos="left" name="/static/search-asc-icon.png" size="28"></u-icon>
					<u-icon @click="saleSortFun('default')" v-if="saleSort == 'desc'" label="销量" label-pos="left" name="/static/search-desc-icon.png" size="28"></u-icon>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name:'pds-search-tools',
		data() {
			return {
				priceSort:'default',
				saleSort:'default',
			}
		},
		methods: {
			priceSortFun(sort){
				this.priceSort = sort;
				this.$emit('priceSort',sort);
			},
			saleSortFun(sort){
				this.saleSort = sort;
				this.$emit('saleSort',sort)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tools{
		line-height: 3;
		background-color: #FFFFFF;
	}
</style>
