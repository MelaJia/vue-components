# newproject

> 区块链金融

## 使用说明

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 文件目录说明
* **src**
  * **page**-页面文件夹
    * **admin**-用户角色
      * **UserInfo.vue**-页面组件
    * **funder**
      ...
    * **suplier**
      ...
  * **components**-组件文件夹
    * **Admin**-用户角色(管理员)
      * **Work**-类型
        * **ArListTable.vue**-组件
    * ...
    * ...
    * **suplier**-用户角色(供应商)
      * **Ar**-类型
        * **ArTable.vue**-组件
        * ...
      * **userInfo**-类型
        * **InfoTable.vue**-组件
        * ...
  * **layout**-模板文件夹
    * **Admin.vue**-模板组件
    * ...
  * **config**-配置项
    * **env.js**-编译环境/线上环境配置文件
    * **roles.js**-角色对应模板权限配置文件
  * **monitorDatas**-模拟数据文件夹
    * **Admin**-角色文件夹
      * **arDatas.js**-模拟数据文件
    * **Common**-公共数据文件夹
    * ...
    * **index.js**-模拟数据入口文件