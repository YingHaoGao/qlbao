var HTTP = 'http://testapi.cailing.meisheapp.com/',
		WXHTTP = '/meishe-wxapi',
		SHARE = location.origin + location.pathname;

// 服务器地址
// if (process.env.NODE_ENV === "development") {
//   HTTP = 'http://testapi.cailing.meisheapp.com/';
// 	WXHTTP = '/meishe-wxapi';
// }else {
//   HTTP = 'http://testapi.cailing.meisheapp.com/';
// 	WXHTTP = '/meishe-wxapi';
// }

module.exports = {
	HTTP: HTTP,
	WXHTTP: WXHTTP,
	SHARE: SHARE
}
