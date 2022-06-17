<template>
	<text>此商品可用积分抵现{{maxBuyIntegral}}元</text>
</template>

<script>
	export default {
		name:'pds-integral-deduction',
		props: {
			maxBuyIntegral:{
				type:Number,
				default:0,
			}
		},
		data() {
			return {
				
			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style>
</style>