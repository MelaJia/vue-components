<template>
  <div>
    <header>
    </header>
    <el-container>
      <el-header height="auto">
        <header>
          <header-section></header-section>

        </header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <nav-t :nav-items="navItems"></nav-t>
        </el-aside>
        <el-main>
          <tags ref="nav" class="nav"></tags>
          <main :style="'overflow: auto;background-color:#fff;'+'height:'+(height-120)+'px'">
            <router-view></router-view>
          </main>
        </el-main>
      </el-container>
    </el-container>
    <footer>
      <!-- <div class="jt">
            <span>导航</span>
        </div> -->
    </footer>
  </div>
</template>
<style lang="scss">
@import "../assets/css/common";
</style>

<script>
import Nav from './Nav'
import ComponentsInit from '@/mixins/ComponentsInit'
import Tags from './tags'
export default {
  name: 'admin',
  mixins: [ComponentsInit],
  data () {
    return {
      height: '900'
    }
  },
  components: {
    'nav-t': Nav,
    Tags
  },
  created () {
    var winHeight = 0
    if (window.innerHeight) {
      winHeight = window.innerHeight
    } else if ((document.body) && (document.body.clientHeight)) {
      winHeight = document.body.clientHeight
    }
    this.height = winHeight
    window.onresize = () => {
      this.height = document.body.clientHeight
    }
  }
}

</script>
