<template>
	<div class="my">
		<x-header title="设置"></x-header>
		<div class="setting-box" :style="{height: height + 'px'}">
			<div class="my-list" >
				<group class="group" :gutter="0" v-for="(item, i) in items" :key="i">
						<cell :link="label.link" :title="label.title" :value="label.value" v-for="(label, i) in item.item" :key="i" style="color:#383838;font-size:14px;">
						</cell>
				</group>
			</div>

		</div>
	</div>
</template>

<script>
	import { Group, Cell, XHeader, XSwitch } from 'vux'
	import { mapState, mapActions } from 'vuex'
	import api from '../../api/api'

	export default {
		components: {
			Group, Cell, XHeader, XSwitch
		},
		data () {
			return {
				userInfo: {},
				user: {
					name: '',
					img: '',
					position: '',
					department: ''
				},
				bgHeight: 150,
				height: 0,
				info: {},
				items: [{
					item: [{ title: '充值', link: '/myInfo/recharge' }]
				},{
					item: [{ title: '消息中心', link: '/myInfo/message' }]
				},
				{
					item: [{ title: '我的娃娃', link: '/myInfo/myDoll' }]
				},
				{
					item: [{ title: '我的订单', link: '/myInfo/orderList' }]
				},
				{
					item: [{ title: '我的地址', link: '/myInfo/address' }]
				},
				// {
				// 	item: [{ title: '推广达人', link: '/Extension/Login' }]
				// },
				{
					item: [{ title: '声音/提醒', link: '/myInfo/Music' }]
				},
				{
					item: [{ title: '问题反馈', link: '/myInfo/feedBack' }
					// , { title: '关于我们', link: '' }
					]
				}],
				model: {
          playBackgroundSound: '',
					playHintSound: '',
					receiveCatchDollRemind: '',
					receiveCoinAddRemind: '',
        },
			}
		},
		created () {
		},
		mounted () {
			this.height = window.innerHeight - 46
			window.onresize = () => {
				this.height = window.innerHeight - 46
			}
		},
		computed: {
			...mapState({
				soundConfig: function (state) {
					let soundConfig = JSON.parse(window.localStorage.getItem('soundConfig'))
					this.$store.commit('updateSoundConfig', {soundConfig: soundConfig})
					return state.soundConfig
				},
			})
		},
		methods: {
			...mapActions([
				'updateSoundConfig'
			]),
			modify () {
				this.$router.push('/myInfo/ModifyInfo')
			},
			getMemberInfo () {
				console.log('调用')
				api.getMemberInfo().then(res => {
					// console.log(res.data)
					this.info = res.data
					if (!this.info.name && this.index < 3) {
						this.index++
						this.getMemberInfo()
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.my {
		.setting-box {
			background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
			background-size: 100%;
			overflow-y: scroll;
			.my-list {
				margin: 0 10px;
				padding-top: 10px;
				.group {
					// box-shadow: 1px 1px 3px rgba(125, 82, 82, 0.75);
					border-radius: 4px;
					margin-bottom: 15px;
					overflow: hidden;
					background-color: #ffffff !important;
					.weui-cells {
						background-color: #ffffff !important;
						.weui-cell {
							padding: 14px 15px;
						}
								
					}
				}
				.iconfont:before {
					font-size: 16px;
					color: @primary-color;
				}
			}
		}
			
	}
</style>