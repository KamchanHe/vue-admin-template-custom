/**
 * @Description: 计算方法 处理js精度不准的问题
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
 */
import { create, all } from 'mathjs'
const config = {
  number: 'BigNumber',
  precision: 20
}
const math = create(all, config)
export default {
  math,
  // 开方
  Sqrt: function(arg = 0) {
    const result = math.sqrt(math.bignumber(arg))
    return Number(math.format(result))
  },
  // 除
  Except: function(arg1 = 0, arg2 = 0) {
    const result = math.divide(math.bignumber(arg1), math.bignumber(arg2))
    return Number(math.format(result))
  },
  // 乘
  Ride: function(arg1 = 0, arg2 = 0) {
    const result = math.multiply(math.bignumber(arg1), math.bignumber(arg2))
    return Number(math.format(result))
  },
  // 加
  Add: function(arg1 = 0, arg2 = 0) {
    const result = math.add(math.bignumber(arg1), math.bignumber(arg2))
    return Number(math.format(result))
  },
  // 减
  Sub: function(arg1 = 0, arg2 = 0) {
    const result = math.subtract(math.bignumber(arg1), math.bignumber(arg2))
    return Number(math.format(result))
  }
}
