export default [{
  path: '*',
  component: () =>
    import('@/page/error/404')
},
{
  path: '/404',
  name: '404',
  component: () =>
    import('@/page/error/404')
}
]
