<template>
  <section>
    <div class="idx-process-left">
      <el-progress
        type="circle"
        :width="80"
        :percentage="getPersent(data.value)"
        :color="data.bcolor"
      ></el-progress>
    </div>
    <div class="idx-process-right">
      <div class="idx-process-title">{{data.title}}</div>
      <div class="idx-process-content_center">
        <template v-if="isDetail">
          <p>{{data.data.firData.name}}<strong>{{ data.data.firData.value | regexNum}}</strong> 万元</p>
          <p class="color_green">{{data.data.secData.name}}<strong>{{ data.data.secData.value | regexNum}}</strong> 万元</p>
        </template>
        <p v-else><strong>{{ data.value | regexNum}}</strong> 万元</p>
      </div>
      <div class="idx-process-bottom">
        <div class="url">
            <router-link :to="data.path">查看明细></router-link>
        </div>
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
  overflow: hidden;
  margin-bottom: 40px;
}
.idx-process-left {
  float: left;
  width: 100px;
}
.idx-process-right {
  float: left;
  margin: 10px 0 0 0px;
  .idx-process-title {
    width: 160px;
    font-size: 14px;
    color: #7f7f7f;
  }
  .idx-process-content_center {
    font-size: 14px;
    color: #7f7f7f;
    strong {
      font-size: 20px;
      color:#303133;
    }
    p.color_green{
    &,>strong{
      color: #5dc850;
    }
  }
  }
  li {
    list-style: none;
  }
}
.idx-process-bottom {
  font-size: 14px;
  .url > a {
    color: #7f7f7f;
  }
}
</style>

<script>
import { thousandth } from '@/util/util'
export default {
  props: {
    data: Object,
    total: {
      type: Number,
      default: 0
    },
    isDetail: { // 是否显示详细
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 计算总额
    sumAdd: sumAdd,
    getPersent: getPersent
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
// 计算百分比
function getPersent (val) {
  if (typeof val === 'number' && this.total !== 0) {
    let re = (val / this.total * 100).toFixed(2)
    return Number(re)
  } else {
    return 0
  }
}
</script>
