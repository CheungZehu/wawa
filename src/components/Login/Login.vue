<template>
	<div class="login-box" :style="{height: height + 'px'}">
		<div class="login">
			<img :src="this.urlSk.logoUrl()" alt="">
			<group>
				<x-input title="手机" placeholder="请输入手机号码" type="number" v-model="form.mobile" style="font-size: 1.6rem;" required>
					<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
				</x-input>
			</group>
			<!-- <group>
				<x-input title="密码" placeholder="请输入密码" type="password" v-model="form.pwd"  @keyup.native="form.pwd = form.pwd.replace(/[^\w\.\/]/ig,'')" style="font-size: 1.6rem;" required>
					<i slot="label" class="iconfont icon-mima" style="padding-right:10px;display:block;" width="30" height="30"></i>
				</x-input>
			</group> -->
			<group>
				<x-input v-model="form.checkCode" title="验证码" placeholder="请输入验证码" required class="left" type="number" style="font-size: 1.6rem;">
					<i slot="label" class="iconfont icon-mima" style="padding-right:10px;display:block;" width="30" height="30"></i>
					<x-button class="vcode_btn" v-show="showBtn" slot="right" type="primary" mini @click.native="getVcode">获取</x-button>
					<x-button class="vcode_btn" v-show="!showBtn" slot="right" mini plain type="primary" style="margin-top: 0;" >{{number}}</x-button>
				</x-input>
			</group>
			<div class="auto-login">
				<check-icon :value.sync="autoLogin">自动登录</check-icon>
			</div>
			<x-button class="btn" @click.native="login" type="primary" :class="{gray: !isBtn}">登录</x-button>
		</div>
	</div>
</template>

<script>
	import { Group, XInput, XButton, Box, CheckIcon } from 'vux'
	import api from '../../api/api'

	export default {
		components: {
			Group, XInput, XButton, Box, CheckIcon
		},
		data () {
			return {
				form: {
					mobile: '',
					// pwd: '',
					checkCode: '',
					autoLogin: 1,
				},
				isLogin: true,
				isBtn: true,
				height: 0,
				showBtn: true,
				number: 60,
				autoLogin: true,
			}
		},
		created () {
			this.loading(false)
		},
		mounted() {
      this.height = window.innerHeight
      window.onresize = () => {
        this.height = window.innerHeight
      }
    },
		methods: {
			// 获取验证码
			getVcode () {
				var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				if (!reg.test(this.form.mobile)) {
					this.showInfo('请输入正确的手机号码')
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
			login () {
				var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
				if (this.form.mobile === '') {
					this.showInfo('请输入手机号码')
				} else if (!reg.test(this.form.mobile)) {
					this.showInfo('请输入正确的手机号码')
				} else if (this.form.checkCode === '') {
					this.showInfo('请输入验证码')
				} else {
					if (this.isBtn) {
						this.loginPromoter()
					}
				}
			},
			loginPromoter () {
				// let form = {
				// 	mobile: this.form.mobile,
				// 	// password: this.util.sha1(this.form.pwd)
				// }
				if (this.autoLogin) this.form.autoLogin = 1
				else this.form.autoLogin = 0
				// alert(JSON.stringify(this.form))
				api.loginPromoter(this.form).then(res => {
					console.log(res.data)
					if (res.data.errCode === 0) {
						// this.showInfo('登录成功')
						this.loading(true, '登录成功,正在进入页面')
						setTimeout(() => {
							this.$router.replace('/Extension')
						}, 300)
						this.isBtn = false
					} else {
						this.isBtn = true
						// alert(JSON.stringify(res.data))
						this.showInfo(res.data.errMsg)
					}
				}).catch(err => {
					alert(JSON.stringify(res.data))
				})
			}
		}
	}
</script>

<style lang="less">
@import './../../assets/css/public.less';
	.vcode_btn {
		// background-color: #00377e;
		font-size: 15px !important;
		height: 25px;
		line-height: 25px !important;
		margin-top: 0;
		width: 70px !important;
	}
	.login-box {
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
    overflow: scroll;
	}
	.login {
		// background-color: #f2f2f2;
		padding: 70px 40px;
		img {
			margin: 0 30% 10px 30%;
			width: 40%;
		}
		.weui-cells {
			border-left: 1px solid #D9D9D9;
			border-right: 1px solid #D9D9D9;
		}
		.auto-login {
			margin-top: 1rem;
			font-size: 1.6rem;
			color: #fff;
			.weui-icon-circle, .weui-icon-success:before {
				color: #f92679;
			}
		}
		.btn {
			width: 100%;
			margin-top: 40px;
			.bgLinearGradient(@top: #fe2b88; @bottom: #f01a59;);
			border: none;
			outline: none;
			color: #fff;
			line-height: 40px;
			font-size: 18px;
			height: 4.4rem;
		}
		.gray {
			background: gray;
		}
	}
	.weui-btn_plain-primary {
		color: #00377e !important;
    border: 1px solid #00377e !important;
	}
</style>