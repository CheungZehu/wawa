import urlSk from './urlSk'
import api from '../../api/api'
import wx from 'weixin-js-sdk'

// demo
// index
// this.wxSdk.initIndex('Index')
// detail
// this.wxSdk.initDetail('NewsDetail', this.dataDetail.title, this.dataDetail.shortContent, this.$route.params.id, this.dataDetail.imgUrl)

// 类型：首页，新闻列表，新闻详情，活动列表，活动详情，个人中心
// Index, NewsList, NewsDetail, ActivityList, ActivityDetail, Center

const wxsdk = {

	// 调用
	share: function (memberId, name) {
		if (memberId) {
			this.configWxSdkIndex(memberId, name)
		}
	},
	shareDetail: function (memberId, text, img) {
		if (memberId) {
			this.configWxSdkDetail(memberId, text, img)
		}
	},

	initDetail: function (linkType, title, shortContent, id, imgUrl, type) {
		this.configWxSdkDetail(linkType, title, shortContent, id, imgUrl, type)
	},

	configWxSdkIndex: function (memberId, name) {
		console.log(urlSk.indexUrl(memberId))
		wx.ready(() => {
			let dataForWeixin = {
				title: urlSk.getTitle(name),
				desc: urlSk.getDesc(),
				link: urlSk.indexUrl(memberId),
				imgUrl: urlSk.logoUrl(),
				success: () => {
					api.share({memberId: memberId}).then(res => {
					})
				},
				cancel: () => {
					alert('分享失败')
				},
			}
			wx.onMenuShareTimeline(dataForWeixin)
			wx.onMenuShareAppMessage(dataForWeixin)
		})
		wx.error(() => {})
		let jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
		this.loadJsapiTicketSign(jsApiList)
	},

	configWxSdkDetail: function (memberId, text, img) {
		console.log(urlSk.indexUrl(memberId))
		wx.ready(() => {
			let dataForWeixin = {
				title: urlSk.getTitle(),
				desc: urlSk.getDesc(text),
				link: urlSk.indexUrl(memberId),
				imgUrl: urlSk.logoUrl(img),
				success: () => {
					api.share({ memberId: memberId }).then(res => {
					})
				},
				cancel: () => {
					alert('分享失败')
				},
			}
			wx.onMenuShareTimeline(dataForWeixin)
			wx.onMenuShareAppMessage(dataForWeixin)
		})
		wx.error(() => {})
		let jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
		this.loadJsapiTicketSign(jsApiList)
	},

	loadJsapiTicketSign: function (jsApiList) {
		let signUrl = location.href.split('#')[0]
		api.getWeixin({url: signUrl}).then(res => {
			// alert(JSON.stringify(res.data))
			this.configApiList(res.data, jsApiList)
		})
	},

	configApiList: function (obj, jsApiList) {
		wx.config({
			debug: false,
			appId: obj.appid,
			timestamp: obj.timestamp,
			nonceStr: obj.nonceStr,
			signature: obj.signature,
			jsApiList: jsApiList
		})
	},
}


export default wxsdk