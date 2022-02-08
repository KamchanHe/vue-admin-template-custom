<!--
 * @Description: 组织架构 / 用户 => 修改按钮 => 弹窗 => 弹窗内容
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <div class="edit-user-content">
    <el-form ref="EditUserForm" label-position="right" label-width="90px" :model="editUserForm" :rules="editUserFormRules">
      <el-form-item label="用户名" prop="nickname">
        <el-input v-model="editUserForm.nickname" disabled />
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="editUserForm.username" disabled />
      </el-form-item>
      <el-form-item label="ERP编码" prop="erpNumber">
        <el-input v-model="editUserForm.erpNumber" disabled />
      </el-form-item>
      <el-form-item required label="密码" prop="password">
        <el-input v-model="editUserForm.password" type="password" placeholder="请输入" />
      </el-form-item>
      <el-form-item required label="确认密码" prop="repeatPassword">
        <el-input v-model="editUserForm.repeatPassword" type="password" placeholder="请输入" />
      </el-form-item>
      <el-form-item align="right">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 密码校验
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 18) {
        callback(new Error('长度在6-18位'))
      } else {
        // 如果输入了二次密码 一起校验了
        if (this.editUserForm.repeatPassword) {
          this.$refs.EditUserForm.validateField('repeatPassword')
        }
        callback()
      }
    }
    // 二次密码校验
    var validateRepeatPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.editUserForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 表单
      editUserForm: {
        id: null, // 员工ID
        nickname: null, // 员工用户名
        username: null, // 员工账号
        erpNumber: null, // ERP编码
        password: null, // 员工密码
        repeatPassword: null // 确认密码
      },
      // 表单规则
      editUserFormRules: {
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        repeatPassword: [
          { validator: validateRepeatPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 回显数据
     * @param {void}
     * @return {void}
     */
    handleMixin(data) {
      Object.assign(this.editUserForm, data)
    },
    /**
     * 取消按钮
     * @param {void}
     * @return {void}
     */
    handleCancel() {
      this.$emit('handleCancel')
    },
    /**
     * 确认按钮
     * @param {void}
     * @return {void}
     */
    handleSubmit() {
      this.$refs.EditUserForm.validate((valid) => {
        if (valid) {
          const { editUserForm } = this
          this.$emit('handleSubmit', editUserForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-user-content {
  ::v-deep .el-input__inner {
    width: 100%;
  }
}
</style>
