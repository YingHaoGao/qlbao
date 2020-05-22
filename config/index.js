var HTTP;

// 服务器地址（结尾不加“/”）
if (process.env.NODE_ENV === "development") {
  HTTP = 'http://testapi.cailing.meisheapp.com';
}else {
  HTTP = 'http://testapi.cailing.meisheapp.com';
}

module.exports = {
	HTTP: HTTP
}