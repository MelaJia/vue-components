/* 验证对象 */
const Valid = {
  checkPhone (val) { // 验证手机号
    console.log(val)
    let phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/ // 手机号正则
    if (phoneReg.test(val)) {
      return true
    } else {
      return false
    }
  },
  checkPass (val) {
    let passReg = /^\S*([a-zA-Z]+\S*[0-9]+|[0-9]+\S*[a-zA-Z]+)\S*$/ // 字母数字组合
    if (passReg.test(val) && val.length >= 8 && val.length <= 20) {
      return true
    } else {
      return false
    }
  }
}
export default Valid
