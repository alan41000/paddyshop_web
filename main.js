import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    ...App
})

// http拦截器
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

//==============================PaddyShop全局组件================================================
import pdsPriceDisplay from "@/components/pds-price/pds-price-display.vue"
import pdsPriceNormal from "@/components/pds-price/pds-price-normal.vue"
import pdsPriceOriginal from "@/components/pds-price/pds-price-original.vue"
import pdsCopyright from "@/components/pds-copyright/pds-copyright.vue"
import pdsBox from "@/components/pds-box/pds-box.vue"
import pdsDialog from "@/components/pds-dialog/pds-dialog.vue"
Vue.component('pdsPriceDisplay',pdsPriceDisplay)
Vue.component('pdsPriceNormal',pdsPriceNormal)
Vue.component('pdsPriceOriginal',pdsPriceOriginal)
Vue.component('pdsCopyright',pdsCopyright)
Vue.component('pdsBox',pdsBox)
Vue.component('pdsDialog',pdsDialog)
//==============================================================================================

app.$mount()
Vue.prototype.pdsVersion = 'v0.1.0'
Vue.prototype.pdsVersionCode = '20211201'
Vue.prototype.pdsSystemInfo = uni.getSystemInfoSync()
Vue.prototype.pdsSymbol = '¥'

//==============================PaddyShop全局函数================================================
import {
  navigateTo,
  checkLogin,
  inArray,
  wechatPay
} from './common/utils'

Vue.prototype.checkLogin = checkLogin
Vue.prototype.navigateTo = navigateTo
Vue.prototype.inArray = inArray
Vue.prototype.wechatPay = wechatPay

// let tempData = '{"code":200,"msg":"操作成功","data":{"id":2,"openid_alipay":"","openid_weixin":"","unionid_weixin":"","openid_weixin_web":"oNIOM52YHRXIcN_1jz7HH3ze-1B8","openid_baidu":"","openid_toutiao":"","openid_qq":"","unionid_qq":"","status":0,"salt":"","password":"","token":"bb682a9478a0c3366692d78bb77d1ee3","token_expire":1648102882,"username":"","nickname":"Alan Leung","mobile":"","email":"","gender":0,"avatar":"https:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTLnpoLE8cDZtA0YD0QKpJwvrYnV1iaemLKhNI8mX5z53iaWS9syuQACVjpPvDZkoXzUCPPRdM3FFjXQ\/132","province":"","city":"","birthday":null,"address":"","integral":0,"locking_integral":0,"referrer":0,"is_delete_time":0,"last_login":1645510882,"last_ip":"192.168.0.103","create_time":"2022-02-19 11:52:18","update_time":"2022-02-22 14:21:22"}}';
// tempData = JSON.parse(tempData).data;
// uni.setStorageSync("userInfo",tempData);