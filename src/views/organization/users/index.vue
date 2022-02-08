<!--
 * @Description: 组织架构 / 用户
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <div class="outside-box users">
    <HeaderSearch @handleSearch="handleSearch" />
    <div class="table-box">
      <NormalTable
        setting-unique-identification="organization/$usersTableHeader"
        :table-header.sync="tableHeader"
        table-height="100%"
        table-max-height="100%"
        :table-data="tableData"
        @handleSortChange="handleSortChange"
      >
        <el-table-column fixed="right" width="90" align="center">
          <template slot="header">
            <span>操作</span>
          </template>
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEditUser(scope)">修改</el-button>
          </template>
        </el-table-column>
      </NormalTable>
    </div>
    <div class="pagination-box relation-center">
      <Pagination :total="total" :limit="pageSize" :page="pageNum" @pagination="handleChangePagination" />
    </div>
    <EditUserDialog ref="EditUserDialog" @handleConfirm="handleConfirmEditUser" />
  </div>
</template>

<script>
// 编辑弹窗
import EditUserDialog from './components/EditUserDialog/index.vue'
// 搜索栏
import HeaderSearch from './components/HeaderSearch/index.vue'
// 常规表格
import NormalTable from '@/components/NormalTable/index.vue'
// 分页组件
import Pagination from '@/components/Pagination/index.vue'
import _ from 'lodash'
import {
  // 获取用户列表
  getUserList as apiGetTableData
} from '@/api/organization'
// 账号列表表头
import { $usersTableHeader as $tableHeader } from '@/utils/static-resource/organization'
export default {
  name: 'Users',
  components: {
    EditUserDialog,
    HeaderSearch,
    NormalTable,
    Pagination
  },
  data() {
    return {
      tableHeader: $tableHeader, // 表头
      tableData: [], // 表体
      pageSize: 10, // 分页
      pageNum: 1, // 分页
      total: 1, // 分页
      sortProp: null, // 排序属性
      sortOrder: null // // 排序方式
    }
  },
  mounted() {
    this.getUsersListData()
  },
  methods: {
    /**
     * 排序点击事件
     * @param {object} sort {column: {object}, order: "ascending|descending", prop: "property"}
     * @return {void}
     */
    handleSortChange(sort) {
      const { prop, order } = sort
      this.sortProp = prop
      this.sortOrder = order && order.split('ending')[0]
      this.getUsersListData()
    },
    /**
     * 查询
     * @param {object} searchForm
     * @return {void}
     */
    handleSearch(searchForm) {
      searchForm && (this.searchForm = searchForm)
      this.pageNum = 1
      this.getUsersListData()
    },
    /**
     * 翻页、每页数据量变化
     * @param {object} params {page,limit}
     * @return {void}
     */
    handleChangePagination(params) {
      this.pageNum = params.page
      this.pageSize = params.limit
      // 使用防抖函数 防止多次请求
      this.handleChangePaginationFn()
    },
    /**
     * 翻页、每页数据量变化
     * @param {void}
     * @return {void}
     */
    handleChangePaginationFn: _.debounce(function() {
      this.getUsersListData()
    }, 16.7),
    /**
     * 获取员工列表数据
     * @param {void}
     * @return {void}
     */
    async getUsersListData() {
      const { pageSize, pageNum, sortProp, sortOrder, searchForm = {}} = this
      const { username, nickname, erpNumber } = searchForm
      const res = await this.$withLoading(apiGetTableData)({
        pageSize, // 分页
        pageNum, // 分页
        prop: sortProp, // 排序属性
        order: sortOrder, // 排序方式
        username, // 账号
        nickname, // 用户名
        erpNumber // ERP编码
      })
      const { list = [], total } = res?.data || {}
      this.tableData = list
      this.total = total
    },
    /**
     * 编辑员工
     * @param {object} scope
     * @return {void}
     */
    handleEditUser(scope) {
      // 账号、用户名、员工ERP编码、员工ID
      const { username, nickname, erpNumber, id } = scope.row
      this.$refs.EditUserDialog.open({
        username,
        nickname,
        erpNumber,
        id
      })
    },
    /**
     * 员工编辑确认修改
     * @param {object} form
     * @return {void}
     */
    handleConfirmEditUser(form = {}) {
      this.$message.success('修改成功')
      this.$refs.EditUserDialog.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.users {
  height: 100%;
  display: flex;
  flex-direction: column;
  .table-box {
    flex: 1;
  }
}
</style>
