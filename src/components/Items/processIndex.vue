<template>
  <section>
    <div class="idx-process-left">
      <el-progress type="circle" :width="100" :percentage="80" :color="data.bcolor"></el-progress>
    </div>
    <div class="idx-process-right">
      <div class="idx-process-title">{{data.title}}</div>
      <div class="idx-process-content_center">
        <strong>{{ sumAdd(data.data) | regexNum}}</strong> 万元
      </div>
      <div class="idx-process-bottom">
        <table>
          <tr>
            <th class="first" align="left">{{data.data.firData.name}}</th>
            <th align="left">{{data.data.secData.name}}</th>
          </tr>

          <tr>
            <el-tooltip effect="light" :content="data.data.secData.value+'万元'" placement="right-end">
              <td class="first" align="left">{{data.data.firData.value| regexNum}}万元</td>
            </el-tooltip>
             <el-tooltip effect="light" :content="data.data.secData.value+'万元'" placement="right-end">
              <td class="first" align="left">{{data.data.secData.value| regexNum}}万元</td>
            </el-tooltip>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
section {
  width: 380px;
  overflow: hidden;
}
.idx-process-left {
  float: left;
  width: 100px;
}
.idx-process-right {
  float: left;
  margin: 10px 0 0 10px;
  .idx-process-title {
    font-size: 18px;
    color: #7f7f7f;
  }
  .idx-process-content_center {
    font-size: 18px;
    strong {
      font-size: 26px;
    }
  }
  li {
    list-style: none;
  }
}
.idx-process-bottom {
  table {
    border-collapse: collapse; /*边框合并*/
    color: #7f7f7f;
  }
  .first {
    padding-right: 5px;
  }
  th + th,
  td + td {
    padding-left: 5px;
    border-left: 1px solid #eaeaea;
  }
}
</style>

<script>
import {thousandth} from '@/util/util'
export default {
  props: {
    data: Object
  },
  methods: {
    // 计算总额
    sumAdd: sumAdd
  },
  filters: {
    // 千分位
    regexNum: function (val) {
      return `${thousandth(val)}`
    }
  }
}
function sumAdd (object) {
  let result = 0
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key].value) {
      result += object[key].value * 100
    }
  }
  return result / 100
}
</script>
