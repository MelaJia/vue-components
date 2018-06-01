<template>
<article>
    <section>
        <header>myar数据</header>
        <el-card>
            {{tableData5}}
        </el-card>
    </section>
    <section>
        <header>nav数据</header>
        <el-card>
            {{navItems}}
        </el-card>
    </section>
</article>
</template>
<script>
import mixTabel from '../mixins/suplier/Ar/DataInit'
export default {
  mixins: [mixTabel]
}
</script>
