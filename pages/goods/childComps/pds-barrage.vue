<template>
	<view>
		<swiper :autoplay="true" :vertical="true" circular :interval="5000" class="barrage" :style="{top:top+'rpx',left:left+'rpx'}">
			<swiper-item v-for="(item, index) in list" :key="index">
				<view class="barrage-item" v-if="item.nickname">
					<image class="barrage-image" :src="item.avatar"></image>
					<text class="barrage-text" :style="{color:color,background:background,opacity:opacity}">
						{{item.nickname.substr(0,10)}}
						<block v-if="new Date().getTime() - Date.parse(item.create_time) < 3600000">
							刚刚
						</block>
						购买了此商品
					</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "pdsBarrage",
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			color: {
				type: String,
				default: '#FFFFFF'
			},
			background: {
				type: String,
				default: '#000000'
			},
			opacity: {
				type: Number,
				default: 0.7
			},
			left: {
				type: Number,
				default: 35
			},
			top: {
				type: Number,
				default: 50
			},
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style lang="scss">
	.barrage-item {
		transition: all 1s;
	}

	.barrage-enter {
		opacity: 0;
		transform: translateY(30px);
	}

	.barrage-leave-to {
		opacity: 0;
		transform: translateY(0px);
	}

	.barrage-enter-active {
		// position: absolute;
	}

	.barrage-leave-active {
		// transition: all .3s;
	}

	.barrage {
		position: fixed;
		z-index: 10000;
		width: 100%;
		height: 80rpx;
		.barrage-item {
			margin-top: 10rpx;

			.barrage-image {
				display: inline-block;
				vertical-align: middle;
				width: 60rpx !important;
				height: 60rpx !important;
				margin-right: 10rpx;
				border-radius: 30rpx;
			}

			.barrage-text {
				font-size: 26rpx;
				vertical-align: middle;
				color: #FFFFFF;
				padding: 10rpx 20rpx;
				border-radius: 30rpx;
				background: #000000;
				opacity: 0.7;
			}
		}
	}
</style>
