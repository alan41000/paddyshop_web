<template>
	<view class="content">
		<scroll-view scroll-y class="scroll">
			<u-form :model="formData" ref="uForm">
				<view v-if="orderGoodsData.length > 0" v-for="(item,index) in orderGoodsData">
					<view class="goods">
						<u-row gutter="16">
							<u-col span="4">
								<u-image width="200" height="200" :src="item.home_recommended_images"></u-image>
							</u-col>
							<u-col span="8">
								<view class="title">{{item.title}}</view>
							</u-col>
						</u-row>
					</view>
					<view class="score">
						<test>宝贝评分</test>
						<u-rate :count="5" v-model="formData[index]['rating']" size="40" class="rate"></u-rate>
					</view>
					<view class="content">
						<u-input v-model="formData[index]['content']" type="textarea" border="true" height="200" auto-height="true" />
					</view>
					<view class="photo">
						<u-form-item label="晒图" :label-width="labelWidth">
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
							<view class="tips-color">晒晒您买到的宝贝<br/>文件大小限5M</view>
						</u-form-item>
					</view>
				</view>
			</u-form>
		</scroll-view>
		<view class="tools" style="width: 100%; line-height: 2;">
			<view class="anonymous">
				<u-checkbox 
					v-model="anonymous.checked" 
					:name="anonymous.name"
					shape="circle"
				>匿名评价</u-checkbox>
			</view>
			<view>
				<u-button @click="addOrderComment" type="primary" shape="circle">提交评价</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import pdsUpload from '@/components/pds-upload/pds-upload.vue';
	export default {
		components:{
			pdsUpload
		},
		data() {
			return {
				content:'',
				anonymous:{
					checked:false,
					name:'anonymous'
				},
				orderGoodsData:{},
				formData:{},
				orderId:0,
				isOss:false,
				ossBucket:'',
				ossAuthData:{},
				ossFile: 'static/upload/images/comment/',
				action: '',
				fileList:[],
				uploadHeader: {},
				siteConfig:{},
			}
		},
		methods: {
			getOss(){
				this.$u.api.getStsOuah().then(res => {
					return this.ossAuthData = res.data;
				})
			},
			initFormData() {
				const formData = this.orderGoodsData.map(item => {
				  return {
					id: item.id,
					rating: 0,
					content: '',
					images: [],
				  }
				})
				this.formData = formData
				
			},
			getOrderCommentsInfo(orderId){
				let data = {
					orderId:orderId
				}
				this.$u.api.getOrderCommentsInfo(data).then(res => {
					this.orderGoodsData = res.data.commentsGoodsInfo;
					this.initFormData();
				});
			},
			addOrderComment(){
				//上传晒图
				this.formData.forEach((item,index,arr)=>{
					let commentImages = [];
					commentImages = this.$refs.upload[index].lists.filter(val => {
						return val.progress == 100;
					})
					if (commentImages) {
						let tempImages = [];
						for (var i = 0; i < commentImages.length; i++) {
							if(this.isOss){
								tempImages.push(commentImages[i]['imgSrc']);
							}else{
								tempImages.push(commentImages[i]['response']['data']['value']);
							}
						}
						item.images = tempImages;
					}
				})
				let data = {
					orderId:this.orderId,
					goods:this.formData,
					isAnonymous:this.anonymous.checked
				}

				this.$u.api.addOrderComments(data).then(res => {
					uni.showToast({
						title:'评价成功'
					});

					setTimeout(() => {
						uni.navigateBack({});
					},1500)
				});
			}
		},
		onLoad(option) {
			this.siteConfig = uni.getStorageSync('siteConfig');
			if(option.orderId){
				this.orderId = option.orderId;
				this.getOrderCommentsInfo(option.orderId);
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
		}
	}
</script>

<style lang="scss" scoped>
	.content,.photo {
		// display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20rpx;
	}
	.scroll{
		height: calc(100vh - var(--window-top) - 200rpx);
		width: 100%;
	}
	.goods{
		.title{
			font-size: 32rpx;
			line-height: 1.5;
		}		
	}
	.score{
		padding: 40rpx;
		font-size: 32rpx;
		.rate{
			margin-left: 40rpx;
		}
	}
	.tools{
		.anonymous{
			text-align: right;
			margin-bottom: 20rpx;
		}
	}
</style>
