<template>
  <el-dialog :custom-class="'dia-class style-dia-custlist'" :visible.sync="visibleP" :before-close="handleClose" center="">
    <section>
      <article>
        <header class="repay-header">发票列表</header>
        <div class="list">
          <ul>
            <li v-for="(item,index) in detailsP.invoiceDetail" :key="index">
              <a :href="item.fileDownloadUrl" target="_blank">{{item.invoiceNo}}</a>
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
import Common from '@/mixins/common/common'
/* 我的Ar详情 */
export default {
  props: ['visibleP', 'detailsP'],
  mixins: [DialogClose, Common],
  data () {
    return {
    }
  }
}
</script>
