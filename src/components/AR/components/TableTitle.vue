<template>
  <div class="table-header"><i :class="titleIcon"></i><span>{{titleName}}</span></div>
</template>
<style scoped>
    .table-header{
        display: flex;
        align-items: center;
        border: 1px solid #ebeef5;
        box-sizing: border-box;
    }
    i{
        font-size: 30px;
    }
</style>
<script>
export default {
  props:['titleIcon','titleName']
}
</script>

