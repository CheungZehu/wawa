<template>
	<div id="news" :style="{height: `${height}px`}">
		<x-header title="游戏公告" class="x-header"></x-header>
		<!-- <div class="tabs" id="tabs">
			<div class="tabs_wrap">
				<div class="tabs_nav">
					<div class="tabs_nav-bar" :style="{width: `${tabWidth}px`, transform: `translate3d(${translateWidth}px,0,0)`}"></div>
					<div class="tab-item" v-for="(item, index) in newsTypeList" :key="index" :class="{'tab-active': tabActive === index}" @click="clickActive(index, item)">
						<span>{{item.name}}</span>
					</div>
				</div>
			</div>
		</div> -->
		<!-- <div v-if="newsList.length > 0">
			<router-link class="news" v-for="(item, i) in newsList" :key="i" :to="{name: 'NewsDateil', params: {id: item.id}}">
				<news-item :key="i" :item="item"></news-item>
			</router-link>
			<divider v-if="shows" style="color: rgb(125, 113, 113); font-size: 1.4rem;">我是有底线的</divider>
			<p style="text-align:center;" v-else>
				<inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;数据加载中</span>
			</p>
		</div>
		<div v-else>
			<div class="no-doll" :style="{height: `${height}px`}">
				<img src="http://wawa-1255600302.file.myqcloud.com/images/zhua.png">
				<p>暂无新闻</p>
			</div>
		</div> -->
		<!-- <p style="font-size: 1.6rem;" v-for="i in 30">{{i}}反辐射地方看破啊世界佛教倒是fda送风机哦反辐射地方看破啊世界佛教倒是fda送风机哦见佛的就仨房见佛的就仨房</p> -->
		<scroller height="-46" v-model="scrollerStatus" scrollbar-y lock-x ref="scroller" :scroll-bottom-offset="150" :pulldown-config="pulldown" :use-pulldown='isPulldown'  @on-pulldown-loading="getNews(true)" 
		@on-scroll-bottom="getNews()">
      <div v-if="newsList.length > 0">
        <router-link class="news" v-for="(item, i) in newsList" :key="i" :to="{name: 'NewsDateil', params: {id: item.id}}">
          <news-item :key="i" :item="item"></news-item>
        </router-link>
        <divider v-if="onData" style="color: rgb(125, 113, 113); font-size: 1.4rem;">我是有底线的</divider>
        <load-more tip="数据加载中" v-else style="margin-bottom:80px;"></load-more>
      </div>
			<div v-else>
				<div class="no-doll" :style="{height: `${height}px`}">
					<img src="http://wawa-1255600302.file.myqcloud.com/images/zhua.png">
					<p>暂无新闻</p>
				</div>
			</div>
    </scroller>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider, XHeader } from 'vux'
	import NewsItem from '../Common/NewsItem'
	import { mapState, mapActions } from 'vuex'

	export default {
		components: {
			Group, Scroller, LoadMore, Divider, NewsItem, XHeader
		},
		data () {
			return {
				newsList: [],
				onData: false,
				onFetching: false,
				showUp: true,
				pulldown: {
					downContent: '<img src="../../../static/images/loading.gif" width="30" height="30">',
					upContent: '<img src="../../../static/images/loading.gif" width="30" height="30">',
					loadingContent: '<img src="../../../static/images/loading.gif" width="30" height="30">',
				},
				scrollerStatus: {
					pullupStatus: 'default'
				},
				search: {
					// start: 0,
					// limit: 10,
          count: 0,
          curPage: 0,
					size: 10,
					typeId: 'f6bd0c42862646ab941e0780a496eecf',
				},
				total: 0,
				sw: true,
				shows: false,
				isPulldown: false,
        dlHeight: 0,
				height: 0,
				newsTypeList: [{name: '全部', id: ''}],
				tabActive: 0,
				tabWidth: 0,
				translateWidth: 0,
			}
		},

		mounted() {
			this.$nextTick(() => {
				this.$refs.scroller.reset({ top: 0 })
			})
			this.getChannelsType()
			// this.getNews()
      this.height = window.innerHeight
			window.onresize = () => {
        this.height = window.innerHeight
			}
			window.onscroll = this.util.debounce(this.setScroll, 500, false)
    },

		methods: {
			getChannelsType () {
				api.getChannelsType(2).then(res => {
					if (res.data.errCode === 0) {
						console.log('getChannelsType')
						console.log(res.data)
						res.data.list.map(item => {
							this.newsTypeList.push(item)
						})
						// this.channelsTypeList = res.data.list
						this.tabWidth = window.innerWidth / this.newsTypeList.length
					}
				})
			},
			clickActive (index, item) {
				this.tabActive = index
				this.swiperIndex = index
				this.translateWidth = this.tabWidth * index
				console.log(item)
				this.getNews(item.id)
			},
			// getNews (id) {
			// 	this.search.curPage++
			// 	if (id || id === '') {
			// 		this.search.curPage = 1
			// 		this.
			// 	}
			// 	api.getNews(this.search).then(res => {
			// 		if (res.data.errCode === 0) {
			// 			console.log('getNews')
			// 			console.log(res.data)
			// 			this.total = res.data.count
			// 			if (this.total === 0) this.shows = true
			// 			res.data.list.map(item => {
			// 				this.newsList.push(item)
			// 			})
			// 			console.log(this.newsList)
			// 			if (this.total <= this.newsList.length) this.shows = true
			// 			this.sw = true
			// 		}
			// 	})
			// },
			setScroll () {
				if (document.body.scrollHeight - window.innerHeight - 500 <= document.body.scrollTop || document.documentElement.scrollTop) {
					if (this.total <= this.newsList.length) {
						this.shows = true
					} else {
						if (this.sw === true) {
							this.sw = false
							this.shows = false
							this.getNews()
						}
					}
				}
			},
			getNews(up) {
        this.search.curPage++
				// if (up) this.search.start = 0	
				if (this.onFetching) {
					return
				} else {
					this.onFetching = true
					if (this.search.count < this.search.curPage * this.search.size && this.search.count != 0) {
						this.onData = true
						return
					}
					api.getNews(this.search).then(res => {
						// console.log(res.data)
		    		let data = res.data.list
		    		this.search.count = res.data.count
						if (this.search.count <= this.search.curPage * this.search.size) this.onData = true
						if (up) this.newsList = []
		    		data.map(item => {
		    			this.newsList.push(item)
						})
						// this.search.start = this.search.start + this.search.limit
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
		},
		watch: {
			onFetching (val) {
				console.log(val)
			}
		}
	}
</script>

<style lang="less">
	#news {
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
		background-size: 100%;
		overflow: scroll;
		// .x-header {
		// 	position: fixed;
		// 	width: 100%;
		// }
		.tabs {
			position: fixed;
			width: 100%;
			top: 46px;
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
						z-index: 1;
						left: 0;
						bottom: 15px;
						height: 2px;
						position: absolute;
						background-color: #f44;
						// width: 105px;
						// transform: translate3d(0,0,0);
						transition-duration: .2s;
					}
					.tab-item {
						flex: 1;
						cursor: pointer;
						padding: 0 5px;
						font-size: 1.4rem;
						position: relative;
						color: #333;
						line-height: 44px;
						text-align: center;
						box-sizing: border-box;
						background-color: #fff;
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
			}
		}
		.news {
			// margin-top: 90px;
			display: flex;
			flex-flow: column;
		}
	}
	
		.no-doll {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-flow: column;
			font-size: 1.5rem;
			img {
				width: 9rem;
				height: 9rem;
			}
			p {
				line-height: 3;
				color: #895f05;
				padding-bottom: 30%;
			}
		}

</style>

