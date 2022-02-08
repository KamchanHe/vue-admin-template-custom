import request from '@/utils/request'

// 登录
export function login(data) {
  return request.post('/vue-element-admin/user/login', data)
}

// 获取用户信息
export function getInfo(token) {
  return request.get('/vue-element-admin/user/info', { token })
}

// 退出登录
export function logout() {
  return request.post('/vue-element-admin/user/logout')
}

// 当前用户修改密码
export function changeCurrentUserPassword(data) {
  return request.post('/vue-element-admin/user/updateCurrAdminPassword', data)
}
