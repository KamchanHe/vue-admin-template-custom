/**
 * @Description: 静态数据文档
 * @Author: KamChan
 * @Date: 2021-12-28
 * @LastEditors: KamChan
 * @LastEditTime: 2021-12-28
 */
/**
 * NormalTable
 * tableHeader
 *
 *  type: 类型['index','slot']
 *  prop: 属性值[string]
 *  label: 文本[any]
 *  settingFixed: 是否固定[true,false]
 *  settingShow: 是否显示[true,false]
 *  settingFixedAlign: 固定位置['left','right']
 *  sortable: 表格外部接口排序[true,false]
 *  cusSortable: 表格内部静态排序[true,false]
 *  toFixed: 保留小数位数[number]
 *  width: 表格固定宽度[300px]
 *  align: 对齐位置['left','right']
 *  format: 时间格式化['YYYY-MM-DD']
 *  transformType: 文本更换判断的值的类型[Number,String]
 *  transform: 文本更换判断的依据[{0:'xxx',1:'yyyy'}]
 *  showSummary:  是否显示合计[true,false]
 */

/**
 * NormalInventoryTable
 * TableHeader
 *
 * type: 类型['index','slot']
 * prop: 属性值[string]
 * label: 文本[any]
 * settingFixed: 是否固定[true,false]
 * settingShow: 是否显示[true,false]
 * settingFixedAlign: 固定位置['left','right']
 * headerColor: 表头文本颜色[string]
 * showSummary: 是否显示合计[true,false],
 * toFixed: 保留小数位数[number],
 * align: 对齐位置['left','right']
 * width: 表格固定宽度[300px]
 * format: 时间格式化['YYYY-MM-DD']
 * transformType: 文本更换判断的值的类型[Number,String]
 * transform: 文本更换判断的依据[{0:'xxx',1:'yyyy'}]
 * editable: 是否能编辑[true,false]
 * editType: 编辑类型['click','select','date','number','text']
 */

/**
 * NormalForm
 * Form
 *
 * key:{...}
 *
 * label: 文本[string]
 * key: 数据Key[string]
 * value: 数据value[any]
 * format: 时间格式化['YYYY-MM-DD']
 * autoToday: 是否自动填充当天日期
 * wholeLine: 是否占据整行[true,false]
 * editable: 是否能编辑[true,false]
 * hidden: 是否隐藏[true,false]
 * required: 是否必须[true,false]
 * type: 类型['defaultItem','dateItem','selectItem','keyFilterSelectItem','clickItem','slot']
 * selectKey: select类型对应的key,
 * selectLabel: select类型对应的label,
 * options: select类型的选项[{selectKey,selectLabel}]
 * loading: select类型加载中的状态
 * filterable: 是否可以筛选过滤[true,false]
 */
