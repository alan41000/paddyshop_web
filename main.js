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