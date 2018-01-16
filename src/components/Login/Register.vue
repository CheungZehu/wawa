<template>
	<div class="rigister" :style="{height: height + 'px'}">
		<img :src="this.urlSk.logoUrl()" alt="">
		<group>
			<x-input class="left" v-model="form.name" title="称呼" placeholder="请输入称呼" required style="font-size: 1.6rem;">
				<i slot="label" class="iconfont icon-wode1" style="padding-right:10px;display:block;" width="30" height="30"></i>
			</x-input>
		</group>
		<group>
			<x-input class="left" v-model="form.mobile" title="手机" placeholder="请输入手机号" required type="number" style="font-size: 1.6rem;">
				<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
			</x-input>
		</group>
		<group>
			<x-input class="left" v-model="form.password" title="密码" placeholder="请输入密码" required style="font-size: 1.6rem;" type="password">
				<i slot="label" class="iconfont icon-mima" style="padding-right:10px;display:block;" width="30" height="30"></i>
			</x-input>
		</group>
		<p style="color: #353535; font-size: 1.3rem;">密码以字母开头，长度在6~18之间，只能包含字符、数字和下划线</p>
		<group>
			<x-input class="left" v-model="form.confirmPassword" title="密码" placeholder="请确认密码" required style="font-size: 1.6rem;" type="password">
				<i slot="label" class="iconfont icon-mima" style="padding-right:10px;display:block;" width="30" height="30"></i>
			</x-input>
		</group>
		<group>
			<x-input v-model="form.checkCode" title="验证码" placeholder="请输入验证码" required class="left" type="number" style="font-size: 1.6rem;">
				<i slot="label" class="iconfont icon-mima" style="padding-right:10px;display:block;" width="30" height="30"></i>
				<x-button class="vcode_btn" v-show="showBtn" slot="right" type="primary" mini @click.native="getVcode">获取</x-button>
				<x-button class="vcode_btn" v-show="!showBtn" slot="right" mini plain type="primary" style="margin-top: 0;" >{{number}}</x-button>
			</x-input>
		</group>
		<x-button class="btn" @click.native="register" type="primary" :class="{gray: !isBtn}">注册</x-button>
	</div>
</template>

<script>
	import { Group, XInput, XButton } from 'vux'
	import { mapState, mapActions } from 'vuex'
	import api from '../../api/api'

	export default {
		components: {
			Group, XInput, XButton
		},
		data () {
			return {
				form: {
					mobile: '',
					checkCode: '',
					name: '',
					password: '',
					confirmPassword: '',
					id: '',
				},
				number: 60,
				showBtn: true,
				isBtn: true,
				height: 0,
			}
		},
		created () {

		},
		mounted() {
      this.height = window.innerHeight
      window.onresize = () => {
        this.height = window.innerHeight
      }
			this.form.name = this.userInfo.nickname
    },
		computed: {
			...mapState({
				userInfo: function (state) {
					let localMember = JSON.parse(window.localStorage.getItem('member'))
					if (!state.member.name && localMember) {
						this.$store.commit('updateMember', {member: localMember})
					}
					return state.member
				}
			})
		},
		methods: {
			// 获取验证码
			getVcode () {
				var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				if (!reg.test(this.form.mobile)) {
					this.$vux.toast.show({
						text: '请输入正确的手机号码',
						type: 'text'
					})
					return false
				}
				console.log(this.form)
				this.showBtn = false
				var interval = setInterval(function () {
					if (this.number > 0) {
						this.number--
					} else {
						clearInterval(interval)
						this.showBtn = true
						this.number = 60
					}
				}.bind(this), 1000)
				api.sendCheckCode({mobile: this.form.mobile}).then(res => {
					console.log(res.data)
					if (res.data.errCode === 0) {
						this.showInfo('验证码已发送，请注意查收')
					} else {
						this.showInfo(res.data.errMsg)
					}
				}).catch(err => {
					this.showInfo(res.data.errMsg)
				})
			},
			// 注册
			register () {
				var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
				var psReg = /^[a-zA-Z]\w{5,17}$/
				if (this.form.name === '') {
					this.showInfo('请输入姓名')
				} else if (this.form.mobile === '') {
					this.showInfo('请输入手机号码')
				} else if (!reg.test(this.form.mobile)) {
					this.showInfo('请输入正确的手机号码')
				} else if (this.form.password === '') {
					this.showInfo('请输入密码')
				} else if (!psReg.test(this.form.password)) {
					this.showInfo('请输入正确的密码格式')
				} else if (this.form.checkCode === '') {
					this.showInfo('请输入验证码')
				} else {
					if (this.isBtn) {
						this.registerPromoter()
					}
				}
			},
			registerPromoter () {
				this.isBtn = false
				let form = Object.assign({}, this.form)
				form.password = this.util.sha1(form.password)
				form.confirmPassword = this.util.sha1(form.confirmPassword)
				console.log(form)
				api.becomePromoter(form).then(res => {
					if (res.data) {
						console.log(res.data)
						if (res.data.errCode === 0) {
							// this.showInfo('注册成功')
							this.loading(true, '注册成功')
							// this.$router.push('/Extension')
							setTimeout(() => {
							this.$router.push('/Extension/Login?isPromoter=true')
						}, 300)
						} else {
							this.isBtn = true
							this.showInfo(res.data.errMsg)
							// alert(JSON.stringify(res.data))
						}
					}
				}).catch(err => {
					alert(JSON.stringify(res.data))
				})
			},
		}
	}
</script>

<style lang="less" scoped>
@import './../../assets/css/public.less';
	.vcode_btn {
		height: 2.5rem;
		line-height: 2.5rem !important;
		margin-top: 0;
		.bgLinearGradient(@top: #fe2b88; @bottom: #f01a59;);
	}
	.rigister {
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
		padding: 0 4rem;
		overflow: scroll;
		img {
			margin: 5rem 30% 10px 30%;
			width: 40%;
		}

		.btn {
			width: 100%;
			margin-top: 4rem;
			border: none;
			outline: none;
			color: #fff;
			line-height: 4rem;
			font-size: 1.8rem;
			margin-bottom: 4rem;
			.bgLinearGradient(@top: #fe2b88; @bottom: #f01a59;);
			height: 4.4rem;
		}
		.gray {
			background: gray;
		}
		.left {
			border-left: 1px solid #D9D9D9;
			border-right: 1px solid #D9D9D9;
		}
	}
	.weui-btn_plain-primary {
		color: #fff !important;
		background: #999;
    border: 1px solid #999 !important;
	}

	.weui-cells {
		border-left: 1px solid #d9d9d9;
		border-right: 1px solid #d9d9d9;
	}
</style>
