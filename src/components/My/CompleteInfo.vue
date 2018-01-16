<template>
	<div class="complete-info">
		<!-- <div class="bg"></div> -->
		<div class="title">
			<span>请完善您的个人资料</span>
			<div class="info">
				<group>
					<x-input title="姓名" v-model="userInfo.name" placeholder="请填写您的真实姓名">
						<i slot="label" class="iconfont icon-wode1" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="手机" disabled v-model="userInfo.mobile" placeholder="请填写您的手机" type="number">
						<i slot="label" class="iconfont icon-shouji" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="公司" v-model="userInfo.company" placeholder="请填写公司全称">
						<i slot="label" class="iconfont icon-gongsi" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
					<x-input title="职务" v-model="userInfo.position" placeholder="请填写您的职务">
						<i slot="label" class="iconfont icon-zhiwei" style="padding-right:10px;display:block;" width="30" height="30"></i>
					</x-input>
				<!-- 	<div class="radio">
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
			<!-- 	{{userInfo}}
				{{dictionaryName}} -->
			</div>

			<x-button @click.native="addInfo" type="primary">提交</x-button>
			<p class="tiaoguo">
				<span @click="tiaoguo" class="tiaoguo">跳过</span>
			</p>
			
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
					// sex: '',
				},
				isBtn: true,
				dictionaryName: [],
				data: {},
			}
		},
		created () {
			let mobile = localStorage.getItem('mobile')
			this.userInfo.mobile = mobile
		},
		methods: {
			addInfo () {
				if (this.userInfo.name === '') {
					this.showInfo('请填写姓名')
				} else if (this.userInfo.mobile === '') {
					this.showInfo('请填写手机')
				} else if (this.userInfo.company === '') {
					this.showInfo('请填写公司')
				} else if (this.userInfo.position === '') {
					this.showInfo('请填写职务')
				// } else if (this.userInfo.sex === '') {
				// 	this.showInfo('请选择性别')
				} else {
					if (this.isBtn) {
						this.isBtn = false
						api.addInfo(this.userInfo).then(res => {
							console.log(res.data)
							this.data = res.data
							if (res.data) {
								if (/html/.test(res.data)) {
									this.showInfo('保存失败，请重新提交')
									this.isBtn = true
								} else {
									localStorage.clear()
									setTimeout(() => {
										this.showInfo('保存成功')
									}, 200)	
									console.log(res.data)
									setTimeout(() => {
										this.$router.push('/myInfo')
									}, 800)
									
								}
							} else {
								this.showInfo('保存失败，请重新提交')
								this.isBtn = true
							}
						})
					}
				}
			},
			tiaoguo () {
				// alert(2)
				api.addInfo({mobile: this.userInfo.mobile}).then(res => {
					if (res.data) {
						if (/html/.test(res.data)) {
							this.showInfo('跳过失败，请重新点击')
							this.isBtn = true
						} else {
							localStorage.clear()
							// setTimeout(() => {
							// 	this.showInfo('保存成功')
							// }, 200)
							
							// console.log(res.data)
							setTimeout(() => {
								this.$router.push('/myInfo')
								// this.isBtn = true
							}, 500)
						}
					} else {
						this.showInfo('跳过失败，请重新点击')
						this.isBtn = true
					}
				})
			},
		},
	}
</script>

<style lang="less">
	.complete-info {

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
			span {
				text-align: center;
				color: #333333;
				display: block;
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
			.tiaoguo {
				text-align: right;
				margin-top: 20px;
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