<template>
  <div class="verify">
    <div id="verify_box">
      <div id="verify_xbox">
        <section v-if="isSure">
          验证通过
          <div id="btn">
            <img style="margin-top:8px" src="@/assets/img/login/kkkk.png" />
          </div>
        </section>
        <div v-else id="btn">
          <img src="@/assets/img/login/lllllll.png" />
        </div>

      </div>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;按住滑块，拖动到最右边
    </div>

  </div>
</template>
<style scoped>
#verify_box {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  position: relative;
  background-color: rgba(212, 212, 212, 1);
}

#verify_xbox {
  width: 54px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  position: absolute;
  background: #7bbb55;
}

#btn {
  cursor: pointer;
  width: 54px;
  height: 40px;
  background-color: rgba(255, 255, 255, 1);
  border: solid 1px rgba(212, 212, 212, 1);
  float: right;
}

.continue {
  width: 120px;
  height: 40px;
  background-color: rgba(212, 212, 212, 1);
  margin: 0 70px;
  border: none;
  color: #302f41;
  font-size: 16px;
}

.continue:hover {
  background-color: rgba(235, 54, 38, 1);
  color: #ffffff;
}

img {
  max-width: 100%;
}
</style>
<script>
export default {
  data () {
    return {
      show: false
    }
  },
  props: ['isSure'],
  mounted () {
    /**
     * Created by Alone on 2017/11/6.
     */
    var box = document.getElementById('verify_box')
    var xbox = document.getElementById('verify_xbox')
    var element = document.getElementById('btn')
    var b = box.offsetWidth
    var o = element.offsetWidth
    const _that = this
    element.ondragstart = function () {
      return false
    }
    element.onselectstart = function () {
      return false
    }
    element.onmousedown = function (e) {
      var disX = e.clientX - element.offsetLeft
      document.onmousemove = function (e) {
        var l = e.clientX - disX + o
        if (l < o) {
          l = o
        }
        if (l > b) {
          l = b
        }
        xbox.style.width = l + 'px'
      }
      document.onmouseup = function (e) {
        var l = e.clientX - disX + o
        if (l < b) {
          l = o
        } else {
          l = b
          _that.$emit('verify-ok')
        }
        xbox.style.width = l + 'px'
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}

</script>
