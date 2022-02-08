/**
 * @Description: 通用表单处理输入的方法
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
 */

export default {
  /**
  * 纯数字
  * @param {any} value 输入值
  * @return {void}
  */
  pureDigital: (value) => {
    return value.replace(/[^0-9]+/, '')
  },
  /**
  * 数字_
  * @param {any} value 输入值
  * @return {void}
  */
  digital_: (value) => {
    return value.replace(/[^0-9_]+/, '')
  },
  /**
  * 字母数字
  * @param {any} value 输入值
  * @return {void}
  */
  alphabetDigital: (value) => {
    return value.replace(/[^0-9a-zA-Z]+/, '')
  },
  /**
  * 字母数字_
  * @param {any} value 输入值
  * @return {void}
  */
  alphabetDigital_: (value) => {
    return value.replace(/[^0-9a-zA-Z_]+/, '')
  }
}
