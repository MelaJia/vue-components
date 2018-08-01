<template>
<div class="main index-style">
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="已上传账款信息" name="first">
      <div class="body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="~@/assets/img/juxin_06.png" alt="查询条件">
          <span>查询条件</span>
        </div>
        <up-search @handle-search="handleSearchFirst"></up-search>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card">
        <up-list :data-table="arrData.first.tableData5" :data-loading="arrData.first.loading"></up-list>
        <el-pagination
      @size-change="handleSizeChangeFirst"
      @current-change="handleCurrentChangeFirst"
      :page-sizes="pageSizesArr"
      :page-size="arrData.first.psize"
      :current-page.sync="arrData.first.currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="arrData.first.total">
    </el-pagination>
      </el-card>
    </div>
    </el-tab-pane>
    <el-tab-pane label="企业信息" name="second">
      <div class="body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="~@/assets/img/juxin_06.png" alt="查询条件">
          <span>查询条件</span>
        </div>
        <comp-search @handle-search="handleSearchSecond"></comp-search>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card">
        <comp-list :data-table="arrData.second.tableData5" :data-loading="arrData.second.loading"></comp-list>
        <el-pagination
      @size-change="handleSizeChangeSecond"
      @current-change="handleCurrentChangeSecond"
      :page-sizes="pageSizesArr"
      :page-size="arrData.second.psize"
      :current-page.sync="arrData.second.currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="arrData.second.total">
    </el-pagination>
      </el-card>
    </div>
    </el-tab-pane>
    <el-tab-pane label="资金提供方信息" name="third">
      <div class="body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <img src="~@/assets/img/juxin_06.png" alt="查询条件">
          <span>查询条件</span>
        </div>
        <mon-search @handle-search="handleSearchThird"></mon-search>
      </el-card>
    </div>
    <div class="body">
      <el-card class="box-card">
        <mon-list :data-table="arrData.third.tableData5" :data-loading="arrData.third.loading"></mon-list>
        <el-pagination
      @size-change="handleSizeChangeThird"
      @current-change="handleCurrentChangeThird"
      :page-sizes="pageSizesArr"
      :page-size="arrData.third.psize"
      :current-page.sync="arrData.third.currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="arrData.third.total">
    </el-pagination>
      </el-card>
    </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import UpSearch from '@/components/Fund/outSource/uploadedSearch'
import UpList from '@/components/Fund/outSource/uploadedListTable'
import CompSearch from '@/components/Fund/outSource/compSearch'
import CompList from '@/components/Fund/outSource/compListTable'
import MonSearch from '@/components/Fund/outSource/monSearch'
import MonList from '@/components/Fund/outSource/monListTable'
import Table from '@/mixins/suplier/Ar/Table'
// import {Datas} from '@/monitorDatas/Fund/loanDatas'
export default {
  // 放款页面
  mixins: [Table],
  data () {
    return {
      activeName2: 'first',
      totalStr: 'recordsTotal', // 服务器返回总数参数名
      dataStr: 'data', // 服务器返回数据参数名
      arrData: {
        first: {
          postUrl: '/crcQuery/getUploadedAccountInformationList.do', // 列表请求地址
          total: 0, // 总数
          psize: 10, // 每页数据
          currentPage: 1, // 当前页
          loading: false, // 加载状态
          tableData5: [] // 表格数据
        },
        second: {
          postUrl: '/crcQuery/getCorporateInformationList.do', // 列表请求地址
          total: 0, // 总数
          psize: 10, // 每页数据
          currentPage: 1, // 当前页
          loading: false, // 加载状态
          tableData5: [] // 表格数据
        },
        third: {
          postUrl: '/crcQuery/getFundProviderInformationList.do', // 列表请求地址
          total: 0, // 总数
          psize: 10, // 每页数据
          currentPage: 1, // 当前页
          loading: false, // 加载状态
          tableData5: [] // 表格数据
        }
      }
    }
  },
  components: {
    'up-list': UpList,
    'up-search': UpSearch,
    'comp-list': CompList,
    'comp-search': CompSearch,
    'mon-list': MonList,
    'mon-search': MonSearch
  },
  mounted () {
    const that = this
    getdata(1, 10, that.arrData.first, this)
      .then(function (response) {
        if (response.data.status) {
          that.arrData.first.tableData5 = response.data[that.dataStr]
          that.arrData.first.total = response.data[that.totalStr]
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    /**  条件查询  ***/
    // 第一个
    handleSearchFirst: handleSearchFirst,
    // 第二个
    handleSearchSecond: handleSearchSecond,
    // 第三个
    handleSearchThird: handleSearchThird,
    // 切换tab事件
    handleClick (tab, event) {
      if (this.arrData[tab.name].tableData5.length === 0) {
        getdata(1, 10, this.arrData[tab.name], this).then(res => {
          if (res.data.status) {
            this.arrData[tab.name].tableData5 = res.data[this.dataStr]
            this.arrData[tab.name].total = res.data[this.totalStr]
          }
        })
      }
    },
    // 页数改变
    handleSizeChangeFirst: handleSizeChange('first'),
    // 页数改变
    handleSizeChangeSecond: handleSizeChange('second'),
    // 页数改变
    handleSizeChangeThird: handleSizeChange('third'),
    // 翻页1
    handleCurrentChangeFirst: handleCurrentChange('first'),
    // 翻页2
    handleCurrentChangeSecond: handleCurrentChange('second'),
    // 翻页3
    handleCurrentChangeThird: handleCurrentChange('third')
  }
}
function handleSearchFirst (val) {
  let from = val.moneyDate ? val.moneyDate[0].Format('yyyy-MM-dd') : ''
  let to = val.moneyDate ? val.moneyDate[1].Format('yyyy-MM-dd') : ''
  this.param = {
    currency: val.currency, // 币别
    beginDate: from, // 日期
    endDate: to
  }
  console.log(this.param)
  if (this.arrData.first.total && this.arrData.first.currentPage !== 1) {
    console.log('2')
    this.arrData.first.total = 0 // 分页的当前页数变动会触发 从而获取数据
  } else {
    console.log('3')
    getdata(1, 10, this.arrData.first, this).then(res => {
      if (res.data.status) {
        this.arrData.first.tableData5 = res.data[this.dataStr]
        this.arrData.first.total = res.data[this.totalStr]
      }
    })
  }
}
function handleSearchSecond (val) {
  this.param = {
    enterprise: val.enterprise, // 企业名称
    oibc: val.OIBC // 组织机构代码
  }
  console.log(this.param)
  if (this.arrData.second.total && this.arrData.second.currentPage !== 1) {
    console.log('2')
    this.arrData.second.total = 0 // 分页的当前页数变动会触发 从而获取数据
  } else {
    console.log('3')
    getdata(1, 10, this.arrData.second, this).then(res => {
      if (res.data.status) {
        this.arrData.second.tableData5 = res.data[this.dataStr]
        this.arrData.second.total = res.data[this.totalStr]
      }
    })
  }
}
function handleSearchThird (val) {
  this.param = {
    funding: val.funding, // 资金提供方名称
    oibc: val.OIBC // 组织机构代码
  }
  console.log(this.param)
  if (this.arrData.third.total && this.arrData.third.currentPage !== 1) {
    console.log('2')
    this.arrData.third.total = 0 // 分页的当前页数变动会触发 从而获取数据
  } else {
    console.log('3')
    getdata(1, 10, this.arrData.third, this).then(res => {
      if (res.data.status) {
        this.arrData.third.tableData5 = res.data[this.dataStr]
        this.arrData.third.total = res.data[this.totalStr]
      }
    })
  }
}
// 翻页
function handleCurrentChange (tag) {
  return function (val) {
    console.log(tag)
    const that = this
    getdata(val, that.arrData[tag].psize, that.arrData[tag], this)
      .then(function (response) {
        console.log(response)
        if (response.data.status) {
          that.arrData[tag].tableData5 = response.data[that.dataStr]
          that.arrData[tag].total = response.data[that.totalStr]
        } else {
          that.arrData[tag].tableData5 = []
          that.arrData[tag].total = 0
          that.$message.error(response.data.msg)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
// 翻页
function handleSizeChange (tag) {
  return function (val) {
    console.log(`每页 ${val} 条`)
    const that = this
    getdata(1, val, that.arrData[tag], this)
      .then(function (response) {
        console.log(response)
        if (response.data.status) {
          that.arrData[tag].tableData5 = response.data[that.dataStr]
          that.arrData[tag].total = response.data[that.totalStr]
        } else {
          that.arrData[tag].tableData5 = []
          that.arrData[tag].total = 0
          that.$message.error(response.data.msg)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
/**
     *
     * 获取数据
     * @param {any} page 页数
     * @param {any} length 长度
     * @returns promise
     */
function getdata (page, length, ele, scope) {
  console.log('获取数据')
  const that = scope
  ele.loading = true // 开启加载动画
  that.param.iDisplayStart = page
  that.param.iDisplayLength = length
  console.log(that.param)
  return that.axios.post(ele.postUrl, that.param).then(res => {
    return Promise.resolve(res)
  }).then(response => {
    let result = null
    if (response.data[that.dataStr] && response.data[that.dataStr].length > 0) {
      // 遍历子节点
      response.data[that.dataStr].forEach(item => {
        if (item.tableData && item.tableData.length > 0) {
          item.tableData.map(val => {
            val.company = val.isMasterAr ? val.companyName : val.custToName // 子节点受让公司对手公司处理
          })
        }
      })
      // 父节点处理
      response.data[that.dataStr].map(val => {
        val.company = val.companyName// 父节点受让公司对手公司处理
      })
    }
    result = response
    ele.loading = false // 关闭加载动画
    return Promise.resolve(result)
  }).catch(err => {
    ele.loading = false // 关闭加载动画
    console.log(err)
  })
}
</script>
