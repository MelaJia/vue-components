import {getDataBase} from '@/util/util' // 发送数据函数

export default {
  data () {
    return {
      dialogConfirmVisible: false, // 控制确认窗
      dialogTransferVisible: false, // 控制转账窗
      dialogWithdrawVisible: false, // 控制提现窗
      dialogInfoVisible: false,
      multipleSelection: [], // 选择的数据
      details: {} // 详情
    }
  },
  methods: {
    // 详情
    handleInfo: handleInfo
  }
}
// 获取详情
function handleInfo (idx, val, interfaceTransSerial) {
  // 获取数据
  console.log(interfaceTransSerial)
  let param = {
    transSerialNo: val.transSerialNo,
    interfaceTransSerial: interfaceTransSerial
  }
  getDataBase.call(this, 'multiArTransferManager/multiArPayDetail.do', param, true).then(res => {
    if (res) {
      this.details = res
      this.dialogInfoVisible = true
    }
  })
}
