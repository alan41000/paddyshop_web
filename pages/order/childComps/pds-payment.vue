<template>
	<pds-box title="支付方式">
		<view slot="content" class="content">
			<u-radio-group v-model="payment" class="group">
				<u-cell-group>
					<u-cell-item v-for="(item,index) in paymentList" :arrow="false" :icon-style="{color:item.iconColor}" icon-size="70" :icon="item.icon" :title="item.name" :title-style="{fontSize:'36rpx'}" @click="paymentChoose(item.id)">
						<u-radio
							slot="right-icon" 
							:name="item.id"
							:disabled="false">
						</u-radio>
					</u-cell-item>
				</u-cell-group>
			</u-radio-group>
		</view>
	</pds-box>
</template>

<script>
	export default {
		name:"pds-payment",
		components:{
			
		},
		data() {
			return {
				payment:'payment',
				paymentList:[],
			};
		},
		created() {
			this.getPaymentList();
		},
		methods:{
			paymentChoose(id) {
				this.$emit('paymentChoose',id);
			},
			getPaymentList(){
				this.$u.api.getPaymentList().then(res => {
					this.paymentList = res.data;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		line-height: 2;
		padding: 0rpx!important;
	}
	.group{
		width:100%;
	}
</style>
