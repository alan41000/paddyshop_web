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
export const wechatPay = (paymentData, orderId) => {
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
}