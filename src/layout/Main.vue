<template>
  <div>
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
          <main :style="'overflow: auto;background-color:rgb(242,242,242);'+'height:'+(height-120)+'px'">
            <router-view></router-view>
          </main>
        </el-main>
      </el-container>
    </el-container>

    <!-- <header>
    </header>
    <main>
      <div class="main-section" :style="'height:'+height+'px'">
        <div class="left" width="200px" style="background-color:#bc3335">
        </div>
        <div class="right" style="background-color:rgb(242,242,242)">
        </div> -->

    <!-- <el-row >
                <el-col :span="4">
                    <div class="top">
                    </div>
                    <nav-t></nav-t>
                </el-col>
                <el-col :span="20" :style="'background-color:rgb(242,242,242)'">
                    <router-view></router-view>
                </el-col>
            </el-row> -->
    <!-- </div>
    </main> -->
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
import mixinData from '@/mixins/suplier/Ar/DataInit'
import Tags from './tags'
export default {
  mixins: [ComponentsInit, mixinData],
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
