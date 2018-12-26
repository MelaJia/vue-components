<template>
  <section :style="{height: height+'px',width:width+'px'}">
    <div ref="pie" id="pie" :style="{height: height+'px',width:width+'px'}"></div>
    <img
      class="icon-money"
      src="@/assets/img/images/index_icon_money.png"
      :style="{left: (width/2)-47.5 + 'px',top: (height/2)-47.5 + 'px'}"
      alt
    >
  </section>
</template>
<style scoped>
.icon-money {
  position: absolute;
  top: 252.5px;
}
</style>

<script>
import { thousandth } from '@/util/util'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  props: {
    data: Object,
    sortArr: Array,
    height: {
      type: Number,
      default: 600
    },
    width: {
      type: Number,
      default: 600
    },
    showTool: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      echartData: {}
    }
  },
  computed: {
  },
  methods: {
    updateMethod () {
      // 获取容器
      var dom = this.$refs.pie
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(dom)
      // 处理数据
      const val = this.dealData(this.data)
      // 绘制图表
      myChart.setOption(this.getOptions(val))
    },
    dealData: dealData,
    getOptions: getOptions
  }
}
// 处理数据
function dealData (res) {
  const amtArr = []
  const bColorArr = []
  console.log(res)
  for (const key in this.sortArr) {
    if (this.sortArr.hasOwnProperty(key)) {
      const element = this.sortArr[key]
      // 设置数据
      if (element.key === 'loanedNo') {
        amtArr.push({ value: res.data[`${element.key}FinishPrincipal`], name: element.text })
        bColorArr.push(element.bcolor)
      }
      if (element.key === 'onLoaning') {
        amtArr.push({ value: res.data[`${element.key}SumAmout`], name: element.text })
        bColorArr.push(element.bcolor)
      }
    }
  }
  // 获取总数
  let sum = sumAdd(amtArr)
  console.log('总和', sum)
  console.log('1/4', sum / 4)

  // 计算空白数据并添加进数组
  amtArr.push({
    value: sum / 3,
    name: '__other',
    itemStyle: {
      normal: { color: 'rgba(0,0,0,0)' }
    }
  })

  return {
    amt: amtArr,
    bColor: bColorArr
  }
}
// 配置option
function getOptions (echartData) {
  const _this = this
  let scale = this.width / 600
  let rich = {
    yellow: {
      color: '#ffc72b',
      fontSize: 30 * scale,
      padding: [5, 0],
      align: 'center'
    },
    total: {
      color: '#000',
      fontSize: 30 * scale,
      fontWeight: 600,
      align: 'center'
    },
    white: {
      align: 'center',
      fontSize: 14 * scale,
      padding: [0, 0]
    },
    blue: {
      color: '#49dff0',
      fontSize: 16 * scale,
      align: 'center'
    },
    hr: {
      borderColor: '#0b5263',
      width: '100%',
      borderWidth: 1,
      height: 0
    },
    per: {
      color: '#eee',
      backgroundColor: '#334455',
      padding: [2, 4],
      borderRadius: 2
    }
  }
  return {
    title: {
      text: '资产概况(万元)',
      left: 'center',
      top: '65%',
      padding: [24, 0],
      textStyle: {
        color: '#000',
        fontSize: 16 * scale,
        align: 'center'
      }
    },
    tooltip: {
      trigger: 'item',
      // formatter: '{b}: {c} ({d}%)'
      formatter: function (params, ticket, callback) {
        var res = params.name !== '__other' ? `${params.seriesName}</br>${params.name}:${thousandth(params.value)}(万元)</br> 比例:${(params.percent * 4 / 3).toFixed(2)}%` : ''
        return res
      }
    },
    legend: {
      selectedMode: false,
      formatter: function (name) {
        var total = 0 // 总和
        echartData.amt.forEach(function (value, index, array) {
          total += value.name !== '__other' ? value.value * 100 : 0
        })
        total = thousandth(total / 100)
        return '{total|' + total + '}'
      },
      data: ['已放款/未完结'],
      left: 'center',
      top: '60%',
      icon: 'none',
      align: 'center',
      textStyle: {
        color: '#000',
        fontSize: 16 * scale,
        rich: rich
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['43%', '44%'],
        startAngle: 227, // 起始角度
        minAngle: 5, // 最小角度
        label: {
          normal: {
            show: false
          }
        },
        silent: true,
        data: [
          {
            value: 270,
            name: '__other',
            itemStyle: {
              normal: { color: '#f1f1f1' }
            }
          },
          {
            value: 90,
            name: '__other2',
            itemStyle: {
              normal: { color: 'rgba(0,0,0,0)' }
            }
          }
        ]
      },
      {
        name: '资产概况',
        type: 'pie',
        radius: ['27%', '40%'],
        startAngle: 227, // 起始角度
        minAngle: 5, // 最小角度
        zlevel: 2,
        hoverAnimation: false,
        color: echartData.bColor,
        label: {
          normal: {
            show: _this.showTool,
            formatter: function (params, ticket, callback) {
              return params.name !== '__other' ? `{white|${thousandth(params.value)}万元 }\n{per|${(params.percent * 4 / 3).toFixed(2)}%}` : ''
            },
            rich: rich
          }
        },
        labelLine: {
          normal: {
            length: 55 * scale,
            length2: 10
          }
        },
        data: echartData.amt
      }]
  }
}
function sumAdd (object) {
  let result = 0
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key].value) {
      result += object[key].value * 100
    }
  }
  return result / 100
}
</script>
