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
  monitorToken: state => state.user.monitorToken,
  roles: state => state.user.roles,
  userInfos: state => state.user.userinfos,
  roleBelong: state => state.user.roleBelong,
  permission: state => state.user.permission,
  menu: state => state.user.menu,
  menuName: state => state.user.menuName,
  errLog: state => state.errLog.errLog,
  activeidx: state => state.tags.tag.value,
  ssoId: state => state.user.ssoId,
  interfaceTransSerial: state => state.user.interfaceTransSerial
}
export default getters
