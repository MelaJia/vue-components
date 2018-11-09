<template>

  <el-dialog custom-class="dia-class" :visible.sync="visibleP" :before-close="handleClose" center="">
    <header slot="title">
              <span class="title">
                自有转让
              </span>
            </header>
            <section>
              <article>
                <ul>
                  <el-tooltip :content="'付款单位:'+detailsP.arInvoiceList[0].companyName" placement="bottom" effect="light">
                    <span>付款单位: <em>{{detailsP.arInvoiceList[0].companyName}}</em></span>
                  </el-tooltip>
                </ul>
                <ul>
                  <li class="wd-3">
                    <span>币别: <em>{{detailsP.arInvoiceList[0].currencyDesc}}</em></span>
                  </li>
                  <li class="wd-3">
                    <span>单位: <em>{{detailsP.arInvoiceList[0].arStatusTypeName}}</em></span>
                  </li>
                  <li class="wd-3">
                    <span>待转让金额: <em>{{detailsP.transAmt}}</em></span>
                  </li>
                </ul>
              </article>
              <article>
                <el-table ref="tableTrans" :data="detailsP.arInvoiceList" border @selection-change="handleTransSelectionChange"
                  @select="select" style="width: 100%">
                  <el-table-column type="selection" width="40">
                  </el-table-column>
                  <el-table-column align="center" prop="masterChainId" :formatter="nullDealWith" label="AR单号" width="100">
                  </el-table-column>
                  <el-table-column align="center" prop="billPayDate" :formatter="dateFormat" label="预计回款日期" width="110">
                  </el-table-column>
                  <el-table-column align="center" prop="invoiceNo" :formatter="nullDealWith" label="发票号" width="100">
                  </el-table-column>
                  <el-table-column align="right" header-align="center" prop="afterTaxAmt" :formatter="regexNum" label="发票票面金额"
                    width="180">
                  </el-table-column>
                  <el-table-column align="right" header-align="center" prop="availableAfterTaxAmt" :formatter="regexNum"
                    label="发票可用金额">
                  </el-table-column>
                  <el-table-column align="center" label="转让金额">
                    <template slot-scope="scope">
                      <el-jx-input :autofocus="true" ref="inputedit" v-model='scope.row.transferAfterTaxAmt' placeholder=''
                        :disabled="scope.row.disabled" @blur="blurIsClear(scope.row)" @input.native="handleInput('availableAfterTaxAmt',scope.row,$event,multipleSelectionTrans)"
                        >
                      </el-jx-input>
                    </template>
                  </el-table-column>
                </el-table>
              </article>
              <article>
                <el-form class="layout form text-align-left" label-width="100px">
                  <el-row>
                    <el-col :span="9"></el-col>
                    <el-form-item label="转让总金额:">
                      <span>{{displaySumAmtTrans}}</span>
                    </el-form-item>
                  </el-row>
                  <el-row>
                      <el-col :span="9" class="flex">
                          <el-form-item label="授让公司Id:" prop="receiveCustId">
                            <el-input v-model.trim="receiveCustId" placeholder="请输入授让公司Id"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="9" class="flex">
                          <el-form-item label="授让公司名:">
                            {{this.rc.name}}
                          </el-form-item>
                        </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="18" class="flex">
                      <el-form-item label="备注:">
                        <el-input type="textarea" v-model.trim="remark" :maxlength="255" :autosize="{ minRows: 3, maxRows: 6}"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                      <el-checkbox-group v-model="agreeCheckList">
                          <el-checkbox label="agree1">我确认本次债券可以被转让</el-checkbox>
                          <el-checkbox label="agree2">我确认本次债券真实有效无任何纠纷</el-checkbox>
                      </el-checkbox-group>
                  </el-row>
                </el-form>
              </article>
            </section>
            <footer class="no-print" slot="footer" :style="'clear:both'">
              <el-button type="primary" @click="transSub(1,detailsP,multipleSelectionTrans)">确认</el-button>
            </footer>
  </el-dialog>
</template>
<style scoped lang="scss">
@import "@/assets/css/_dialog.scss";
.layout.form {
  margin-top: 20px;
  padding-left: 10px;
}
.sum-content {
  height: 40px;
  line-height: 40px;
  padding-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import Common from '@/mixins/common'
import DialogTrans from '@/mixins/suplier/arApi/dialogTrans'
import { debounce, thousandth } from '@/util/util' // 防抖函数
import Input from '@/components/Items/inputNumber'
/* 转让弹窗 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common, DialogTrans],
  components: {
    'el-jx-input': Input
  },
  data () {
    return {
      multipleSelectionTrans: [], // 已选项
      displaySumAmtTrans: '0.00', // 已选总金额
      receiveCustId: '', // 授让公司id
      rc: {
        name: '', // 授让公司名称
        status: false // 是否正确
      },
      remark: '', // 备注
      agreeCheckList: [] // 同意协议勾选
    }
  },
  watch: {
    receiveCustId: debounce(function (val) {
      if (val.length > 0) {
        this.axios.post('/commonCust/queryCustomer.do', { 'custId': val, 'companyName': '' }).then(res => {
          if (res.data.status) {
            this.rc.name = res.data.data.companyName
            this.rc.status = true
          } else {
            this.rc.name = '授让公司不存在'
            this.rc.status = false
          }
        })
      }
    }, 1000)
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '转让'
    }
  },
  methods: {
    // 转让选择
    handleTransSelectionChange: handleTransSelectionChange,
    // 转让确认
    transSub: debounce(transSub, 1000, true),
    // 转让表中勾选事件
    select: select,
    blurIsClear: blurIsClear,
    init: Init
  }
}

function Init () {
  this.agreeCheckList = []
  this.rc = {
    name: '', // 授让公司名称
    status: false // 是否正确
  }
  this.receiveCustId = ''
  this.remark = ''
}
// 转让中选中项改变事件
function handleTransSelectionChange (val) {
  this.multipleSelectionTrans = val
}
// 转让确认
function transSub (type, originData, selection) {
  // 1.判断是否填写正确授让公司
  if (!this.rc.status) {
    this.$message({
      type: 'error',
      message: '请填写正确授让公司id'
    })
    return
  }
  // 判断是否同意协议
  if (this.agreeCheckList.length !== 2) {
    this.$message({
      type: 'error',
      message: '有未勾选确认项'
    })
    return
  }
  // 2.将要发送的数据
  var data = {
    arInvoiceList: selection,
    transAmt: originData.transAmt,
    custToId: this.receiveCustId,
    custToName: this.rc.name,
    remark: this.remark
  }
  let url = '/multiArTransferManager/multiInitiateTransferOwn.do'
  this.post(url, data, true).then(res => {
    // 操作成功 关闭弹窗
    if (res.data.status) {
      // 关闭弹窗
      this.handleClose()
      // 刷新数据
      this.$parent.fresh()
    }
  }).catch((err) => {
    // 错误提示
    console.log(err)
  })
}
function select (selection, row) {
  if (isSelect(selection, row)) {
    row.transferAfterTaxAmt = row.availableAfterTaxAmt
    row.disabled = false
  } else {
    row.transferAfterTaxAmt = ''
    row.disabled = true
  }
  // 赋值总金额
  this.displaySumAmtTrans = thousandth(getSum(selection, 'transferAfterTaxAmt'))
}
// 当前点击是否为勾选
function isSelect (selection, row) {
  for (var index = 0; index < selection.length; index++) {
    var element = selection[index]
    if (element === row) {
      return true
    }
  }
  return false
}
// blurIsClear
function blurIsClear (row) {
  if (Number(row.transferAfterTaxAmt) === 0) {
    this.$refs.tableTrans.toggleRowSelection(row, false)
    row.transferAfterTaxAmt = ''
    row.disabled = true
    return false
  }
}
function getSum (val, tag) {
  // 遍历选择项
  // 2.计算勾选发票金额
  var sum = val.reduce(function (sum, currVal) {
    var num = Number(currVal[tag])
    if (isNaN(num)) {
      return
    }
    return sum + num * 100
  }, 0) / 100
  // val.forEach(function (item) {
  //   amount += Number(item[tag]) * 100 // 金额累加
  // })
  // amount = amount / 100
  console.log(sum)
  return sum // 返回
}

</script>
