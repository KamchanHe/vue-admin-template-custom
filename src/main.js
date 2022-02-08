import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import '@/utils/element-ui' // element-ui

import * as filters from './filters' // global filters

// v-permission 权限验证
import permission from '@/directive/permission/index.js'
// 检查权限函数
import checkPermission from '@/utils/permission'
// 带loading的请求
import { withLoading } from '@/utils/with-loading'
// 计算方法 处理js的运算bug
import $Math from '@/utils/math'
// 表单限制方法
import formLimit from '@/utils/formLimit'
// 日期处理插件
import * as dayjs from 'dayjs'
// 引入日期处理插件简体中文语言
import 'dayjs/locale/zh-cn'
// 封装本地存储
import storage from '@/utils/storage'
// 节流指令
import throttleClick from '@/directive/throttle-click'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(permission)
Vue.use(throttleClick)
Vue.prototype.$withLoading = withLoading
Vue.prototype.$permission = checkPermission
dayjs.locale('zh-cn')
Vue.prototype.$dayjs = dayjs
let timePosition = 'begin'
Vue.prototype.$formatDate = (date) => {
  const dateSplit = String(date).split(' ')
  if (dateSplit && dateSplit[1]) {
    return dayjs(date).$d.toString().split('(')[0]
  }
  switch (timePosition) {
    case 'begin':
      date = `${date} 00:00:00`
      timePosition = 'end'
      break
    case 'end':
      date = `${date} 23:59:59`
      timePosition = 'begin'
      break
    default:
      break
  }
  return dayjs(date).$d.toString().split('(')[0]
}
Vue.prototype.$Math = $Math
Vue.prototype.$formLimit = formLimit
Vue.prototype.$storage = storage

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
