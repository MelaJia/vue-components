<template>
  <div class="main index-style">
    <el-card class="box-card">
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
          <div class="u-line">
          <div class="bg-style bg-blue">
            <router-link to="loan">去放款></router-link>
          </div>
          <div class="bg-style bg-gray">
            <router-link to="loan">往来明细></router-link>
          </div>
          </div>
          <div class="u-line">
            <div class="bg-style bg-none">
            <router-link to="cstLoanFee">供应商概况表></router-link>
          </div>
          </div>
        </div>
      </div>
      <!-- 右侧部分 -->
      <div class="float-left">
        <!-- 2部分数据 -->
        <div v-for="(item,idx) in dataArr"  class="text-content" :style="'background:'+item.bcolor" :key="idx">
          <div class="float-left text">
            <p class="t1">{{item.title}}</p>
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
                <li>{{item.secData.name}}</li>
              </ul>
              <ul>
                <li>{{item.firData.value | regexNum}}万元</li>
                <li>{{item.secData.value | regexNum}}万元</li>
              </ul>
          </div>
        </div>
        <!-- 只有单一数据 -->
        <div v-for="(item,idx) in dataTArr" class="text-content total-style" :style="'background:'+item.bcolor" :key="idx">
          <div class="float-left text">
            <p class="t1">{{item.title}}</p>
            <p class="line"></p>
            <p class="t1" style="margin-top:5px">总金额:</p>
            <p class="t1 val-text">{{item.totalData.value | regexNum}}万元</p>
          </div>
          <div class="float-right w-100">
            <div class="url">
              <router-link :to="item.path">{{idx==0?'去放款>':'查看明细>'}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
     </el-card>
  </div>
</template>
<style scoped>
* {
  margin: 0;
}
.box-card {
  min-width: 1200px;
}

.header {
  text-align: center;
}
.u-line>div {
    display: inline-block;
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
.t2 ul {
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
.bg-blue > a, .bg-gray > a {
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
</style>

<script>
import Pie from '@/components/items/pie'
import { thousandth } from '@/util/util'
import Common from '@/mixins/common'
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
      sortArr: [{ key: 'loanedNo', text: '已放款/未完结', bcolor: '#5b9bd5' }, { key: 'loaned', text: '已放款/已完结', bcolor: '#9f9f9f' }, { key: 'onLoaning', text: '待放款', bcolor: '#f07622' }, { key: 'rejectLoan', text: '拒绝放款', bcolor: '#6daf40' }],
      dataArr: {
        loanedNo: {
          title: '已放款/未完结', // 标题
          firData: { // 第一个数据
            value: 515,
            name: '本金'
          },
          secData: { // 第二个数据
            value: 3515,
            name: '收益'
          },
          path: 'loaned', // 路径
          bcolor: '#5b9bd5' // 背景色
        },
        loaned: {
          title: '已放款/已完结', // 标题
          firData: { // 第一个数据
            value: 515,
            name: '本金'
          },
          secData: { // 第二个数据
            value: 3515,
            name: '收益'
          },
          path: 'loanfinish', // 路径
          bcolor: '#9f9f9f' // 背景色
        }
      },
      dataTArr: {
        onLoaning: {
          title: '待放款', // 标题
          totalData: {
            value: 515,
            name: '总金额'
          },
          path: 'loan', // 路径
          bcolor: '#f07622' // 背景色
        },
        rejectLoan: {
          title: '拒绝放款', // 标题
          totalData: { // 第一个数据
            value: 515,
            name: '总金额'
          },
          path: 'loanreject', // 路径
          bcolor: '#6daf40' // 背景色
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
  return scope.axios.post('/factoringIndex/searchFactoringIndex.do').then(res => {
    const amtArr = []
    const bColorArr = []
    for (const key in scope.sortArr) {
      if (scope.sortArr.hasOwnProperty(key)) {
        const element = scope.sortArr[key]
        // 设置右侧列表数据
        if (element.key === 'loanedNo' || element.key === 'loaned') {
          scope.dataArr[element.key].firData.value = res.data.data[`${element.key}FinishPrincipal`]
          scope.dataArr[element.key].secData.value = res.data.data[`${element.key}FinishProfit`]
          // 填充饼图数据
          if (element.key === 'loanedNo') {
            amtArr.push({ value: res.data.data[`${element.key}FinishPrincipal`], name: element.text })
            bColorArr.push(element.bcolor)
          }
        } else {
          scope.dataTArr[element.key].totalData.value = res.data.data[`${element.key}SumAmout`]
          if (element.key === 'onLoaning') {
            amtArr.push({ value: res.data.data[`${element.key}SumAmout`], name: element.text })
            bColorArr.push(element.bcolor)
          }
        }
      }
    }
    console.log(scope.dataArr)
    return { amt: amtArr, bColor: bColorArr }
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
