<!--
 * @Description: 设置锁屏密码 => 弹窗
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <el-dialog class="set-lock-screen-password-dialog" title="设置锁屏密码" :visible.sync="dialogVisible" :destroy-on-close="true" :append-to-body="true">
    <Main @handleSubmit="handleConfirm" @handleCancel="handleCancel" />
  </el-dialog>
</template>

<script>
// 内容组件
import Main from './Main.vue'
export default {
  components: {
    Main
  },
  data() {
    return {
      dialogVisible: false // 控制弹窗显隐
    }
  },
  methods: {
    /**
     * 打开dialog
     * @param {void}
     * @return {void}
     */
    open() {
      this.dialogVisible = true
    },
    /**
     * 关闭dialog
     * @param {void}
     * @return {void}
     */
    close() {
      this.dialogVisible = false
    },
    /**
     * 取消按钮
     * @param {void}
     * @return {void}
     */
    handleCancel() {
      this.dialogVisible = false
    },
    /**
     * 确认按钮
     * @param {object} formData
     * @return {void}
     */
    handleConfirm(formData) {
      this.$emit('handleConfirm', formData)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
