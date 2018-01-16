// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import axios from 'axios'
// import debugout from 'debugout.js'
import { ToastPlugin, LoadingPlugin, WechatPlugin, AlertPlugin, ConfirmPlugin } from 'vux'
import util from './assets/js/util'
import urlSk from './assets/js/urlSk'
import wxSdk from './assets/js/wxSdk'
import VueWechatTitle from 'vue-wechat-title'
// import LazyLoad from './assets/js/lazyLoad'

// Vue.use(LazyLoad)

Vue.prototype.util = util
Vue.prototype.urlSk = urlSk
Vue.prototype.wxSdk = wxSdk

Vue.prototype.img = 'http://wawa-1255600302.file.myqcloud.com/'
// if (/localhost/.test(window.location.origin)) {
//   // Vue.prototype.img = 'http://wawa.bfb88.net/wawa'
//   Vue.prototype.img = 'http://wawa-1255600302.file.myqcloud.com/'
// } else {
//   let origin = window.location.origin
//   let url = window.location.pathname
//   url = url.substring(1, url.length - 1)
//   Vue.prototype.img = origin + '/' + url.split('/')[0]
// }

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AlertPlugin)
Vue.use(VueWechatTitle)
Vue.use(ConfirmPlugin)

// Vue.use(debugout)

Vue.use(Vuex)

Vue.prototype.showInfo = function (text) {
	this.$vux.toast.show({
		text: text,
		type: 'text',
		time: 500
	})
}
Vue.prototype.loading = function (type, text) {
	if (type) {
		this.$vux.loading.show({
			text: text || '数据加载中'
		})
	} else {
		this.$vux.loading.hide()
	}
} 
Vue.prototype.alerts = function (type, coinNum) {
  if (type) {
    this.$vux.alert.show({
      title: '每日礼包',
      content: `您已获得${coinNum}金币`,
    })
  } else {
    this.$vux.alert.hide()
  }
}


Vue.config.productionTip = false

// const store = new Vuex.Store({})

const store = new Vuex.Store({
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward',
    isScroll: false,
    member: {},
    sum: 0,
    soundConfig: {
      playBackgroundSound: true,
      playHintSound: true,
      receiveCatchDollRemind: true,
      receiveCoinAddRemind: true,
    },
    againStatus: false,
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    },
    updateisScroll (state, payload) {
      state.isScroll = payload.isScroll
    },
    updateMember (state, payload) {
      state.member = payload.member
      window.localStorage.setItem('member', JSON.stringify(payload.member))
    },
    updateSum (state, payload) {
      state.sum = payload.sum
      window.localStorage.setItem('sum', payload.sum)
    },
    updateSoundConfig (state, payload) {
      state.soundConfig = payload.soundConfig
      window.localStorage.setItem('soundConfig', JSON.stringify(state.soundConfig))
    },
    updateAgainStatus (state, payload) {
      state.againStatus = payload.againStatus
      window.localStorage.setItem('againStatus', payload.againStatus)
    },
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    },
    updateLoadingStatus({commit}, isLoading) {
      commit({type: 'updateLoadingStatus', isLoading: isLoading})
    },
    updateisScroll ({commit}, isScroll) {
      commit({type: 'updateisScroll', isScroll: isScroll})
    },
    updateMember ({commit}, member) {
      commit({type: 'updateMember', member: member})
    },
    updateSum ({commit}, sum) {
      commit({type: 'updateSum', sum: sum})
    },
    updateSoundConfig ({ commit }, soundConfig) {
      commit({ type: 'updateSoundConfig', soundConfig: soundConfig })
    },
    updateAgainStatus({ commit }, againStatus) {
      commit({ type: 'updateAgainStatus', againStatus: againStatus })
    }
  }
})

Vue.use(store)

sync(store, router)

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// router.beforeEach(function (to, from, next) {
// 	store.commit('updateLoadingStatus', {isLoading: true})
//   setTimeout(() => {
//     next()
//   }, 0)
// })

// router.afterEach(function (to) {
// 	store.commit('updateLoadingStatus', {isLoading: false})
// })

Vue.filter('price', (val) => {
  // if (!val) return ''
  return (val * 0.01).toFixed(2)
})
Vue.filter('gold', (val) => {
  if (!val) return ''
  return val + '金币'
})
Vue.filter('feedBackType', (val) => {
  if (!val) return ''
  switch (val) {
    case 1:
      return '爪子卡到绳子'
      break
    case 2:
      return '爪子无法移动'
      break
    case 3:
      return '抓到娃娃到洞口后，不松爪子'
      break
    case 4:
      return '娃娃掉落后，提示未抓中'
      break
    case 5:
      return '快递和娃娃品质问题'
      break
    case 6:
      return '其他'
      break
  }
})
// title
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})


const FastClick = require('fastclick')
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
