<template>
	<div class="main">
		<div class="header">
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
        <router-link tag="i" class="img" :to="{path: '/myInfo/recharge'}">
          <img src="http://wawa-1255600302.file.myqcloud.com/images/pay1.png" alt="">
        </router-link>
        <router-link tag="i" class="img" :to="{path: '/myInfo'}">
          <img src="http://wawa-1255600302.file.myqcloud.com/images/setting1.png" alt="">
        </router-link>
      </div>
    </div>
		<scroller height="-45" v-model="scrollerStatus" scrollbar-y lock-x ref="scroller" :scroll-bottom-offset="150" :pulldown-config="pulldown" :use-pulldown='false'  @on-pulldown-loading="channels(true)" @on-scroll-bottom="channels">
      <div>
				<swiper moduleName="News" :type="false"></swiper>
				<div class="function-button">
					<div class="button-item" v-for="(item, i) in functionButtons" :key="i" @click="show(item, i)">
						<img :src="`http://wawa-1255600302.file.myqcloud.com/images/${item.imgName}.png`" alt="">
						<span>{{item.title}}</span>
					</div>
				</div>
				<div class="listImg">
					<div class="graphic" v-for="(item, i) in newsList" :key="i" @click="to(item.id)">
						<graphic :item="item"></graphic>
					</div>
				</div>
        <divider v-if="onData" style="color: rgb(125, 113, 113); font-size: 1.4rem;">我是有底线的</divider>
        <load-more tip="数据加载中" v-else style="margin-bottom:80px;"></load-more>
      </div>
    </scroller>
		<login-bonus :visibile="isLoginBonus" @close="getMasks"></login-bonus>
		<daily-gift-bag :visibile="isDailyGiftBag" @close="getMasks"></daily-gift-bag>
		<inviting-friends :visibile="isInvitingFriends" @close="getMasks" @show="showInviting" ref="inviting"></inviting-friends>
		<inviting-mask :visibile="isInvitingMask" @close="showInviting"></inviting-mask>
		<receive :visibile="isReceive" @close="closeReceive" :hasDailyCoin="hasDailyCoin" :coinNum="coinNum"></receive>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider } from 'vux'
	import Graphic from '../Common/Graphic'
	import { mapState, mapActions } from 'vuex'
	import Swiper from '../Common/Swiper'
	import LoginBonus from '../Functions/LoginBonus'
	import DailyGiftBag from '../Functions/DailyGiftBag'
	import InvitingFriends from '../Functions/InvitingFriends'
	import InvitingMask from './InvitingMask'
	import Receive from '../Functions/Receive'

	export default {
		components: {
			Group, Graphic, Scroller, LoadMore, Divider, Swiper, LoginBonus, DailyGiftBag, InvitingFriends, InvitingMask, Receive
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
				functionButtons: [{ title: '每日礼包', imgName: 'btn_1' }, { title: '邀请有礼', imgName: 'btn_2' }
				, { title: '新手福利', imgName: 'btn_3' }, 
				// { title: '每日任务', imgName: 'btn_4', link: '/DailyTasks' }, { title: '玩家秀', imgName: 'btn_5', link: '/GamePlayerShow' }
				],
				coins: {},
				search: {
					start: 0,
					limit: 10,
					count: 0,
				},
				isLoginBonus: false,
				isDailyGiftBag: false,
				isInvitingFriends: false,
				isInvitingMask: false,
				isReceive: false,
				coinNum: 0,
				hasDailyCoin: false,
			}
		},
		created () {

		},
		mounted() {
      this.$nextTick(() => {
				this.$refs.scroller.reset({ top: 0 })
			})

			let share = localStorage.getItem('share')
			if (share) {
				this.isInvitingFriends = true
				this.$refs.inviting.create()
			}
			this.from()
		},
		beforeDestroy() {
			localStorage.removeItem('share')
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
			closeReceive () {
				this.isReceive = !this.isReceive
			},
			to (id) {
				this.loading(true, '加载中')
				this.$router.push(`/index/detail/${id}`)
			},
			from () {
				let from = this.util.getUrlParam('from')
				if (from === 'dailySignInSuccess') {
					this.coinNum = Number(this.util.getUrlParam('coinNum'))
					if (this.util.getUrlParam('hasDailyCoin') === 'true') {
						this.hasDailyCoin = true
					} else {
						this.hasDailyCoin = false
					}
					this.closeReceive()
					console.log(typeof this.coinNum)
				}
			},
			show (item, val) {
				if (item.link) {
					this.$router.push(item.link)
				} else {
					switch (val) {
						case 0:
							this.isDailyGiftBag = !this.isDailyGiftBag
							break
						case 1:
							this.isInvitingFriends = !this.isInvitingFriends
							this.$refs.inviting.create()
							break
						case 2:
							this.isLoginBonus = true
							break
					}
				}
			},
			getMasks (val) {
				switch (val) {
					case 0:
						this.isDailyGiftBag = !this.isDailyGiftBag
						break
					case 1:
						this.isInvitingFriends = !this.isInvitingFriends
						break
					case 2:
						this.isLoginBonus = false
						break
				}
			},
			showInviting (val) {
				this.isInvitingMask = val
			},
			coinsConfig () {
				api.coinsConfig().then(res => {
					console.log('coinsConfig')
					console.log(res.data)
				})
			},
			// 获取娃娃机列表
			channels(up) {
				if (up) {
					this.search.start = 0	
					this.onFetching = false
					console.log('pulldown')
				}
				if (this.onFetching) {
					return
				} else {
					this.onFetching = true
					if (this.search.count < this.search.start && this.search.count != 0) {
						this.onData = true
						return
					}
					api.channels(this.search).then(res => {
						console.log(res.data)
						// alert(JSON.stringify(res.data))
		    		let data = res.data.list
		    		this.search.count = res.data.count
						if (this.search.count <= this.search.limit) this.onData = true
						if (up) this.newsList = []
		    		data.map(item => {
		    			this.newsList.push(item)
						})
						this.search.start = this.search.start
						this.search.start = this.search.start + this.search.limit
						console.log(this.newsList)
		    		this.$nextTick(() => {
							if (up) {
								this.$refs.scroller.donePulldown()
    						this.$refs.scroller.reset({top: 0})
							} else {
								this.$refs.scroller.reset()
							}
		    		})
						this.onFetching = false
		    	}).catch(err => {
		    		this.onFetching = false
		    		console.log('获取列表接口失败', err)
		    	})
				}
	    },
		}
	}
</script>

<style lang="less" scoped>
 .main {
	 	background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
 }
	.listImg {
		display: flex;
		flex-flow: row wrap;
	}
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
	.header {
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    height: 5rem;
    align-items: center;
    .user-info {
      display: inline-flex;
			align-items: center;
			position: relative;
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
      .iconfont {
        font-size: 30px;
        color: #fff;
        margin-left: 5px;
      }
      .img {
        width: 3.2rem;
        height: 3.2rem;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        &:first-child {
          right: 50px;
        }
        img {
          width: 100%;
        }
      }
    }
  }
</style>