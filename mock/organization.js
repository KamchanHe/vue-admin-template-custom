const Mock = require('mockjs')
const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      erpNumber: '@id',
      nickname: '@title(1, 5)',
      username: '@title(2, 4)',
      createTime: '@datetime'
    })
  )
}

module.exports = [
  {
    url: '/vue-element-admin/organization/list',
    type: 'get',
    response: (config) => {
      const {
        nickname,
        username,
        erpNumber,
        pageNum = 1,
        pageSize = 20
      } = config.query
      const mockList = List.filter((item) => {
        if (nickname && item.nickname.indexOf(nickname) < 0) return false
        if (username && item.username.indexOf(username) < 0) return false
        if (erpNumber && String(item.erpNumber).indexOf(erpNumber) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (item, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1)
      )

      return {
        code: 20000,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  }
]
