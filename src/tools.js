const wx = require("weixin-js-sdk");
import CONFIG from "../config/index.js";

const tools = {
	// 检测运行环境
	getFacility () {
		var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
        var isIE = userAgent.indexOf("compatible") > -1
                && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
        var isChrome = userAgent.indexOf("Chrome") > -1
                && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
        var ua = window.navigator.userAgent.toLowerCase();
        var Weixin = ua.match(/MicroMessenger/i) == 'micromessenger';


        if (Weixin) {
            return "Weixin"
        }
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return "IE7";
            } else if (fIEVersion == 8) {
                return "IE8";
            } else if (fIEVersion == 9) {
                return "IE9";
            } else if (fIEVersion == 10) {
                return "IE10";
            } else if (fIEVersion == 11) {
                return "IE11";
            } else {
                return "0";
            }//IE版本过低
            return "IE";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isEdge) {
            return "Edge";
        }
        if (isFF) {
            return "FF";
        }
        if (isChrome) {
            return "Chrome";
        }
	},
	// 验证 
	detection (t, val, fn) {
		let is = false;

        val = val || '';

		switch(t) {
			// 手机号
			case 0:
				is = /^1[3456789]\d{9}$/.test(val);
				break;
			// 仅中文
			case 1:
				is = !(/[^\u4E00-\u9FA5]/g.test(val));
				break;
			// 仅字母
			case 2:
				is = !(/[^a-z]|[^A-Z]/g.test(val));
				break;
		}

		if (is && fn) fn();
		
		return is;
	},
    // 设置storage
    setStorage (key, val) {
        localStorage.setItem(key, val);
    },
    // 获取storage
    getStorage (key) {
        localStorage.getItem(key);
    },
    // debug alert
    alert(val) {
        if (process.env.NODE_ENV  === "development" || process.env.VUE_APP_DEBUG === "true") {
            alert(val)
        }
    },
    // 设置分享
    setShare(link, title, desc, img) {
        let share = {
            imgUrl: img,
            title: title,
            desc: desc,
            link: link
        };
        console.log(share)
        wx.ready(function () {
          wx.onMenuShareAppMessage(share) // 分享给好友
          wx.onMenuShareTimeline(share) // 分享到朋友圈
        })
    },
    setDefaultShare() {
        CONFIG.SHARE_LINK,
        '5G视频彩铃，正在呼叫你的企业',
        '5G视频彩铃，让企业名片“有声有色”，让每一次等待都产生更大价值。',
        CONFIG.ROOT + 'wxshare.png'
    }
}

export default tools
