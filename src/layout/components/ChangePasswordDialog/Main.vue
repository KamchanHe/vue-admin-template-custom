<!--
 * @Description: 修改密码 => 弹窗 => 弹窗内容
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <div class="change-password-content">
    <el-form ref="ChangePasswordForm" label-position="right" label-width="90px" :model="changePasswordForm" :rules="changePasswordFormRules">
      <el-form-item required label="旧密码" prop="oldPassword">
        <el-input v-model="changePasswordForm.oldPassword" type="password" placeholder="请输入" />
      </el-form-item>
      <el-form-item required label="密码" prop="password">
        <el-input v-model="changePasswordForm.password" type="password" placeholder="请输入" />
      </el-form-item>
      <el-form-item required label="确认密码" prop="repeatPassword">
        <el-input v-model="changePasswordForm.repeatPassword" type="password" placeholder="请输入" />
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
        if (this.changePasswordForm.repeatPassword) {
          this.$refs.ChangePasswordForm.validateField('repeatPassword')
        }
        callback()
      }
    }
    // 二次密码校验
    var validateRepeatPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.changePasswordForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 表单
      changePasswordForm: {
        oldPassword: null, // 旧密码
        password: null, // 密码
        repeatPassword: null // 确认密码
      },
      // 表单规则
      changePasswordFormRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
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
      this.$refs.ChangePasswordForm.validate((valid) => {
        if (valid) {
          const { changePasswordForm } = this
          this.$emit('handleSubmit', changePasswordForm)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.change-password-content {
  ::v-deep .el-input__inner {
    width: 100%;
  }
}
</style>
