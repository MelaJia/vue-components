<template>
  <div>
    <section>
    <el-table :data="dataTable" v-loading="dataLoading"  element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)" border  :summary-method="sumHandle([5,6])" sum-text="本页合计" style="width: 100%" :row-class-name="tableRowClassName"
      @expand-change="expendhandle" @mousedown.native="mouseDown">
      <el-table-column align="center" fixed type="index" label="序号" width="60">
      </el-table-column>
      <el-table-column align="center" fixed sortable label="上传日期" prop="uploadDate" :formatter="dateFormat" width="130">
      </el-table-column>
      <el-table-column align="center" label="平台账款编号 " prop="billNO">
      </el-table-column>
      <el-table-column align="center" label="债权人所在区域" prop="creditorsDistrict">
      </el-table-column>
      <el-table-column align="center" label="债务人所在区域 " prop="debtorDistrict">
      </el-table-column>
      <el-table-column align="center" label="账款金额(万元)" prop="amount">
      </el-table-column>
      <el-table-column align="center" label="币种" prop="currency" >
      </el-table-column>
    </el-table>
  </section>
  </div>
</template>

<script>
import ListMinxIn from '@/mixins/suplier/Ar/Table'
import Common from '@/mixins/common' // getLoanDetail 刷新数据fresh函数
export default {
  name: 'loan', // 放款列表页面
  props: ['dataLoading', 'dataTable'],
  data () {
    return {
    }
  },
  mixins: [ListMinxIn, Common],
  methods: {
  }
}
</script>
<style lang="scss">
.demo-table-expand label {
  width: 100px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
/* 更多菜单样式 */
.el-dropdown {
  margin-left: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #033c81;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu.el-popper {
  li:not(:first-of-type) {
    margin-top: 10px;
  }
  .full-width {
    width: 100%;
  }
}
</style>
