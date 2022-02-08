<!--
 * @Description: 组织架构 / 用户 => 搜索栏
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <div class="header-search">
    <el-form ref="HeaderSearchForm" :inline="true" :model="searchForm" :rules="searchFormRules" @keyup.enter.native="handleSearch">
      <el-form-item label="用户名" prop="nickname">
        <el-input v-model="searchForm.nickname" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="searchForm.username" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="ERP编码" prop="erpNumber">
        <el-input v-model.number="searchForm.erpNumber" clearable placeholder="请输入" @input="erpNoInputChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查找</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索过滤
      searchForm: {
        nickname: null, // 用户名
        username: null, // 账号
        erpNumber: null // ERP编码
      },
      /**
       * 表单规则
       * prop: { validator: validatePass, trigger: 'blur' }
       * validatePass: (rule, value, callback) => callback(new Error(Error Message));
       */
      searchFormRules: {}
    }
  },
  methods: {
    /**
     * 点击查找按钮
     * @param {void}
     * @return {void}
     */
    handleSearch() {
      this.$refs.HeaderSearchForm.validate((valid) => {
        if (valid) {
          const { searchForm } = this
          this.$emit('handleSearch', { ...searchForm })
        } else {
          return false
        }
      })
    },
    /**
     * 重置表单
     * @param {void}
     * @return {void}
     */
    handleReset() {
      this.$refs.HeaderSearchForm.resetFields()
    },
    /**
     * 强制更正erpNo为数字
     * @param {any} value 输入值
     * @return {void}
     */
    erpNoInputChange(value) {
      const result = this.$formLimit.pureDigital(value)
      this.searchForm.erpNumber = result
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
