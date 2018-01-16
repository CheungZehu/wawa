<template>
	<div class="modify-info">
		<!-- <div class="bg"></div> -->
		<div class="title">
			<p>您可以点击修改您的个人资料</p>
			<div class="info">
				<group>
					<x-input title="姓名" v-model="userInfo.name" placeholder="请填写您的真实姓名">
						<i slot="label" class="iconfont icon-wode1" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="手机" v-model="userInfo.mobile" placeholder="请填写您的手机" type="number">
						<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="公司" v-model="userInfo.company" placeholder="请填写公司全称">
						<i slot="label" class="iconfont icon-gongsi" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="职务" v-model="userInfo.position" placeholder="请填写您的职务">
						<i slot="label" class="iconfont icon-zhiwei" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>

					<!-- <div class="radio">
						<i class="iconfont icon-xingbie1"></i>
						<checker v-model="userInfo.sex" default-item-class="radio-item" selected-item-class="radio-item-selected">
							<checker-item value="male">男</checker-item>
	      					<checker-item value="female">女</checker-item>
						</checker>
					</div> -->
					<!-- <popup-radio title="" :options="dictionaryName" v-model="userInfo.department" placeholder="请选择部门">
						<i slot="icon" class="iconfont icon-bumen" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</popup-radio> -->
				</group>
			</div>
			<x-button @click.native="modifyInfo" type="primary">确定</x-button>
		</div>
	</div>
</template>

<script>
	import { Group, XInput, Checker, CheckerItem, PopupRadio, XButton } from 'vux'
	import api from '../../api/api'

	export default {
		components: {
			Group, XInput, Checker, CheckerItem, PopupRadio, XButton
		},
		data () {
			return {
				userInfo: {
					name: '',
					mobile: '',
					company: '',
					position: '',
					id: '',
					sex: '',
				},
				isBtn: true,
				data: {},

			}
		},
		created () {
			// let id = '4817d9aa4dd74914a070045ce51858f4'
			this.setInfo()
		},
		methods: {
			setInfo () {
				api.getInfo().then(res => {
					if (res.data) {
						console.log(res.data)
						this.data = res.data
						let data = res.data
						this.userInfo.name = data.name || ''
						this.userInfo.mobile = data.mobile || ''
						this.userInfo.company = data.company || ''
						this.userInfo.position = data.position || ''
						this.userInfo.id = data.id || ''
						// this.userInfo.sex = data.sex || ''
					}
				})
			},
			modifyInfo () {
				var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
				console.log(this.userInfo.name)
				if (this.userInfo.name === '') {
					this.showInfo('请填写姓名')
				} else if (this.userInfo.mobile === '') {
					this.showInfo('请填写手机')
				} else if (this.userInfo.company === '') {
					this.showInfo('请填写公司')
				} else if (this.userInfo.position === '') {
					this.showInfo('请填写职务')
				} else if (!reg.test(this.userInfo.mobile)) {
					this.showInfo('请填写正确的手机号码')
				} else {
					if (this.isBtn) {
						api.addInfo(this.userInfo).then(res => {
							this.isBtn = false
							if (/html/.test(res.data)) {
								this.showInfo('修改失败，请重新提交')
								this.isBtn = true
							}
							if (res.data) {
								this.showInfo('修改成功')

								setTimeout(() => {
									this.$router.push('/myInfo')
								}, 500)
							} else {
								this.showInfo('修改失败，请重新提交')
								this.isBtn = true
							}
						})
					}
				}
			}
		}
	}
</script>

<style lang="less">
	.modify-info {

		.bg {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			z-index: -1;
		}
		.title {
			padding: 30px 20px 0 20px;
			p {
				text-align: center;
				color: #333333;
			}
			.info {
				border-left: 1px solid #f2f2f2;
				border-right: 1px solid #f2f2f2;
				margin: 20px 0;
				.iconfont:before {
					font-size: 22px;
					color: @primary-color;
				}
			}
			button {
				width: 100%;
				background-color: @primary-color;
				border: none;
				outline: none;
				color: #fff;
				line-height: 40px;
				font-size: 20px;
				margin-top: 40px;
			}
		}
	}
	.vux-checker-box {
	  	display: inherit;
	  }
	.radio-item {
		display: inline-flex !important;
		align-items: center;
		margin-left: 25px;
		&:before {
			content: '';
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background: #fff;
			border: 2px solid #999;
			display: inline-block;
			vertical-align: middle;
			margin-right: 5px;
		}
	}
	.radio-item-selected {
		display: inline-flex !important;
		align-items: center;
		&:before {
			width: 9px;
			height: 9px;
			border: 5px solid #00377e;
			vertical-align: middle;
		}
	}
	.radio {
		padding: 10px 15px;
		border-top: 1px solid #f2f2f2;
		display: flex;
		align-items: center;
	}
</style>