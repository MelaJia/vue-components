const getters = {
  tag: state => state.tags.tag,
  isCollapse: state => state.common.isCollapse,
  isLock: state => state.common.isLock,
  isFullScren: state => state.common.isFullScren,
  lockPasswd: state => state.common.lockPasswd,
  tagList: state => state.tags.tagList,
  tagCurrent: state => state.tags.tagCurrent,
  tagWel: state => state.tags.tagWel,
  token: state => state.user.token,
  roles: state => state.user.roles,
  // scheduleNumber: state => state.user.scheduleNumber,
  permission: state => state.user.permission,
  menu: state => state.user.menu,
  menuAll: state => state.user.menuAll,
  errLog: state => state.errLog.errLog,
  activeidx: state => state.tags.tag.value.slice(state.tags.tag.value.lastIndexOf('/') + 1),
  ssoId: state => state.user.ssoId
}
export default getters
