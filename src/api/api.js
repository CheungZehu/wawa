import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import urlSk from '../assets/js/urlSk'

axios.defaults.timeout = 60000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

if (/localhost/.test(window.location.origin)) {
	axios.defaults.baseURL = '/api'
} else {
	let origin = window.location.origin
	let url = window.location.pathname
	url = url.substring(1, url.length - 1)
	axios.defaults.baseURL = origin + '/' + url.split('/')[0]
}


// post请求
function postData(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, qs.stringify(params))
			.then(res => {
				// setTimeout(() => {
				// 	this.$store.dispatch(updateLoadingStatus, false)
				// })
				resolve(res)
			}, err => {
				reject(err)
			})
			.catch(error => {
				reject(error)
			})
	})
}

// get请求
function getData(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {params: params})
			.then(res => {
				resolve(res)
			}, err => {
				reject(err)
			})
			.catch(error => {
				reject(error)
			})
	})
}

// delete请求
function deleteData(url, params) {
	return new Promise((resolve, reject) => {
		axios.delete(url, {params: params})
			.then(res => {
				resolve(res)
			}, err => {
				reject(err)
			})
			.catch(error => {
				reject(error)
			})
	})
}

// put请求
function putData (url, params) {
	return new Promise((resolve, reject) => {
		axios.put(url, qs.stringify(params))
			.then(res => {
				resolve(res)
			}, err => {
				reject(err)
			})
			.catch(error => {
				reject(error)
			})
	})
}


// api请求
export default {
	// 记录日志
	setLog (params) {
		return postData('/common/log', params)
	},

	// 获取首页广告图
	getImages (limit) {
		return getData(`/attachments/images?type=1&limit=${limit}`)
	},

	// 登录
	login (params) {
		return postData('member/login', params)
	},

	// 获取用户信息
	getUserInfo(){
		return getData('/member/info')
	},

	// 获取会员信息
	memberInfo(identifier) {
		return getData(`/common/member_info/${identifier}?type=1`)
	},

	// 获取声音设置
	soundConfig () {
		return getData('/member/config')
	},

	// 获取游戏音效
	getGameAudioConfig () {
		return getData('/common/game_audio/config')
	},

	// 修改声音配置
	changeSoundConfig (params) {
		return putData('/member/config', params)
	},

	// 我的娃娃
	myDoll (params) {
		return getData('/member/dolls', params)
	},

	// 包邮
	transportAmount (dollNum) {
		return getData(`/common/transportAmount?dollNum=${dollNum}`)
	},

	// 获取娃娃订单
	dollOrdersList (params) {
		return getData('/member/dollOrders', params)
	},

	// 再次支付娃娃订单
	dollOrdersRepay (id) {
		return postData(`/member/dollOrders/${id}/repay`)
	},

	// 取消娃娃订单
	delDollOrders (id) {
		return deleteData(`/member/dollOrders/${id}`)
	},

	// 获取收货地址
	addressesList () {
		return getData('/member/addresses')
	},

	// 地址详情
	addressesDetail (id) {
		return getData(`/member/addresses/${id}`)
	},

	// 添加地址
	addresses (params) {
		return postData('/member/addresses', params)
	},

	// 修改地址
	updateAddresses (id, params) {
		return putData(`/member/addresses/${id}`, params)
	},

	// 删除地址 
	delAddress (id) {
		return deleteData(`/member/addresses/${id}`)
	},

	// 创建订单
	dollOrders (params) {
		return postData('/member/dollOrders', params)
	},

	// 获取签到金币配置
	accumulateConfig () {
		return getData('/coins/sign_in/accumulate/config')
	},

	// 分享好友
	share (params) {
		return postData('/shareInvitationReward/share', params)
	},

	// 分享邀请配置
	shareInvitationReward () {
		return getData('/shareInvitationReward/getConfig')
	},

	// 分享邀请结果
	shareInvitationRewardSelect () {
		return getData('/shareInvitationReward/select')
	},

	// 领取邀请金币
	obtainInvitationCoin (params) {
		return postData('/shareInvitationReward/obtainInvitationCoin', params)
	},

	// 获取金币配置
	coinsConfig () {
		return getData('/coins/config')
	},

	// 获取金币商品
	coinsGoods (params) {
		return getData('/coins/goods', params)
	},

	// 获取我的金币总数
	coinsSum () {
		return getData('/member/coins/sum')
	},

	// 获取我的金币流水
	coinsList (params) {
		return getData('/member/coins', params)
	},

	// 创建金币商品 
	coinsGoodsCreate (params) {
		return getData('/coins/goods/create', params)
	},

	// 创建金币订单
	coinsOrder (id) {
		return postData('/member/orders?orderType=1&payWay=2&goodsId=' + id)
	},

	// 获取金币礼包
	getCoinsBags () {
		return getData('/coins/bags')
	},

	// 创建金币礼包订单
	ordersBags (params) {
		return postData('/member/orders/bags', params)
	},

	// 获取消息
	getMessages (params) {
		return getData('/member/messages', params)
	},

	// 获取频道分类
	getChannelsType (type) {
		return getData(`/categories?type=${type}`)
	},

	// 获取频道列表v1 categoryId
	channelsV1(params) {
		return getData('/doll/channels/v1', params)
	},

	// 获取频道列表
	channels (params) {
		return getData('/doll/channels', params)
	},

	// 获取频道详情
	channelsDetail (id) {
		return getData(`/doll/channels/${id}`)
	},

	// 娃娃机列表
	dollList (params) {
		return getData('/doll/machines', params)
	},

	// 娃娃机详情
	dollDetail (id) {
		return getData(`/doll/machines/${id}`)
	},

	// 扣除金币
	payment (params) {
		// return postData('/member/payment', params)
		return postData('/member/payment/v2', params)
	},

	// 更新娃娃机上机状态
	playingStatus (id, params) {
		return putData(`/doll/machines/${id}/playing_status`, params)
	},

	// 创建抓取记录
	createGrabDoll (params) {
		// return postData('/member/catch', params)
		return postData('/member/catch/v2', params)
	},

	// 该机抓中娃娃的记录
	dollDetailRecord (id) {
		return getData(`/doll/channels/${id}/catch?start=0&limit=20`)
	},

	// 获取我的抓取记录
	grabRecord (params) {
		return getData('/member/catch', params)
	},



	// 发送验证码
	sendCheckCode (params) {
		return postData('/member/promoter/sendCheckCode', params)
	},

	// 注册为推广达人
	becomePromoter (params) {
		return postData('/member/promoter/register', params)
	},

	// 登录
	loginPromoter (params) {
		return postData('/member/promoter/login', params)
	},

	// 注销
	logoutPromoter () {
		return postData('/member/promoter/logout')
	},

	// 验证是否为推广达人
	memberShareLink () {
		return getData('/promoter/memberShareLink/get')
	},
	
	// 总的营业额、分红
	doStatisticsByPromoter () {
		return getData('/member/promoter/statisticsBonus/doStatisticsByPromoter')
	},

	// 统计过去7天的的营业额、分红
	amountCount() {
		// return getData('/bonus/getNearlyDaysStatisticsBonus')
		return getData('/member/promoter/statisticsBonus/selectListByPromoterForLastDays')
	},

	// 统计过去7天的新增用户
	userCount() {
		// return getData('/statistics/getPromoterNewMemberInDateInterval');
		return getData('/member/promoter/statisticsPromoterNewMember/selectListByPromoterForLastDays')
	},

	// 总的新增用户
	totalNewUsers () {
		return getData('/member/promoter/statisticsPromoterNewMember/doStatisticsByPromoter')
	},

	//推广达人线下列表
	levelList(model) {
		return getData('/member/promoter/memberChain/selectPageByLevel', model)
	},

	// 营收明细
	revenue (params) {
		return getData('/member/promoter/bonus/selectPage', params)
	},

	// 推广人数
	countLevelNum () {
		return getData('/member/promoter/memberChain/countLevelNum')
	},

	// 推广达人余额
	getAmountByMid () {
		return getData('/member/promoter/bonus/getBalanceAmount')
	},

	// 营业额
	countLevelOrderAmount () {
		return getData('/member/promoter/bonus/countLevelOrderAmount')
	},

	// 推广充值分页列表
	bonusSelectOrderPage(params) {
		return getData('/member/promoter/bonus/selectOrderPage', params)
	},

	// 推广渠道类型新增
	memberChainTypeInsert (params) {
		return postData('/member/promoter/memberChainType/insert', params)
	},

	// 推广渠道类型查询列表
	memberChainTypeSelectList () {
		return getData('/member/promoter/memberChainType/selectList')
	},
	

	// 发布反馈
	feedBack (params) {
		return postData('/member/feedbacks', params)
	},

	// 反馈列表
	feedBacks (params) {
		return getData('/member/feedbacks', params)
	},



	// 微信sdk
	getWeixin (params) {
		return getData('/member/loadJsapiTicketSign', params)
	},

	// 腾讯云im usersig
	imSig (id) {
		return getData(`/common/sig?memberId=${id}`)
	},

	// 配置天车信息
	clawConfig (id, params) {
		return getData(`/doll/channels/${id}/claw_config`, params)
	},

	// 获取娃娃订单配置
	dollOrderConfig () {
		return getData('/common/doll_order/config')
	},

	// 娃娃兑换金币
	dollsChangeCoins (params) {
		return putData('/member/dolls', params)
	},

	// 校验提交订单的娃娃
	dollsCheck (params) {
		return postData('/member/dolls/check', params)
	},

	// 新闻列表
	getNews (params) {
		return getData('/news/selectPage', params)
	},

	// 新闻详情
	getDetail (id) {
		return getData(`/news/select/?id=${id}`)
	},

	// 获取游戏音效
	getGameAudio () {
		return getData('/common/game_audio/config')
	},
}
