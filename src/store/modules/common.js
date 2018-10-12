import { setStore, getStore } from '@/util/store'
const common = {

  state: {
    isCollapse: false,
    isFullScren: false,
    isLock: false, // 是否可同步更新
    lockPasswd: getStore({ name: 'lockPasswd' }) || ''
  },
  mutations: {
    SET_COLLAPSE: (state, action) => {
      state.isCollapse = !state.isCollapse
    },
    SET_FULLSCREN: (state, action) => {
      state.isFullScren = !state.isFullScren
    },
    SET_LOCK: (state, action) => {
      state.isLock = true
      // setStore({ name: 'isLock', content: state.isLock, type: 'session' })
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd
      setStore({ name: 'lockPasswd', content: state.lockPasswd, type: 'session' })
    },
    CLEAR_LOCK: (state, action) => {
      state.isLock = false
      // state.lockPasswd = ''
      // removeStore({ name: 'lockPasswd' })
      // removeStore({ name: 'isLock' })
    }
  }
}
export default common
