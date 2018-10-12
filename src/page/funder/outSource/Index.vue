<template>
  <div class="main index-style">
    <el-card class="box-card">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="AR融资概况" name="dialog-index1"></el-tab-pane>
        <el-tab-pane label="信用融资概况" name="dialog-index2"></el-tab-pane>
      </el-tabs> -->
      <component v-bind:is="currentTabComponent"></component>
    </el-card>
  </div>
</template>
<style scoped>
* {
  margin: 0;
}

.box-card {
  min-width: 1200px;
  padding-bottom: 20px;
}

.header {
  text-align: center;
}

.content.left-right {
  width: 100%;
  min-width: 1200px;
  margin: auto;
}

.index-style {
  min-width: 1102px;
}

.index-style > .header {
  text-align: center;
}

.float-left {
  float: left;
}

.float-right {
  float: right;
}

/* 右侧方形图左边区域样式 */

.float-left.text {
  width: 250px;
  padding: 5px 20px;
  font-weight: 500;
}

.text-content {
  width: 400px;
  height: 115px;
  color: #fff;
  border: solid 1px;
  border-radius: 15px;
  margin-top: 10px;
}

.t1 {
  font-size: 16px;
  padding: 0px 5px;
}

.t1 > span {
  margin-left: 20px;
}

.t2 {
  margin-top: 10px;
  font-size: 13px;
  position: absolute;
  width: 310px;
}

.t2 ul {
  padding: 0px 5px;
}
.t2 > ul > section {
  display: inline;
}
li {
  list-style: none;
  display: inline-block;
  width: 100px;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.t2 > ul > section:last-child,
.t2 > ul > li:last-child {
  float: right;
  color: black;
}

.line {
  width: 100%;
  background-color: #fff;
  height: 3px;
}

.url {
  text-align: center;
  margin-top: 5px;
}

.url > a {
  color: #fff;
}

/* 链接样式 */

.url-section {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.bg-style {
  display: inline-block;
  width: 200px;
  margin: auto;
  text-align: center;
  padding: 5px 0px;
}

.bg-blue {
  background: #2e75b6;
}

.bg-gray {
  background: #7f7f7f;
}

.bg-blue > a,
.bg-gray > a {
  color: #fff;
}
</style>

<script>
export default {
  components: {
    'dialog-index1': () =>
      import(/* webpackChunkName: 'Info' */ '@/components/Fund/outSource/Index/index1'),
    'dialog-index2': () =>
      import(/* webpackChunkName: 'Info' */ '@/components/Fund/outSource/Index/index2')
  },
  data () {
    return {
      activeName: 'dialog-index1',
      currentTabComponent: 'dialog-index1'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
      this.currentTabComponent = tab.name
    }
  }
}

</script>
