<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details" ></dialog-info>
    <section>
      <el-table :data="dataTable" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"  :summary-method="sumHandle([7,8])" border style="width: 100%"
        :row-class-name="tableRowClassName" @expand-change="expendhandle" @header-dragend="widthHandle">
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-table :data="props.row.tableData" border style="width: 100%" :show-header="false" :row-class-name="getPendedColor">
              <el-table-column width="48">

              </el-table-column>
              <el-table-column align="center" width="40">
              </el-table-column>
              <el-table-column align="center" prop="masterChainId" :width="widthArr.masterChainId">
              </el-table-column>
              <el-table-column align="center" prop="billId" :width="widthArr.billId">
              </el-table-column>
              <el-table-column align="center" prop="isMasterAr" :width="widthArr.isMasterAr" :formatter="originFormat">
                >
              </el-table-column>
              <el-table-column align="center" prop="company" :width="widthArr.company">
              </el-table-column>
              <el-table-column align="center" prop="arStatusTypeName" :width="widthArr.arStatusTypeName">
              </el-table-column>
              <el-table-column align="center" prop="currencyDesc" :width="widthArr.currencyDesc">
              </el-table-column>
              <el-table-column align="center" prop="billBookAmt" :width="widthArr.billBookAmt">
              </el-table-column>
              <el-table-column align="center" prop="loanAmt" :width="widthArr.loanAmt">
              </el-table-column>
              <el-table-column align="center" prop="billPayDate" :width="widthArr.billPayDate" :formatter="dateFormat">
              </el-table-column>
              <el-table-column align="center" width='200px'>
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)" :loading="scope.row.infoLoading">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" label="AR单号" fixed sortable prop="masterChainId" width="150">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="150">
        </el-table-column>
        <el-table-column align="center" label="AR来源" prop="isMasterAr" :formatter="originFormat">
        </el-table-column>
        <el-table-column align="center" label="付款单位/对手单位" prop="company" width="150">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="arStatusTypeName">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc">
        </el-table-column>
        <el-table-column align="center" label="票面金额" prop="billBookAmt">
        </el-table-column>
        <el-table-column align="center" label="可用余额" prop="loanAmt">
        </el-table-column>
        <el-table-column align="center" label="预计回款日期" prop="billPayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="操作" width='200px' class-name="">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)" :loading="scope.row.infoLoading">详情</el-button>
            </template>
        </el-table-column>
      </el-table>
    </section>
  </div>

</template>

<script>
import TableMixIn from '@/mixins/suplier/Ar/Table'
import Common from '@/mixins/common'
/* 历史Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [Common, TableMixIn],
  data () {
    return {
      dialogInfoVisible: false,
      details: {} // 详情数据
    }
  },
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogInfoMy')
  },
  methods: {
    getDetail (val) {
      return this.axios.post('/myAr/queryAr', { masterChainId: val.masterChainId }).then(res => {
        console.log('获取到数据')
        // 处理数据
        let details = this.handleInvoiceListFormat(res.data)
        details.masterChainId = val.masterChainId
        return details
      })
    },
    // 详情
    handleInfo (idx, val) {
      console.log(val)
      val.infoLoading = true
      this.getDetail(val).then(res => {
        console.log(res)
        this.details = res
        this.dialogInfoVisible = true
        val.infoLoading = false
      }).catch(err => {
        this.$alert(`网络错误${err}`, '系统提示', {
          confirmButtonText: '确定',
          callback: action => {
            val.infoLoading = false
          }
        })
      })
    },
    /* 发票已选未选分离 */
    handleInvoiceListFormat (oData) {
      const data = oData
      const list = []
      const listSelected = []
      data.invoiceCustomList.forEach(element => {
        if (element.invoiceIsSelected) {
          element.invoiceIsSelected = true
          listSelected.push(element)
        } else {
          list.push(element)
        }
      })
      data.invoiceList = list
      data.invoiceListSelected = listSelected
      return data
    }
  }
}

</script>
