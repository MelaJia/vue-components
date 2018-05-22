<template>
  <div>
    <header>
    </header>
    <main>
      <div class="main-section" :style="'height:'+height+'px'">
        <div class="left" width="200px" style="background-color:#bc3335">
          <div class="top">
          </div>
          <nav-t :nav-items="navItems"></nav-t>
        </div>
        <div class="right" style="background-color:rgb(242,242,242)">
          <header style="background-color:rgb(242,242,242);padding-top:10px">
            <header-section></header-section>

          </header>
          <tags ref="nav" class="nav"></tags>
          <main :style="'overflow: auto;background-color:rgb(242,242,242);'+'height:'+(height-120)+'px'">
            <router-view></router-view>
          </main>
        </div>

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
      </div>
    </main>
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
import ComponentsInit from '@/mixins/Ar/ComponentsInit'
import Tags from './tags'
export default {
  mixins: [ComponentsInit],
  data () {
    return {
      height: '900',
      navItems: [{
        idx: '1',
        text: '业务处理',
        disabled: false,
        lClass: 'start-line',
        hClass: 'header-circle bg-icon-1',
        childrens: [{
          idx: 'loan',
          text: '放款处理',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        },
        {
          idx: 'loanreject',
          text: '拒绝放款查询',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        }, {
          idx: 'loaned',
          text: '已放款查询',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        },
        {
          idx: 'loanfinish',
          text: '已完结查询',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        }
        ]
      },
      {
        idx: '2',
        text: '客户资料',
        disabled: false,
        lClass: 'line',
        hClass: 'header-circle bg-icon-2'
      },
      {
        idx: 'cstLoanFee',
        text: '客户利率维护',
        disabled: false,
        lClass: 'line',
        hClass: 'header-circle bg-icon-2'
      },
      {
        idx: '4',
        text: '账户管理',
        disabled: false,
        lClass: 'end-line',
        hClass: 'header-circle bg-icon-3',
        childrens: [{
          idx: 'lolanuserinfo',
          text: '基本信息',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        },
        {
          idx: '4-2',
          text: '银行卡管理',
          disabled: false,
          lClass: 'line',
          hClass: 'circle'
        }, {
          idx: '4-3',
          text: '密码修改',
          disabled: false,
          lClass: 'end-line',
          hClass: 'circle'
        }
        ]
      }
      ]
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
