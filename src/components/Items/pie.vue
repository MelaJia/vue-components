<template>
  <div ref="pie" id="pie" style="width: 160px;height:160px;"></div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/pie')
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          persent: 100,
          datas: [
            {
              value: 935,
              name: '可融金额',
              itemStyle: {
                normal: { color: 'rgba(0,0,0,0)' }
              }
            },
            {
              value: 0,
              name: '已融资金额',
              itemStyle: {
                normal: { color: '#3f97f8' }
              }
            }
          ]
        }
      }
    }
  },
  data () {
    return {
      myChart: null
    }
  },
  computed: {
    getOption: function () { // 计算得到配置
      return this.dealData(this.pieData)
    },
    pieData: function () {
      return this.data
    }
  },
  watch: {
    pieData: function (val) { // 监听数据变动及时更新图表
      this.refreshData(val)
    }
  },
  mounted () {
    // 初始化饼图
    this.initPie()
  },
  methods: {
    initPie () {
      // 获取容器
      var dom = this.$refs.pie
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(dom)
      // 绘制图表
      this.myChart.setOption(this.getOption)
    },
    // 处理数据
    dealData: dealData,
    // 刷新饼图
    refreshData: refreshData
  }
}
function dealData (val) {
  return {
    series: [
      {
        name: '内部圆圈',
        type: 'pie',
        silent: true,
        radius: ['50%', '60%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: 100,
            name: '__other',
            itemStyle: {
              normal: { color: '#e5e9f2' }
            }
          }
        ]
      },
      {
        name: '资产概况',
        type: 'pie',
        radius: ['35%', '70%'],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: function (argument) {
              return val.persent + '%'
            },
            textStyle: {
              fontSize: 14,
              color: '#7a7a7a'
            }
          }
        },
        data: val.datas
      }
    ]
  }
}
function refreshData (data) {
  if (!this.myChart) {
    return false
  }

  // 获取配置
  var option = this.myChart.getOption()
  // 修改配置
  option.series[1].label.formatter = function (val) {
    return data.persent + '%'
  }
  option.series[1].data = data.datas
  // 更新图表
  this.myChart.setOption(option)
  return true
}
</script>
