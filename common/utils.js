/**
 * 跳转到指定页面url
 * 支持tabBar页面
 */
export const navigateTo = (url, query = {}) => {
	if (!url || url.length == 0) {
	  return false
	}
	uni.navigateTo({
		url:url,
		fail: function() {
			uni.switchTab({
				url:url
			})
			return true
		},
		success:function(){
			return true
		}
	})
}

/**
 * 检查登录状态
 */
export const checkLogin = () => {
	let userInfo = uni.getStorageSync('userInfo')
	if(userInfo !== '')
	{
		return true
	}
	uni.navigateTo({
		url:'/pages/user/login'
	})
}

/**
 * 判断值是否在数组内
 */
export const inArray = (val, arr) => {
  for (var i in arr) {
    if (arr[i] == val) return true
  }
  return false
}

/**
 * 微信支付
 */
export const wechatPay = (paymentData, orderId, wx = null) => {
	// #ifdef MP-WEIXIN
	uni.requestPayment({
		nonceStr: paymentData.nonceStr,
		package: 'prepay_id=' + paymentData.prepay_id,
		paySign: paymentData.paySign,
		signType: paymentData.signType,
		timeStamp: paymentData.timeStamp,
		success: function (res) {
			navigateTo('/pages/order/pay-success?orderId='+ orderId);
		},
		fail: function (err) {
			console.log('fail:' + JSON.stringify(err));
		},
		complete:function(res){
			// console.log(res)
		}
	});
	// #endif
	// #ifdef H5
	wx.invoke(
	    'getBrandWCPayRequest', {
			appId: paymentData.appId,
			timeStamp:paymentData.timestamp,
			nonceStr: paymentData.nonceStr,
			package: paymentData.package,
			signType: 'MD5',
			paySign: paymentData.paySign
		},
	    function (res) {
	        if (res.err_msg == 'get_brand_wcpay_request:ok') {
	            // 使用以上方式判断前端返回,微信团队郑重提示：
	            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				navigateTo('/pages/order/pay-success?orderId='+ orderId);
	        } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
	            console.log('支付失败',res)
	        }
	    }
	)
	// #endif
}

/**
 * 获取推荐商品数据
 */
export const getGoodsRecommend = (that) => {
	return new Promise((resolve,reject) => {
		that.$u.api.getGoodsRecommend().then(res => {
			resolve(res.data)
		});
	})	
}