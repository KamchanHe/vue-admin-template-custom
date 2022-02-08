<!--
 * @Description: 组织架构 / 用户 => 修改按钮 => 弹窗
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <el-dialog class="edit-user-dialog" title="编辑账号" :visible.sync="dialogVisible" :destroy-on-close="true">
    <Main ref="Main" @handleSubmit="handleConfirm" @handleCancel="handleCancel" />
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
      dialogVisible: false // 弹窗控制
    }
  },
  methods: {
    /**
     * 打开dialog
     * @param {object} data 回显数据
     * @return {void}
     */
    open(data) {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.Main.handleMixin(data)
      })
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

<style>
</style>
