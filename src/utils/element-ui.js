/**
 * @Description: Element UI按需引入和二次封装
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
 */
import Vue from 'vue'
import Element from 'element-ui'
// 引入组件
import { Message } from 'element-ui'
import '@/styles/element-variables.scss'

Element.Dialog.props.closeOnClickModal.default = false
Element.Dialog.props.closeOnPressEscape.default = false
Element.Dialog.props.modalAppendToBody.default = false

Vue.use(Element)

// 注意：这里使用的$message,所以在使用时候也是this.$message
Vue.prototype.$message = function(options) {
  let defaultOptions = {
    duration: 3000,
    showClose: true
  }
  if (options instanceof Object) {
    defaultOptions = { ...defaultOptions, ...options }
  } else {
    defaultOptions = { ...defaultOptions, message: options }
  }
  return Message(defaultOptions)
}
// 分别对success、warning和error等样式进行设置
Vue.prototype.$message.success = function(options) {
  let defaultOptions = {
    duration: 3000,
    showClose: true
  }
  if (options instanceof Object) {
    defaultOptions = { ...defaultOptions, ...options }
  } else {
    defaultOptions = { ...defaultOptions, message: options }
  }
  return Message.success(defaultOptions)
}
Vue.prototype.$message.warning = function(options) {
  let defaultOptions = {
    duration: 3000,
    showClose: true
  }
  if (options instanceof Object) {
    defaultOptions = { ...defaultOptions, ...options }
  } else {
    defaultOptions = { ...defaultOptions, message: options }
  }
  return Message.warning(defaultOptions)
}
Vue.prototype.$message.error = function(options) {
  let defaultOptions = {
    duration: 3000,
    showClose: true
  }
  if (options instanceof Object) {
    defaultOptions = { ...defaultOptions, ...options }
  } else {
    defaultOptions = { ...defaultOptions, message: options }
  }
  return Message.error(defaultOptions)
}

Vue.prototype.$elButtonBlur = (event) => {
  let target = event.target
  const nodeName = ['SPAN', 'I']
  if (nodeName.includes(target.nodeName)) {
    target = event.target.parentNode
  }
  target.blur()
}
