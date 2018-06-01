<template>
    <section>
        <dialog-info :visible-p.sync="dialogInfoVisible" :details-p="details"></dialog-info>
        <el-table
        :data="tableData5"
        show-summary
        border
        sum-text="本页合计"
        style="width: 100%"
        :row-class-name="tableRowClassName" @expand-change="expendhandle">
        <el-table-column align="center"
        fixed
        type="index"
        label="序号"
        >
        </el-table-column>
        <el-table-column align="center"
        fixed
        label="AR单号"
        prop="masterChainId"
        sortable
        min-width="130">
        </el-table-column>
        <el-table-column align="center"
        label="付款单位"
        prop="come"
        >
        </el-table-column>
        <el-table-column align="center"
        label="授让单位"
        prop="custFromName"
        >
        </el-table-column>
        <el-table-column align="center"
        label="交易流水号"
        sortable
        min-width="120"
        prop="transSerialNo"
        >
        </el-table-column>
        <el-table-column align="center"
        label="状态"
        prop="arStatusTypeName"
        >
        </el-table-column>
        <el-table-column align="center"
        label="币别"
        prop="currencyDesc"
        >
        </el-table-column>
        <el-table-column align="center"
        label="票面金额"
        prop="transAmt"
        >
        </el-table-column><el-table-column align="center"
        label="转让日期"
        sortable
        prop="transDate"
        :formatter="dateFormat"
        min-width="120">
        </el-table-column>
        <el-table-column align="center"
        label="预计回款日期"
        prop="billPayDate"
        :formatter="dateFormat"
        min-width="120"
        >
        </el-table-column>
        <el-table-column align="center"
        fixed="right"
        label="操作"
        width='230px'
        >
        <template slot-scope="scope" >
            <el-button
            size="mini"
            type="primary"
            @click="handleInfo(scope.$index, scope.row)">详情</el-button>
            <el-button
            size="mini"
            type="primary"
            @click="handleCancle(scope.$index, scope.row)">取消授让</el-button>
        </template>
        </el-table-column>
    </el-table>
    </section>
</template>

<script>
import ListMinxIn from '@/mixins/suplier/Ar/List'
import Common from '@/mixins/common'
import Dialog from '@/mixins/suplier/Ar/Dialog'
export default {
  mixins: [Common, ListMinxIn, Dialog],
  components: {
    'dialog-info': () =>
      import(/* webpackChunkName: 'Dialog' */ '@/components/suplier/Ar/DialogInfoCancelTrans')
  },
  data () {
    return {
      /* eslint-disable */
      tableData5: [
        {
          "arStatusTypeName": "已授让",
          "billId": null,
          "billPayDate": 1514563200000,
          "checkedStatus": 3,
          "companyName": "鴻富泰精密電子(煙台)有限公司",
          "currencyDesc": "人民币",
          "custFromName": "管理员",
          "custToName": "管理员1",
          "masterChainId": "AR20171127000005",
          "transAmt": 584,
          "transDate": 1511750072000,
          "transSerialNo": "de54af16-38dd-44f2-a228-1e53ba3f6dcf"
        },
        {
          "arStatusTypeName": "已授让",
          "billId": null,
          "billPayDate": 1514131200000,
          "checkedStatus": 3,
          "companyName": "custN004",
          "currencyDesc": "人民币",
          "custFromName": "管理员",
          "custToName": "管理员1",
          "masterChainId": "AR20171127000004",
          "transAmt": 2,
          "transDate": 1511747951000,
          "transSerialNo": "ee95e528-5346-4ab2-8bbe-c9ccaf46dc3c"
        },
        {
          "arStatusTypeName": "已授让",
          "billId": null,
          "billPayDate": 1512489600000,
          "checkedStatus": 3,
          "companyName": "鴻富泰精密電子(煙台)有限公司",
          "currencyDesc": "人民币",
          "custFromName": "管理员",
          "custToName": "管理员1",
          "masterChainId": "AR20171127000003",
          "transAmt": 8,
          "transDate": 1511747434000,
          "transSerialNo": "1fc1e9ce-40d8-445e-a88d-04937e39d924"
        },
        {
          "arStatusTypeName": "已授让",
          "billId": null,
          "billPayDate": 1514563200000,
          "checkedStatus": 3,
          "companyName": "鴻富泰精密電子(煙台)有限公司",
          "currencyDesc": "人民币",
          "custFromName": "管理员",
          "custToName": "管理员1",
          "masterChainId": "AR20171127000002",
          "transAmt": 1,
          "transDate": 1511745588000,
          "transSerialNo": "f164f92b-443a-4775-a167-708f4ec02360"
        },
        {
          "arStatusTypeName": "已授让",
          "billId": null,
          "billPayDate": 1514563200000,
          "checkedStatus": 3,
          "companyName": "鴻富泰精密電子(煙台)有限公司",
          "currencyDesc": "人民币",
          "custFromName": "管理员",
          "custToName": "管理员1",
          "masterChainId": "AR20171127000001",
          "transAmt": 2,
          "transDate": 1511745481000,
          "transSerialNo": "dcb6f6f7-29bc-4126-b47c-8dc8e92a069a"
        },
        {
          "arStatusTypeName": "已授让",
          "billId": null,
          "billPayDate": 1514563200000,
          "checkedStatus": 3,
          "companyName": "鴻富泰精密電子(煙台)有限公司",
          "currencyDesc": "人民币",
          "custFromName": "管理员",
          "custToName": "管理员1",
          "masterChainId": "AR20171125000011",
          "transAmt": 1,
          "transDate": 1511602121000,
          "transSerialNo": "ce907e87-370c-4728-bf81-ac8c2c300072"
        },
        {
          "arStatusTypeName": "已授让",
          "billId": null,
          "billPayDate": 1514563200000,
          "checkedStatus": 3,
          "companyName": "鴻富泰精密電子(煙台)有限公司",
          "currencyDesc": "人民币",
          "custFromName": "管理员",
          "custToName": "管理员1",
          "masterChainId": "AR20171125000010",
          "transAmt": 50,
          "transDate": 1511601795000,
          "transSerialNo": "2d9bd597-50cb-4964-aeac-2a058f1689c3"
        },
        {
          "arStatusTypeName": "已授让",
          "billId": null,
          "billPayDate": 1514563200000,
          "checkedStatus": 3,
          "companyName": "鴻富泰精密電子(煙台)有限公司",
          "currencyDesc": "人民币",
          "custFromName": "管理员",
          "custToName": "管理员1",
          "masterChainId": "AR20171125000009",
          "transAmt": 1,
          "transDate": 1511601569000,
          "transSerialNo": "6ebd057a-f750-4664-a2fa-9695d7ac95f1"
        },
        {
          "arStatusTypeName": "已授让",
          "billId": null,
          "billPayDate": 1514563200000,
          "checkedStatus": 3,
          "companyName": "鴻富泰精密電子(煙台)有限公司",
          "currencyDesc": "人民币",
          "custFromName": "管理员",
          "custToName": "管理员1",
          "masterChainId": "AR20171125000001",
          "transAmt": 1,
          "transDate": 1511588576000,
          "transSerialNo": "9dc74a91-5291-4ad9-9669-e5922bd05644"
        },
        {
          "arStatusTypeName": "已授让",
          "billId": null,
          "billPayDate": 1514563200000,
          "checkedStatus": 3,
          "companyName": "鴻富泰精密電子(煙台)有限公司",
          "currencyDesc": "人民币",
          "custFromName": "管理员",
          "custToName": "管理员1",
          "masterChainId": "AR20171124000797",
          "transAmt": 1,
          "transDate": 1511516399000,
          "transSerialNo": "3f164d3c-2ead-4f35-9f2f-69497703981f"
        }
      ]
    }
  },
  methods:{
    handleCancle (idx, val) {
      this.$confirm(`单号为${val.masterChainId}的确认取消其授让?`, `${val.masterChainId}取消授让`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.cancelBase('/transferedAr/cancelTranfered.do', val.masterChainId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        })
      })
    }
  }
}
</script>
<style>
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
