import { thousandth } from '@/util/util' // 防抖函数
export default {
  methods: {
    // 输入金额框
    handleInput: handleInput
  }
}
// 转让金额输入框事件
// type 可用金额
function handleInput (type, row, e, selection) {
  if (row[type] < Number(e.target.value)) {
    this.$alert('转让金额不得大于可用金额', '警告', {
      confirmButtonText: '确定',
      callback: (action) => {
        if (type === 'availableAfterTaxAmt') {
          row.transferAfterTaxAmt = row.availableAfterTaxAmt
          setSumAmt.call(this, type, selection)
        } else if (type === 'loanAmt') {
          row.arTransferAmt = row.loanAmt
          setSumAmt.call(this, type, selection)
        }
      }
    })
  }
  setSumAmt.call(this, type, selection)
}
function setSumAmt (type, selection) {
  var typrTag = type === 'availableAfterTaxAmt' ? 'transferAfterTaxAmt' : 'arTransferAmt'
  this.displaySumAmtTrans = thousandth(getSum(selection, typrTag))
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
