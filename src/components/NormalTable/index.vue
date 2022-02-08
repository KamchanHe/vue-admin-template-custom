<!--
 * @Description: 列表表格组件 勾选、操作按钮等等
 * @Author: KamChan
 * @Date: 2022-02-08
 * @LastEditors: KamChan
 * @LastEditTime: 2022-02-08
-->
<template>
  <div class="normal-table-component">
    <el-table
      ref="NormalTableComponent"
      :key="updateControl"
      :data="tableData"
      stripe
      border
      style="width: 100%"
      :summary-method="getSummaries"
      :show-summary="showSummary"
      :height="tableHeight"
      :max-height="tableMaxHeight"
      :row-key="(row) => row[keyName]"
      :highlight-current-row="highlightCurrentRow"
      :cell-style="cellStyle"
      :cell-class-name="cellClassName"
      :row-style="rowStyle"
      :row-class-name="rowClassName"
      :header-row-style="headerRowStyle"
      :header-row-class-name="headerRowClassName"
      :header-cell-style="headerCellStyle"
      :header-cell-class-name="headerCellClassName"
      @selection-change="handleSelectionChange"
      @select="handleSelectionRow"
      @select-all="handleSelectionAll"
      @sort-change="handleSortChange"
    >
      <el-table-column v-if="customCheckbox" :fixed="checkboxFixed" align="center" width="55">
        <!-- eslint-disable-next-line vue/no-unused-vars -->
        <template slot="header" slot-scope="scope">
          <el-checkbox :disabled="customCheckboxCheckAllDisabled" :value="customCheckboxIsCheckAll" :indeterminate="customCheckboxIsIndeterminate" @change="handleCustomCheckboxCheckAllChange" />
        </template>
        <template slot-scope="scope">
          <el-tooltip :disabled="!showCheckboxDisabledTooltip(scope.row)" class="item" effect="dark" :content="scope.row[checkboxDisabledReasonKeyName]" placement="right">
            <el-checkbox :value="customCheckboxItemIsSelect(scope.row)" :disabled="!selectable(scope.row)" @change="flag=>handleCustomCheckboxRowChange(flag,scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column v-if="checkbox" type="selection" width="55" align="center" :fixed="checkboxFixed" :reserve-selection="reserveSelection" :selectable="selectable" />
      <!-- :render-header="linefeed" -->
      <template v-for="item in tableHeader">
        <template v-if="item.type==='slot'">
          <slot :name="item.prop" :slot-value="item" />
        </template>
        <template v-else-if="item.type==='index'">
          <el-table-column v-if="item.settingShow" :key="item.label" type="index" label="序号" width="60" align="center" :fixed="item.settingFixed?item.settingFixedAlign:false" />
        </template>
        <template v-else>
          <el-table-column
            v-if="item.settingShow!==false && item.prop"
            :key="item.prop"
            :fixed="item.settingFixed?item.settingFixedAlign:false"
            :prop="item.prop"
            :label="item.label"
            :width="item.width || 'auto'"
            :align="item.align || 'left'"
            :show-overflow-tooltip="item.hideOverflowTooltip?false:true"
            :sortable="item.sortable?'custom':item.cusSortable?true:false"
          >
            <template slot-scope="scope">
              <span>{{ getRowLabel(scope) }}</span>
            </template>
          </el-table-column>
        </template>
      </template>
      <slot />
    </el-table>
    <div v-if="settingIconFlag" class="normal-table-setting" @click="handleShowTableSetting">
      <i class="el-icon-setting" />
    </div>
    <TableColumnConfigurationDialog
      ref="TableColumnConfigurationDialog"
      :setting-unique-identification="settingUniqueIdentification"
      :cache-version-data="cacheVersionData"
      :configuration-data="tableHeader"
      :default-configuration-data="defaultTableHeader"
      @handleConfirm="handleConfirmSettingChange"
    />
  </div>
</template>

<script>
// 表格表头配置组件
import TableColumnConfigurationDialog from '@/components/TableColumnConfigurationDialog'
// 缓存版本管理
import cacheVersionData from '@/utils/static-resource/cache-version'
import _ from 'lodash'
export default {
  name: 'NormalTableComponent',
  components: {
    TableColumnConfigurationDialog
  },
  props: {
    // 显示配置icon
    settingIconFlag: {
      type: Boolean,
      default: true
    },
    // 配置唯一标识
    settingUniqueIdentification: {
      type: String,
      default: null
    },
    // 自制勾选
    customCheckbox: {
      type: Boolean,
      default: false
    },
    // 显示合计
    showSummary: {
      type: Boolean,
      default: false
    },
    // 翻页是否保留勾选项
    reserveSelection: {
      type: Boolean,
      default: false
    },
    // 是否显示禁止勾选提示语 需要和customCheckbox一起用
    checkboxDisabledTooltip: {
      type: Boolean,
      default: true
    },
    // 勾选框不能选提示语的key
    checkboxDisabledReasonKeyName: {
      type: String,
      default: 'disabledReason'
    },
    // 禁用勾选框的过滤方式
    selectable: {
      type: Function,
      default: () => {
        return true
      }
    },
    // 是否高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    // 是否显示勾选框
    checkbox: {
      type: Boolean,
      default: false
    },
    // 勾选框浮动定位
    checkboxFixed: {
      type: Boolean,
      default: true
    },
    // 表格高度
    tableHeight: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      default: undefined
    },
    // 表格最大高度
    tableMaxHeight: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      default: undefined
    },
    // 表头
    tableHeader: {
      type: Array,
      default: () => []
    },
    // 表体
    tableData: {
      type: Array,
      default: () => []
    },
    // 行id
    keyName: {
      type: String,
      default: 'id'
    },
    // 单元格样式
    cellStyleFn: {
      type: Function,
      default: () => { }
    },
    // 单元格类名
    cellClassNameFn: {
      type: Function,
      default: () => { }
    },
    // 行样式
    rowStyleFn: {
      type: Function,
      default: () => { }
    },
    // 行类名
    rowClassNameFn: {
      type: Function,
      default: () => { }
    },
    // 表头行样式
    headerRowStyleFn: {
      type: Function,
      default: () => { }
    },
    // 表头行类名
    headerRowClassNameFn: {
      type: Function,
      default: () => { }
    },
    // 表头单元格样式
    headerCellStyleFn: {
      type: Function,
      default: null
    },
    // 表头单元格类名
    headerCellClassNameFn: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {
      scrollTop: 0, // 缓存页面激活后需要回到浏览位置
      scrollLeft: 0, // 缓存页面激活后需要回到浏览位置
      selectList: [], // 自定义checkbox勾选的选项
      cacheVersionData: cacheVersionData, // 版本管理数据
      defaultTableHeader: [], // 原始数据
      updateControl: null // 控制更新table的key
    }
  },
  computed: {
    /**
     * 自定义全选款是否禁用
     * @param {void}
     * @return {void}
     */
    customCheckboxCheckAllDisabled: function() {
      let { tableData } = this
      tableData = tableData || []
      const { length } = tableData
      let count = 0
      for (let index = 0; index < length; index++) {
        const item = tableData[index]
        const selectAble = this.selectable(item)
        !selectAble && count++
      }
      return count === length || !length
    },
    /**
     * 是否显示勾选框不可选提示语
     * @param {object} row
     * @return {boolean}
     */
    showCheckboxDisabledTooltip: function() {
      return function(row) {
        const { checkboxDisabledTooltip, checkboxDisabledReasonKeyName } = this
        if (!checkboxDisabledTooltip) {
          return false
        }
        const selectable = this.selectable(row)
        const content = row[checkboxDisabledReasonKeyName]
        return !selectable && content
      }
    },
    /**
     * row是否选中
     * @param {object} row
     * @return {boolean}
     */
    customCheckboxItemIsSelect: function() {
      return function(row) {
        const { selectListMap, keyName } = this
        return selectListMap.has(row[keyName])
      }
    },
    /**
     * 全选框是否半选状态
     * @param {void}
     * @return {boolean}
     */
    customCheckboxIsIndeterminate: function() {
      const { customCheckboxIsCheckAll, selectList } = this
      // 没有全选 && 有选中的数据
      return Boolean(!customCheckboxIsCheckAll && selectList.length)
    },
    /**
     * 是否全选
     * @param {void}
     * @return {boolean}
     */
    customCheckboxIsCheckAll: function() {
      const { selectListMap, tableData, keyName } = this
      const length = tableData.length
      if (!length) return false
      let selectCount = 0 // 当前勾选
      let disabledCount = 0 // 当前禁选
      for (let index = 0; index < length; index++) {
        const item = tableData[index]
        // 已勾选
        const flag = selectListMap.has(item[keyName])
        // 当前勾选数++
        flag && selectCount++
        // 未勾选
        if (!flag) {
          const selectAble = this.selectable(item)
          // 能勾选 证明不是全勾 中断循环
          if (selectAble) {
            break
          } else {
            // 当前禁选++
            disabledCount++
          }
        }
      }
      // 全部禁选
      const allDisabled = disabledCount === length
      // 已勾选 = 当前勾选+当前禁选
      const allCount = selectCount + disabledCount
      return allCount === length && !allDisabled
    },
    /**
     * 选中的列表映射 用来保留翻页勾选
     * @param {void}
     * @return {void}
     */
    selectListMap: function() {
      const { selectList, keyName } = this
      const result = new Map()
      selectList.forEach(item => {
        result.set(item[keyName], true)
      })
      return result
    },
    /**
     * 自定义cell内容
     * @param {object} scope {row,column,rowIndex,columnIndex}
     * @return {string}
     */
    getRowLabel: function() {
      return function(scope) {
        const prop = scope.column.property
        const label = scope.row[prop]
        const target = this.filterHeaderData(prop)[0]
        let result = ''
        // 需要保留小数
        const { toFixed: fixedNumber } = target
        if (_.isNumber(fixedNumber)) {
          if (isNaN(Number(label))) {
            result = label
          } else {
            result = Number(label).toFixed(fixedNumber)
          }
        } else if (target.format) { // 需要切割时间
          result = this.$dayjs(label).format(target.format)
        } else if (target.transform) { // 需要进行文本转换 如0=>未完成 1=>已完成
          const { transformType, transform = {}} = target
          let transformLabel = label
          transformType && (transformLabel = transformType(transformLabel))
          result = transform[transformLabel] || label
        } else {
          result = label
        }
        return result
      }
    }
  },
  watch: {
    // 数据变化 不保留要清空勾选
    tableData: {
      handler() {
        const { reserveSelection } = this
        if (!reserveSelection) {
          this.handleClearSelection()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.handleMixinTableSettingData()
    // 监听滚动
    this.addScrollListener()
  },
  activated() {
    // 滚动到上次浏览到的位置
    this.saveScroll()
  },
  beforeDestroy() {
    // 移除滚动监听
    this.removeScrollListener()
  },
  methods: {
    /**
     * 全选事件
     * @param {boolean} status
     * @return {void}
     */
    handleCustomCheckboxCheckAllChange(status) {
      const { customCheckboxIsIndeterminate } = this
      const flag = customCheckboxIsIndeterminate ? true : status
      const { tableData, selectList } = this
      tableData.forEach(item => {
        const itemFlag = this.selectable(item)
        itemFlag && this.handleCustomCheckboxRowChange(flag, item)
      })
      this.handleSelectionChange(selectList)
      this.handleSelectionAll(selectList)
    },
    /**
     * row选中变化
     * @param {boolean} flag
     * @param {object} row
     * @return {void}
     */
    handleCustomCheckboxRowChange(flag, row) {
      const { selectList, selectListMap, keyName } = this
      const isHas = selectListMap.has(row[keyName])
      if (flag && !isHas) {
        selectList.push(row)
      } else if (!flag && isHas) {
        const index = selectList.findIndex(item => item[keyName] === row[keyName])
        selectList.splice(index, 1)
      }
      this.handleSelectionChange(selectList)
      this.handleSelectionRow(selectList, row)
    },
    /**
     * 清除勾选
     * @param {void}
     * @return {void}
     */
    handleClearSelection() {
      this.selectList = []
      this.$refs?.NormalTableComponent?.clearSelection()
      this.handleSelectionChange([])
    },
    /**
     * 排序功能
     * @param {object} sort {column: {object}, order: "ascending|descending", prop: "property"}
     * @return {void}
     */
    handleSortChange(sort) {
      const { order } = sort
      const result = order ? sort : {}
      this.$emit('handleSortChange', result)
    },
    /**
     * 监听表格滚动
     * @param {void}
     * @return {void}
     */
    addScrollListener() {
      this.$refs.NormalTableComponent?.bodyWrapper?.addEventListener('scroll', this.scrollFunction, false)
    },
    /**
     * 移除监听表格滚动
     * @param {void}
     * @return {void}
     */
    removeScrollListener() {
      this.$refs.NormalTableComponent?.bodyWrapper?.removeEventListener('scroll', this.scrollFunction, false)
    },
    /**
     * 保存表格滚动的scrollTop和ScrollLeft
     * @param {object} res
     * @return {void}
     */
    scrollFunction(res) {
      const target = res.target
      const top = target.scrollTop
      const left = target.scrollLeft
      this.scrollTop = top
      this.scrollLeft = left
    },
    /**
     * 缓存页面activated时恢复表格上次滚动的位置，一定要再用setTimeout，否则不生效
     * @param {void}
     * @return {void}
     */
    saveScroll() {
      this.$nextTick(() => {
        setTimeout(() => {
          var el = this.$el.querySelector('.el-table__body-wrapper')
          el.scrollTop = this.scrollTop
          el.scrollLeft = this.scrollLeft
        }, 16.7)
      })
    },
    /**
     * 勾选触发函数
     * @param {array} val 已勾选的数据
     * @return {void}
     */
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    /**
     * 行勾选触发
     * @param {array} val 已勾选的数据
     * @param {object} row 勾选的行数据
     * @return {void}
     */
    handleSelectionRow(val, row) {
      this.$emit('handleSelectionRow', val, row)
    },
    /**
     * 全选触发函数
     * @param {array} val 已勾选的数据
     * @return {void}
     */
    handleSelectionAll(val) {
      this.$emit('handleSelectionAll', val)
    },
    /**
     * 合计计算
     * @param {object} param 单元格数据
     * @return {string} 合计结果
     */
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map((item) => Number(item[column.property]))
        const target = this.filterHeaderData(column.property)[0]
        // 表头携带需要求合计的参数showSummary && 数据为数字
        if (target?.showSummary && !values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return Number(prev) + value
            } else {
              return prev
            }
          }, 0)
          const { toFixed: fixedNumber } = target
          sums[index] = _.isNumber(fixedNumber) ? Number(sums[index]).toFixed(fixedNumber) : Number(sums[index]).toFixed(2)
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    /**
     * 筛选表头数据
     * @param {string} prop 表头prop名称
     * @return {array} 筛选后的数组
     */
    filterHeaderData(prop) {
      const arr = this.tableHeader.filter((v) => v.prop === prop)
      return arr
    },
    /**
     * 点击配置按钮
     * @param {void}
     * @return {void}
     */
    handleShowTableSetting() {
      this.$refs.TableColumnConfigurationDialog.open()
    },
    /**
     * 配置更新
     * @param {void}
     * @return {void}
     */
    handleConfirmSettingChange(list) {
      this.$refs.TableColumnConfigurationDialog.close()
      this.$emit('update:tableHeader', list)
      this.updateControl = new Date().getTime()
    },
    /**
     * 合并缓存表格配置数据
     * @param {void}
     * @return {void}
     */
    handleMixinTableSettingData() {
      const { settingUniqueIdentification, tableHeader } = this
      this.defaultTableHeader = _.cloneDeep(tableHeader)
      // 最新版本
      const version = cacheVersionData[settingUniqueIdentification]
      // 缓存数据
      const cacheData = this.$storage.localGet(settingUniqueIdentification) || {}
      // 缓存版本
      const cacheVersion = cacheData.version
      // 版本一样 拿缓存
      if (version === cacheVersion) {
        const isEmptyCacheData = _.isEmpty(cacheData)
        if (!isEmptyCacheData) {
          this.$emit('update:tableHeader', cacheData.data)
          this.updateControl = new Date().getTime()
        }
      } else {
        // 版本更新 清除缓存
        this.$storage.localRemove(settingUniqueIdentification)
      }
    },
    /**
     * 自定义行样式
     * @param {object} scope { row, rowIndex }
     * @return {string}
     */
    rowStyle({ row, rowIndex }) {
      return this.rowStyleFn({ row, rowIndex })
    },
    /**
     * 自定义行类名
     * @param {object} scope { row, rowIndex }
     * @return {string}
     */
    rowClassName({ row, rowIndex }) {
      return this.rowClassNameFn({ row, rowIndex })
    },
    /**
     * 自定义单元格样式
     * @param {object} scope { row, column, rowIndex, columnIndex }
     * @return {string}
     */
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return this.cellStyleFn({ row, column, rowIndex, columnIndex })
    },
    /**
     * 自定义单元格类名
     * @param {object} scope { row, column, rowIndex, columnIndex }
     * @return {string}
     */
    cellClassName({ row, column, rowIndex, columnIndex }) {
      return this.cellClassNameFn({ row, column, rowIndex, columnIndex })
    },
    /**
     * 自定义表头行样式
     * @param {object} scope { row, rowIndex }
     * @return {string}
     */
    headerRowStyle({ row, rowIndex }) {
      return this.headerRowStyleFn({ row, rowIndex })
    },
    /**
     * 自定义表头行类名
     * @param {object} scope { row, rowIndex }
     * @return {string}
     */
    headerRowClassName({ row, rowIndex }) {
      return this.headerRowClassNameFn({ row, rowIndex })
    },
    /**
     * 自定义表头单元格样式
     * @param {object} scope { row, column, rowIndex, columnIndex }
     * @return {string}
     */
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      const { headerCellStyleFn } = this
      const isFunction = _.isFunction(headerCellStyleFn)
      const fn = isFunction || (({ column }) => {
        const { property } = column
        const target = this.filterHeaderData(property)[0] || {}
        const { headerColor: color } = target
        return `color:${color}`
      })
      return fn({ row, column, rowIndex, columnIndex })
    },
    /**
     * 自定义表头单元格类名
     * @param {object} scope { row, column, rowIndex, columnIndex }
     * @return {string}
     */
    headerCellClassName({ row, column, rowIndex, columnIndex }) {
      return this.headerCellClassNameFn({ row, column, rowIndex, columnIndex })
    }
  }
}
</script>

<style lang="scss" scoped>
.normal-table-component {
  height: 100%;
  width: 100%;
  position: relative;
}
.normal-table-setting {
  position: absolute;
  right: -10px;
  top: -10px;
  font-size: 20px;
  z-index: 3;
  cursor: pointer;
}
</style>

<style lang="scss">
.normal-table-component {
  // 强制单元格不换行
  .el-table th > .cell {
    white-space: nowrap;
  }
  .el-table__body-wrapper {
    z-index: 2;
  }
  // 表格边框
  .el-table--border {
    border-bottom: 1px solid #ebeef5;
  }
  .el-table td {
    padding: 10px 0px;
  }
  .el-table__expanded-cell[class*="cell"] {
    padding: 20px 50px;
  }
}
</style>
