
let urlsk = {
	// 端口
	port: 9090,
	// 公众号
	// name: 'shengshichangcheng',
	title: '哎呦抓娃娃',
	// 接口码
	code: 'wawa',

	// 接口完整前缀
	baseURL: function () {
		return `http://wawa.bfb88.net/${this.code}/`
		// return `http://wawa.bfb88.net/${this.code}_test/`
		// return `http://wfx.wego168.com/${this.code}/`
		// return `http://192.168.1.70:8180/${this.code}/`
		// return `http://192.168.1.90:8180/${this.code}/`
		// return `http://192.168.1.73:8180/${this.code}/`
	},

	// 类型：首页，新闻列表，新闻详情，活动列表，活动详情，个人中心
	// Index, NewsList, NewsDetail, ActivityList, ActivityDetail, Center

	// 首页，列表
	indexUrl: function (memberId, t) {
		if (t) return `http://wawa.bfb88.net/wawa/member/shareLink/${memberId}?t=${t}`
		else return `http://wawa.bfb88.net/wawa/member/shareLink/${memberId}`
	},

	// logo
	logoUrl: function (img) {
		if (img) {
			return img
		} else {
			return 'http://s1.wego168.com/imgApp/upload/wxa3369787e41eb083/img/4463840665ef46de98e8c7ff16d825c7.png'
		}
	},
	// 标题
	getTitle: function (name) {
		if (name) {
			return `${name}送你50金币，邀你一起抓娃娃`
		} else {
			return `哎哟抓娃娃`
		}	
	},
	// 描述
	getDesc: function (text) {
		if (text) {
			return text
		} else {
			return '在线直播抓娃娃，无需下载APP，即可玩转娃娃机；超低延时，想抓就抓；多种娃娃，等你带回家。'
		}
	}
}

// export default urlsk

module.exports = urlsk