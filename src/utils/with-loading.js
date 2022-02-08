/**
 * @Description: 携带自动开启关闭loading的方法
 * this.$withLoading(api)(params).then(res=>{}).catch(err=>{})
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
 */
import { Loading } from 'element-ui'

const defaultOptions = {
  lock: true,
  text: '加载中...',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.1)'
}
/**
 * 传入一个方法fn,在它执行周期内,加上全屏loading
 * 如果：
 * 1. fn是同步方法，结束后隐藏loading
 * 2. 如果是异步方法，resolve后隐藏loading
 * 3. 报错后隐藏loading并抛出错误
 * @param {*} fn 函数
 * @returns Function 一个新的函数，去执行它吧
 */
export const withLoading = (fn, options = {}) => {
  let loading
  const showLoading = (options) => {
    loading = Loading.service(options)
  }

  const hideLoading = () => {
    if (loading) {
      loading.close()
    }
  }
  const _options = { ...defaultOptions, ...options }
  const newFn = (...args) => {
    try {
      showLoading(_options)
      const result = fn(...args)
      const isPromise = result instanceof Promise
      if (!isPromise) {
        hideLoading()
        return result
      }
      return result
        .then((res) => {
          hideLoading()
          return res
        })
        .catch((err) => {
          hideLoading()
          throw err
        })
    } catch (err) {
      hideLoading()
      throw err
    }
  }
  return newFn
}
