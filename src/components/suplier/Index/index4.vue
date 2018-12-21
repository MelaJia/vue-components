<template>
  <el-card>
    <div class="header">
      <h3>信用融资概况</h3>
    </div>
    <div class="content left-right">
      <!-- 左侧部分 -->
      <section class="float-left" style="position:relative;margin-top: -100px;">
        <!-- 图表区域 -->
        <pie ref="pie" :data="echartData" :sort-arr="sortArr" :width="500"></pie>
        <!-- 底部链接区域 -->
        <div class="url-section">
            <div class="bg-style bg-blue">
              <router-link to="creditLoanSituation">去贴现<img src="@/assets/img/images/index_icon02.png" alt="" srcset=""></router-link>
            </div>
        </div>
      </section>
      <!-- 右侧部分 -->
      <section class="float-left" style="width: calc(100% - 500px);margin-top: 50px;">
        <el-row>
          <el-col class="style-flex-circle" :span="14">
            <process-text :data="dataArr.unUsed" :total="rightSum" :is-detail="false"></process-text>
            <process-text :data="dataArr.used" :total="rightSum"></process-text>
          </el-col>
          <el-col class="style-flex-order" :span="10">
            <div class="orderList first">
              <header class="title">{{dataTArr.order.data.firData.name}}</header>
              <p class="text-body">{{dataTArr.order.data.firData.value}}</p>
            </div>
            <div class="orderList second">
              <header class="title">{{dataTArr.order.data.secData.name}}</header>
              <p class="text-body">{{dataTArr.order.data.secData.value}}</p>
            </div>
          </el-col>
        </el-row>
      </section>
    </div>
  </el-card>
</template>
<style scoped lang="scss">
* {
  margin: 0;
}
@media only screen and (min-width: 960px){
  .style-flex-order{
    width: 50%;
  }
  .style-flex-circle{
    width: 100%;
  }
}
@media only screen and (min-width: 1552px){
  .style-flex-order{
    width: 33%;
  }
  .style-flex-circle{
    width: 58.33%;
  }
}
.box-card {
  min-width: 1200px;
}

.header {
  text-align: left;
}
.header > h3 {
  width: 115px;
  border-bottom: 1px solid #e8ecef;
}
.u-line > div {
  display: block;
}
// .content.left-right {
//   margin: auto;
// }
.float-left {
  float: left;
}
.float-right {
  float: right;
}
/* 链接样式 */
.url-section {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.bg-style {
    display: inline-block;
    margin: auto;
    text-align: center;
    padding: 5px 40px 5px 30px;
    font-size: 18px;
    border-radius: 5px;
}

.bg-blue {
  background: #3f97f8;
}

.bg-gray {
  background: #7f7f7f;
}

.bg-blue > a,
.bg-gray > a {
  color: #fff;
  text-decoration: none;
}
.bg-blue>a>img{
    /* margin-top: 5px; */
    position: absolute;
    top: 12px;
    height: 12px;
    margin-left: 5px;
}
// 最右侧样式

.orderList {
    text-align: center;
    width: 100%;
    padding: 35px 5px;
    &.first{
    border-left: 1px solid #dfdfdf;
    border-right: 1px solid #dfdfdf;
    border-top: 1px solid #dfdfdf;
    }
    &.second{
      border: 1px solid #5dc850;
      color: #5dc850;
    }
}
</style>

<script>
import Pie from '@/components/items/pie2'
import processText from '@/components/items/processIndex'
import { thousandth, firstToUpperCase } from '@/util/util'
import Common from '@/mixins/common'
export default {
  components: { Pie, processText },
  mixins: [Common],
  data () {
    return {
      echartData: {},
      sortArr: [{ key: 'unUsed', text: '未使用额度', bcolor: '#3f97f8' }, { key: 'used', text: '已使用额度', bcolor: '#fd5353' }],
      // 右侧数据总和
      rightSum: 0,
      dataArr: {
        used: {
          title: '已使用额度', // 标题
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
          value: 0,
          path: 'creditLoanSituation', // 路径
          bcolor: '#4d94d3' // 背景色
        },
        unUsed: {
          title: '未使用额度', // 标题
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
          value: 0,
          path: 'creditLoanSituation', // 路径
          bcolor: '#4d94d3' // 背景色
        }
      },
      dataTArr: {
        order: {
          title: '订单额度', // 标题
          data: {
            firData: { // 第一个数据
              value: null,
              name: '历史已用订单金额'
            },
            secData: { // 第二个数据
              value: null,
              name: '当前可用订单金额'
            }
          },
          path: 'loan', // 路径
          bcolor: '#f8c200' // 背景色
        }
      }
    }
  },
  mounted () {
    // 获取数据
    ge.call(this).then(res => {
      if (res.data.status) {
        console.log(res.data)
        // 处理右边数据
        this.dealRightData(res.data)
        this.echartData = res.data
        setTimeout(() => {
          // 绘制图表
          this.$refs.pie.updateMethod2()
        }, 500)
      }
    })
  },
  methods: {
    thousandth: thousandth,
    dealRightData: dealRightData
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
    return res
  })
}
// 异步获取数据
async function ge () {
  // 等待获取数据
  const t = await getdata(this)
  return t
}
// 处理数据
function dealRightData (res) {
  for (const key in this.sortArr) {
    if (this.sortArr.hasOwnProperty(key)) {
      const element = this.sortArr[key]
      // 设置右侧列表数据
      this.dataArr[element.key].value = res.data[`${element.key}Amout`] // 设置总额度
      if (element.key === 'used') { // 已使用额度详情
        this.dataArr[element.key].data.firData.value = res.data[`creditLoan${firstToUpperCase(element.key)}Amout`]
        this.dataArr[element.key].data.secData.value = res.data[`poLoan${firstToUpperCase(element.key)}Amout`]
        // 总和
        this.dataArr[element.key].value = this.dataArr[element.key].data.firData.value + this.dataArr[element.key].data.secData.value
      }
    }
    // 设置订单金额
    this.dataTArr.order.data.firData.value = res.data[`poLoanUsedHistorySumAmout`]
    this.dataTArr.order.data.secData.value = res.data[`availablePoAmout`]
  }
  this.rightSum = sumAdd(this.dataArr)
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
