<template>
	<div class="new-detail" v-if="!isLoading" :style="{height: height + 'px'}">
		<div class="detail-context">
			<div class="new-title">
				<h2 class="detail-title">{{titleDetail.title}}</h2>
				<div class="media_meta_list">
					<span class="time">{{titleDetail.createTime}}</span>
					<span class="author">哎哟抓娃娃</span>
					<!-- <a class="origin" :href="titleDetail.weixinUrl" v-if="titleDetail.weixinName">{{titleDetail.weixinName}}</a> -->
				</div>
			</div>
			<div class="new-text" v-html="newsDetail"></div>
			<!-- <div class="new-text" v-for="i in 90">
				<p>感觉啊扑克牌给恐怕是的看法皮卡视频开发</p>
			</div> -->
			<!-- <div class="bottom">
				<router-link to="/index">
					<span>返回首页</span>
				</router-link>
				<span class="logo">企成 · 互联</span>
			</div> -->
		</div>
	</div>
</template>

<script>
	import api from "../../api/api"
	import { mapState, mapActions } from 'vuex'

	export default {
		data () {
			return {
				newsDetail: [],
				titleDetail: {},
				show: false,
				height: 0,
			}
		},
		computed: {
			...mapState({
				isLoading: state => state.isLoading,
				path: state => state.route.path,
			})
		},
		created () {
			this.setDetail()
		},
		mounted () {
			this.height = window.innerHeight
      window.onresize = () => {
        this.height = window.innerHeight
      }
		},
		methods: {
			...mapActions([
				'updateLoadingStatus'
			]),
			setDetail () {
				this.show = false
				// this.updateLoadingStatus(true)
				api.getDetail(this.$route.params.id).then(res => {
					console.log(res.data)
					if (res.data.errCode === 0) {
						this.titleDetail = res.data.result
						this.newsDetail = this.titleDetail.content
					}
						
					if (/<img/.test(this.newsDetail)) {
						var strs = this.newsDetail.split('<img')
						var text = '<img style="display:inline;width:100%;height:100%;"'
						for (var i = 0; i < strs.length - 1; i++) {
							strs[i] += text
						}
						function append (oVal, nVal) {
							return oVal + nVal
						}
						this.newsDetail = strs.reduce(append)
					}
					// this.updateLoadingStatus(false)
					this.show = true
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.new-detail {
		overflow: scroll;
		.detail-context {
			padding: 20px 15px;
			background-color: #fff;
			.new-title {
				.detail-title {
					margin-bottom: 10px;
					line-height: 1.4;
					font-weight: 400;
					font-size: 25px;
				}
				.media_meta_list {
					margin-bottom: 18px;
					line-height: 20px;
					font-size: 17px;
					color: #8c8c8c;
				}
			}
			.new-text {
				// background: #fff;
				// padding: 10px;
				font-size: 17px;
				color: #3e3e3e;
				overflow: hidden;
				line-height: 1.7;
				p {
					margin-bottom: 5px;
					// text-indent: 2em;
					// text-align:justify;
				}
				img {
					width: 100%;
					margin: 5px 0;
				}
			}
			.bottom {
				height: 60px;
				line-height: 60px;
				text-align: center;
				span {
					color: #999;
					margin-right: 20px;
				}
				.logo {
					border-left: 1px solid #999;
					padding-left: 40px;
					&:before {
						content: '';
						// background: url('../../../static/images/qicheng.png') no-repeat;
						background-size: 100%;
						display: inline-block;
						height: 17px;
						width: 17px;
						position: relative;
						top: 4px;
						right: 15px;
					}
				}
			}
		}
			
			
	}
</style>