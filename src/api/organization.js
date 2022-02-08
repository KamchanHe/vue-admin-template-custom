import request from '@/utils/request'

export function getUserList(params) {
  return request.get('/vue-element-admin/organization/list', params)
}
