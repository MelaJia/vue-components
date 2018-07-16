<template>
  <div class="main index-style">
    <div class="header">
      <h3>保理商资产概况</h3>
    </div>
    <div class="content left-right">
      <!-- 左侧部分 -->
      <div class="float-left" style="position:relative">
        <!-- 图表区域 -->
        <div ref="pie" id="pie" style="width: 700px;height:600px;"></div>
        <!-- 底部链接区域 -->
        <div class="url-section">
          <div class="bg-style bg-blue">
            <router-link to="loan">去放款></router-link>
          </div>
           <div class="bg-style bg-none">
            <router-link to="cstLoanFee">供应商概况表></router-link>
          </div>
        </div>
      </div>
      <!-- 右侧部分 -->
      <div class="float-right">
        <!-- 2部分数据 -->
        <div  class="text-content" :style="'background:'+dataArr[0].bcolor">
          <div class="float-left text">
            <p class="t1">{{dataArr[0].title}}</p>
            <p class="line"></p>
            <p class="t1" style="margin-top:5px">总金额: <span>{{dataArr[0].firData.value+dataArr[0].secData.value}}万元</span></p>
            <div class="t2">
              <ul>
                <li>{{dataArr[0].firData.name}}</li>
                <li>{{dataArr[0].secData.name}}</li>
              </ul>
              <ul>
                <li>{{dataArr[0].firData.value}}万元</li>
                <li>{{dataArr[0].secData.value}}万元</li>
              </ul>
            </div>
          </div>
          <div class="float-right w-100">
            <div class="url">
              <router-link :to="dataArr[0].path">查看明细></router-link>
            </div>
            <pie ref="child" :num="dataArr[0].firData" :total="dataArr[0].secData" :color="color[0]"></pie>
          </div>
        </div>
        <!-- 只有单一数据 -->
        <div v-for="(item,idx) in dataTArr" class="text-content total-style" :style="'background:'+item.bcolor" :key="idx">
          <div class="float-left text">
            <p class="t1">{{item.title}}</p>
            <p class="line"></p>
            <p class="t1" style="margin-top:5px">总金额:</p>
            <p class="t1 val-text">{{item.totalData.value}}万元</p>
          </div>
          <div class="float-right w-100">
            <div class="url">
              <router-link :to="item.path">{{idx==0?'去放款>':'查看明细>'}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
}

.content.left-right {
  width: 1200px;
  margin: auto;
}
.index-style {
  min-width: 1102px;
}
.index-style > .header {
  text-align: center;
}
.w-100 {
  width: 100px;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}
.float-left.text {
  width: 250px;
  padding: 5px 20px;
  font-weight: 500;
}
.text-content {
  width: 400px;
  height: 120px;
  color: #fff;
  border: solid 1px;
  border-radius: 5px;
  margin-top: 10px;
}
.t1 {
  font-size: 18px;
  padding: 0px 5px;
}
.t1 > span {
  margin-left: 20px;
}
.t2 {
  margin-top: 10px;
}
.t2 ul {
  padding: 0px 5px;
}
li {
  list-style: none;
  display: inline-block;
  width: 100px;
  text-align: left;
}
.line {
  width: 100%;
  background-color: #fff;
  height: 3px;
}
.url {
  text-align: center;
  margin-top: 5px;
}
.url > a {
  color: #fff;
}
.val-text {
  margin-top: 10px;
  font-weight: 700;
}
/* 链接样式 */
.bg-style {
  width: 200px;
  margin: auto;
  text-align: center;
  padding: 5px 0px;
}
.bg-blue {
  background: #2e75b6;
}
.bg-blue > a {
  color: #fff;
}
.bg-none > a {
  color: #9e400f;
}
.url-section {
  position: absolute;
  bottom: 0px;
  left: 250px;
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
      dataArr: [
        {
          title: '放款中', // 标题
          firData: { // 第一个数据
            value: 515,
            name: '已放款金额'
          },
          secData: { // 第二个数据
            value: 3515,
            name: '审核中金额'
          },
          path: 'loan', // 路径
          bcolor: '#5b9bd5' // 背景色
        }
      ],
      dataTArr: [
        {
          title: '待放款', // 标题
          totalData: {
            value: 515,
            name: '总金额'
          },
          path: 'loan', // 路径
          bcolor: '#f1bd00' // 背景色
        },
        {
          title: '拒绝放款', // 标题
          totalData: { // 第一个数据
            value: 515,
            name: '总金额'
          },
          path: 'loanreject', // 路径
          bcolor: '#f67b28' // 背景色
        },
        {
          title: '已完结', // 标题
          totalData: { // 第一个数据
            value: 515,
            name: '总金额'
          },
          path: 'loaned', // 路径
          bcolor: '#9a9a9a' // 背景色
        }
      ],
      color: [['#fff', '#3b64ad'], ['#fff', '#ffd184'], ['#fff', '#d26e2a'], ['#fff', '#3e3c3c']] // 小饼图颜色数组
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
      name: '放款中金额'
    }, {
      value: 3515,
      name: '待放款金额'
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
            length: 30 * scale,
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
    // 子饼图数据显示
    this.$refs.child.updateMethod()
    // 绘制图表
    myChart.setOption(option)
  }
}
</script>
