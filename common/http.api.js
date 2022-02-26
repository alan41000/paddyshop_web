let getSiteConfigUrl = '/api/common.Config/apiConfig';
let getAppUpdateUrl = '/api/version.Update/androidUpdate';
let getBannerUrl = '/api/store.Banner/banner';
let getNavigationUrl = '/api/store.Navigation/navList';
let getGoodsDataUrl = '/api/goods.Goods/detail';
let getGoodsIndexListUrl = '/api/goods.goods/indexList';
let getCategoryListUrl = '/api/goods.Category/categoryList';
let wechatMiniAppAuthUrl = '/api/auth.Auth/wechatMiniAppAuth';
let wechatH5AuthUrl = '/api/auth.Auth/wechatH5Auth';
let getUserOrderUrl = '/api/order.Order/list';
let addUserAddressUrl = '/api/user.UserAddress/add';
let delUserAddressUrl = '/api/user.UserAddress/del';
let editUserAddressUrl = '/api/user.UserAddress/edit';
let getUserAddressListUrl = '/api/user.UserAddress/list';
let getOneUserAddressUrl = '/api/user.UserAddress/getOne';
let getAddressTreeUrl = '/api/common.Region/tree';
let getRegionlistUrl = '/api/common.Region/list';
let getGoodsSearchUrl = '/api/goods.Goods/search';
let getOrderConfirmUrl = '/api/order.Order/confirm';
let addOrderUrl = '/api/order.Order/add';
let getOrderDetailUrl = '/api/order.Order/getOne';
let payOrderUrl = '/api/order.Order/pay';
let cancelOrderUrl = '/api/order.Order/cancel';
let receiptOrderUrl = '/api/order.Order/receipt';
let getUserDefaultAddressUrl = '/api/user.UserAddress/getUserDefaultAddress';
let setUserDefaultAddressUrl = '/api/user.UserAddress/setUserDefaultAddress';
let addToCartUrl = '/api/cart.Cart/add';
let getCartListUrl = '/api/cart.Cart/getAll';
let delCartUrl = '/api/cart.Cart/del';
let updateCartNumUrl = '/api/cart.Cart/updateNum';
let addFavoritesUrl = '/api/user.UserFavorites/add';
let moveFavoritesUrl = '/api/cart.Cart/moveFavorites';
let getFavoritesListUrl = '/api/user.UserFavorites/list';
let delFavoritesUrl = '/api/user.UserFavorites/del';
let checkHasFavoritesUrl = '/api/user.UserFavorites/checkHasFavorites';
let getUserMessageListUrl = '/api/user.UserMessage/list';
let getOrderCommentsInfoUrl = '/api/order.Comments/getOrderCommentsInfo';
let addOrderCommentsUrl = '/api/order.Comments/addOrderComments';
let getGoodsCommentsUrl = '/api/goods.Comments/list';
let getWalletInfoUrl = '/api/wallet.Wallet/getOne';
let getWalletLogListUrl = '/api/wallet.WalletLog/list';
let createRechargeUrl = '/api/wallet.Recharge/createRecharge';
let getRechargeLogListUrl = '/api/wallet.Recharge/list';
let payRechargeUrl = '/api/wallet.Recharge/pay';
let getPaymentListUrl = '/api/store.Payment/list';
let getStsOuahUrl = '/common/OssSTS/getStsOauth';
let getOrderCountsUrl = '/api/order.Order/getOrderCounts';
let getWechatSignPackageUrl = '/api/auth.Auth/getWechatSignPackage';
let getOrderRecordBarrageUrl = '/api/goods.Goods/orderRecordBarrage';

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 此处没有使用传入的params参数
	// let getSearch = (params = {}) => vm.$u.get(hotSearchUrl, {
	// 	id: 2
	// });
	
	// 此处使用了传入的params参数，一切自定义即可	
	let getSiteConfig = (params = {}) => vm.$u.post(getSiteConfigUrl);
	let getAppUpdate = (params = {}) => vm.$u.post(getAppUpdateUrl, params);
	let getBanner = (params = {}) => vm.$u.post(getBannerUrl, params);
	let getNavigation = (params = {}) => vm.$u.post(getNavigationUrl, params);	
	let getGoodsData = (params = {}) => vm.$u.post(getGoodsDataUrl, params);
	let getGoodsIndexList = (params = {}) => vm.$u.post(getGoodsIndexListUrl, params);
	let getCategoryList = (params = {}) => vm.$u.post(getCategoryListUrl, params);
	let wechatMiniAppAuth = (params = {}) => vm.$u.post(wechatMiniAppAuthUrl, params);
	let wechatH5Auth = (params = {}) => vm.$u.post(wechatH5AuthUrl, params);	
	let getUserOrder = (params = {}) => vm.$u.post(getUserOrderUrl, params);
	let addUserAddress = (params = {}) => vm.$u.post(addUserAddressUrl, params);
	let delUserAddress = (params = {}) => vm.$u.post(delUserAddressUrl, params);
	let editUserAddress = (params = {}) => vm.$u.post(editUserAddressUrl, params);
	let getAddressTree = (params = {}) => vm.$u.post(getAddressTreeUrl, params);
	let getRegionlist = (params = {}) => vm.$u.post(getRegionlistUrl, params);
	let getUserAddressList = (params = {}) => vm.$u.post(getUserAddressListUrl, params);
	let getOneUserAddress = (params = {}) => vm.$u.post(getOneUserAddressUrl, params);
	let getGoodsSearch = (params = {}) => vm.$u.post(getGoodsSearchUrl, params);
	let getOrderConfirm = (params = {}) => vm.$u.post(getOrderConfirmUrl, params);
	let addOrder = (params = {}) => vm.$u.post(addOrderUrl, params);
	let getOrderDetail = (params = {}) => vm.$u.post(getOrderDetailUrl, params);
	let payOrder = (params = {}) => vm.$u.post(payOrderUrl, params);	
	let getUserDefaultAddress = (params = {}) => vm.$u.post(getUserDefaultAddressUrl, params);
	let setUserDefaultAddress = (params = {}) => vm.$u.post(setUserDefaultAddressUrl, params);
	let addToCart = (params = {}) => vm.$u.post(addToCartUrl, params);
	let getCartList = (params = {}) => vm.$u.post(getCartListUrl, params);
	let delCart = (params = {}) => vm.$u.post(delCartUrl, params);
	let updateCartNum = (params = {}) => vm.$u.post(updateCartNumUrl, params);
	let cancelOrder = (params = {}) => vm.$u.post(cancelOrderUrl, params);
	let receiptOrder = (params = {}) => vm.$u.post(receiptOrderUrl, params);
	let moveFavorites = (params = {}) => vm.$u.post(moveFavoritesUrl, params);
	let addFavorites = (params = {}) => vm.$u.post(addFavoritesUrl, params);
	let getFavoritesList = (params = {}) => vm.$u.post(getFavoritesListUrl, params);
	let delFavorites = (params = {}) => vm.$u.post(delFavoritesUrl, params);
	let checkHasFavorites = (params = {}) => vm.$u.post(checkHasFavoritesUrl, params);
	let getUserMessageList = (params = {}) => vm.$u.post(getUserMessageListUrl, params);
	let getOrderCommentsInfo = (params = {}) => vm.$u.post(getOrderCommentsInfoUrl, params);
	let addOrderComments = (params = {}) => vm.$u.post(addOrderCommentsUrl, params);
	let getGoodsComments = (params = {}) => vm.$u.post(getGoodsCommentsUrl, params);
	let getWalletInfo = (params = {}) => vm.$u.post(getWalletInfoUrl, params);
	let getWalletLogList = (params = {}) => vm.$u.post(getWalletLogListUrl, params);
	let createRecharge = (params = {}) => vm.$u.post(createRechargeUrl, params);
	let getRechargeLogList = (params = {}) => vm.$u.post(getRechargeLogListUrl, params);
	let payRecharge = (params = {}) => vm.$u.post(payRechargeUrl, params);
	let getPaymentList = (params = {}) => vm.$u.post(getPaymentListUrl, params);
	let getStsOuah = (params = {}) => vm.$u.post(getStsOuahUrl, params);
	let getOrderCounts = (params = {}) => vm.$u.post(getOrderCountsUrl, params);
	let getWechatSignPackage = (params = {}) => vm.$u.post(getWechatSignPackageUrl, params);
	let getOrderRecordBarrage = (params = {}) => vm.$u.post(getOrderRecordBarrageUrl, params);
		
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		getSiteConfig,
		getAppUpdate,
		getBanner,
		getNavigation,
		getGoodsData,
		getGoodsIndexList,
		getCategoryList,
		wechatMiniAppAuth,
		wechatH5Auth,
		getUserOrder,
		addUserAddress,
		delUserAddress,
		editUserAddress,
		getAddressTree,
		getRegionlist,
		getUserAddressList,
		getOneUserAddress,
		getGoodsSearch,
		getOrderConfirm,
		addOrder,
		getOrderDetail,
		payOrder,
		getUserDefaultAddress,
		setUserDefaultAddress,
		addToCart,
		getCartList,
		delCart,
		updateCartNum,
		cancelOrder,
		receiptOrder,
		addFavorites,
		moveFavorites,
		getFavoritesList,
		delFavorites,
		checkHasFavorites,
		getUserMessageList,
		getOrderCommentsInfo,
		addOrderComments,
		getGoodsComments,
		getWalletInfo,
		getWalletLogList,
		createRecharge,
		getRechargeLogList,
		payRecharge,
		getPaymentList,
		getStsOuah,
		getOrderCounts,
		getWechatSignPackage,
		getOrderRecordBarrage
	};
}

export default {
	install
}