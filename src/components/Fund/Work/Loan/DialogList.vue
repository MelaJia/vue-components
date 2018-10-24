<template>
  <el-dialog :custom-class="'dia-class style-dia-custlist'" :visible.sync="visibleP" :before-close="handleClose" center="">
    <section>
      <article>
        <header class="repay-header">发票列表</header>
        <div class="list">
          <ul>
            <li v-for="(item,index) in detailsP.InvoiceDetail" :key="index">
              <a :href="item.FileDownloadUrl" target="_blank">item.InvoiceNo</a>
            </li>
          </ul>
        </div>
      </article>
    </section>
    <footer class="no-print" slot="footer" :style="'clear:both'">
      <el-button type="primary" @click="handleClose">关闭</el-button>
    </footer>
  </el-dialog>
</template>
<style>
.style-dia-custlist {
  width: 850px;
}
</style>

<script>
import DialogClose from '@/mixins/suplier/Ar/DialogClose'
import { thousandth } from '@/util/util' // 发送数据函数
import Common from '@/mixins/common'
/* 我的Ar详情 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
    }
  },
  computed: {
    getTitle () {
      return this.detailsP.masterChainId + '详情'
    }
  },
  methods: {
    getSummaries: getSummaries
  }
}
function getSummaries (param) {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    if (index === 1 || index === 4) {
      sums[index] = ''
      return
    }
    const values = data.map(item => Number(item[column.property]))
    if (!values.every(value => isNaN(value))) {
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      sums[index] = thousandth(sums[index])
    } else {
      sums[index] = ''
    }
  })
  return sums
}
</script>
