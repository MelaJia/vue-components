<template>
  <div ref="pie" id="pie" style="width: 100px;height:100px;"></div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/pie')
export default {
  props: ['num', 'total', 'color'],
  mounted () {
    // 获取容器
    var dom = this.$refs.pie
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(dom)
    // 设置数据
    let option = {
      color: this.color,
      series: [
        {
          name: '访问来源',
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
          data: this.getData
        }
      ]
    }
    // 绘制图表
    myChart.setOption(option)
  },
  computed: {
    getData: function () {
      let datas = [this.num, this.total]
      return datas
    }
  }
}
</script>
