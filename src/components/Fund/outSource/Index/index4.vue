<template>
  <el-card>
    <div class="header">
      <h3>保理商资产概况</h3>
    </div>
    <div class="content left-right">
      <!-- 左侧部分 -->
      <section class="float-left" style="position:relative;margin-top: -100px;">
        <!-- 图表区域 -->
        <pie ref="pie" :data="echartData" :sort-arr="sortArr" :width="500"></pie>
        <!-- 底部链接区域 -->
        <div class="url-section">
          <div class="bg-style bg-blue">
            <router-link to="loan">去放款<img src="@/assets/img/images/index_icon02.png" alt="" srcset=""></router-link>
          </div>
        </div>
      </section>
      <!-- 右侧部分 -->
      <section class="float-left" style="width: calc(100% - 500px);margin-top: 50px;">
        <el-row>
          <el-col class="style-flex-circle" :span="14">
            <process-text :data="dataArr.loanedNo" :total="rightSum" :is-detail="true"></process-text>
            <process-text :data="dataTArr.onLoaning" :total="rightSum" :is-detail="false"></process-text>
          </el-col>
          <el-col class="style-flex-order" :span="10">
            <div class="orderList first">
              <header class="title">{{dataArr.loaned.title}}</header>
              <div class="text-body">
                <p>{{dataArr.loaned.data.firData.name}}<strong>{{ dataArr.loaned.data.firData.value | regexNum}}</strong> 万元</p>
                <p class="color_green">{{dataArr.loaned.data.secData.name}}<strong>{{ dataArr.loaned.data.secData.value | regexNum}}</strong> 万元</p>
              </div>
              <div class="url">
                <router-link :to="dataArr.loaned.path">查看明细></router-link>
              </div>
            </div>
            <div class="orderList second">
              <header class="title red">{{dataTArr.rejectLoan.title}}</header>
              <p class="text-body red">
                <strong>{{dataTArr.rejectLoan.totalData.value | regexNum}}</strong> 万元
              </p>
              <div class="url">
                <router-link :to="dataTArr.rejectLoan.path">查看明细></router-link>
              </div>
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
@media only screen and (min-width: 960px) {
  .style-flex-order {
    width: 50%;
  }
  .style-flex-circle {
    width: 100%;
  }
}
@media only screen and (min-width: 1552px) {
  .style-flex-order {
    width: 33%;
  }
  .style-flex-circle {
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
  width: 135px;
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
.bg-blue > a > img {
  /* margin-top: 5px; */
  position: absolute;
  top: 12px;
  height: 12px;
  margin-left: 5px;
}
// 最右侧样式

.orderList {
  text-align: left;
  font-size: 14px;
  color: #7f7f7f;
  width: 100%;
  padding: 20px 15px;
  & {
    border-left: 1px solid #dfdfdf;
    border-right: 1px solid #dfdfdf;
    border-top: 1px solid #dfdfdf;
  }
  &.second{
    border-bottom: 1px solid #dfdfdf;
  }
  p>strong{
    margin-left: 5px;
    font-size: 20px;
    color:#303133;
  }
  p.color_green{
    &,>strong{
      color: #5dc850;
    }
  }
  .url > a {
    color: #7f7f7f;
  }
  .red{
    &,&>strong{
      color: #db2e1b;
    }
  }
}

</style>

<script>
import Pie from '@/components/items/pie3'
import processText from '@/components/items/processIndex2'
import { thousandth } from '@/util/util'
import Common from '@/mixins/common'
export default {
  components: { Pie, processText },
  mixins: [Common],
  data () {
    return {
      echartData: {},
      sortArr: [{ key: 'loanedNo', text: '已放款/未完结', bcolor: '#5b9bd5' }, { key: 'loaned', text: '已放款/已完结', bcolor: '#9f9f9f' }, { key: 'onLoaning', text: '待放款', bcolor: '#f07622' }, { key: 'rejectLoan', text: '拒绝放款', bcolor: '#6daf40' }],
      // 右侧数据总和
      rightSum: 0,
      dataArr: {
        loanedNo: {
          title: '已放款/未完结', // 标题
          value: 0,
          data: {
            firData: { // 第一个数据
              value: null,
              name: '本金'
            },
            secData: { // 第二个数据
              value: null,
              name: '收益'
            }
          },
          path: 'loaned', // 路径
          bcolor: '#5b9bd5' // 背景色
        },
        loaned: {
          title: '已放款/已完结', // 标题
          value: 0,
          data: {
            firData: { // 第一个数据
              value: null,
              name: '本金'
            },
            secData: { // 第二个数据
              value: null,
              name: '收益'
            }
          },
          path: 'loanfinish', // 路径
          bcolor: '#9f9f9f' // 背景色
        }
      },
      dataTArr: {
        onLoaning: {
          title: '待放款', // 标题
          value: null,
          totalData: {
            value: null,
            name: '总金额'
          },
          path: 'loan', // 路径
          bcolor: '#f07622' // 背景色
        },
        rejectLoan: {
          title: '拒绝放款', // 标题
          value: null,
          totalData: { // 第一个数据
            value: null,
            name: '总金额'
          },
          path: 'loanreject', // 路径
          bcolor: '#6daf40' // 背景色
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
          this.$refs.pie.updateMethod()
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
  return scope.axios.post('/factoringIndex/searchFactoringIndex.do').then(res => {
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
  console.log(res.data)
  for (const key in this.sortArr) {
    if (this.sortArr.hasOwnProperty(key)) {
      const element = this.sortArr[key]
      // 设置右侧列表数据
      if (element.key === 'loanedNo' || element.key === 'loaned') {
        this.dataArr[element.key].data.firData.value = res.data[`${element.key}FinishPrincipal`]
        this.dataArr[element.key].data.secData.value = res.data[`${element.key}FinishProfit`]
        this.dataArr[element.key].value = sumAdd(this.dataArr[element.key].data) // 设置总额度
      } else {
        this.dataTArr[element.key].totalData.value = res.data[`${element.key}SumAmout`]
        this.dataTArr[element.key].value = res.data[`${element.key}SumAmout`]
      }
    }
  }
  this.rightSum = this.dataArr.loanedNo.value + this.dataTArr.onLoaning.value
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
