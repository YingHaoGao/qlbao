# standard

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

```

## 注意

	以下配置都在 main.js 文件下
	1、分销商ID存为全局变量 vue.prototype.$distributorId
	2、$http.fetch('',{}, that) $http请求传入最后一个参数传入 this 表示关闭loading
	3、临时用户id存为全局变量  vue.prototype.$tmp_uid
	4、临时用户ip 或 openid 存为全局变量  vue.prototype.$parm

## 配置

	1、config 文件 HTTP 属性为服务器地址
	2、http.js 文件为axios请求二次封装
