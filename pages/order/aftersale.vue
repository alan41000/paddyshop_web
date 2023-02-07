<template>
	<view class="contents">
		<u-modal v-model="deliverySubmitShow" ref="deliverySubmitFormRef" :show-cancel-button="true" title="退货操作" @confirm="deliverySubmit" :async-close="true">
			<view class="contents">
				<u-form :model="deliverySubmitForm" ref="uForm">
					<u-form-item label-width="200" label="快递名称" prop="price"><u-input v-model="deliverySubmitForm.express_name" /></u-form-item>
					<u-form-item label-width="200" label="快递单号" prop="msg"><u-input v-model="deliverySubmitForm.express_number"/></u-form-item>
				</u-form>
			</view>
		</u-modal>
		<u-modal content="确定要取消吗？" v-model="cancelSubmitShow" ref="cancelSubmitFormRef" :show-cancel-button="true" title="温馨提示" @confirm="cancelSubmit" :async-close="true"></u-modal>
		<view class="order-goods">
			<view>
				<u-row gutter="16">
					<u-col span="9">
						<view class="title">商品信息</view>
					</u-col>
					<u-col span="3">
						<view class="title">单价</view>
					</u-col>
				</u-row>
				<u-row gutter="16" v-for="(item,index) in orderInfo.orderDetail" v-if="item.id == detail_id">
					<u-col span="4">
						<u-image width="180rpx" height="180rpx" :src="item.images"></u-image>
					</u-col>
					<u-col span="5">
						{{item.title}}
					</u-col>
					<u-col span="3">
						¥{{item.price}} X {{item.qty}}
					</u-col>
				</u-row>
			</view>
			<view class="price mt20">
				<view>商品总价：¥{{orderInfo.total_price}}</view>
				<view v-if="orderInfo.increase_price > 0">增加金额：¥{{orderInfo.increase_price}}</view>
				<view v-if="orderInfo.preferential_price > 0">优惠金额：¥{{orderInfo.preferential_price}}</view>
				<view v-if="orderInfo.refund_price > 0">退款金额：¥{{orderInfo.refund_price}}</view>
				<view>订单总价：¥{{orderInfo.total_price}}</view>
				<view>支付金额：¥{{orderInfo.pay_price}}</view>
			</view>
		</view>
		<view v-if="Object.keys(aftersaleDetailInfo).length > 0" class="mt20">
			<pds-box title="申请信息">
				<view slot="content" class="detail-content">
					<u-row gutter="16">
						<u-col span="3">
							<view>
								退款类型：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								{{aftersaleDetailInfo.type == 1 ? '仅退款' : '退货退款'}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="3">
							<view>
								申请原因：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								{{aftersaleDetailInfo.reason}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="3">
							<view>
								当前状态：
							</view>
						</u-col>
						<u-col span="9">							
							<view v-if="aftersaleDetailInfo.status == 0">
								待确认
							</view>
							<view v-if="aftersaleDetailInfo.status == 1">
								待退货
							</view>
							<view v-if="aftersaleDetailInfo.status == 2">
								待审核
							</view>
							<view v-if="aftersaleDetailInfo.status == 3">
								已完成
							</view>
							<view v-if="aftersaleDetailInfo.status == 4">
								已拒绝
							</view>
							<view v-if="aftersaleDetailInfo.status == 5">
								已取消
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="3">
							<view>
								退款数量：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								{{aftersaleDetailInfo.qty}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="3">
							<view>
								退款金额：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								¥{{aftersaleDetailInfo.price}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="3">
							<view>
								退款说明：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								{{aftersaleDetailInfo.msg}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16">
						<u-col span="3">
							<view>
								拒绝原因：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								{{aftersaleDetailInfo.refuse_reason}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16" v-if="aftersaleDetailInfo.apply_time">
						<u-col span="3">
							<view>
								申请时间：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								{{aftersaleDetailInfo.apply_time}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16" v-if="aftersaleDetailInfo.confirm_time">
						<u-col span="3">
							<view>
								确认时间：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								{{aftersaleDetailInfo.confirm_time}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16" v-if="aftersaleDetailInfo.delivery_time">
						<u-col span="3">
							<view>
								退货时间：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								{{aftersaleDetailInfo.delivery_time}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16" v-if="aftersaleDetailInfo.audit_time">
						<u-col span="3">
							<view>
								审核时间：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								{{aftersaleDetailInfo.audit_time}}
							</view>
						</u-col>
					</u-row>
					<u-row gutter="16" v-if="aftersaleDetailInfo.cancel_time">
						<u-col span="3">
							<view>
								取消时间：
							</view>
						</u-col>
						<u-col span="9">
							<view>
								{{aftersaleDetailInfo.cancel_time}}
							</view>
						</u-col>
					</u-row>
					<u-button v-if="aftersaleDetailInfo.status == 1" type="primary" @click="deliverySubmitShow = true">立即退货</u-button>
					<u-button :custom-style="{marginTop:'20rpx'}" plain v-if="aftersaleDetailInfo.status < 3" type="primary" @click="cancelSubmitShow = true">取消退货</u-button>
				</view>
			</pds-box>
		</view>
		<view class="type mt20" v-if="Object.keys(aftersaleDetailInfo).length == 0">
			<u-row gutter="16">
				<u-col span="6">
					<view :class=" type == 1 ? 'type-box cur' : 'type-box'" @click="type = 1">
						<u-icon label-size="32" label="仅退款" size="80" name="/static/random.png"></u-icon>
					</view>
				</u-col>
				<u-col span="6" v-if="orderInfo.status > 2">
					<view :class=" type == 2 ? 'type-box cur' : 'type-box'" @click="type = 2">
						<u-icon label-size="32" label="退货退款" size="80" name="/static/cycle.png"></u-icon>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="mt20" v-if="Object.keys(aftersaleDetailInfo).length == 0">
			<u-form :model="form" ref="uForm">
				<u-form-item label-width="200" label="退款原因"  prop="reason">
					<u-input @click="reasonShow = true" v-model="form.reason"  type="select" />
					<u-select @confirm="resonConfirm" v-model="reasonShow" :list="type == 1 ? resonType1 : resonType2"></u-select>
				</u-form-item>
				<u-form-item label-width="200" label="商品件数" v-if="type == 2" prop="qty"><u-input v-model="form.qty" /></u-form-item>
				<u-form-item label-width="200" label="退款金额" prop="price"><u-input v-model="form.price" /></u-form-item>
				<u-form-item label-width="200" label="退款说明" prop="msg"><u-input v-model="form.msg"/></u-form-item>
				<u-form-item label-width="200" label="上传凭证" prop="image">
					<pds-upload ref="upload"
					:isOss="isOss" 
					:ossBucket="ossBucket" 
					:ossAuthData="ossAuthData" 
					:ossFile="ossFile"
					:action="action" 
					:auto-upload="true" 
					:max-size="5 * 1024 * 1024" 
					max-count="3" 
					:file-list="fileList" 
					:header="uploadHeader"></pds-upload>
					<view class="tips-color">请上传凭证<br/>文件大小限5M</view>
				</u-form-item>
			</u-form>
			<u-button type="primary" @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isOss:false,
			ossBucket:'',
			ossAuthData:{},
			ossFile: 'static/upload/images/agftersale/',
			action: '',
			fileList:[],
			uploadHeader: {},
			siteConfig:{},
			isAfterSale:false,
			detail_id:0,
			goods_id:0,
			orderInfo:{},
			aftersaleDetailInfo:{},
			type:0,
			cancelSubmitShow:false,
			deliverySubmitShow:false,
			deliverySubmitForm:{
				express_name:'',
				express_number:'',
			},
			reasonShow:false,
			resonType1:[
				{
					value: 1,
					label: '不喜欢/不想要/拍错了'
				},
				{
					value: 2,
					label: '未送货上门'
				},
				{
					value: 3,
					label: '未按约定时间发货'
				},
				{
					value: 4,
					label: '配送超时'
				},
				{
					value: 5,
					label: '包裹丢失'
				},
				{
					value: 6,
					label: '物流显示签收但实际未收到货'
				},
				{
					value: 7,
					label: '少件漏发'
				}
			],
			resonType2:[
				{
					value: 1,
					label: '7天无理由退换货'
				},
				{
					value: 2,
					label: '发错货'
				},
				{
					value: 3,
					label: '包装/商品破损/污迹'
				},
				{
					value: 4,
					label: '商品描述信息不符'
				},
				{
					value: 5,
					label: '已过/临近保质期'
				},
				{
					value: 6,
					label: '无法溶解/结块/有异物'
				}
			],
			form: {
				reason: '',
				price: '',
				msg:'',
				qty:'',
			},
			rules: {
				reason: [
					{ 
						required: true, 
						message: '请选择退款原因', 
						trigger: ['change','blur'],
					}
				],
				price: [
					{
						required: true,
						message: '请填写退款金额', 
						trigger: ['change','blur'],
					},
					// {
					// 	type: 'Number',
					// 	message: '请填写正确的金额', 
					// 	trigger: ['change','blur'],
					// }
				],
				msg: [
					{
						required: true,
						message: '请填写退款说明', 
						trigger: ['change','blur'],
					}
				],
				qty: [
					{
						required: true,
						message: '请填写退款数量', 
						trigger: ['change','blur'],
					}
				],
			},
		};
	},
	methods: {
		getOss(){
			this.$u.api.getStsOuah().then(res => {
				return this.ossAuthData = res.data;
			})
		},
		resonConfirm(e){
			this.form.reason = e[0].label
		},
		getAftersaleDetail(order_detail_id){
			let data = {
				order_detail_id:order_detail_id
			}
			this.$u.api.getAftersaleDetail(data).then(res => {
				this.aftersaleDetailInfo = res.data;
			});
		},
		getOrderDetail(order_id){
			let data = {
				order_id:order_id
			}
			this.$u.api.getOrderDetail(data).then(res => {
				this.orderInfo = res.data;
				if(this.orderInfo.payment_id == 1)
				{
					this.orderInfo.payment_name = '微信支付';
				}
				if(this.orderInfo.payment_id == 2)
				{
					this.orderInfo.payment_name = '钱包支付';
				}
			});
		},
		cancelSubmit(){
			let data = {
				order_detail_id:this.detail_id,
			};
			this.$u.api.aftersaleCancel(data).then(res => {
				this.getAftersaleDetail(this.detail_id);
				uni.showToast({
					title:'操作成功'
				});
				
				setTimeout(() => {
					this.$refs.cancelSubmitFormRef.clearLoading();
					this.cancelSubmitShow = false
				},1500)
			}).catch(()=>{
				this.$refs.cancelSubmitFormRef.clearLoading();				
			});
		},
		deliverySubmit(){
			if(this.deliverySubmitForm.express_name == ''){
				uni.showToast({
					title:'请输入快递名称',
					icon:'none'
				})
				this.$refs.deliverySubmitFormRef.clearLoading();
				return
			}
			if(this.deliverySubmitForm.express_number == ''){
				uni.showToast({
					title:'请输入快递单号',
					icon:'none'
				})
				this.$refs.deliverySubmitFormRef.clearLoading();
				return
			}
			let data = {
				order_detail_id:this.detail_id,
				express_name:this.deliverySubmitForm.express_name,
				express_number:this.deliverySubmitForm.express_number
			};
			this.$u.api.aftersaleDelivery(data).then(res => {
				// this.getOrderDetail(this.order_id);
				this.getAftersaleDetail(this.detail_id);
				uni.showToast({
					title:'操作成功'
				});
				
				setTimeout(() => {
					this.$refs.deliverySubmitFormRef.clearLoading();
					this.deliverySubmitShow = false
				},1500)
			}).catch(()=>{
				this.$refs.deliverySubmitFormRef.clearLoading();				
			});
		},
		submit() {
			let agterSaleImages = [];
			agterSaleImages = this.$refs.upload.lists.filter(val => {
				return val.progress == 100;
			})
			if (agterSaleImages) {
				let tempImages = [];
				for (var i = 0; i < agterSaleImages.length; i++) {
					if(this.isOss){
						tempImages.push(agterSaleImages[i]['imgSrc']);
					}else{
						tempImages.push(agterSaleImages[i]['response']['data']['value']);
					}
				}
				this.form.images = tempImages;
			}
			
			this.$refs.uForm.validate(valid => {
				if (valid) {
					let data = {
						order_no:parseInt(this.orderInfo.order_no),
						order_id:parseInt(this.orderInfo.id),
						reason:this.form.reason,
						price:Number(this.form.price),
						msg:this.form.msg,
						type:this.type,
						order_detail_id:parseInt(this.detail_id),
						qty:parseInt(this.form.qty),
						goods_id:this.goods_id,
						images:this.form.images
					};
					this.$u.api.addAftersale(data).then(res => {
						uni.showToast({
							title:'提交成功'
						});
						
						setTimeout(() => {
							uni.navigateBack({
							  success: () => {
								let page = getCurrentPages().pop();
								if (!page) {
								  return;
								} else {
									page.onLoad();
								}
							  }
							})
						},1500)
					});
				} else {
					console.log('验证失败');
				}
			});
		}
	},
	onLoad(option) {
		this.siteConfig = uni.getStorageSync('siteConfig');
		if(option.order_id && option.detail_id && option.goods_id){
			this.detail_id = option.detail_id;
			this.goods_id = option.goods_id;
			this.getOrderDetail(option.order_id);
			this.getAftersaleDetail(option.detail_id);
		}else{
			uni.showToast({
				title:"参数有误",
				icon:'none'
			})
		}
		if(Object.keys(this.siteConfig).length > 0 && this.siteConfig.hasOwnProperty('upload_type'))
		{
			if(this.siteConfig.upload_type == 'local'){
				this.action = this.siteConfig.website_url + 'common/Upload/save';
			}else if(this.siteConfig.upload_type == 'aliyunOss'){
				this.getOss();
				this.action = this.siteConfig.upload_type_aliyunoss_endpoint || '';
				this.ossBucket = this.siteConfig.upload_type_aliyunoss_bucket || '';
				this.isOss = true;
			}
		}
	},
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	}
};
</script>

<style lang="scss">
	page{
		background-color: $u-bg-color;
	}
	.mt20{
		margin-top: 20rpx;
	}
	.contents {
		padding: 20rpx;
	}
	.order-goods{
		border: 2rpx solid #cccccc;
		padding: 20rpx;
		.title{
			font-size: 32rpx;
			height: 60rpx;
		}
		.price{
			background-color: #ebebeb;
			padding: 30rpx;
			line-height: 1.8;
		}		
	}
	.type{
		.type-box{			
			width: 100%;
			height: 150rpx;
			padding: 30rpx;
		}
		.cur{
			border: 2px solid $u-type-primary;
		}
	}
	.detail-content{
		line-height: 2;
	}
</style>