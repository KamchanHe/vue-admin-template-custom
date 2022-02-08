<!--
 * @Description: 公用组件 => 表头配置 => 弹窗
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <el-dialog class="table-column-configuration-dialog" title="配置表格" :visible.sync="dialogVisible" :destroy-on-close="true" :append-to-body="true">
    <Main v-bind="$attrs" @handleCancel="handleCancel" @handleSubmit="handleConfirm" />
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
     * @param {array} list 勾选的账号列表
     * @return {void}
     */
    handleConfirm(list) {
      this.$emit('handleConfirm', list)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-column-configuration-dialog {
  ::v-deep .el-dialog {
    margin: 50px auto 0 auto !important;
    width: 800px;
    height: 80%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0px;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
    }
  }
}
</style>
