<template>
	<div id="detail" class="detail" :style="{height: `${boxHeight}px`}">
		<!-- 标题title -->
		<div v-title v-if="this.doll.name">{{this.doll.name}}</div>
		<!-- 直播box页面内容 -->
		<div class="live-box" :style="{height: `${height}px`}">
			<!-- 玩家信息 -->
			<div class="my-info" v-if="member.nickname">
				<div class="img" v-if="member.headImage">
					<img :src="member.headImage" alt="">
				</div>
				<div class="text">
					<p>{{member.nickname || player}}游戏中</p>
					<p>{{audience}}人在房间</p>
				</div>
			</div>
			<!-- 右边按钮 -->
			<div class="right-btn">
				<i class="iconfont history" @click="getRecord(true)" v-show="!isGame">
					<img src="http://wawa-1255600302.file.myqcloud.com/images/jilu.png" alt="">
					<span>历史</span>
				</i>
				<i class="iconfont detail"  @click="closeDetail(true)" v-show="!isGame">
					<img src="http://wawa-1255600302.file.myqcloud.com/images/wawa.png" alt="">
					<span>详情</span>
				</i>
				<i class="iconfont change" @click="changeSwitch">
					<img src="http://wawa-1255600302.file.myqcloud.com/images/she.png" alt="">
					<span>切换</span>
				</i>
			</div>

			<!-- <div class="user-list">
				<div class="user-item" v-for="(item, i) in waitQueueInfo" :key="i">
					<img :src="item.data.headImage" alt="">
				</div>
			</div> -->

			<!-- 游戏倒计时 -->
			<div class="count-down" v-if="isGame">
				<span>{{countNum}}S</span>
			</div>
			<!-- 直播页面显示 -->
			<div class="live">
				<!-- loading -->
				<loading-circle :visibile="isLoading" v-if="isStream"></loading-circle>
				<!-- 维护 -->
				<div class="wh" v-else>
					<img src="http://wawa-1255600302.file.myqcloud.com/images/wh.png" alt="">
				</div>
				<!-- 直播流 -->
				<!-- <div class="frontview">
					<canvas id="frontview" :class="{active: isSwitch}"></canvas>
					<loading-circle :visibile="isLoading" v-if="isStream"></loading-circle>
				</div>
				<div class="sideview">
					<canvas id="sideview"></canvas>
				</div> -->
				<canvas id="frontview" :class="{active: isSwitch}"></canvas>
        <canvas id="sideview"></canvas>
			</div>
		</div>
		<!-- 游戏按键 -->
		<div class="operation" v-if="isGame">
			<!-- GO键 -->
			<div class="go" @click="gotocatch" :class="{'game-end': gameEnd}">
				<div class="key">
					<p>GO</p>
				</div>
			</div>
			<!-- 方向键（兼容PC端/移动端） -->
			<!-- PC端 -->
			<div class="direction" v-if="isPC">
				<div class="game-button top" @click="directionKey(531, 528)" :class="{'key-end': gameEnd}">
					<div class="key">
						<p><i class="iconfont icon-jiantou-copy-copy-copy"></i></p>
					</div>
				</div>
				<div class="game-button bottom" @click="directionKey(530, 529)" :class="{'key-end': gameEnd}">
					<div class="key">
						<p><i class="iconfont icon-back"></i></p>
					</div>
				</div>
				<div class="game-button left" @click="directionKey(528, 530)" :class="{'key-end': gameEnd}">
					<div class="key">
						<p><i class="iconfont icon-jiantou3"></i></p>
					</div>
				</div>
				<div class="game-button right" @click="directionKey(529, 531)" :class="{'key-end': gameEnd}">
					<div class="key">
						<p><i class="iconfont icon-jiantou"></i></p>
					</div>
				</div>
			</div>
			<!-- 移动端 -->
			<div class="direction" v-else>
				<div class="game-button top" @touchstart="directionKey(531, 528)" @touchend="clearLoop" :class="{'key-end': gameEnd}">
					<div class="key">
						<p><i class="iconfont icon-jiantou-copy-copy-copy"></i></p>
					</div>
				</div>
				<div class="game-button bottom" @touchstart="directionKey(530, 529)" @touchend="clearLoop" :class="{'key-end': gameEnd}">
					<div class="key">
						<p><i class="iconfont icon-back"></i></p>
					</div>
				</div>
				<div class="game-button left" @touchstart="directionKey(528, 530)" @touchend="clearLoop" :class="{'key-end': gameEnd}">
					<div class="key">
						<p><i class="iconfont icon-jiantou3"></i></p>
					</div>
				</div>
				<div class="game-button right" @touchstart="directionKey(529, 531)" @touchend="clearLoop" :class="{'key-end': gameEnd}">
					<div class="key">
						<p><i class="iconfont icon-jiantou"></i></p>
					</div>
				</div>
			</div>
		</div>
		<!-- 预约界面 -->
		<div id="operation" class="operation game-btn" v-else>
			<div class="game">
				<div class="key" :class="{'key-order': order == 1}">
					<div class="text" :class="[order == 1 ? 'order' : order == 2 ? 'start' : '']">
						<div v-if="order === 0" @click="appointmentClientHandler">
							<p>开始抓娃娃</p>
							<p>前面：{{beforeQueueNum}}人</p>
						</div>
						<div v-if="order === 1" @click="cancelAppointment">
							<p>取消预约</p>
							<p>预约成功，你排在第{{afterQueueNum}}位</p>
						</div>
					</div>
				</div>
			</div>
			<!-- 显示/隐藏聊天框 -->
			<div class="message-box">
				<div class="message-jiantou" @click="showMessage">
					<i class="iconfont icon-shang1" v-if="isMessage"></i>
					<i class="iconfont icon-xia1" v-else></i>
				</div>
			</div>
			<!-- 显示输入框 -->
			<div class="btn-game message" @click="closeChat">
				<div class="key">
					<i class="iconfont icon-liaotian"></i>
				</div>
			</div>
			<!-- 返回 -->
			<p class="back" @click="back">返回</p>
			<!-- 右边金币部分 -->
			<div class="game-recharge">
				<p>本次{{doll.coinPrice}}金币</p>
				<p>余额{{sum}}金币</p>
				<p class="recharge-btn" @click="recharge">去充值</p>
			</div>
		</div>
		<!-- 抓中记录 -->
		<record-list :visibile="isRecord" @close="getRecord" ref="record"></record-list>
		<!-- 背景音乐/音效 -->
		<audio id="audio" :src="gameAudio.onCatchButtonClickAudio" v-if="soundConfig.playHintSound"></audio>
		<audio id="bg-audio" :src="gameAudio.onPlayingAudio" loop="loop" preload="auto" v-if="soundConfig.playBackgroundSound"></audio>
		<!-- 成功/失败弹窗 -->
		<success :visibile="isSuccess" @close="closeSuccess" @appointment="appointmentClientHandler" @showInviting="showInviting" :playAgainCountDown="playAgainCountDown"></success>
		<fail :visibile="isFail" @close="closeFail" @appointment="appointmentClientHandler" :playAgainCountDown="playAgainCountDown"></fail>
		<!-- 娃娃详情介绍 -->
		<doll-detail :visibile="isDetail" @close="closeDetail" :content="doll.content"></doll-detail>
		<!-- 准备页弹窗 -->
		<ready :coinPrice="doll.coinPrice" :visibile="isReady" :upornotCountDown="upornotCountDown" @close="closeReady"></ready>
		<!-- 引导弹窗 -->
		<guide :visibile="isGuide" @close="closeGuide"></guide>
		<!-- 聊天/弹幕 -->
		<chat-input ref="chatInput" :visibile="isMessage" @change="changeMessage" :member="member"></chat-input>
		<!-- 转发遮罩 -->
		<inviting-mask :visibile="isInvitingMask" @close="showInviting"></inviting-mask>
		<!-- vip提示 -->
		<vip-guide :visibile="isVipGuide" @close="closeVipGuide"></vip-guide>
		<!-- 新手引导 -->
		<novice-guidance :visibile="isNoviceGuidance" @close="closeNoviceGuidance"></novice-guidance>
	</div>
</template>

<script>
	// 引入组件
  import { InlineLoading } from 'vux'
	import RecordList from './RecordList'
	import Tip from './Tip'
	import Success from './success'
	import Fail from './fail'
	import Help from './help'
	import DollDetail from './dollDetail'
	import Ready from './ready'
	import Guide from './guide'
	import VipGuide from './vipGuide'
	import Barrage from './barrage'
	import ChatInput from './chatInput'
	import InvitingMask from './InvitingMask'
	import LoadingCircle from '../Common/Loading-circle'
	import NoviceGuidance from './NoviceGuidance'
	// 引入js
	import api from '../../api/api'
	import { ZegoClient } from 'assets/js/jZego-1.0.9.min.js'
	import axios from 'axios'
	import qs from 'qs'
	import { mapState, mapActions } from 'vuex'
	import debugout from 'debugout.js'

	let zg = new ZegoClient()
	let bugout = new debugout()

	export default {
		components: {
			RecordList, Tip, Success, Fail, Help, Ready, Barrage, ChatInput, Guide, DollDetail, InlineLoading, InvitingMask, LoadingCircle, VipGuide, NoviceGuidance
		},
		data () {
			return {
				loginTokenUrl: 'http://106.15.41.49:8181/token', // 登陆请求token
				payTokenUrl: 'http://106.15.41.49:8181/pay', //支付请求token
				zgConfig: {  // 参数配置
					appid: '',         // 必填，应用id，由即构分配 3177435262  1328938424
					idName: '',       // 必填，用户自定义id
					nickName: '',   // 必填，用户自定义昵称
					server: '',
					logUrl: '',
					logLevel: 1
				},
				login: {  // 登陆参数配置
					roomid: '',
					role: 1,
					token: '',
				},
				anchor_id: '', 
				$frontView: '',
				$sideView: '',
				videoVolumeList: [50, 0],
				beforeQueueNum: 0,  // 队列前人数
				afterQueueNum: 0, // 排在第几位
				audience: 0, //共多少人在房间
				seq: 1,
				clientSeq: 1,  // 发送客户端请求seq
				serverSeq: 0,  // 发送服务端返回seq
				sessionID: 0, // 此次抓娃娃的sessionid， 后续指定都要带上 的sessionid
				custom_seq: 1,
				playingStatus: false, //是否游戏中
				playCountDownTime: 30, //游戏倒计时
				upornotCountDownTime: 10, //上机倒计时
				playAgainCountDown: 10, // 再玩一次秒数
				countDownTimer: '', 
				loginToken: '',  // 登陆token
				payToken: '',  // 支付token
				itemType: 'itme_type1',
				itemPrice: 6, 
				payPrice: 0, // 支付金额
				ls: localStorage, // localStorage
				useLocalStreamList: [],
				isSwitch: true, // 切换视角
				RECVCMD: {  // 接受信令类型
					broadcast: 257,  // 广播
					appointment: 272, // 预约
					cancelAppointment: 274, // 取消预约
					upSelect: 258,  // 上机
					upSelectRsp: 273,  // 下爪
					operateResult: 260, // 操作结果
					gameInfo: 275
				},
				wwjPlayer: null,  //当前游戏人
				anchorWrapper: true,
				player: '',  // 当前游戏人昵称
				waitQueue: [], 
				waitQueueInfo: [],
				waitPosition: 0,
				countDownTimer: null,
				countNum: 30,
				upornotCountDown: 10,
				operateStatus: false,
				ENUM_STREAM_UPDATE_TYPE: { added: 0, deleted: 1 },
				useStreamList: [],
				isInvitingMask: false,
				isSuccess: false,  // 成功
				isFail: false,  // 失败
				isHelp: false,  // 帮助
				isReady: false,  // 准备
				isChat: false,  // 聊天
				loop: '',  // 长按循环
				signal: true,  // 信号
				isStream: true, // 是否有流
				isGuide: false,
				isVipGuide: false,
				isPC: false,
				isDetail: false,
				isNoviceGuidance: false,
				member: {},
				doll: {},
				isRecord: false, // 显示本机抓取记录
				order: 0, // 0为预约，1为取消预约
				height: 0,
				isGame: false, // 是否游戏
				gameEnd: false, // 是否点击go
				isTip: false, 
				boxHeight: 0,
				payTimestamp: 0,
				isInitApply: true,
				// 申请预约
				appointmentTimer: null, // 预约重试计时器
				tryAppointmentCount: 0, // 当前预约重试次数
				tryAppointmentMaxCount: 5, // 最大预约重试次数
				// 取消预约
				cancelAppointmentTimer: null, // 取消预约重试计时器
				tryCancelAppointmentCount: 0, // 当前取消预约重试次数
				tryCancelAppointmentMaxCount: 5, // 最大取消预约重试次数
				// 上机尝试
				upToPlayTimer: null,
				tryUpToPlayCount: 0,
				tryUpToPlayMaxCount: 5,
				// 放弃上机
        giveUpPlayTimer: null,
    		tryGiveUpPlayCount: 0,
				tryGiveUpPlayMaxCount: 5,
				dollCatchId: '',
				isLoading: true,
				isMessage: true,
				config: '',
				totalRandom: this.util.random(20, 40),
				gameAudio: {},
				confirmTocancelStatus: true,
				isPay: false,
				isCreateGrabDoll: 0,
			}
		},
		created () {
			this.IsPC()
			bugout.clear()
			this.getGameAudioConfig()
		},
		mounted () { 
			let detail = document.getElementById('operation')
			detail.oncontextmenu = e => {
				e.preventDefault()
			}

			// window.addEventListener('contextmenu', function (e) {
			// 	e.preventDefault();
			// })
			this.boxHeight = window.innerHeight
			this.height = window.innerHeight - 160
			window.onresize = () => {
				this.boxHeight = window.innerHeight
				this.height = window.innerHeight - 160
			}
			this.channelsDetail()
			
			// 自定义命令消息通知
			zg.onRecvCustomCommand = (from_userid, from_idName, custom_content) => {
				var recvCustomContent = {}
				try {

					recvCustomContent = JSON.parse(custom_content)
				} catch (e) {
					console.log('解析服务器返回的消息失败了！ = ', e)
				}

				custom_content = JSON.parse(custom_content)
				if (custom_content.data.player) {
					if (this.player === '') {
						let player = custom_content.data.player
						if (player.name) {
							this.player = player.name
						}
					}
				}
					
				// 516,517 需要seq   在data里面带服务端的返回的seq
				if (custom_content.cmd === this.RECVCMD.broadcast) {

					// 全员广播
					this.broadcastHandler(custom_content)
				} else if (custom_content.cmd === this.RECVCMD.appointment) {

					// 告知本次预约请求是否成功，预约成功则进入排队阶段，否则失败
					this.appointmentHandler(custom_content)
				} else if (custom_content.cmd === this.RECVCMD.cancelAppointment) {

					// 取消本次预约
					this.cancelAppointmentHandler(custom_content)
				} else if (custom_content.cmd === this.RECVCMD.upSelect) {

					// 收到回应，是否要付费上机
					this.upSelectHandler(custom_content)
				} else if (custom_content.cmd === this.RECVCMD.upSelectRsp) {

					// 服务端返回的信息   对客户端发送的确认上机或者放弃玩游戏指令的回应
					this.upSelectRspHandler(custom_content)
				} else if (custom_content.cmd === this.RECVCMD.operateResult) {

					// 收到本次抓娃娃的结果
					this.operateResultHandler(custom_content)
				} else if (custom_content.cmd === this.RECVCMD.gameInfo) {
					// alert(custom_content.cmd)
					// 收到本次游戏信息
					this.gameInfoHandler(custom_content)
				}
			}

			zg.onDisconnect = err => {
        alert('您断开连接了,请刷新页面！');
        this.$router.go(-1)
			}

			zg.onKickOut = err => {
        alert('您被踢下线了,请刷新页面！');
        this.$router.go(-1)
			}

			// 流状态变更通知，（不包含增加，删除）
			zg.onstreamExtraInfoUpdated = streamList => {}

			// 流更新通知
			zg.onStreamUpdated = (type, streamList) => {
				if (type === this.ENUM_STREAM_UPDATE_TYPE.added) {
					var tempStreamList = this.updateStreamInfo(streamList, this.ENUM_STREAM_UPDATE_TYPE.added)
					var useFlag = true, streamInfo
					if (tempStreamList) {
						for (var i = tempStreamList.length - 1; i >= 0; i--) {
							useFlag = false
							streamInfo = tempStreamList[i]
							for (var j = 0; j < this.useLocalStreamList.length; j++) {
								if (this.useLocalStreamList[j].stream_id === streamInfo.stream_id) {
									useFlag = true
									break
								}
							}
							if (!useFlag) {
								this.useLocalStreamList.push(streamInfo)
							}
						}
					}
				} else if (type == this.ENUM_STREAM_UPDATE_TYPE.deleted) {
					// console.log('streamupdate delete')
					if (this.useLocalStreamList) {
						this.deleteStreamInfo(streamList)
					}
				}
			}

			// 流信息变更通知，（不包含增加，删除）
			zg.onPlayStateUpdate = (type, streamID) => {
				// console.log('客户端-onPlayStateUpdate = ', type, streamID)
				if (type === 0) {
					for (var i = 0; i < this.useLocalStreamList.length; i++) {
						if (this.useLocalStreamList[i].stream_id === streamID) {
							if (this.useLocalStreamList[i].videoView.nextElementSibling) {
								// this.isLoading = false
								// this.useLocalStreamList[i].videoView.nextElementSibling.style.display = 'none'
							}
						}
					}
				}
			}

			// 拉流质量回调
			zg.onPlayQualityUpdate = (streamID, streamQuality) => {
				// console.log('客户端-onPlayQualityUpdate = ', streamID, streamQuality.fps, streamQuality.kbs)
			}

			// 房间成员变化回调
			zg.onUserStateUpdate = (roomId, userList) => {
				console.log('房间成员变化回调')
				// console.log(roomId)
				console.log(userList)
			}

			window.onresize = () => {
				this.IsPC()
			}
			this.loading(false)

			document.addEventListener('visibilitychange', function(event) {
				// document.title = document.hidden ? '用户离开了' : '用户回来了'
				// if (document.hidden) {
				// 	console.log('用户离开了')
				// 	if (this.useLocalStreamList.length > 0) {
				// 		zg.stopPlayingStream(this.useLocalStreamList[1].stream_id)
				// 		zg.stopPlayingStream(this.useLocalStreamList[0].stream_id)
				// 	}
				// } else {
				// 	console.log('用户回来了')
				// 	zg.startPlayingStream(useStreamList[m].stream_id, useStreamList[m].videoView)
				// }
			});

		},
		// 组件销毁，退出时执行
		beforeDestroy() {
			if (this.againStatus === 'true') this.confirmTocancel(true)
			if (this.useLocalStreamList.length > 0) {
				zg.stopPlayingStream(this.useLocalStreamList[1].stream_id)
				zg.stopPlayingStream(this.useLocalStreamList[0].stream_id)
			}
			zg.release()
			zg.logout()
			console.log("登出房间")
			this.getLog()
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
				soundConfig: function (state) {
					let soundConfig = JSON.parse(window.localStorage.getItem('soundConfig'))
					this.$store.commit('updateSoundConfig', {soundConfig: soundConfig})
					return state.soundConfig
				},
				againStatus: function (state) {
					let againStatus = window.localStorage.getItem('againStatus')
					this.$store.commit('updateAgainStatus', {againStatus: againStatus})
					return state.againStatus
				}
			})
		},
		methods: {
			...mapActions([
				'updateMember', 'updateSum', 'updateAgainStatus'
			]),

			// 获取游戏音效
			getGameAudioConfig () {
				api.getGameAudioConfig().then(res => {
					if (res.data.errCode === 0) {
						this.gameAudio = res.data.data
					}
				})
			},

			// 发送log日志
			getLog () {
				let log = bugout.getLog()
				bugout.clear()
				let params = { log: log, machineId: this.doll.machine.id }
				api.setLog(params).then(res => {
					bugout.clear()
				})
			},

			// 返回
			back () {
				this.$router.push('/index')
			},

			// 去充值
			recharge () {
				this.$router.push('/myInfo/recharge')
			},

			// 判断是PC端还是移动端
			IsPC () {
				this.isPC = this.util.IsPC()
			},

			// 排队玩家
			waitQueueInfoPush () {
				if (this.waitQueue.length > 0) {
					if (this.waitQueueInfo.length === 0) {
						this.waitQueue.map(item => {
							this.memberInfo(item.name, item.id)
						})
					} else {
						for (let i = 0; i < this.waitQueueInfo.length; i++) {
							for (let j = 0; j < this.waitQueue.length; i++) {
								if (this.waitQueueInfo[i].id !== this.waitQueue[j].id) {
									this.waitQueueInfo.splice(i, 1)
								}
							}
						}
						for (let i = 0; i < this.waitQueue.length; i++) {
							for (let j = 0; j < this.waitQueueInfo.length; i++) {
								if (this.waitQueue[i].id !== this.waitQueueInfo[j].id) {
									this.memberInfo(this.waitQueue[i].name, this.waitQueue[i].id)
								}
							}
						}
					}
				} else {
					this.waitQueueInfo = []
				}
			},

			// 会员信息
			memberInfo (id, idName) {
				api.memberInfo(id).then(res => {
					console.log('会员信息')
					console.log(res.data)
					if (res.data.errCode === 0) {
						// this.member = res.data.data
						if (idName) this.waitQueueInfo.push({id: idName, data: res.data.data})
						else this.member = res.data.data
					} else {
						// this.member = {}
						if (!idName) this.member = {}
					}
				})
			},

			// 清空member
			clearMember () {
				this.member = {}
				this.player = ''
				console.log('清空member')
			},

			// 抓中转发文案
			showInviting (val) {
				this.isInvitingMask = val
				if (val) {
					let str = `哎哟，我又抓到了${this.doll.name}，快来和我一起哎呦抓娃娃吧`
					let img = this.img + this.doll.previewImage
					this.wxSdk.shareDetail(this.userInfo.id, str, img)
				} else {
					this.wxSdk.share(this.userInfo.id, this.userInfo.nickname)
				}
			},

			// 显示/隐藏聊天box
			changeMessage (val) {
				this.isMessage = val
			},
			// 显示/隐藏输入框
			showMessage () {
				this.isMessage = !this.isMessage
			},

			// 成功弹窗
			closeSuccess (status, val) {
				clearInterval(this.countDownTimer)
				this.playAgainCountDown = 10
				this.isSuccess = status
				if (status) {
					this.$refs.chatInput.success(this.member.nickname, this.doll.name)
					this.updateAgainStatus(true)
				} else {
					this.updateAgainStatus(false)
				}
				// 0 预约，1 再战，2 放弃
				if (val === 0) {
					this.appointmentClientHandler()
				} else if (val === 1) {
					this.pay()
				} else if (val === 2) {
					this.confirmTocancelStatus = false
					this.confirmTocancel(true)
					clearInterval(this.appointmentTimer)
					this.operateStatus = false
					this.clearMember()
				}
			},
			// 失败弹窗
			closeFail (status, val) {
				clearInterval(this.countDownTimer)
				this.playAgainCountDown = 10
				this.isFail = status
				if (status) {
					this.updateAgainStatus(true)
				} else {
					this.updateAgainStatus(false)
				}
				// 0 预约，1 再战，2 放弃
				if (val === 0) {
					this.appointmentClientHandler()
				} else if (val === 1) {
					this.pay()
				} else if (val === 2) {
					this.confirmTocancelStatus = false
					this.confirmTocancel(true)
					clearInterval(this.appointmentTimer)
					this.operateStatus = false
					this.clearMember()
				}
			},

			// 娃娃详情
			closeDetail (status) {
				this.isDetail = status
			},

			// 准备
			closeReady (status, val) {
				clearInterval(this.countDownTimer)
				this.upornotCountDown = 10
				this.isReady = status
				if (val) {
					this.pay()
				} else {
					this.confirmTocancel()
				}
			},

			// 引导充值
			closeGuide (status) {
				this.isGuide = status
			},

			// vip引导
			closeVipGuide (status) {
				this.isVipGuide = status
			},

			// 抓中记录
			closeRecord (val) {
				this.isRecord = val
			},

			// 显示/隐藏聊天框
			closeChat () {
				this.$refs.chatInput.hide()
			},

			// 新手引导
			closeNoviceGuidance (val, status) {
				this.isNoviceGuidance = val
				if (status) this.appointmentClientHandler()
			},

			// 抓中记录
			getRecord(val) {
				if (val) this.$refs.record.dollDetailRecord()
				this.isRecord = val
			},

			// 切换镜头
			changeSwitch () {
				this.isSwitch = !this.isSwitch
			},

			// localStorage 保存
			setLocal (key, value) {
				this.ls.setItem(key, value)
			},

			// localStorage 获取
			getLocal (key) {
				return this.ls.getItem(key)
			},

			// 音效
			play () {
				let audio = document.getElementById('audio');
				if (audio) audio.play()
			},

			// 背景音乐
			wawaPlay () {
				let audio = document.getElementById('bg-audio')
				if (audio) audio.play()
			},

			// 详情
			channelsDetail () {
				api.channelsDetail(this.$route.params.id).then(res => {
					if (res.data.errCode === 0) {
						this.doll = res.data.data
						bugout.log('========  machineId = ' + this.doll.machine.id + '===========')
						this.login.roomid = this.doll.machine.roomId
						this.zgConfig = Object.assign(this.zgConfig, this.doll.machineConfig)
						console.log(res.data.data)
						// this.login.roomid = 'WWJ_ZEGO_3291994de185'
						// let machineConfig = {
						// 	appid: 3265350344,
						// 	server: 'ws://wsliveroom3265350344-api.zego.im:8181/ws',
						// }
						// this.zgConfig = Object.assign(this.zgConfig, machineConfig)
						
						this.localIdName()
					} else {
						this.showInfo(res.data.errMsg)
					}
				})
			},

			// 设置zgConfig.idName zgConfig.nickName
			localIdName () {
				var localIdName = this.getLocal('idName')
				if (!localIdName) {
					this.zgConfig.idName = '' + new Date().getTime() + Math.floor(Math.random() * 100000)
					this.setLocal('idName', this.zgConfig.idName)
				} else {
					this.zgConfig.idName = localIdName
				}
				// this.zgConfig.headImage = this.userInfo.headImage
				this.zgConfig.nickName = this.userInfo.openId
				this.getToken()
			},

			// 获取token
			getToken () {
				let model = {
					app_id: this.zgConfig.appid,
					id_name: this.zgConfig.idName
				}
				axios.get(this.loginTokenUrl, {params: model}).then(res => {
					// console.log(res.data)
					this.login.token = res.data
					this.getElement()
				})
			},

			// 获取div frontview sideview
			getElement () {
				this.$frontView = document.getElementById('frontview');
				this.$sideView = document.getElementById('sideview');
				// 连接娃娃机
				this.ZegoClients()
			},

			// 连接娃娃机
			ZegoClients () {
				// 配置参数
				zg.config({
					appid: this.zgConfig.appid,
					idName: this.zgConfig.idName,
					nickName: this.zgConfig.nickName,
					server: this.zgConfig.server,
					logUrl: this.zgConfig.logUrl,
					logLevel: this.zgConfig.logLevel
				});
				console.log(zg)
				// 登陆房间
				zg.login(this.login.roomid, 2, this.login.token, streamList => {
					// console.log('登录成功回调', streamList)
					this.isLoading = false
					if (streamList.length > 0) {
						this.isStream = true
						this.wawaPlay()
					} else {
						this.isStream = false
					}
					// this.useStreamList = this.updateStreamInfo(streamList)
					this.useLocalStreamList = this.updateStreamInfo(streamList) || []
					this.getGameInfo()
					// this.confirmTocancel(true)
				}, err => {
					// console.log('失败', err)
					console.log(zg)
					this.isStream = false
				})
			},

			// 发送获取游戏信息指令
			getGameInfo () {
				console.log('发送获取游戏信息指令')
				let operateData = { time_stamp: new Date().getTime() }
				this.sendCustomCMD(++this.clientSeq, 518, operateData)
			},

			// 拉流
			updateStreamInfo (streamList, updateType) {
				if (!streamList) return
				var useStreamList = []
				if (streamList != null || streamList.length !== 0) {
					streamList.forEach(item => {
						this.anchor_id = item.anchor_id_name
						useStreamList.push(item)
					})
				}
				if (useStreamList.length !== 0) {
					useStreamList.forEach((item, index) => {
						if (item.stream_id.slice(-2) == '_2') {
							item.videoView = this.$frontView
							item.videoVolume = this.videoVolumeList[0]
						} else {
							item.videoView = this.$sideView
							item.videoVolume = this.videoVolumeList[1]
						}
					})

					var reUseStreamList = []
					if (this.useLocalStreamList.length !== 0) {
						var reUseFlag = true
						for (var k = 0; k < useStreamList.length; k++) {
							reUseFlag = false
							for (var j = 0; j < this.useLocalStreamList.length; j++) {
								if (this.useLocalStreamList[j].stream_id === useStreamList[k].stream_id) {
									reUseStreamList.push(useStreamList[k].stream_id)
									reUseFlag = true
									break
								}
							}
							if (updateType != this.ENUM_STREAM_UPDATE_TYPE.added && !reUseFlag) {
								zg.stopPlayingStream(this.useLocalStreamList[j].stream_id)
							}
						}	
					}
					// 将成功登录成功后的流与复用的流进行对比
					// 如果stream_id相等，则表示该流不变，
					// 如果不等，表示是新的流，需要启动拉流接口，进行播放
					var playFlag = true
					for (var m = 0; m < useStreamList.length; m++) {
						playFlag = false
						for (var n = 0; n < reUseStreamList.length; n++) {
							if (useStreamList[m] === reUseStreamList[n]) {
								playFlag = true
								break
							}
						}
						if (!playFlag) {
							// 不是重用的流可以重新设置播放，重用的不变
							// console.log('调用startPlayingStream拉流, 流id 和 流视图分别为： ', useStreamList[m].stream_id, useStreamList[m].videoView);
							zg.startPlayingStream(useStreamList[m].stream_id, useStreamList[m].videoView)
							zg.setPlayVolume(useStreamList[m].stream_id, useStreamList[m].videoVolume)
						}
					}
				}
				return useStreamList
			},

			// 删除流
			deleteStreamInfo (streamList) {
				if (!streamList) {
					return
				}
				var delStreamList = []
				if (streamList != null || streamList.length !== 0) {
					streamList.forEach(item => {
						if (item.anchor_nick_name.indexOf('WWJS') === 0) {
							delStreamList.push(item)
						}
					})
				}
				// console.log('删除流=', delStreamList)
				if (delStreamList.length > 0) {
					for (var i = this.useLocalStreamList.length - 1; i >= 0; i--) {
						for (var j = 0; j < delStreamList.length; j++) {
							if (this.useLocalStreamList[i].stream_id === delStreamList[j].stream_id) {
								zg.stopPlayingStream(this.useLocalStreamList[i].stream_id)
								this.useLocalStreamList.splice(i, 1)
								break
							}
						}
					}
				}
			},
			
			// 停止移动
			clearLoop () {
				if (this.gameEnd) return
				let operateData = { time_stamp: new Date().getTime() }
        this.sendCustomCMD(++this.clientSeq, 533, operateData);
			},

			// 方向键统一方法
			directionKey (index, index2) {
				if (this.gameEnd) return
				this.play()
				var curSeq = ++this.clientSeq
				if (this.isPC) {
					let operateData = { time_stamp: new Date().getTime() }
					if (this.isSwitch) {
						this.sendCustomCMD(curSeq, index, operateData)
					} else {
						this.sendCustomCMD(curSeq, index2, operateData)
					}
				} else {
					let operateData = { time_stamp: new Date().getTime() }
					if (this.isSwitch) {
						this.sendCustomCMD(curSeq, index, operateData)
					} else {
						this.sendCustomCMD(curSeq, index2, operateData)
					}
				}
			},

			// 下爪
			gotocatch () {
				if (this.gameEnd) return
				this.play()
				// console.log('go')
				var operateData = { time_stamp: new Date().getTime() };
				var catchData = { time_stamp: operateData.time_stamp, pay_token: this.payToken }
				this.sendCustomCMD(++this.clientSeq ,532, catchData)
				clearInterval(this.countDownTimer)
				setTimeout(() => {
					this.gameEnd = true
				}, 300)
			},

			/************** 预约重试 *************/
			// 循环尝试预约
			appointmentClientHandler () {
				if (this.doll.vip && !this.userInfo.charged) {
					this.closeVipGuide(true)
					return false
				}
				let audio = document.getElementById('bg-audio')
				if (audio && audio.paused) audio.play()
				this.isInitApply = true // 表示从点击预约按钮开始预约
				this.play()
				if (this.isStream) {
					this.confirmTocancelStatus = true
					if (this.sum >= this.doll.coinPrice) {
						this.tryAppointmentCount = 0
						if (this.appointmentTimer) {
							clearInterval(this.appointmentTimer)
						}
						this.appointment()
						this.appointmentTimer = setInterval(() => {
							this.appointment()
						}, 2000)
					} else {
						this.closeGuide(true)
					}
				} else {
					this.showInfo('此房间无直播，请切换房间')
				}
			},

			// 申请预约
			appointment () {
				this.tryAppointmentCount++
				// 超过最大尝试预约次数，不再继续尝试预约
				if (this.tryAppointmentCount > this.tryAppointmentMaxCount) {
					clearInterval(this.appointmentTimer)
					this.tryAppointmentCount = 0
					return
				}
				// console.log('申请预约')
				let configData = { time_stamp: new Date().getTime(), continue: 0 }
				this.sendCustomCMD(++this.clientSeq, 513, configData)
			},

			/************** 取消预约重试 *************/
			// 循环尝试取消预约
			cancelAppointmentClientHandler () {
				this.play()
				this.tryCancelAppointmentCount = 0
				if (this.cancelAppointmentTimer) {
					clearInterval(this.cancelAppointmentTimer)
				}
				this.cancelAppointment()
				this.cancelAppointmentTimer = setInterval(() => {
					this.cancelAppointment()
				}, 2000)
			},
			
			// 取消预约
			cancelAppointment () {
				this.play()
				this.tryCancelAppointmentCount++
				if (this.tryCancelAppointmentCount > this.tryCancelAppointmentMaxCount) {
					clearInterval(this.cancelAppointmentTimer)
					this.tryCancelAppointmentCount = 0
					return
				}
				console.log('取消预约')
				let operateData = { time_stamp: new Date().getTime() }
				this.sendCustomCMD(++this.clientSeq, 514, operateData)
			},

			// 发送消息
			sendCustomCMD (seq, cmd, data) {
				bugout.log('======== 发送指令时间 ===' + this.util.formatDateTime(new Date(), true) + '=======')
				bugout.log('======== 发送指令 === cmd = ' + cmd + '---------------' + ' seq = '+ seq + '========')
				var custom_msg = this.assemblyMessage(seq, cmd, data)
				console.log(custom_msg)
				// 发送自定义消息/指令
				zg.sendCustomCommand([this.anchor_id], custom_msg, (seq, custom_content) => {
					console.log('sendcustomCMD 成功 success-content', JSON.parse(custom_content))
				}, (err, seq, custom_content) => {
					// console.log('sendcustomCMD 失败 error-content', JSON.parse(custom_content))
				})
			},

			// 组装自定义信息
			assemblyMessage (seq, cmd, data) {
				var custom_content = {
					seq: seq,
					cmd: cmd,
					session_id: this.sessionID,
					data: data
				}
				var custom_msg = {
					// request_id: this.zgConfig.idName + '_' + this.custom_seq++,
					request_id: this.zgConfig.idName + '_' + seq,
					room_id: this.login.roomid,
					from_userid: this.zgConfig.idName,
					from_username: this.zgConfig.nickName,
					custom_content: JSON.stringify(custom_content)
				}
				return JSON.stringify(custom_msg)
			},

			// 定时器
			countDown (type, playCountDownTime, cb) {
				if (this.countDownTimer) {
					clearInterval(this.countDownTimer)
				}
				var innerCountNum = playCountDownTime
				this.countDownTimer = setInterval(() => {
					if (innerCountNum === 0) {
						clearInterval(this.countDownTimer)
						if (cb) {
							cb()
						}
						if (type === 0) {
							// this.countNum = playCountDownTime
							this.countNum = 30
						} else if (type === 1) {
							this.upornotCountDown = playCountDownTime
							this.closeReady(false, false)
						} else if (type === 2) {

						}	
						return
					}
					innerCountNum--
					if (type === 0) {
						this.countNum = innerCountNum
					} else if (type === 1) {
						this.upornotCountDown = innerCountNum
					} else if (type === 2) {
						this.playAgainCountDown = innerCountNum
					}
				}, 1000)
			},

			// 支付上机金币
			pay () {
				if (this.isPay) return
				console.log('结果页发出的付款请求, isInitApply = ', this.isInitApply)
				this.play()
				this.loading(true, '正在处理')
				let params = { channelId: this.$route.params.id, queueLength: this.beforeQueueNum }
				this.isPay = true
				api.payment(params).then(res => {
					this.loading(false)
					if (res.data.errCode === 0) {
						console.log('扣除金币')
						// console.log(res.data)
						this.dollCatchId = res.data.dollCatchId
						this.updateSum(this.sum - this.doll.coinPrice)
						this.showInfo(`扣除${this.doll.coinPrice}金币成功，开始游戏`)
						this.upToPlayHandler()
					} else {
						this.isPay = false
						if (res.data.errMsg) {
							this.showInfo(res.data.errMsg)
						}	else {
							this.order = 0
							this.showInfo('登录超时，正在重新登录')
							setTimeout(() => {
								window.location.href = 'http://wawa.bfb88.net/wawa/index'
							}, 300)
						}
					}
				})
			},

			// 获取天车配置
			clawConfig () {
				this.config = ''
				this.payTimestamp = parseInt(new Date().getTime()/1000)
				let params = {
					session_id: this.sessionID,
					confirm: 1,
					time_stamp: this.payTimestamp,
					custom_token: '',
					game_time: 30,
				}
				api.clawConfig(this.$route.params.id, params).then(res => {
					if (res.data.errCode === 0) {
						this.config = res.data.config
					} else {
						alert(JSON.stringify(res.data))
					}
				})
			},

			// 获取payToken 废弃
			payTokenUrls () {
				this.payTimestamp = new Date().getTime()
				let model = {
					app_id: this.zgConfig.appid,
					id_name: this.zgConfig.idName,
					session_id: this.sessionID,
					confirm: 1,
					time_stamp: this.payTimestamp,
					item_type: this.itemType,
					item_price: this.itemPrice
				}
				axios.get(this.payTokenUrl, {params: model}).then(res => {
					this.payToken = res.data
					this.upToPlayHandler()
				})
			},

			// 循环上机尝试
			upToPlayHandler () {
				if (!this.config) {
					this.loading(true, '正在上机')
					setTimeout(() => {
						this.upToPlayHandler()
					}, 100)	
					return
				}
				this.loading(false)
				console.log('上机尝试')
				if (!this.isInitApply) {
					// 从结果页点击再来一次，执行隐藏结果页
					this.closeSuccess(false)
					this.closeFail(false)
				}
				this.play()
				this.tryUpToPlayCount = 0
				if (this.upToPlayTimer) {
					clearInterval(this.upToPlayTimer)
				}
				this.upToPlay()
				this.upToPlayTimer = setInterval(() => {
					this.upToPlay()
				}, 2000)
			},

			// 发送上机指令
			upToPlay () {
				this.tryUpToPlayCount++
				console.log('this.tryUpToPlayCount = ', this.tryUpToPlayCount)
				if (this.tryUpToPlayCount > this.tryUpToPlayMaxCount) {
					clearInterval(this.upToPlayTimer)
					this.tryUpToPlayCount = 0
					return
				}
				this.clearMember()
				console.log('确定上机')
				this.operateStatus = true
				// var replyData = { confirm: 1, time_stamp: this.payTimestamp, config: this.payToken }
				var replyData = { confirm: 1, time_stamp: this.payTimestamp, config: this.config }
				this.sendCustomCMD(++this.clientSeq, 515, replyData)
				this.$refs.chatInput.pay()
				this.isMessage = false
			},

			// 放弃上机尝试
			confimTocancelHandler () {
				this.play()
				this.tryGiveUpPlayCount = 0
				if (this.giveUpPlayTimer) {
					clearInterval(this.giveUpPlayTimer)
				}
				this.confirmTocancel()
				this.giveUpPlayTimer = setInterval(() => {
					this.confirmTocancel()
				}, 2000)
			},

			// 发送放弃上机指令
			confirmTocancel (val) {
				this.confirmTocancelStatus = false
				if (val) {
					console.log('插队时退出')
					var replyData = { confirm: 0, time_stamp: new Date().getTime() }
					this.sendCustomCMD(++this.clientSeq ,515, replyData)
					return
				}
				this.tryGiveUpPlayCount++
				if (this.tryGiveUpPlayCount > this.tryGiveUpPlayMaxCount) {
					clearInterval(this.giveUpPlayTimer)
					this.tryGiveUpPlayCount = 0
					return
				}
				console.log('取消上机')
				this.operateStatus = false
				this.isGame = false
				this.order = 0
				var replyData = { confirm: 0, time_stamp: new Date().getTime() }
				this.sendCustomCMD(++this.clientSeq ,515, replyData)
			},




			// 处理收到的 全员广播消息  257 
			broadcastHandler (custom_content) {
				console.log('全员广播消息')
				console.log(custom_content)
				// this.audience = custom_content.data.total + this.util.random(20, 40)totalRandom
				this.audience = custom_content.data.total + this.totalRandom
				this.wwjPlayer = custom_content.data.player

				console.log('全员广播消息,this.confirmTocancelStatus ====== ', this.confirmTocancelStatus)
				if (JSON.stringify(this.wwjPlayer) === '{}' || this.wwjPlayer.name === '') {
					this.anchorWrapper = false
					this.player = ''
				} else if (this.confirmTocancelStatus || !this.confirmTocancelStatus && this.zgConfig.nickName !== this.wwjPlayer.name) {
					// console.log('this.confirmTocancelStatus || !this.confirmTocancelStatus && this.zgConfig.nickName !== this.wwjPlayer.name ==== ', this.confirmTocancelStatus || !this.confirmTocancelStatus && this.zgConfig.nickName !== this.wwjPlayer.name)
					this.anchorWrapper = true
					this.player = this.wwjPlayer.name
					if (this.wwjPlayer.name) this.memberInfo(this.wwjPlayer.name)
					// this.memberInfo(this.wwjPlayer.name)

				}
				this.waitQueue = custom_content.data.queue
				// this.waitQueueInfoPush()

				// 排队队列不为空，则赋值设置当前的排队人数
				if (this.waitQueue.length !== 0) {
					this.beforeQueueNum = this.waitQueue.length
					for (var i = 0; i < this.waitQueue.length; i++) {
						if (this.waitQueue[i].id === this.zgConfig.idName) {
							this.waitPosition = i + 1
							break
						}
					}
					this.afterQueueNum = this.waitPosition
				} else {
					this.beforeQueueNum = 0
				}
			},

			// 预约上机回复
			appointmentHandler (custom_content) {
				console.log('预约上机回复 ==== ', custom_content)
				if (custom_content.data.result == 1) {
					this.showInfo('预约失败，请重试')
					this.order = 0
					this.sessionID = 0
				} else {
					// 成功
					if (this.isInitApply) {
						// 从点击预约按钮后，收到的回应
						console.log('从点击预约按钮后，收到的回应, 告知本次预约请求是否成功,  isInitApply = ', this.isInitApply)
						this.order = 1
						this.waitPosition = custom_content.data.index
						this.afterQueueNum = this.waitPosition
						this.showInfo('预约成功')
						
					}
					this.sessionID = custom_content.data.session_id
					this.setLocal('sessionID', this.sessionID)
					this.clawConfig()
				}
				// 收到预约回复，清除不断尝试预约的计时器
        clearInterval(this.appointmentTimer)
			},

			// 取消预约上机回复
			cancelAppointmentHandler (custom_content) {
				console.log('取消预约上机回复 ====', custom_content)
				this.order = 0
				this.showInfo('取消预约')
				api.playingStatus(this.doll.machineId, {queueLength: this.beforeQueueNum}).then(res => {
					// console.log(res.data)
				})
				clearInterval(this.cancelAppointmentTimer)
			},

			// 处理收到的 收到回应，是否要付费上机，，--- 放弃 ？ 确定上机界面      258 排队轮到时，服务端自动发过来的， 客户端要回516包
			upSelectHandler (custom_content) {
				console.log('收到回应，是否要付费上机???')
				console.log(custom_content.data)
				// 设置服务端返回的当次可以游戏的时间
				this.playCountDownTime = custom_content.data.game_time;
				this.serverSeq = custom_content.seq
				var replyData = { time_stamp: new Date().getTime(), seq: this.serverSeq }
				this.sendCustomCMD(this.serverSeq, 516, replyData)
				if (this.isInitApply) {
					console.log('从点击预约按钮后，收到的回应, 是否要付费上机,  isInitApply = ', this.isInitApply)
					this.isReady = true
					this.countDown(1, 10, () => {
						this.confirmTocancel()
					})
				} else {
					console.log('结果页发出的预约收到的预约回应, isInitApply = ', this.isInitApply)
					this.countDown(2, 10, () => {
						this.operateStatus = false
						this.isGame = false
						this.order = 0
					})
				}
			},

			// 处理收到的 服务端返回的信息   对客户端发送的确认上机或者放弃玩游戏指令的回应   273  对应   515 上机或放弃
			upSelectRspHandler (custom_content) {
				console.log('处理收到的 服务端返回的信息   对客户端发送的确认上机或者放弃玩游戏指令的回应   273  对应   515 上机或放弃')
				var resultCode = custom_content.data.result
				console.log('发送确认上机的信息 = ', custom_content)
				if (resultCode === 1) {
					this.isGame = false
					clearInterval(this.upToPlayTimer)
					console.log('发送确认上机的信息---格式无效！')
					this.order = 0
					return
				} else if (resultCode === 2) {
					this.isGame = false
					clearInterval(this.upToPlayTimer)
					console.log('发送确认上机的信息---校验失败！')
					this.order = 0
          return
				}
				console.log('operateStatus = ', this.operateStatus)
				// if (this.operateStatus) {
				if (this.operateStatus && this.confirmTocancelStatus) {
					this.isGame = true
					this.gameEnd = false
					this.isPay = false
					console.log('上机成功 this.isPay ==== ', this.isPay)
					this.countDown(0, this.playCountDownTime, () => {
						this.gotocatch()
					})
					clearInterval(this.upToPlayTimer)
				} else {
					console.log('服务端返回的信息   对客户端发送的确认上机或者放弃玩游戏指令的回应')
					clearInterval(this.giveUpPlayTimer)
					clearInterval(this.countDownTimer)
				}
			},

			// 收到本次抓娃娃的结果
			operateResultHandler (custom_content) {
				this.isPay = false
				console.log('收到本次抓娃娃的结果')
				
				if (JSON.stringify(custom_content.data.player) === '{}') {
					this.order = 0
				}
				if (custom_content.data.player.id !== this.zgConfig.idName) {
					this.clearMember()
					return
				}
				if (custom_content.data.result === 1) {
					this.closeSuccess(true)
					console.log('收到本次抓娃娃的结果，成功')

					this.isCreateGrabDoll++
					if (this.isCreateGrabDoll === 1) {
						this.createGrabDoll(true)
					}
				} else {
					this.closeFail(true)
					// this.closeSuccess(true)
					console.log('收到本次抓娃娃的结果，失败')

					this.isCreateGrabDoll++
					if (this.isCreateGrabDoll === 1) {
						this.createGrabDoll(false)
					}
				}
				// 初始化设置
				// this.order = 0
				// this.isGame = false
				// this.gameEnd = false
				// this.countNum = 30
				// // this.dollCatchId = ''
				// this.clearMember()

				// var replyData = { time_stamp: new Date().getTime(), continue: 1 } // 插队
				// // var replyData = { time_stamp: new Date().getTime(), continue: 0 }
				// this.sendCustomCMD(++this.clientSeq, 517, replyData)
				// this.isInitApply = false
				// // 发送继续玩指令
				// this.playAgainHandler()
			},
			// 发送抓取结果
			createGrabDoll (status) {
				let params = {
					dollCatchId: this.dollCatchId,
					caught: status,
					queueLength: this.beforeQueueNum,
				}
				api.createGrabDoll(params).then(res => {
					console.log(status ? '抓到' : '没抓到')
					this.isCreateGrabDoll = 0
					this.setDefault()
				})
			},
			// 初始化设置
			setDefault () {
				this.order = 0
				this.isGame = false
				this.gameEnd = false
				this.countNum = 30
				// this.dollCatchId = ''
				this.clearMember()

				var replyData = { time_stamp: new Date().getTime(), continue: 1 } // 插队
				// var replyData = { time_stamp: new Date().getTime(), continue: 0 }
				this.sendCustomCMD(++this.clientSeq, 517, replyData)
				this.isInitApply = false
				// 发送继续玩指令
				this.playAgainHandler()
			},

			// 发起发送继续玩的指令
			playAgainHandler () {
				this.tryAppointmentCount = 0
				if (this.appointmentTimer) {
					clearInterval(this.appointmentTimer)
				}
				this.playAgain()
				this.appointmentTimer = setInterval(() => {
					this.playAgain()
				}, 2000)
			},

			// 循环发送继续玩的指令
			playAgain () {
				this.tryAppointmentCount++
				if (this.tryAppointmentCount > this.tryAppointmentMaxCount) {
					clearInterval(this.appointmentTimer)
					this.tryAppointmentCount = 0
					return
				}
				console.log('发送继续玩指令++++++++++')
				var configData = { time_stamp: new Date().getTime(), continue: 1 }
				this.sendCustomCMD(++this.clientSeq, 513, configData)
				this.isInitApply = false
			},

			// 获取到当前房间游戏信息，并设置房间人数，和当前排队人数
			gameInfoHandler (custom_content) {
				// 设置当前排队人数，和房间总人数
				var gameInfo = custom_content.data
				console.log('获取游戏信息= ', custom_content)
				this.beforeQueueNum = gameInfo.queue.length
				this.audience = gameInfo.total + this.totalRandom

				this.waitQueue = gameInfo.queue

				// this.waitQueueInfoPush()
					
				// 如果当前在游戏的主播id和本地的idName一样，则恢复游戏状态  -----  如正在游戏，刷新页面场景
				if (!gameInfo.player.name) return false
				if (gameInfo.player.name === this.zgConfig.nickName) {
					// if (!this.playingStatus) {
					if (!this.playingStatus && this.againStatus === 'false') {
						this.player = gameInfo.player.name
						console.log('正在游戏,重新进入')
						this.playingStatus = true
						this.countNum = gameInfo.player.left_time
						this.countDown(0, this.countNum, () => {
							this.gotocatch()
						})
						this.RecoveGameStateHandler()
					}
				} else {
					this.memberInfo(gameInfo.player.name)
				}
			},

			// 恢复游戏状态
			RecoveGameStateHandler () {
				if (this.playingStatus) {
					console.log('恢复游戏状态')
					this.isGame = true
					this.sessionID = this.getLocal('sessionID')
				}
			},
		},
		watch: {
			// player (nVal, oVal) {
			// 	if (this.isGame) {
			// 		if (this.userInfo.openId !== nVal) {
			// 			this.isGame = false
			// 		}
			// 	}
			// },
		}
	}
</script>

<style lang="less" scoped>
@import './../../assets/css/public.less';

	.detail {
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
		background-size: 100%;
		overflow: hidden;
		.live-box {
			// height: 500px;
			position: relative;
			.detail-top {
				position: absolute;
				top: 0;
				z-index: 3;
				width: 100%;
			}
			.detail-left {
				position: absolute;
				bottom: 0;
				z-index: 3;
				width: 20%;
			}
			.detail-right {
				position: absolute;
				bottom: 0;
				right: 0;
				z-index: 3;
				width: 20%;
			}
			.my-info {
				z-index: 3;
				position: absolute;
				background: rgba(0, 0, 0, 0.4);
				display: flex;
				align-items: center;
				padding: 5px 8px;
				border-top-left-radius: 30px;
				border-bottom-left-radius: 30px;
				top: 20px;
				right: 0;
				.img {
					width: 3rem;
					height: 3rem;
					border-radius: 50%;
					line-height: 1;
					overflow: hidden;
					margin-right: 4px;
					img {
						width: 100%;
					}
				}
				.text {
					margin-left: 3px;
					p {
						line-height: 1.2;
						color: #fff;
						font-size: 1.4rem;
					}
				}
			}
			.right-btn {
				z-index: 15;
				position: absolute;
				top: 80px;
				right: 15px;
				color: #fff;
				.iconfont {
					flex-shrink: 0;
					background: rgba(0, 0, 0, 0.4);
					border-radius: 50%;
					// margin-bottom: 15px;
					width: 5rem;
					height: 5rem;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-flow: column;
					position: absolute;
					right: 15px;
					img {
						height: 2.5rem;
					}
					span {
						font-size: 1.2rem;
					}
				}
				.history {
					top: 0;
				}
				.detail {
					top: 7rem;
				}
				.change {
					top: 14rem;
				}
			}
			.queation {
				position: absolute;
				flex-shrink: 0;
				width: 8rem;
				top: 1rem;
				left: 1.5rem;
				.icon-wenti {
					padding: 4px;
					background: #fff;
					color: rgb(229, 183, 97);
					font-size: 20px;
					border-radius: 50%;
					border: 2px solid rgb(128, 76, 1);
				}
			}
			.number {
					position: absolute;
					flex-shrink: 0;
					width: 80px;
					top: 10px;
					right: 0;
					text-align: center;
					p {
						line-height: 1.3;
						font-size: 12px;
						color: #fff;
					}
				}
			.user-list {
				position: absolute;
				top: 10px;
				// right: 0;
				left: 0;
				width: 150px;
				display: flex;
				// display: none;
				overflow-x: scroll;
				z-index: 3;
				.user-item {
					margin-right: 3px;
					flex-shrink: 0;
					width: 3rem;
					height: 3rem;
					border-radius: 50%;
					overflow: hidden;
					img {
						width: 100%;
					}
				}
			}
			.signal {
				z-index: 5;
				position: absolute;
				top: 60px;
				right: 25px;
				background: rgba(0, 0, 0, 0.4);
				width: 40px;
				height: 40px;
				border-radius: 50%;
				display: flex;
				justify-content: center;
				align-items: center;
				.iconfont {
					color: #97e03b;
					font-size: 24px;
				}
			}
			.switch {
				position: absolute;
				top: 200px;
				right: 15px;
				width: 45px;
				height: 60px;
				background: #fdda2c;
				z-index: 1;
				border-top-left-radius: 30px;
				border-bottom-left-radius: 30px;
				z-index: 6;
				.watch {
					width: 46px;
					height: 46px;
					background: #fff087;
					border-radius: 50%;
					position: relative;
					top: 7px;
					left: 7px;
					border: 1px solid rgb(255, 255, 255);
					box-sizing: border-box;
					// box-shadow: 0px 1px 1px 0px rgba(2, 2, 2, 0.4);
					.boxShadowOutset(@x: 0; @y: 1px; @blur: 1px; @spread: 0px; @color: rgba(2, 2, 2, 0.4););
					.key {
						position: relative;
						.absolute;
						width: 33px;
						height: 33px;
						background: rgb(157, 54, 1);
						border-radius: 50%;
						.iconfont {
							transition: all .2s linear; 
							display: none;
							color: #fff;
							font-size: 22px;
							// background: #ffd65b;
							.bgLinearGradient(@top: rgb(253, 211, 95); @bottom: rgb(253, 149,45););
							border-radius: 50%;
							width: 33px;
							height: 33px;
							display: inline-flex;
							position: relative;
							top: -4px;
							left: 0px;
							box-sizing: border-box;
							border: 2px solid #ffd258;
							&:before {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
							}
							&:active {
								top: 0px;
							}
						}
					}
					
				}
			}
			.count-down {
				position: absolute;
				bottom: 0.5rem;
				right: 2rem;
				z-index: 1;
				background: rgba(0, 0, 0, 0.5);
				width: 7rem;
				border-radius: 50px; 
				color: #fff;
				font-size: 2.4rem;
				text-align: center;
				z-index: 5;
			}
			.live {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				background: #ffffff87;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow: hidden;
				// z-index: 1;
				p {
					font-size: 20px;
				}
				.frontview, .sideview {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				#frontview, #sideview {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.active {
					z-index: 2;
				}
				.wh {
					background: url(http://wawa-1255600302.file.myqcloud.com/images/wh2.png);
					background-size: 100% 100%;
					z-index: 16;
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						width: 70%;
					}
				}
			}
		}
		.game-btn {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.operation {
			position: relative;
			bottom: 0;
			height: 160px;
			border-radius: 5px;
			.go {
				transition: all .2s linear; 
				position: absolute;
				.absolute(@left: 80%;);
				width: 10rem;
				height: 10rem;
				background: #fff;
				.borderRadius(50%);
				border: 2px solid #fff;
				.boxShadowOutset(@x: 0; @y: 1px; @blur: 1px; @spread: 0px; @color: rgba(2, 2, 2, 0.4););
				.key {
					position: relative;
					.absolute;
					width: 7.5rem;
					height: 7.5rem;
					background: rgb(157, 54, 1);
					.borderRadius(50%);
					p {
						transition: all .2s linear; 
						position: absolute;
						.absolute(@top: 40%;);
						font-size: 3.5rem;
						font-weight: bold;
						color: #fff;
						line-height: 6.8rem;
						text-align: center;
						width: 6.8rem;
						height: 6.8rem;
						.borderRadius(50%);
						.bgLinearGradient(@top: rgb(251, 159, 54); @bottom: rgb(210, 39,1););
						.border(@width: 2px; @color: rgb(233, 115, 34));
						&:active {
							top: 50%;
						}
					}
				}
			}
			.game-end {
				background: #a9a9a9;
				.key {
					background: #6f6c6a;
					p {
						.bgLinearGradient(@top: #c7c1bb; @bottom:  #7d7674;);
						.border(@width: 2px; @color: #cac1bb);
					}
				}
			}
			.direction {
				position: absolute;
				.absolute(@left: 32%;);
				width: 170px;
				height: 140px;
				.game-button {
					position: absolute;
					width: 5rem;
					height: 5rem;
					background: #fff;
					.borderRadius(50%);
					border: 2px solid #fff;
					.boxShadowOutset(@x: 0; @y: 1px; @blur: 1px; @spread: 0px; @color: rgba(2, 2, 2, 0.4););
					.key {
						position: relative;
						.absolute;
						width: 4.3rem;
						height: 4.3rem;
						background: rgb(157, 54, 1);
						.borderRadius(50%);
						p {
							transition: all .2s linear; 
							position: absolute;
							.absolute(@top: 40%;);
							color: #fff;
							text-align: center;
							width: 3.8rem;
							height: 3.8rem;
							.borderRadius(50%);
							.bgLinearGradient(@top: rgb(251, 159, 54); @bottom: rgb(210, 39,1););
							.border(@width: 2px; @color: rgb(233, 115, 34));
							&:active {
								top: 50%;
							}
							.iconfont {
								position: absolute;
								.absolute;
								font-size: 2.2rem;
							}
						}
					}
				}
				.key-end {
					background: #a9a9a9;
					.key {
						background: #6f6c6a;
						p {
							.bgLinearGradient(@top: #c7c1bb; @bottom:  #7d7674;);
							.border(@width: 2px; @color: #cac1bb);
						}
					}
				}
				.top {
					top: 0;
					left: 50%;
					transform: translate(-50%, 0);
					.key {
						p {
							.iconfont {
								.absolute(@top: 40%;);
							}
						}
					}
				}
				.bottom {
					bottom: 0;
					left: 50%;
					transform: translate(-50%, 0);
					.key {
						p {
							.iconfont {
								.absolute(@top: 60%;);
							}
						}
					}
				}
				.left {
					left: 0;
					top: 50%;
					transform: translate(0, -50%);
					.key {
						p {
							.iconfont {
								.absolute(@left: 40%;);
							}
						}
					}
				}
				.right {
					right: 0;
					top: 50%;
					transform: translate(0, -50%);
					.key {
						p {
							.iconfont {
								.absolute(@left: 60%;);
							}
						}
					}
				}
			}
				
			.user-game {
				background: #333;
				display: inline-flex;
				align-items: center;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				padding: 3px 15px;
				border-radius: 30px;
				border: 1px solid #000;
				box-shadow: 0px 0px 5px 0px #999 inset;
				img {
					width: 15px;
					height: 15px;
					border-radius: 50%;
					margin-right: 4px;
				}
				span {
					line-height: 1;
					color: #fff;
					font-size: 12px;
				}
			}

			.game {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				// margin: 0 2rem;
				flex-shrink: 0;
				width: 17rem;
				height: 6.5rem;
				background: #fff;
				box-sizing: border-box;
				border: 1px solid #fff;
				.borderRadius(80px);
				.boxShadowOutset(@x: 0; @y: 1px; @blur: 1px; @spread: 0px; @color: #b7b7b7);
				.key {
					position: relative;
					.absolute;
					width: 15.2rem;
					height: 5rem;
					background: #8e193b;
					.borderRadius(50px);
					.text {
						transition: all .2s linear; 
						color: #fff;
						.bgLinearGradient(@top: #fe2b88; @bottom: #f01a59;);
						.borderRadius(50px);
						width: 15.2rem;
						height: 5rem;
						position: relative;
						top: -4px;
						left: 0px;
						box-sizing: border-box;
						.border(@color: #fb3876);
						&:active {
							top: 0px;
						}
						p {
							.lineHeight;
							text-align: center;
							&:first-child {
								margin-top: 6px;
								font-size: 1.8rem;
								font-weight: bold;
							}
							&:last-child {
								font-size: 1.2rem;
							}
						}
					}
					.cancel {
						position: absolute;
						bottom: -45px;
						left: 50%;
						transform: translate(-50%, 0);
						padding: 5px 10px;
						line-height: 1;
						border-radius: 30px;
						color: #fff;
						.bgLinearGradient(@top: #fea1db; @bottom: #d3226e;);
						.border(@color: #ee73b4);
					}
					.order {
						.bgLinearGradient(@top: #f6c4cf; @bottom: #f3b5c2;);
						.border(@color: #fdcfda);
					}
					.start {
						.bgLinearGradient(@top: rgb(176, 253, 0); @bottom: rgb(68, 163,1););
						.border(@color: #9eee00);
					}
				}
				.key-order {
					background: #b36071;
				}
			}
			.btn-game {
				flex-shrink: 0;
				width: 4.2rem;
				height: 4.2rem;
				background: #fff;
				border-radius: 50%;
				border: 1px solid #fff;
				.boxShadowOutset(@x: 0; @y: 1px; @blur: 1px; @spread: 0px; @color: #b7b7b7);
				box-sizing: border-box;
				.key {
					position: relative;
					.absolute;
					width: 2.8rem;
					height: 2.8rem;
					background: #46007f;
					.borderRadius(50%);
					.iconfont {
						transition: all .2s linear; 
						color: #fff;
						font-size: 2.3rem;
						width: 2.8rem;
						height: 2.8rem;
						border-radius: 50%;
						padding: 2px;
						position: relative;
						box-sizing: border-box;
						top: -7px;
						left: 0px;
						&:active {
							top: -4px;
						}
					}
				}
					
			}
			.record {
				// left: 20%;
				order: -1;
				.key {
					.iconfont {
						.bgLinearGradient(@top: #fb9f36; @bottom: #d42d03;);
						border: 1px solid #ee7724;
					}
				}
				
			}
			.message-box {
				position: absolute;
				left: 1rem;
				top: 2rem;
				transform: translate(0, -50%);
				.message-jiantou {
					width: 4rem;
					height: 3rem;
					line-height: 3rem;
					background: rgba(0, 0, 0, 0.5);
					border-radius: 5px;
					text-align: center;
					.icon-shang1, .icon-xia1 {
						color: #fff;
						font-size: 1.2rem;
					}
				}
			}
			.message {
				position: absolute;
				left: 15%;
				top: 50%;
				transform: translate(0, -50%);
				order: -1;
				.key {
					.iconfont {
						.bgLinearGradient(@top: #ef49bb; @bottom: #ef49bb;);
						// border: 1px solid #86da00;
					}
				}
			}
			.back {
				font-size: 1.6rem;
				position: absolute;
				bottom: 1rem;
				left: 50%;
				transform: translate(-50%, 0);
				background: rgba(0, 0, 0, .5);
				color: #fff;
				padding: 2px 15px;
				border-radius: 50px;
			}
			.game-recharge {
				position: absolute;
				right: 7%;
				top: 50%;
				transform: translate(0, -50%);
				color: #333333;
				font-size: 1.3rem;
				.recharge-btn {
					background: #fe2b8a;
					color: #fff;
					border-radius: 30px;
					text-align: center;
					padding: 1px 6px;
					font-size: 1.4rem;
				}
			}
			.count {
				position: absolute;
				bottom: 10px;
				left: 50%;
				transform: translate(-50%, 0);
				background: rgba(0, 0, 0, 0.2);
				width: 60px;
				border-radius: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				span {
					color: #fff;
					font-weight: bold;
				}
				.icon {
					margin-right: 3px;
					width: 15px;
					height: 15px;
				}
			}
			.coins-sum {
				position: absolute;
				top: 10px;
				left: 50%;
				transform: translate(-50%, 0);
				background: rgba(0, 0, 0, 0.2);
				width: 150px;
				border-radius: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				span {
					color: #fff;
				}
			}
		}
		
	}
</style>

