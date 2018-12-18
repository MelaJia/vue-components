<template>
  <div class="main">
    <div class="body">
      <el-card class="box-card text-align-center">
        <div slot="header" class="clearfix">
          <span style="background:#4396F6;height:40px;color:#fff;line-height:40px;padding:0 20px;border-radius:0 20px 20px 0;">待办事项单据</span>
          <span style="margin-left:20px;">总共有<span style="color:#C4141E;margin:0 2px;">{{getTotal}}</span>条单据待处理，请及时处理</span>
        </div>
        <div class="item">
          <p class="listTitle">AR业务</p>
          <ul>
            <li><span><img src="@/assets/img/img/PCindex22_08.png">待合同签署</span><a href="javascript:;">{{aRWaitSignList}}笔<i v-if="aRWaitSignList > 0"></i></a></li>
            <li><span><img src="@/assets/img/img/PCindex22_08.png">待还款</span><a href="javascript:;">{{aRWaitRepayList}}笔<i v-if="aRWaitRepayList > 0"></i></a></li>
            <li><span><img src="@/assets/img/img/PCindex22_08.png">待接收</span><a href="javascript:;">{{aRWaitReceiveList}}笔<i v-if="aRWaitReceiveList > 0"></i></a></li>
          </ul>
        </div>
        <div class="item float">
          <p class="listTitle">信用融资业务</p>
          <ul>
            <li><span><img src="@/assets/img/img/PCindex22_08.png">待合同签署</span><a href="javascript:;">{{creditSignList}}笔<i v-if="creditSignList > 0"></i></a></li>
            <li><span><img src="@/assets/img/img/PCindex22_08.png">待还款</span><a href="javascript:;">{{creditRepayList}}笔<i v-if="creditRepayList > 0"></i></a></li>
          </ul>
        </div>
        <div class="item float">
          <p class="listTitle">订单融资业务</p>
          <ul>
            <li><span><img src="@/assets/img/img/PCindex22_08.png">待合同签署</span><a href="javascript:;">{{orderSignList}}笔<i v-if="orderSignList > 0"></i></a></li>
            <li><span><img src="@/assets/img/img/PCindex22_08.png">待还款</span><a href="javascript:;">{{orderRepayList}}笔<i v-if="orderRepayList > 0"></i></a></li>
          </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style scope>
.body .el-card__header{
  padding:8px 0;
}
.body .el-card__body{
  padding:0 20px;
}
.item .listTitle{
  text-align:left;
  border-bottom:1px dashed #ACACAC;
  padding-bottom:4px;
}
.item ul{
  padding-left:0;
}
.item ul li{
  display:flex;
  margin-bottom:6px;
  justify-content: space-between;
}
.item ul li img{
  width:20px;
  height:20px;
  vertical-align:middle;
  margin-right:6px;
}
.item.float ul{
  display:flex;
  justify-content: space-between;
}
.item.float ul li{
  display:flex;
  flex:1;
  justify-content: space-between;
}
.item.float ul li a{
  margin-right: 10px;
}
.item ul li a{
  position: relative;
}
.item ul li a i{
  position:absolute;
  top:0;
  right:0;
  width:6px;
  height:6px;
  background:#C4141E;
  border-radius:50%;
}
</style>

<script>

export default {
  data () {
    return {
      aRWaitSignList: 0, // AR业务待合同签署笔数
      aRWaitRepayList: 0, // AR业务待还款笔数
      aRWaitReceiveList: 0, // AR业务待接收笔数
      creditSignList: 0, // 信用融资业务待合同签署
      creditRepayList: 0, // 信用融资业务待还款
      orderSignList: 0, // 订单融资业务待合同签署
      orderRepayList: 0 // 订单融资业务待还款
    }
  },
  mounted () {
    this.getArSignTotal() // AR业务待合同签署笔数
    this.getArRepayTotal() // AR业务待还款笔数
    this.getArReceiveTotal() // AR业务待接收笔数
    this.getCreditSignTotal() // 信用融资业务待合同签署
    this.getCreditRepayTotal() // 信用融资业务待还款
    this.getOrderSignTotal() // 订单融资业务待合同签署
    this.getOrderRepayTotal() // 订单融资业务待还款
  },
  computed: {
    // 获取总条数
    getTotal () {
      return this.aRWaitSignList + this.aRWaitRepayList + this.aRWaitReceiveList + this.creditSignList + this.creditRepayList + this.orderSignList + this.orderRepayList
    }
  },
  methods: {
    // AR业务待合同签署笔数获取
    getArSignTotal () {
      this.axios.post('/multiArInFinancingManager/getInFinancingListTable.do', {
        iDisplayStart: 0,
        iDisplayLength: 10,
        checkedStatus: 23
      }).then(res => {
        if (res.status) {
          this.aRWaitSignList = res.data.recordsTotal
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // AR业务待还款笔数
    getArRepayTotal () {
      this.axios.post('/multiArOnRepaymentManager/getOnRepaymentArListTable.do', {
        iDisplayStart: 0,
        iDisplayLength: 10,
        checkedStatus: 26
      }).then(res => {
        if (res.status) {
          this.aRWaitRepayList = res.data.recordsTotal
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // AR业务待接收笔数
    getArReceiveTotal () {
      this.axios.post('/multiArTransferManager/getOnReceivingArListTable.do', {
        iDisplayStart: 0,
        iDisplayLength: 10,
        checkedStatus: 3
      }).then(res => {
        if (res.status) {
          this.aRWaitReceiveList = res.data.recordsTotal
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 信用融资业务待合同签署
    getCreditSignTotal () {
      this.axios.post('/multiArInFinancingManager/getInFinancingListTable.do', {
        iDisplayStart: 0,
        iDisplayLength: 10,
        checkedStatus: 3
      }).then(res => {
        if (res.status) {
          this.creditSignList = res.data.recordsTotal
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 信用融资业务待还款
    getCreditRepayTotal () {
      this.axios.post('/multiArInFinancingManager/getInFinancingListTable.do', {
        iDisplayStart: 0,
        iDisplayLength: 10,
        checkedStatus: 3
      }).then(res => {
        if (res.status) {
          this.creditRepayList = res.data.recordsTotal
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 订单融资业务待合同签署
    getOrderSignTotal () {
      this.axios.post('/multiArInFinancingManager/getInFinancingListTable.do', {
        iDisplayStart: 0,
        iDisplayLength: 10,
        checkedStatus: 3
      }).then(res => {
        if (res.status) {
          this.orderSignList = res.data.recordsTotal
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 订单融资业务待还款
    getOrderRepayTotal () {
      this.axios.post('/multiArInFinancingManager/getInFinancingListTable.do', {
        iDisplayStart: 0,
        iDisplayLength: 10,
        checkedStatus: 3
      }).then(res => {
        if (res.status) {
          this.orderRepayList = res.data.recordsTotal
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

</script>
