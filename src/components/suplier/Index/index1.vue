<template>
  <div>
    <div class="header">
      <h3>AR融资概况</h3>
    </div>
    <div class="content left-right">
      <section class="float-left" style="position:relative;margin-top: -100px;">
        <!-- 图形区域 -->
        <pie-2 ref="pie2" :data="echartData" :sort-arr="sortArr" :width="500"></pie-2>
        <!-- 底部链接区域 -->
        <div class="url-section">
          <div class="bg-style bg-blue">
            <router-link to="myar">去融资<img src="@/assets/img/images/index_icon02.png" alt="" srcset=""></router-link>
          </div>
        </div>
      </section>
      <section class="float-left count-circle" style="
    width: calc(100% - 500px);margin-top: 50px;
">
        <el-row>
          <el-col
            class="flex-circle"
            :xl="8"
            :md="24"
            :xs="24"
            v-for="(item,idx) in rightDataArr"
            :key="idx"
          >
            <process-text :data="item" :total="rightSum"></process-text>
          </el-col>
        </el-row>
      </section>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
}
/* 流式布局左边圆圈图 */
@media only screen and (min-width: 1370px) {
  .flex-circle {
    width: 50%;
  }
}
@media only screen and (min-width: 1600px) {
  .flex-circle {
    width: 33.33%;
  }
}
.box-card {
  min-width: 1200px;
}

.header {
  text-align: left;
}
.header > h3 {
  width: 105px;
  border-bottom: 1px solid #e8ecef;
}
.content.left-right {
  width: 100%;
  min-width: 1200px;
  margin: auto;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

/* 链接样式 */

.url-section {
  position: absolute;
  bottom: 20px;
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
</style>

<script>
import Pie from '@/components/items/pie'
import Pie2 from '@/components/items/pie2'
import processText from '@/components/items/processIndex'
import { thousandth } from '@/util/util'
import Common from '@/mixins/common'
export default {
  components: {
    Pie,
    Pie2,
    processText
  },
  mixins: [Common],
  data () {
    let sortArr = [
      {
        key: 'unOperate',
        text: '未贴现/转让金额',
        bcolor: '#3f97f8'
      }, {
        key: 'discounted',
        text: '已贴现金额',
        bcolor: '#a7a7a7'
      }, {
        key: 'received',
        text: '已接受未使用',
        bcolor: '#53d9fe'
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
        bcolor: '#fd5353'
      }, {
        key: 'discounting',
        text: '贴现中金额',
        bcolor: '#58c64b'
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
    return {
      echartData: {},
      // 左侧数据
      sortArr: sortArr,
      // 右侧数据
      rightDataArr: rightDataArr,
      rightSum: 0,
      // 右侧圆饼图颜色组
      color: {
        unOperate: ['#fff', '#ff0000'],
        transfering: ['#fff', '#000'],
        transfered: ['#fff', '#000'],
        discounting: ['#fff', '#000'],
        discounted: ['#fff', '#000'],
        received: ['#fff', '#ff0000', '#000']
      } // 小饼图颜色数组
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
          this.$refs.pie2.updateMethod()
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
  return scope.axios.post('/auxiliaryFunction/searchIndexList.do').then(res => {
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
      if (element.key !== 'onReceiveAmout') {
        this.rightDataArr[element.key].data.firData.value = res.data[`${element.key}AvailableAmout`] || 0
        this.rightDataArr[element.key].data.secData.value = element.key === 'unOperate' || element.key === 'received' ? res.data[`${element.key}UnavailableAmout`] || 0 : res.data[`${element.key}ExpiredAmout`] || 0
        // 总和
        this.rightDataArr[element.key].value = this.rightDataArr[element.key].data.firData.value + this.rightDataArr[element.key].data.secData.value
      }
    }
  }
  this.rightSum = sumAdd(this.rightDataArr)
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
