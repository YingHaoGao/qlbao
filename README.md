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

## 页面 query 传参
	
	1、 /pay   	
						price_id 				价格id
						level_name			代理价名称
		        price						代理价
		        user_number 		开通用户数量
		        total_price 		总价
	2、 /payment
						order_id				订单id

## 配置

	1、config 文件 HTTP 属性为服务器地址
	2、http.js 文件为axios请求二次封装
