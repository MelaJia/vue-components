<template>
  <div ref="pie" id="pie" style="width: 85px;height:85px;"></div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/pie')
export default {
  props: ['data', 'color'],
  computed: {
    getOption: function () {
      let datas = this.data
      return {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        color: this.color,
        series: [
          {
            name: '数据来源',
            type: 'pie',
            radius: ['50%', '70%'],
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: datas
          }
        ]
      }
    }
  },
  methods: {
    updateMethod () {
      // 获取容器
      var dom = this.$refs.pie
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(dom)
      // 绘制图表
      myChart.setOption(this.getOption)
    }
  }
}
</script>
