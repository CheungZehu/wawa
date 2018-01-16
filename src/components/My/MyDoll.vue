<template>
	<div class="doll-record" :style="{height: height + 'px'}">
		<x-header title="我的娃娃" :left-options="{preventGoBack: true}" @on-click-back="back" v-if="isTemplateMsg"></x-header>
		<x-header title="我的娃娃" v-else></x-header>
		<p class="shuoming" id="shuoming">*选中娃娃后可选择兑换金币，也可选择邮寄（{{leastRemitTransportAmountDollNum}}个及以上娃娃包邮）</p>
		<div class="doll-list" id="doll-list" :style="{height: dlHeight + 'px'}">
			<div v-if="newsList.length > 0">
				<div class="record">
					<doll-item-select v-for="(item, i) in newsList" :key="i" :index="i" :item="item" @check="check"></doll-item-select>
				</div>
				<!-- <div class="doll-order-config" v-if="dollOrderConfigText && newsList.length > 0">
					<p>提示：{{dollOrderConfigText.orderNotice}}</p>
					<p>娃娃有效期为{{dollOrderConfigText.dollValidDays}}天，请及时兑换</p>
				</div> -->
			</div>
			<div v-else>
				<div class="no-doll" :style="{height: dlHeight + 'px'}">
					<img src="http://wawa-1255600302.file.myqcloud.com/images/zhua.png">
					<p>暂无我的娃娃记录</p>
				</div>
			</div>
		</div>
		<div class="tip">
			<div class="tip-text">
				<p>提示：</p>
				<p>{{dollOrderConfigText.orderNotice}}</p>
				<p>娃娃有效期为{{dollOrderConfigText.dollValidDays}}天，请及时兑换</p>
			</div>
		</div>
		<div class="doll-bottom">
			<div class="left">
				<div class="select" @click="choice">
					<check-icon class="checkicon" v-model="select"></check-icon>
					<p>全选</p>
				</div>
				<div class="postage">
					邮费：
					<span v-if="isTransportAmount">￥{{transportAmount | price}}</span>
					<span v-else>包邮</span>
				</div>
			</div>
			<div class="right">
				<p class="btn-text" @click="dollsChangeCoins">兑换</p>
				<p class="solid"></p>
				<p class="btn-text"  @click="order">邮寄</p>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider, CheckIcon, XHeader, TransferDomDirective as TransferDom, Confirm } from 'vux'
  import DollItemSelect from '../Common/DollItemSelect'
	import { mapState, mapActions } from 'vuex'

	export default {
		directives: {
			TransferDom
		},
		components: {
			Group, Scroller, LoadMore, Divider, DollItemSelect, CheckIcon, XHeader, Confirm
		},
		data () {
			return {
				newsList: [],
				search: {
					start: 0,
					limit: 50,
					count: 0,
					status: 0,
				},
				isPulldown: false,
				select: false,
				transportAmount: 0,
				leastRemitTransportAmountDollNum: 0,
				isTransportAmount: true,
				dlHeight: 0,
				height: 0,
				isTemplateMsg: false,
				dollOrderConfigText: {},
			}
		},

		mounted() {
			this.myDolls()
			this.getHeight()
			window.onresize = () => {
				this.getHeight()
			}
			this.transport(0)
			this.from()
			this.dollOrderConfig()
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
      }),
    },
		methods: {
			...mapActions([
        'updateSum'
      ]),
			from () {
				let from = this.util.getUrlParam('from')
				if (from === 'template_msg') {
					this.isTemplateMsg = true
				} else {
					this.isTemplateMsg = false
				}
			},
			back () {
				this.$router.push('/index')
			},
			getHeight () {
				let dl = document.getElementById('doll-list')
				console.log(window.innerHeight - 150)
				this.dlHeight = window.innerHeight - 190 - 60
				this.height = window.innerHeight
			},
			// 获取娃娃订单配置
			dollOrderConfig () {
				api.dollOrderConfig().then(res => {
					if (res.data.errCode === 0) {
						this.dollOrderConfigText = res.data.data
					}
				})
			},
			// 获取选择的娃娃id
			getSelectDollsId (list, status) {
				if (list.length === 0) return false

				let myDolls = []
				list.map(item => {
					if (item.status) {
						myDolls.push(item)
					}
				})
				if (myDolls.length > 0) {
					let str = ''
					let total = []
					myDolls.map(item => {
						str += item.id + ','
						total.push(item.exchangeCoinNum)
					})
					str = str.substring(0, str.length- 1)
					if (status) {
						let totalStatus = true
						for (var i = 0; i < total.length; i++) {
							if (total[i] === 0) {
								totalStatus = false
							}
						}
						return {
							str: str,
							totalStatus: totalStatus
						}
					} else {
						return str
					}
				} else {
					return false
				}
			},
			// 校验提交订单的娃娃
			dollsCheck (str, myDolls) {
				api.dollsCheck({dollIds: str}).then(res => {
					if (res.data.errCode === 0) {
						this.loading(false)
						localStorage.setItem('myDolls', JSON.stringify(myDolls))
						this.$router.replace('/myInfo/order')
					} else {
						this.loading(false)
						this.showInfo(res.data.errMsg)
					}
				})
			},
			// 下单
			order () {
				let myDolls = []
				this.newsList.map(item => {
					if (item.status) {
						myDolls.push(item)
					}
				})
				if (myDolls.length > 0) {
					this.loading(true, '数据处理中')
					let str = this.getSelectDollsId(this.newsList)
					this.dollsCheck(str, myDolls)
				} else {
					this.showInfo('请选择娃娃')
				}
			},
			showConfirm (myDollSelect) {
				let that = this
				this.$vux.confirm.show({
					title: '娃娃兑换金币',
					content: `是否确定将娃娃兑换为金币？兑换后将不可取消`,
					onShow () {
						console.log('plugin show')
					},
					onHide () {
						console.log('plugin hide')
					},
					onCancel () {
						console.log('plugin cancel')
					},
					onConfirm () {
						console.log('plugin confirm')
						that.loading(true, '正在兑换金币')
						let model = {
							action: 'exchange_coin',
							dollIds: myDollSelect.str,
						}
						that.apiDollsChangeCoins(model)
					}
				})
			},
			// 娃娃兑换金币
			dollsChangeCoins () {
				let myDollSelect = this.getSelectDollsId(this.newsList, true)

				if (myDollSelect) {
					if (myDollSelect.totalStatus) {
						this.showConfirm(myDollSelect)
						// this.loading(true, '正在兑换金币')
						// let model = {
						// 	action: 'exchange_coin',
						// 	dollIds: myDollSelect.str,
						// }
						// this.apiDollsChangeCoins(model)
					} else {
						this.showInfo('娃娃兑换金币为0时不可兑换')
					}
				} else {
					this.showInfo('请选择娃娃')
				}
			},
			// 调用兑换金币接口
			apiDollsChangeCoins (model) {
				// this.loading(true, '正在兑换金币')
				api.dollsChangeCoins(model).then(res => {
					console.log(res.data)
					if (res.data.errCode === 0) {
						this.loading(false)
						this.updateSum(this.sum + res.data.coinNum)
						this.showInfo(`增加${res.data.coinNum}金币`)
						this.myDolls()
					} else {
						this.loading(false)
						this.showInfo(res.data.errMsg)
					}
				})
			},
			// 判断包邮
			transport (val) {
				api.transportAmount(val).then(res => {
					console.log(res.data)
					if (res.data.errCode === 0) {
						this.transportAmount = res.data.data.transportAmount
						this.leastRemitTransportAmountDollNum = res.data.data.leastRemitTransportAmountDollNum
					}
				})
			},
			// 全选
			choice () {
				this.select = !this.select
				this.newsList.map((item, i) => {
					item.status = this.select
				})
			},
			check (val, index) {
				this.newsList.map((item, i) => {
					if (i === index) {
						item.status = !val
					}
				})
			},
			myDolls () {
				api.myDoll(this.search).then(res => {
					if (res.data.errCode === 0) {
						console.log(res.data)
						let data = res.data.list
						this.newsList = []
						data.map(item => {
							this.newsList.push({
								id: item.id,
								name: item.name,
								previewImage: item.previewImage,
								createTime: item.createTime,
								exchangeAwardNeededNum: item.exchangeAwardNeededNum,
								exchangeCoinNum: item.exchangeCoinNum,
								type: item.type,
								expireTime: item.expireTime,
								status: false,
							})
						})
					}
				})
			},
		},
		watch: {
			newsList: {
				handler (val) {
					if (val.length > 0) {
						let count = 0
						val.map(item => {
							if (item.status) {
								count++
							}
						})
						if (count === val.length) {
							this.select = true
						} else {
							this.select = false
						}
						if (count < this.leastRemitTransportAmountDollNum) {
							this.isTransportAmount = true
						} else {
							this.isTransportAmount = false
						}
						// this.transport(count)
					}
				},
				deep: true
			}
		}
	}
</script>

<style lang="less">
	.doll-record {
		// padding-top: 10px;
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
		.shuoming {
			margin: 10px 10px 10px 10px;
			color: #fff;
			font-size: 1.5rem;
		}
		.doll-list {
			background-color: #fff;
			margin: 1rem;
			border-radius: 5px;
			overflow: scroll;
			.no-data {
				color: #bfbfbf;
			}
			.doll-order-config {
				font-size: 1.6rem;
				margin: 1rem 2rem;
				background: rgba(0, 0, 0, 0.25);
				border-radius: 5px;
				padding: 0 5px;
				color: #191617;
			}
			.no-doll {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-flow: column;
				// margin-top: 70px;
				img {
					width: 90px;
					height: 90px;
				}
				p {
					line-height: 3;
					color: #895f05;
					font-size: 1.4rem;
				}
			}
		}
		.tip {
			position: absolute;
			bottom: 6rem;
			width: 100%;
			
			.tip-text {
				overflow: scroll;
				height: 70px;
				font-size: 1.6rem;
				margin: 1rem;
				background: rgba(0, 0, 0, 0.25);
				border-radius: 5px;
				padding: 0 5px;
				color: #191617;
			}
		}
		.doll-bottom {
			height: 6rem;
			background: #fff;
			position: absolute;
			bottom: 0;
			width: 100%;
			box-shadow: 0 -1px 10px 0px rgba(0, 0, 0, 0.2);
			display: flex;
			font-size: 1.6rem;
			.left {
				width: 55%;
				height: 100%;
				flex-shrink: 0;
				display: inline-flex;
				align-items: center;
				justify-content: space-around;
				color: #d85c78;
				.select {
					display: inline-flex;
					align-items: center;
					.checkicon {
						margin-bottom: 4px;
					}
				}
			}
			.right {
				width: 45%;
				height: 100%;
				flex-shrink: 0;
				background: #d85c78;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				.solid {
					width: 1px;
					height: 2rem;
					background: #fff;
				}
				.btn-text {
					height: 100%;
					width: 100%;
					// background: #d85c78;
					text-align: center;
					line-height: 6rem;
				}
			}
		}
  }
</style>

