<template>
  <div class="main index-style">
      <el-card class="box-card">
        <header class="header">
          <h3>供应商资产概况</h3>
        </header>
        <div class="content left-right">
          <section class="float-left" style="width:60%;position:relative">
            <!-- 图形区域 -->
            <div ref="pie" id="pie" style="width:100%;min-width: 700px;height:600px;"></div>
            <!-- 底部链接区域 -->
            <div class="url-section">
              <div class="bg-style bg-blue">
                <router-link to="myar">去贴现/转让></router-link>
              </div>
              <div class="bg-style bg-gray">
                <router-link to="transfer">往来明细></router-link>
              </div>
            </div>
          </section>
          <section class="float-left">
            <article v-for="(item,idx) in rightDataArr" class="text-content" :style="`background:${item.bcolor};position:relative`" :key="idx">
              <div class="float-left text">
                <p class="t1">{{item.title}}</p>
                <p class="line"></p>
                <p class="t1" style="margin-top:5px">总金额:
                  <span>{{ sumAdd(item.data) | regexNum}}万元</span>
                </p>
                <div class="t2">
                  <ul>
                    <section v-for="(item2,idx2) in item.data" :key="idx2">
                      <el-tooltip v-if="item.tip&&item2.name==='不可用金额'" class="item" effect="light" :content="item.tip" placement="right-end">
                        <li :style="item2.name==='不可用金额'?'color:red':''">{{item2.name}}</li>
                      </el-tooltip>
                      <li v-else :style="item2.name==='不可用金额'?'color:red':''">{{item2.name}}</li>
                    </section>
                  </ul>
                  <ul>
                    <el-tooltip v-for="(item2,idx2) in item.data" :key="idx2" class="item" effect="dark" :content="thousandth(item2.value)+'万元'" placement="bottom-start">
                      <li :style="item2.name==='不可用金额'?'color:red':''">{{item2.value | regexNum}}万元</li>
                    </el-tooltip>
                  </ul>
                </div>
              </div>
              <div class="float-right">
                <div class="url">
                  <router-link :to="item.path">查看明细</router-link>
                </div>
                <pie ref="child" :data="getPieArr(item.title,item.data)" :color="color[idx]"></pie>
              </div>
            </article>
          </section>
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

.content.left-right {
  width: 100%;
  min-width: 1200px;
  margin: auto;
}

.index-style {
  min-width: 1102px;
}

.index-style > .header {
  text-align: center;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

/* 右侧方形图左边区域样式 */

.float-left.text {
  width: 250px;
  padding: 5px 20px;
  font-weight: 500;
}

.text-content {
  width: 400px;
  height: 115px;
  color: #fff;
  border: solid 1px;
  border-radius: 15px;
  margin-top: 10px;
}

.t1 {
  font-size: 16px;
  padding: 0px 5px;
}

.t1 > span {
  margin-left: 20px;
}

.t2 {
  margin-top: 10px;
  font-size: 13px;
  position: absolute;
  width: 310px;
}

.t2 ul {
  padding: 0px 5px;
}
.t2 > ul > section {
  display: inline;
}
li {
  list-style: none;
  display: inline-block;
  width: 100px;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.t2 > ul > section:last-child,
.t2 > ul > li:last-child {
  float: right;
  color: black;
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

/* 链接样式 */

.url-section {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.bg-style {
  display: inline-block;
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
</style>

<script>
import Pie from '@/components/items/pie'
import {thousandth} from '@/util/util'
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
  components: {
    Pie
  },
  mixins: [Common],
  data () {
    let sortArr = [
      {
        key: 'unOperate',
        text: '未贴现/转让金额',
        bcolor: '#5b9bd5'
      }, {
        key: 'discounted',
        text: '已贴现金额',
        bcolor: '#7030a0'
      }, {
        key: 'received',
        text: '已接受未使用',
        bcolor: '#e96f1b'
      }, {
        key: 'transfered',
        text: '已转让金额',
        bcolor: '#68aa3c'
      }, {
        key: 'onReceiveAmout',
        text: '待接收金额',
        bcolor: '#a5a5a5'
      }, {
        key: 'transfering',
        text: '转让中金额',
        bcolor: '#e8b800'
      }, {
        key: 'discounting',
        text: '贴现中金额',
        bcolor: '#3568c1'
      }
    ]
    let rightDataArr = {
      unOperate: {
        title: '未贴现/转让', // 标题
        tip: '已申请贴现或转让的发票剩余金额', // 提示信息
        data: {
          firData: { // 第一个数据
            value: null,
            name: '可用金额'
          },
          secData: { // 第二个数据
            value: null,
            name: '不可用金额'
          }
        },
        path: 'myar' // 路径
      },
      transfering: {
        title: '转让中', // 标题
        tip: '', // 提示信息
        data: {
          firData: { // 第一个数据
            value: null,
            name: '未到期金额'
          },
          secData: { // 第二个数据
            value: null,
            name: '已到期金额'
          }
        },
        path: 'transfer' // 路径
      },
      discounting: {
        title: '贴现中', // 标题
        tip: '', // 提示信息
        data: {
          firData: { // 第一个数据
            value: null,
            name: '未到期金额'
          },
          secData: { // 第二个数据
            value: null,
            name: '已到期金额'
          }
        },
        path: 'myar' // 路径
      },
      received: {
        title: '已接受未使用', // 标题
        tip: '', // 提示信息
        data: {
          firData: { // 第一个数据
            value: null,
            name: '可用金额'
          },
          secData: { // 第二个数据
            value: null,
            name: '不可用金额'
          }
        },
        path: 'getar' // 路径
      },
      discounted: {
        title: '已贴现', // 标题
        tip: '', // 提示信息
        data: {
          firData: { // 第一个数据
            value: null,
            name: '未到期金额'
          },
          secData: { // 第二个数据
            value: null,
            name: '已到期金额'
          }
        },
        path: 'myar' // 路径
      },
      transfered: {
        title: '已转让', // 标题
        tip: '', // 提示信息
        data: {
          firData: { // 第一个数据
            value: null,
            name: '未到期金额'
          },
          secData: { // 第二个数据
            value: null,
            name: '已到期金额'
          }
        },
        path: 'transfer' // 路径
      }
    }
    sortArr.forEach((val, idx) => {
      if (rightDataArr[val.key]) {
        rightDataArr[val.key].bcolor = val.bcolor
      }
    })
    let sortArr1 = [
      {
        key: 'amountUsed',
        text: '已用额度',
        bcolor: '#5b9bd5'
      }, {
        key: 'history',
        text: '',
        bcolor: '#e8b800'
      }
    ]
    let rightDataArr1 = {
      amountUsed: {
        title: '已用额度', // 标题
        // tip: '已申请贴现或转让的发票剩余金额', // 提示信息
        data: {
          firData: { // 第一个数据
            value: null,
            name: '信用融资额度'
          },
          secData: { // 第二个数据
            value: null,
            name: '订单融资额度'
          }
        },
        path: ''
      },
      history: {
        // title: '', // 标题
        // tip: '已申请贴现或转让的发票剩余金额', // 提示信息
        data: {
          firData: { // 第一个数据
            value: null,
            name: '历史已用订单金额'
          },
          secData: { // 第二个数据
            value: null,
            name: '当前可用订单金额'
          }
        }
      }
    }
    sortArr1.forEach((val, idx) => {
      if (rightDataArr1[val.key]) {
        rightDataArr1[val.key].bcolor = val.bcolor
      }
    })
    return {
      // 左侧数据
      sortArr: sortArr,
      sortArr1: sortArr1,
      // 右侧数据
      rightDataArr: rightDataArr,
      rightDataArr1: rightDataArr1,
      // 右侧圆饼图颜色组
      color: {
        unOperate: ['#fff', '#ff0000'],
        transfering: ['#fff', '#000'],
        transfered: ['#fff', '#000'],
        discounting: ['#fff', '#000'],
        discounted: ['#fff', '#000'],
        received: ['#fff', '#ff0000', '#000']
      }, // 小饼图颜色数组
      color1: {
        amountUsed: ['#fff', '#ff0000'],
        history: ['#fff', '#000']
      },
      activeName: 'first'
    }
  },
  mounted () {
    // 获取容器
    let dom = this.$refs.pie
    let myChart = echarts.init(dom)
    // 初始化饼图
    let option = getOptions([{
      value: null,
      name: '待接收金额'
    }])
    // 绘制图表
    myChart.setOption(option)
    // 获取数据
    ge.call(this).then(res => {
      // 子饼图数据显示
      this.$refs.child.forEach(re => {
        re.updateMethod()
      })
      // 设置数据
      let echartData = res
      // 设置option
      let option = getOptions(echartData)
      // 绘制图表
      myChart.setOption(option)
      window.onresize = myChart.resize
    })
  },
  methods: {
    thousandth: thousandth,
    // 计算总额
    sumAdd: sumAdd,
    // 转化数组
    getPieArr: getPieArr
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
  return scope.axios.post('/auxiliaryFunction/searchIndexList.do').then(res => {
    const amtArr = []
    const bColorArr = []
    for (const key in scope.sortArr) {
      if (scope.sortArr.hasOwnProperty(key)) {
        const element = scope.sortArr[key]
        // 设置右侧列表数据
        if (element.key !== 'onReceiveAmout') {
          scope.rightDataArr[element.key].data.firData.value = res.data.data[`${element.key}AvailableAmout`] || 0
          scope.rightDataArr[element.key].data.secData.value = element.key === 'unOperate' || element.key === 'received' ? res.data.data[`${element.key}UnavailableAmout`] || 0 : res.data.data[`${element.key}ExpiredAmout`] || 0
          // if (element.key === 'received') {
          //   scope.rightDataArr[element.key].data.thirData.value = res.data.data[`${element.key}ExpiredAmout`] || 0
          // }
          // 填充饼图数据
          if (element.key !== 'discounted' && element.key !== 'transfered') {
            amtArr.push({
              value: res.data.data[`${element.key}SumAmout`],
              name: element.text
            })
            // 背景色
            bColorArr.push(element.bcolor)
          }
        } else {
          amtArr.push({
            value: res.data.data['onReceiveAmout'],
            name: element.text
          })
          // 背景色
          bColorArr.push(element.bcolor)
        }
      }
    }
    return {
      amt: amtArr,
      bColor: bColorArr
    }
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
    tooltip: {
      trigger: 'item',
      // formatter: '{b}: {c} ({d}%)'
      formatter: function (params, ticket, callback) {
        var res = `${params.seriesName}</br>${params.name}:${thousandth(params.value)}(万元)</br> 比例:${params.percent}%`
        return res
      }
    },
    legend: {
      selectedMode: false,
      formatter: function (name) {
        var total = 0 // 总和
        echartData.amt.forEach(function (value, index, array) {
          total += value.value * 100
        })
        total = thousandth(total / 100)
        return '{total|' + total + '}'
      },
      data: ['未贴现/转让金额'],
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
      name: '资产概况',
      type: 'pie',
      radius: ['27%', '45%'],
      minAngle: 10, // 最小角度
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
          length: 55 * scale,
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
function sumAdd (object) {
  let result = 0
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key].value) {
      result += object[key].value * 100
    }
  }
  return result / 100
}
function getPieArr (title, object) {
  let result = []
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      result.push(object[key])
    }
  }
  return {title: title, datas: result}
}
</script>
