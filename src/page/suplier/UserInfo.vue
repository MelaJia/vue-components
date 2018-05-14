<template>
  <div class="user-info" style="padding: 0px 10px;">
    <info-list></info-list>
    <info-table></info-table>
  </div>
</template>
<script>
import InfoList from '@/components/suplier/userInfo/InfoList'
import InfoTable from '@/components/suplier/userInfo/InfoTable'
export default {
  components: {
    InfoList,
    InfoTable
  }
}
</script>
<style>
  .user-info>div~div{
    margin-top: 20px;
  }
</style>
