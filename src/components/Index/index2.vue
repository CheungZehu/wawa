<template>
	<div class="main" id="main" :class="{'hidden': isHidden}">
		<div class="header" id="header">
      <router-link tag="div" class="user-info" :to="{path: '/user'}">
        <img v-if="userInfo.headImage" :src="userInfo.headImage" alt="">
        <img v-else src="http://wawa-1255600302.file.myqcloud.com/images/headImg.jpg" alt="">
				<!-- <p class="vip" v-if="userInfo.charged">V1</p> -->
        <p>
          <span style="margin-left: 5px; color: #613414;">ID:{{userInfo.number}}</span>
          <span style="margin-left: 5px; color: #613414;">金币:{{sum}}</span>
        </p>
      </router-link>
      <div class="function">
				<!-- <router-link tag="i" class="img" :to="{path: '/myInfo/Preferential'}">
          <img class="lihe" src="http://wawa-1255600302.file.myqcloud.com/images/lihe.png" alt="">
        </router-link> -->
        <router-link tag="i" class="img" :to="{path: '/myInfo/recharge'}">
          <img src="http://wawa-1255600302.file.myqcloud.com/images/pay1.png" alt="">
        </router-link>
        <router-link tag="i" class="img" :to="{path: '/myInfo'}">
          <img src="http://wawa-1255600302.file.myqcloud.com/images/setting1.png" alt="">
        </router-link>
      </div>
    </div>

		<div class="main-box" id="main-box">
		<!-- <div class="main-box" id="main-box" :style="{height: `${height}px`}"> -->
			<!-- <div style="height: 45px;"></div> -->
			<swipers moduleName="News" :type="false"></swipers>
			<div class="function-button">
				<div class="button-item" v-for="(item, i) in functionButtons" :key="i" @click="show(item, i)">
					<img :src="`http://wawa-1255600302.file.myqcloud.com/images/${item.imgName}.png`" alt="">
					<span>{{item.title}}</span>
				</div>
			</div>
			<div class="tabs" id="tabs">
				<div class="tabs_wrap" id="tabs_wrap" :class="{'fixed': fixedTab}">
					<div class="tabs_nav">
						<div class="tabs_nav-bar" :style="{width: `${tabWidth}px`, transform: `translate3d(${translateWidth}px,0,0)`}"></div>
						<div class="tab-item" v-for="(item, index) in channelsTypeList" :key="index" :class="{'tab-active': tabActive === index}" @click="clickActive(index, item)">
							<span>{{item.name}}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- <div v-if="newsList.length > 0"> -->
				<!-- <div v-for="i in 40" :key="i" style="height: 5rem; width: 100%;">
					<p>fsadofjoasjfosd</p>
				</div> -->
				<div class="listImg">
					<div class="graphic" v-for="(item, i) in newsList" :key="i" @click="to(item.id)">
						<graphic :item="item"></graphic>
					</div>
				</div>
				<!-- <div v-if="newsList.length > 0">
					<divider v-if="shows" style="color: rgb(125, 113, 113); font-size: 1.4rem;">我是有底线的</divider>
					<p style="text-align:center;" v-else>
						<inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;数据加载中</span>
					</p>
				</div>
				<divider v-else style="color: rgb(125, 113, 113); font-size: 1.4rem; padding-top: 15px;">暂无数据</divider> -->
				<divider v-if="shows" style="color: rgb(125, 113, 113); font-size: 1.4rem;">我是有底线的</divider>
				<p style="text-align:center; padding: 10px 0;" v-else>
					<inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;数据加载中</span>
				</p>
				<!-- <p style="text-align:center; padding: 10px 0;">
					<inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;数据加载中</span>
				</p> -->
			<!-- </div>
			<divider v-else style="color: rgb(125, 113, 113); font-size: 1.4rem; padding-top: 15px;">暂无数据</divider> -->
		</div>

		<login-bonus :visibile="isLoginBonus" @close="getMasks"></login-bonus>
		<daily-gift-bag :visibile="isDailyGiftBag" @close="getMasks"></daily-gift-bag>
		<inviting-friends :visibile="isInvitingFriends" @close="getMasks" @show="showInviting" ref="inviting"></inviting-friends>
		<inviting-mask :visibile="isInvitingMask" @close="showInviting"></inviting-mask>
		<receive :visibile="isReceive" @close="closeReceive" :hasDailyCoin="hasDailyCoin" :coinNum="coinNum"></receive>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider, Sticky, InlineLoading, Swiper, SwiperItem } from 'vux'
	import Graphic from '../Common/Graphic'
	import { mapState, mapActions } from 'vuex'
	import Swipers from '../Common/Swiper'
	import LoginBonus from '../Functions/LoginBonus'
	import DailyGiftBag from '../Functions/DailyGiftBag'
	import InvitingFriends from '../Functions/InvitingFriends'
	import InvitingMask from './InvitingMask'
  import Receive from '../Functions/Receive'

	export default {
		components: {
			Group, Graphic, Scroller, LoadMore, Divider, Sticky, Swipers, Swiper, SwiperItem, LoginBonus, DailyGiftBag, InvitingFriends, InvitingMask, Receive, InlineLoading
		},
		data () {
			return {
				newsList: [],
				onData: false,
				onFetching: false,
				showUp: true,
				load: '<load-more tip="数据加载中"></load-more>',
				pulldown: {
					downContent: '<img src="./static/images/loading.gif" width="30" height="30">',
					upContent: '<img src="./static/images/loading.gif" width="30" height="30">',
					loadingContent: '<img src="./static/images/loading.gif" width="30" height="30">',
				},
				scrollerStatus: { 
					pullupStatus: 'default'
				},
				functionButtons: [{ title: '每日礼包', imgName: 'btn_1' }, 
				// { title: '邀请有礼', imgName: 'btn_2' }, 
				{ title: '新手福利', imgName: 'btn_3' }, 
				// { title: '活动', imgName: 'btn_4', link: '/News' }, 
				{ title: '游戏指引', imgName: 'btn_4', link: '/News' }, 
				// { title: '玩家秀', imgName: 'btn_5', link: '/GamePlayerShow' }
				],
				coins: {},
				search: {
					start: 0,
					limit: 10,
					categoryId: '',
				},
				isLoginBonus: false,
				isDailyGiftBag: false,
				isInvitingFriends: false,
				isInvitingMask: false,
				isReceive: false,
				coinNum: 0,
        hasDailyCoin: false,
        height: 0,
        total: 0,
				sw: true,
				shows: true,
				tabActive: 0,
				tabWidth: 0,
				translateWidth: 0,
				fixedTab: false,
				main: null,
				hdWidth: 0,
				swiperIndex: 0,
				channelsTypeList: [{name: '全部', id: ''}],
				id: null,
				header: null,
				tabs: null,
				isHidden: false,
				scrollTop: 0,
				isScrollTop: false,
			}
		},

		mounted() {
			// this.main = document.getElementById('main-box')
			// this.main.addEventListener('scroll', () => {
			// 	this.setScroll()
			// 	this.tabFixed()
			// })
			window.addEventListener('scroll', () => {
				setTimeout(() => {
					this.setScroll()
				}, 300)
				this.tabFixed()
			})
			this.tabs = document.getElementById('tabs')
			this.header = document.getElementById('header')
			// console.log('header === ', header.offsetHeight)
			this.height = window.innerHeight
			this.hdWidth = window.innerWidth * 4
      window.onresize = () => {
				this.height = window.innerHeight
				this.hdWidth = window.innerWidth * 4
			}

			let share = localStorage.getItem('share')
			if (share) {
				this.isInvitingFriends = true
				// this.$refs.inviting.create()
			}
      this.from()
      this.getChannelsType()
			// this.channels()

			let start = Number(localStorage.getItem('start'))
			if (start) this.search.start = start
		},
		beforeDestroy() {
			localStorage.removeItem('share')
			// alert(this.channelsTypeList[this.swiperIndex].name)
			localStorage.setItem('channelsType', JSON.stringify(this.channelsTypeList[this.swiperIndex]))
			localStorage.setItem('scrollTop', this.scrollTop)
			if (this.newsList.length > 0) localStorage.setItem('newsList', JSON.stringify(this.newsList))
			if (this.search.start !== 0) localStorage.setItem('start', this.search.start)
		},
		computed: {
			...mapState({
				sum: function (state) {
					let localSum = window.localStorage.getItem('sum')
					if (state.sum === 0 && localSum) {
						this.$store.commit('updateSum', {sum: localSum})
					}
					return state.sum
				},
				userInfo: function (state) {
					let localMember = JSON.parse(window.localStorage.getItem('member'))
					if (!state.member.name && localMember) {
						this.$store.commit('updateMember', {member: localMember})
					}
					return state.member
				},
				
			})
		},
		methods: {
			...mapActions([
				'updateMember', 'updateSum'
			]),
			tabFixed () {
				if (this.tabs.offsetTop <= (document.documentElement.scrollTop||document.body.scrollTop) + this.header.offsetHeight) {
					this.fixedTab = true
				} else {
					this.fixedTab = false
				}
			},
			clickActive (index, item) {
				this.tabActive = index
				this.swiperIndex = index
				this.translateWidth = this.tabWidth * index
				console.log(item)
				this.channels(item.id)
			},
			swiperChange (index) {
				this.clickActive(index + 1)
			},
			closeReceive () {
				this.isReceive = !this.isReceive
			},
			to (id) {
				this.loading(true, '加载中')
				this.$router.push(`/index/detail/${id}`)
			},

			// 每日礼包
			from () {
				let dailySignInSuccess = localStorage.getItem('dailySignInSuccess')
				if (!dailySignInSuccess) {
					let from = this.util.getUrlParam('from')
					if (from === 'dailySignInSuccess') {
						this.coinNum = Number(this.util.getUrlParam('coinNum'))
						localStorage.setItem('dailySignInSuccess', true)
						if (this.util.getUrlParam('hasDailyCoin') === 'true') {
							this.hasDailyCoin = true
						} else {
							this.hasDailyCoin = false
						}
						this.closeReceive()
					}
				}
					
			},

			show (item, val) {
				// if (item.href) {
				// 	window.location.href = 'http://mp.weixin.qq.com/s/M_zw6LbU_UU4RRcKta1LaA'
				// 	return false
				// }
				if (item.link) {
					this.$router.push(item.link)
				} else {
					switch (val) {
						case 0:
							this.isHidden = true
							this.isDailyGiftBag = !this.isDailyGiftBag
							break
						// case 1:
						// 	this.isInvitingFriends = !this.isInvitingFriends
						// 	break
						case 1:
							this.isHidden = true
							this.isLoginBonus = true
							break
					}
				}
			},
			getMasks (val) {
				switch (val) {
					case 0:
						this.isHidden = false
						this.isDailyGiftBag = !this.isDailyGiftBag
						break
					case 1:
						this.isInvitingFriends = !this.isInvitingFriends
						break
					case 2:
						this.isHidden = false
						this.isLoginBonus = false
						break
				}
			},
			showInviting (val) {
				this.isInvitingMask = val
			},
			coinsConfig () {
				api.coinsConfig().then(res => {
					// console.log('coinsConfig')
					// console.log(res.data)
				})
			},
			// 频道分类
			getChannelsType () {
				api.getChannelsType(1).then(res => {
					if (res.data.errCode === 0) {
						console.log('getChannelsType')
						console.log(res.data)
						res.data.list.map(item => {
							this.channelsTypeList.push(item)
						})
						this.tabWidth = window.innerWidth / this.channelsTypeList.length

						let channelsType = JSON.parse(localStorage.getItem('channelsType'))
						if (channelsType) {
							
							this.channelsTypeList.map((item, index) => {
								if (item.id === channelsType.id) {
									// this.clickActive(index, item)
									this.tabActive = index
									this.swiperIndex = index
									this.translateWidth = this.tabWidth * index
								}
							})
							let newsList = JSON.parse(localStorage.getItem('newsList'))
							console.log('newsList === ', newsList)
							if (newsList.length > 0) {
								newsList.map(item => {
									this.newsList.push(item)
								})
							}

							this.isScrollTop = true
							let scrollTop = Number(localStorage.getItem('scrollTop'))
							if (this.isScrollTop && scrollTop !== 0) {
								setTimeout(() => {
									document.documentElement.scrollTop = scrollTop
									document.body.scrollTop = scrollTop
								}, 100)
							}
							this.isScrollTop = false
						} else {
							this.channels()
						}
					}
				})
			},
			// 获取娃娃机列表
      channels (id) {
				if (id && this.id === id)	return
				else this.id = id

				if (id || id === '') {
					this.search.categoryId = id
					this.search.start = 0
					this.newsList = []
					this.shows = false
				}

				api.channelsV1(this.search).then(res => {
					if (res.data.errCode === 0) {
						console.log(res.data)
            this.total = res.data.count

						// if (id || id === '') this.newsList = []
						if (this.total === 0) this.shows = true
						for (var i = 0; i < res.data.list.length; i++) {
							this.newsList.push(res.data.list[i])
						}
						if (this.total <= this.newsList.length) this.shows = true
						this.sw = true
		
						this.search.start = this.search.start + this.search.limit

						// let scrollTop = Number(localStorage.getItem('scrollTop'))
						// if (this.isScrollTop && scrollTop !== 0) {
						// 	setTimeout(() => {
						// 		document.documentElement.scrollTop = scrollTop
						// 		document.body.scrollTop = scrollTop
						// 	}, 100)
						// }
						this.isScrollTop = false
					}
				})
			},
      setScroll () {
				this.scrollTop = document.documentElement.scrollTop||document.body.scrollTop
				// console.log(this.scrollTop)
				if (document.body.scrollHeight - window.innerHeight - 500 <= document.documentElement.scrollTop||document.body.scrollTop) {
				// if (document.body.scrollHeight - window.innerHeight - 500 <= window..scrollTop) {
					if (this.total <= this.newsList.length) {
						this.shows = true
					} else {
						if (this.sw === true) {
							this.sw = false
							this.shows = false
							this.channels()
						}
					}
				}
			},
		}
	}
</script>

<style lang="less">
	.hidden {
		overflow: hidden;
	}
  .main {
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
		background-size: 100%;
		height: 100%;
		// overflow: scroll;
		// -webkit-overflow-scrolling: touch;
		.header {
			// padding: 0 1.5rem;
			display: flex;
			justify-content: space-between;
			height: 5rem;
			align-items: center;
			position: fixed;
			width: 100%;
			z-index: 5;
			background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
			background-size: 100%;
			.user-info {
				display: inline-flex;
				align-items: center;
				position: relative;
				padding-left: 1.5rem;
				img {
					width: 3.5rem;
					height: 3.5rem;
					border-radius: 50%;
					margin-right: 5px;
				}
				.vip {
					position: absolute;
					width: 1.6rem;
					height: 1.6rem;
					background: rgb(255, 204, 0);
					color: #fff;
					border-radius: 50%;
					font-size: 1rem;
					line-height: 2rem;
					text-align: center;
					left: 2.6rem;
					top: 0;
				}
				p {
					display: inline-flex;
					// align-items: center;
					color: #fff;
					font-size: 1.6rem;
					line-height: 2rem;
					flex-flow: column;
					.icon {
						width: 25px;
						height: 25px;
						margin-right: 5px;
					}
				}
			}
			.function {
				position: relative;
				display: inline-flex;
				padding-right: 1.5rem;
				.img {
					width: 3.2rem;
					line-height: 0;
					&:not(:last-child) {
						margin-right: 1.6rem;
					}
					img {
						width: 100%;
					}
					
					@keyframes shake {
						0% {
							transform: rotateZ(0deg);
						}
						2.5% {
							transform: rotateZ(25deg);
						}
						// 5% {
						// 	transform: rotateZ(0deg);
						// }
						7.5% {
							transform: rotateZ(-25deg);
						}
						12.5% {
							transform: rotateZ(25deg);
						}
						7.5% {
							transform: rotateZ(-25deg);
						}
						20% {
							transform: rotateZ(0deg);
						}
						100% {
							transform: rotateZ(0deg);
						}
					}
					.lihe {
						animation: shake 2s linear 0s infinite normal;
					}
				}
			}
		}
		.main-box {
			background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
			background-size: 100%;
			overflow-y: scroll;
			padding-top: 5rem;
			// position: fixed;
			// left: 0;
			// right: 0;
			// bottom: 0;
			// top: 5rem;
			.function-button {
				display: flex;
				background: #fff;
				justify-content: space-around;
				padding: 1.5rem 0;
				.button-item {
					display: inline-flex;
					flex-flow: column;
					justify-content: center;
					align-items: center;
					font-size: 1.4rem;
					line-height: 1;
					img {
						width: 4rem;
						height: 4rem;
						margin-bottom: 10px;
					}
				}	
			}
			.tabs {
				position: relative;
				background: #fff;
				height: 44px;
		
				.tabs_wrap {
					height: 44px;
					position: absolute;
					// top: 0;
					left: 0;
					right: 0;
					overflow: hidden;
					z-index: 5;
					&:after {
						content: '';
						position: absolute;
						top: 0;
						left: 0;
						width: 200%;
						height: 200%;
						transform: scale(0.5);
						transform-origin: 0 0;
						pointer-events: none;
						box-sizing: border-box;
						border: 0 solid #e5e5e5;
						border-width: 1px 0;
						z-index: 2;
					}
					.tabs_nav {
						display: flex;
						user-select: none;
						background-color: #fff;
						position: relative;
						height: 100%;
						padding-bottom: 15px;
						box-sizing: content-box;
						.tabs_nav-bar {
							z-index: 0;
							left: 0;
							bottom: 15px;
							height: 2px;
							position: absolute;
							background-color: #f44;
							transition-duration: .2s;
						}
						.tab-item {
							z-index: 5;
							flex: 1;
							cursor: pointer;
							padding: 0 5px;
							height: 44px;
							font-size: 1.4rem;
							position: relative;
							color: #333;
							line-height: 44px;
							text-align: center;
							box-sizing: border-box;
							// background-color: #fff;
							min-width: 0;
							&:active {
								background-color: #e8e8e8;
							}
						}
						.tab-active {
							color: #f44;
						}
					}
					.tabs_nav--line {
						height: 100%;
						padding-bottom: 15px;
						box-sizing: content-box;
					}
				}
				.fixed {
					position: fixed;
					top: 45px;
					// left: 0;
					// width: 100%;
					background: #fff;
					// z-index: 5;
				}
			}
			.listImg {
				display: flex;
				flex-flow: row wrap;
				// overflow: scroll;
			}
		}
  }
</style>