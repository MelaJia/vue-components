<template>
  <div class="main index-style">
    <div class="header">
      <h3>供应商资产概况</h3>
    </div>
    <div class="content left-right">
      <div class="pie-left">
        <div ref="pie" id="pie" style="width: 700px;height:600px;"></div>
      </div>
      <div class="pie-right">
        <div class="text-content">
          <div class="float-left">
            <p class="t1">未贴现/转让</p>
            <p class="line"></p>
            <p class="t1">总金额: 120万元</p>
            <ul>
              <li>可用金额</li>
              <li>冻结金额</li>
            </ul>
            <ul>
              <li>120</li>
              <li>20</li>
            </ul>
          </div>
          <div class="float-right"><pie :num="cuData" :total="total" :color="color"></pie></div>
        </div>
        <div class="text-content"><pie :num="cuData" :total="total" :color="color"></pie></div>
        <div class="text-content"><pie :num="cuData" :total="total" :color="color"></pie></div>
        <div class="text-content"><pie :num="cuData" :total="total" :color="color"></pie></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
*{
  margin: 0;
}
.index-style{
  min-width: 1102px;
}
.index-style > .header {
  text-align: center;
}
.float-left{
  float: left;
}
.float-right{
  float: right;
}
.left-right > .pie-left {
  float: left;
}
.left-right > .pie-right {
  float: left;
}
.text-content{
  width: 400px;
  height: 120px;
  background: #5b9bd5;
  color: #fff;
  border: solid 1px;
  border-radius: 5px;
}
li{
  list-style: none;
  display: inline-block;
  width: 100px;
  text-align: center;
}
.line{
  width: 100%;
  background-color: #fff;
  height: 1px;
}
</style>

<script>
import Pie from '@/components/items/pie'
// 引入 ECharts 主模块
const echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/pie')
// 引入提示框和标题组件
require('echarts/lib/component/legendScroll')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  components: { Pie },
  data () {
    return {
      cuData: {
        value: 515,
        name: '已转让金额'
      },
      total: {
        value: 3515,
        name: '其他金额'
      },
      color: ['#4472c4', '#ed7d31']
    }
  },
  mounted () {
    // 获取容器
    var dom = this.$refs.pie
    // 基于准备好的dom，初始化echarts实例
    console.log(dom)
    let myChart = echarts.init(document.getElementById('pie'))
    // 设置数据
    var scale = 1
    var echartData = [{
      value: 3854,
      name: '未贴现/转让金额'
    }, {
      value: 3515,
      name: '已转让金额'
    }, {
      value: 3515,
      name: '已贴现金额'
    }, {
      value: 3854,
      name: '已接收金额'
    },
    {
      value: 254,
      name: '待接收金额'
    }]
    var rich = {
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
    let option = {
      title: {
        text: '总额度(万元)',
        left: 'center',
        top: '50%',
        padding: [24, 0],
        textStyle: {
          color: '#000',
          fontSize: 16 * scale,
          align: 'center'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        selectedMode: false,
        formatter: function (name) {
          var total = 0 // 总和
          echartData.forEach(function (value, index, array) {
            total += value.value
          })
          return '{total|' + total + '}'
        },
        data: [echartData[0].name],
        left: 'center',
        top: '45%',
        icon: 'none',
        align: 'center',
        textStyle: {
          color: '#000',
          fontSize: 16 * scale,
          rich: rich
        }
      },
      series: [{
        name: '总考生数量',
        type: 'pie',
        radius: ['27%', '50%'],
        hoverAnimation: false,
        color: ['#5b9bd5', '#ed7d31', '#a5a5a5', '#ffc000', '#4472c4'],
        label: {
          normal: {
            formatter: function (params, ticket, callback) {
              return `{white|${params.name}: ${params.value}万元 }\n{per|${params.percent}%}`
            },
            rich: rich
          }
        },
        labelLine: {
          normal: {
            length: 55 * scale,
            length2: 10,
            lineStyle: {
              color: '#0b5263'
            }
          }
        },
        data: echartData
      }]
    }
    console.log(option)
    // 绘制图表
    myChart.setOption(option)
  }
}
</script>
