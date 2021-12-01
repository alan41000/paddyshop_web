<template>
	<view class="wrapper" v-show="isShowMask">
		<transition name="content">
			<view class="content_view" v-show="isShow">
				<!-- 选中数据 -->
				<view class="select_top">
					<view class="select_top_item" ref="select_top_item" v-for="(item,index) in dataList" :key="index" @click="select_top_item_click(index)">
						<text class="address_value">{{item}}</text>
					</view>
					<view class="indicator" :style="{ left: indicatorStyleLeft + 'px' }" ref="indicator"></view>
				</view>
				<!-- 数据列表 -->
				<swiper class="swiper" :current="currentIndex" @change="swiperChange">
					<swiper-item v-for="(swiper_item,swiper_index) in dataList" :key="swiper_index">
						<view class="swiper-item">
							<scroll-view class="scroll-view-item" scroll-y="true">
								<view class="cu-list menu">
									<view class="cu-item" v-for="(item,index) in cityAreaArray[swiper_index]" :key="index" @click="address_item_click(swiper_index,index)">
										<view class="content">
											<text class="text-df" :class="selectIndexArr[swiper_index] === index?'text-blue':''">{{item.name}}</text>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</transition>
		<view class="mask" @click="hidden" v-show="isShowMask"></view>
	</view>
</template>

<script>
	let self;
	export default {
		name:"selectAddress",
		data() {
			return {
				isShow: false,
				isShowMask: false,
				dataList: ['请选择'],
				returnDataList:[],
				currentIndex: 0,
				cityAreaArray: [],
				selectIndexArr: [],
				currentObj: {},
				indicatorStyleLeft: 16
			};
		},
		props: {
			pickerUrl: {
				type: String,
				default: '',
			},
			pickerSize: {
				type: Number,
				default: 5,
			},
			pid: {
				type: Number,
				default: 0
			}
		},
		methods: {
			//显示控件
			show() {
				this.isShow = true
				this.isShowMask = true
			},
			//隐藏控件
			hidden() {
				setTimeout(() => {
					this.isShowMask = false
					this.isShow = false
				}, 100);
			},
			//点击层级
			select_top_item_click(index) {
				this.currentIndex = index
			},
			//切换数据列表
			swiperChange(event) {
				this.currentIndex = event.detail.current
			},
			//加载数据列表
			changeIndicator(index, pid) {
				this.currentIndex = index;
				this.getadd(index, pid);
			},
			//点击选中数据列表
			address_item_click(swiper_index, index) {
				this.selectIndexArr.splice(swiper_index, 5, index);
				this.currentObj = this.cityAreaArray[swiper_index][index];
				//判断当前是否为最下一级
				if (swiper_index < this.pickerSize - 1) {
					this.dataList.splice(swiper_index, 5, this.currentObj.name)
					this.returnDataList.splice(swiper_index, 5, {label:this.currentObj.name,value:this.currentObj.id})
					this.dataList.splice(swiper_index + 1, 0, '请选择')
					this.returnDataList.splice(swiper_index + 1, 0, [])
					setTimeout(() => {
						this.changeIndicator(swiper_index + 1, this.currentObj.id)
					}, 50);
				} else { //是最下一级
					this.dataList.splice(swiper_index, 1, this.currentObj.name)
					this.returnDataList.splice(swiper_index, 1, {label:this.currentObj.name,value:this.currentObj.id})
					this.returnPicker()
				}
			},
			//返回数据
			returnPicker() {
				this.$emit("selectAddress", this.returnDataList);
				this.hidden();
			},
			//动态加载数据
			getadd(index, pid) {
				let data = {
					parent_id:pid
				}
				this.$u.api.getRegionlist(data).then(res => {
					self.cityAreaArray.splice(index, 0, res.data)
					if (res.data.length == 0) {
						//无下一级直接返回
						self.returnPicker();
					}
				});
			},
		},
		created() {
			self = this;
			this.getadd(0, this.pid)
		},
		mounted() {}
	}
</script>

<style lang="scss">
	// 不换行
	@mixin no-wrap() {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.wrapper {
		z-index: 1999;
		position: absolute;
		top: -44px;
		left: 0;
		bottom: 0;
		right: 0;

		.content_view {
			z-index: 999;
			background: white;
			position: absolute;
			height: 50%;
			left: 0;
			bottom: 0;
			right: 0;
			border-top-left-radius: 20px;
			border-top-right-radius: 20px;

			.select_top {
				height: 100rpx;
				display: flex;
				justify-content: start;
				align-items: center;
				padding: 10px;
				position: relative;
				box-sizing: border-box;

				.select_top_item {
					width: 20%;
					font-size: 14px;
					@include no-wrap();
				}

				.indicator {
					position: absolute;
					width: 30px;
					height: 2px;
					background: $uni-color-primary;
					left: 16px;
					bottom: 0;
					transition: left 0.5s ease;
				}
			}

			.swiper {
				height: 100%;
				position: relative;
				left: 0;
				top: 0;
				bottom: 0;
				right: 0;

				.swiper-item {
					height: 100%;

					.scroll-view-item {
						height: 100%;
						padding: 0 10px;

						.cu-item{
							height: 80rpx;
							line-height: 2.5;
							font-size: 32rpx;
							border-bottom: 1px solid $u-border-color;
							// padding-left: 60rpx;
							text-align: center;
							width: 95%;
						}
						.address_item {
							padding: 5px 0;
							font-size: 14px;
							display: flex;
							align-items: center;

							.address_item_icon {
								width: 20px;
								height: 20px;
								margin-right: 10px;
							}
						}
					}
				}
			}
		}

		.mask {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background: $uni-text-color-grey;
			opacity: 0.7;
		}
	}

	.content-enter {
		transform: translateY(100%);
	}

	.content-enter-to {
		transform: translateY(0%);
	}

	.content-enter-active {
		transition: transform 0.5s;
	}

	.content-leave {
		transform: translateY(0%);
	}

	.content-leave-to {
		transform: translateY(100%);
	}

	.content-leave-active {
		transition: transform 0.5s;
	}
</style>
