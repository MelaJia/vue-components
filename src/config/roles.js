const roles = {
  0: {
    name: '管理员',
    model: 'admin',
    layout: '/admin' // 对应的模板
  },
  2: {
    name: '供应商',
    model: 'suplier',
    layout: '/suplier'
  },
  3: {
    name: '保理商',
    model: 'fund',
    layout: '/fund'
  },
  4: {
    name: '获客方',
    model: 'main',
    layout: '/main'
  }
}
export default roles
