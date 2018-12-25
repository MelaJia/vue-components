<template>
  <div>
    <div class="header">
      <h3>保理商资产概况-订单信用融资</h3>
    </div>
    <div class="content left-right">
      <!-- 左侧部分 -->
      <section class="float-left" style="position:relative">
        <!-- 图表区域 -->
        <div ref="pie" id="pie" style="width: 700px;height:600px;"></div>
        <!-- 底部链接区域 -->
        <div class="url-section">
          <div class="u-line">
          <div class="bg-style bg-blue">
            <router-link to="creditLoanSituation">去贴现></router-link>
          </div>
          </div>
        </div>
      </section>
      <!-- 右侧部分 -->
      <section class="float-left" style="height:600px">
        <div style="margin-top: 175px">
          <!-- 2部分数据 -->
        <div v-for="(item,idx) in dataArr"  class="text-content" :style="'background:'+item.bcolor" :key="idx">
          <div class="float-left text">
            <p class="t1">{{item.title}} <span>{{item.value | regexNum}}万元</span> </p>
            <p class="line"></p>
          </div>
          <div class="float-right w-100">
            <div class="url">
              <router-link :to="item.path">查看明细></router-link>
            </div>
            <!-- <pie ref="child" :num="item.firData" :total="item.secData" :color="color[0]"></pie> -->
          </div>
          <div class="t2">
              <ul>
                <li>{{item.firData.name}}</li>
                <li style="color:#000">{{item.secData.name}}</li>
              </ul>
              <ul>
                <li>{{item.firData.value | regexNum}}万元</li>
                <li style="color:#000">{{item.secData.value | regexNum}}万元</li>
              </ul>
          </div>
        </div>
        <!-- 订单数据 -->
        <div v-for="(item,idx) in dataTArr" class="text-content total-style" :style="'background:'+item.bcolor" :key="idx">
          <div class="t3">
            <div class="float-left w-haf border-right-white">
              <div class="center-box">
                <ul>
                  <li>{{item.firData.name}}</li>
                </ul>
                <ul>
                  <li>{{item.firData.value | regexNum}}万元</li>
                </ul>
              </div>
            </div>
            <div class="float-left w-haf">
              <div class="center-box" style="color:#000">
                <ul>
                  <li>{{item.secData.name}}</li>
                </ul>
                <ul>
                  <li>{{item.secData.value | regexNum}}万元</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped lang="scss">
* {
  margin: 0;
}
.box-card {
  min-width: 1200px;
}

.header {
  text-align: center;
}
.u-line > div {
  display: block;
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
  margin-top: 40px;
  padding: 5px 0px 5px 20px;
  font-size: 18px;
}
.t2 ul{
  padding: 0px 5px;
}
li {
  list-style: none;
  display: inline-block;
  width: 180px;
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
.bg-gray {
  background: #7f7f7f;
}
.bg-blue > a,
.bg-gray > a {
  color: #fff;
}
.bg-none > a {
  color: #9e400f;
}
.url-section {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
}
 /* 中间横线样式 */
 .t3 {
  padding: 5px 0px 5px 20px;
  font-size: 18px;
}
.t3 ul {
  padding: 0px 5px;
}
 .float-left.w-haf{
   height: 110px;
 }
 .border-right-white{
   border-right: solid 2px;
 }
 .float-left>.center-box{
   margin-top: 40px;
   li{
     text-align:center;
     width: 160px;
   }
 }
</style>

<script>
import Pie from '@/components/items/pie'
import { thousandth, firstToUpperCase } from '@/util/util'
import Common from '@/mixins/common/common'
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
  mixins: [Common],
  data () {
    return {
      sortArr: [{ key: 'used', text: '已使用额度', bcolor: '#ed7d31' }, { key: 'unUsed', text: '未使用额度', bcolor: '#5b9bd5' }],
      dataArr: {
        used: {
          title: '已用额度', // 标题
          firData: { // 第一个数据
            value: null,
            name: '信用融资额度'
          },
          secData: { // 第二个数据
            value: null,
            name: '订单融资额度'
          },
          value: 0,
          path: 'creditLoanSituation', // 路径
          bcolor: '#4d94d3' // 背景色
        }
      },
      dataTArr: {
        order: {
          title: '订单额度', // 标题
          firData: { // 第一个数据
            value: null,
            name: '历史已用订单金额'
          },
          secData: { // 第二个数据
            value: null,
            name: '当前可用订单金额'
          },
          path: 'loan', // 路径
          bcolor: '#f8c200' // 背景色
        }
      }
    }
  },
  mounted () {
    // 获取容器
    let dom = this.$refs.pie
    let myChart = echarts.init(dom)
    // 初始化饼图
    console.log('数据')
    let option = getOptions([{ value: null, name: '待接收金额' }])
    // 绘制图表
    myChart.setOption(option)
    console.log('数据')
    // 获取数据
    ge.call(this).then(res => {
      // 设置数据
      let echartData = res
      console.log('数据', res)
      // 设置option
      let option = getOptions(echartData)
      // 绘制图表
      myChart.setOption(option)
      window.onresize = myChart.resize
    })
  },
  methods: {
    thousandth: thousandth
  },
  filters: {
    // 千分位
    regexNum: function (val) {
      return `${thousandth(val)}`
    }
  }
}
// 获取数据
function getdata (scope) {
  // 基于准备好的dom，初始化echarts实例
  return scope.axios.post('/auxiliaryFunction/searchCreditLoanIndexList.do').then(res => {
    const amtArr = []
    const bColorArr = []
    for (const key in scope.sortArr) {
      if (scope.sortArr.hasOwnProperty(key)) {
        const element = scope.sortArr[key]
        // 设置右侧列表数据
        if (element.key === 'used') {
          scope.dataArr[element.key].value = res.data.data[`${element.key}Amout`]
          scope.dataArr[element.key].firData.value = res.data.data[`creditLoan${firstToUpperCase(element.key)}Amout`]
          scope.dataArr[element.key].secData.value = res.data.data[`poLoan${firstToUpperCase(element.key)}Amout`]
          // 填充饼图数据
          if (element.key === 'used') {
            amtArr.push({ value: res.data.data[`${element.key}Amout`], name: element.text })
            bColorArr.push(element.bcolor)
          }
        } else {
          scope.dataTArr.order.firData.value = res.data.data[`poLoanUsedHistorySumAmout`]
          scope.dataTArr.order.secData.value = res.data.data[`availablePoAmout`]
          if (element.key === 'unUsed') {
            amtArr.push({ value: res.data.data[`${element.key}Amout`], name: element.text })
            bColorArr.push(element.bcolor)
          }
        }
      }
    }
    console.log(scope.dataArr)
    return { amt: amtArr, bColor: bColorArr, creditLinesAmout: res.data.data.creditLinesAmout }
  })
}
// 异步获取数据
async function ge () {
  // 等待获取数据
  const t = await getdata(this)
  return t
}
// 配置option
function getOptions (echartData) {
  let scale = 1
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
    legend: {
      selectedMode: false,
      formatter: function (name) {
        let total = thousandth(echartData.creditLinesAmout)
        return '{total|' + total + '}'
      },
      data: ['已使用额度'],
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
    tooltip: {
      trigger: 'item',
      formatter: function (params, ticket, callback) {
        var res = `${params.seriesName}</br>${params.name}:${thousandth(params.value)}(万元)</br> 比例:${params.percent}%`
        return res
      }
    },
    series: [{
      name: '资产概况',
      type: 'pie',
      radius: ['27%', '45%'],
      hoverAnimation: false,
      color: echartData.bColor,
      label: {
        normal: {
          formatter: function (params, ticket, callback) {
            return `{white|${params.name}: ${thousandth(params.value)}万元 }\n{per|${params.percent}%}`
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
      data: echartData.amt
    }]
  }
}
</script>
