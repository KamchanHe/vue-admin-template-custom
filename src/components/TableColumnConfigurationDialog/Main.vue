<!--
 * @Description: 公用组件 => 表头配置 => 弹窗 => 弹窗内容
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <div class="table-column-configuration-content">
    <div class="table-column-configuration-content-table">
      <el-table :data="cloneConfigurationData" stripe border height="100%" max-height="100%" style="width: 100%" :highlight-current-row="true" row-key="prop">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="label" label="列名" show-overflow-tooltip />
        <el-table-column prop="settingShow" label="显示" align="center" width="80">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.settingShow" />
          </template>
        </el-table-column>
        <el-table-column prop="settingFixed" label="固定" align="center" width="80">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.settingFixed" />
          </template>
        </el-table-column>
        <el-table-column prop="settingFixedAlign" label="固定位置" align="center" width="200">
          <template slot-scope="scope">
            <el-select v-model="scope.row.settingFixedAlign" placeholder="请选择">
              <el-option v-for="item in fixedAlignOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="handleIcon" label="拖动" align="center" width="80">
          <!-- eslint-disable-next-line vue/no-unused-vars -->
          <template slot-scope="scope">
            <div class="drop-box">
              <i class="el-icon-rank" />
            </div>
          </template>
        </el-table-column>
        <slot />
      </el-table>
    </div>
    <div class="table-column-configuration-content-action">
      <el-button type="primary" @click="handleReset">恢复初始设置</el-button>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
// 拖动排序插件
import Sortable from 'sortablejs'
import _ from 'lodash'
export default {
  props: {
    // 配置数据
    configurationData: {
      type: Array,
      default: () => []
    },
    // 默认配置数据 恢复用
    defaultConfigurationData: {
      type: Array,
      default: () => []
    },
    // 配置缓存key
    settingUniqueIdentification: {
      type: String,
      default: null
    },
    // 缓存版本控制
    cacheVersionData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      // 拷贝的配置数据
      cloneConfigurationData: [],
      // 定位选项
      fixedAlignOptions: [
        {
          label: '左侧',
          value: 'left'
        },
        {
          label: '右侧',
          value: 'right'
        }
      ]
    }
  },
  watch: {
    // 防止即时更新 用深拷贝复制
    'configurationData': {
      handler(data) {
        this.cloneConfigurationData = _.cloneDeep(data)
        this.$nextTick(() => {
          this.rowDropInit()
        })
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 可拖动初始化
     * @param {void}
     * @return {void}
     */
    rowDropInit() {
      const tbody = this.$el.querySelector('.table-column-configuration-content .el-table__body-wrapper tbody')
      this.rowSortable = Sortable.create(tbody, {
        handle: '.drop-box',
        onEnd: ({ newIndex, oldIndex }) => {
          const { cloneConfigurationData } = this
          const currentRow = cloneConfigurationData.splice(oldIndex, 1)[0]
          cloneConfigurationData.splice(newIndex, 0, currentRow)
        }
      })
    },
    /**
     * 恢复初始设置
     * @param {void}
     * @return {void}
     */
    handleReset() {
      const { defaultConfigurationData } = this
      // 缓存版本和数据
      const { settingUniqueIdentification, cacheVersionData } = this
      const version = cacheVersionData[settingUniqueIdentification]
      this.$storage.localSet(settingUniqueIdentification, { version, data: defaultConfigurationData })
      this.$emit('handleSubmit', defaultConfigurationData)
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
      const { cloneConfigurationData } = this
      let flag = false
      for (let index = 0; index < cloneConfigurationData.length; index++) {
        const item = cloneConfigurationData[index]
        const { settingShow } = item
        if (settingShow) {
          flag = true
          break
        }
      }
      if (!flag) {
        this.$message.warning('至少显示一项')
        return
      }
      // 缓存版本和数据
      const { settingUniqueIdentification, cacheVersionData } = this
      const version = cacheVersionData[settingUniqueIdentification]
      this.$storage.localSet(settingUniqueIdentification, { version, data: cloneConfigurationData })
      this.$emit('handleSubmit', cloneConfigurationData)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-column-configuration-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 20px;
}
.table-column-configuration-content-table {
  flex: 1;
  overflow: hidden;
  display: flex;
  .drop-box{
    cursor: pointer;
  }
}
.table-column-configuration-content-action {
  flex-basis: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
