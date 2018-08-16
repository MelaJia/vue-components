<template>
  <div class="ar-table">
    <!-- 详情 -->
    <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
    <section>
      <el-table :data="dataTable" v-loading="dataLoading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" :summary-method="sumHandle([7,8])" border style="width: 100%" :row-class-name="tableRowClassName"
        @expand-change="expendhandle" @header-dragend="widthHandle" @mousedown.native="mouseDown">
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
              <el-table-column align="center" prop="transUnitName" :width="widthArr.transUnitName">
              </el-table-column>
              <el-table-column align="center" prop="arStatusTypeName" :width="widthArr.arStatusTypeName">
              </el-table-column>
              <el-table-column align="center" prop="currencyDesc" :width="widthArr.currencyDesc">
              </el-table-column>
              <el-table-column align="right" prop="availableAmt" :formatter="regexNum" :width="widthArr.availableAmt">
              </el-table-column>
              <el-table-column align="right" prop="admissionAmt" :formatter="regexNum" :width="widthArr.admissionAmt">
              </el-table-column>
              <el-table-column align="right" prop="payPrincipalAmt" :formatter="regexNum" :width="widthArr.payPrincipalAmt">
              </el-table-column>
              <el-table-column align="right" prop="payInterestAmt" :formatter="regexNum" :width="widthArr.payInterestAmt">
              </el-table-column>
              <el-table-column align="right" prop="payServiceAmt" :formatter="regexNum" :width="widthArr.payServiceAmt">
              </el-table-column>
              <el-table-column align="right" prop="payFineAmt" :formatter="regexNum" :width="widthArr.payFineAmt">
              </el-table-column>
              <el-table-column align="right" prop="payFineDays" :width="widthArr.payFineDays">
              </el-table-column>
              <el-table-column align="right" prop="prepayServiceAmt" :formatter="regexNum" :width="widthArr.prepayServiceAmt">
              </el-table-column>
              <el-table-column align="center" prop="billPayDate" :formatter="dateFormat" :width="widthArr.billPayDate">
              </el-table-column>
              <el-table-column align="center" prop="actualRepayDate" :formatter="dateFormat" :width="widthArr.actualRepayDate">
              </el-table-column>
              <el-table-column align="center" width='200px'>
                <template slot-scope="scope">
                  <!-- <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" fixed width="40">
        </el-table-column>
        <el-table-column align="center" label="AR单号" fixed sortable prop="masterChainId" width="150">
        </el-table-column>
        <el-table-column align="center" label="结报单号" prop="billId" width="150">
        </el-table-column>
        <el-table-column align="center" label="AR来源" prop="isMasterAr" :formatter="originFormat">
        </el-table-column>
        <el-table-column align="center" label="付款单位/对手单位" prop="transUnitName" width="150">
        </el-table-column>
        <el-table-column align="center" label="状态" prop="arStatusTypeName">
        </el-table-column>
        <el-table-column align="center" label="币别" prop="currencyDesc">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="可用金额" prop="availableAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="入账金额" prop="admissionAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款本金" prop="payPrincipalAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款利息" prop="payInterestAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="服务费" prop="payServiceAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="还款罚息" prop="payFineAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="罚息天数" prop="payFineDays">
        </el-table-column>
        <el-table-column align="right" header-align="center" label="提前还款手续费" prop="prepayServiceAmt" :formatter="regexNum">
        </el-table-column>
        <el-table-column align="center" label="预计回款日期" prop="billPayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="还款日期" prop="actualRepayDate" :formatter="dateFormat" width="120">
        </el-table-column>
        <el-table-column align="center" label="操作" width='200px' class-name="">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>

</template>

<script>
import TableMixIn from '@/mixins/suplier/Ar/Table' // handleInfo
import Common from '@/mixins/common'
/* 历史Ar列表 */
export default {
  props: ['dataLoading', 'dataTable'],
  mixins: [Common, TableMixIn],
  data () {
    let widthArr = {
      availableAmt: '', // 可用金额
      admissionAmt: '', // 入账金额
      payPrincipalAmt: '', // 还款本金
      payInterestAmt: '', // 还款利息
      payServiceAmt: '', // 还款手续费
      payFineAmt: '', // 还款罚息
      payFineDays: '', // 罚息天数
      prepayServiceAmt: '', // 提前还款手续费
      billPayDate: '120', // 预计回款日期
      actualRepayDate: '120' // 还款日期

    }
    Object.assign(widthArr, this.widthArr)
    return {
      dialogInfoVisible: false,
      details: {}, // 详情数据
      widthArr: widthArr
    }
  },
  components: {
    'dialog-info': () => import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/history/DialogInfo')
  },
  methods: {}
}

</script>
