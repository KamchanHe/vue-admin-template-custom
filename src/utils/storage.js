/**
 * @Description: 封装存储方法 不用注意去转换json
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
 */
const storage = {}

storage.localGet = function(name) {
  try {
    return JSON.parse(localStorage.getItem(name))
  } catch (e) {
    return null
  }
}

storage.localSet = (name, val) => {
  localStorage.setItem(name, JSON.stringify(val))
}

storage.localRemove = function(name) {
  localStorage.removeItem(name)
}

storage.sessionGet = function(name) {
  try {
    return JSON.parse(sessionStorage.getItem(name))
  } catch (e) {
    return null
  }
}

storage.sessionSet = (name, val) => {
  sessionStorage.setItem(name, JSON.stringify(val))
}

storage.sessionRemove = function(name) {
  sessionStorage.removeItem(name)
}
export default storage
