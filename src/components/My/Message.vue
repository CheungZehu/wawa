<template>
	<div id="messages" :style="{height: `${height}px`}">
		<x-header title="消息中心"></x-header>
		<scroller height="-46" v-model="scrollerStatus" scrollbar-y lock-x ref="scroller" :scroll-bottom-offset="150" :pulldown-config="pulldown" :use-pulldown='isPulldown'  @on-pulldown-loading="getMessages(true)" 
		@on-scroll-bottom="getMessages()">
      <div v-if="newsList.length > 0">
				<div class="message">
					<message-item v-for="(item, i) in newsList" :key="i" :title="item.title" :content="item.content" :time="item.create_time"></message-item>
				</div>
        <divider v-if="onData" style="color: rgb(125, 113, 113); font-size: 1.4rem;">我是有底线的</divider>
        <load-more tip="数据加载中" v-else style="margin-bottom:80px;"></load-more>
      </div>
			<div v-else>
				<div class="no-doll" :style="{height: `${height}px`}">
					<img src="http://wawa-1255600302.file.myqcloud.com/images/zhua.png">
					<p>暂无消息记录</p>
				</div>
			</div>
    </scroller>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider, XHeader } from 'vux'
	import MessageItem from '../Common/MessageItem'
	import { mapState, mapActions } from 'vuex'

	export default {
		components: {
			Group, Scroller, LoadMore, Divider, MessageItem, XHeader
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
					start: 0,
					limit: 10,
					count: 0
				},
				isPulldown: false,
				height: 0,
			}
		},

		mounted() {
      this.$nextTick(() => {
				this.$refs.scroller.reset({ top: 0 })
			})
			this.height = window.innerHeight
			window.onresize = () => {
				this.height = window.innerHeight
			}
    },

		methods: {
			getMessages(up) {
				if (up) this.search.start = 0	
				if (this.onFetching) {
					return
				} else {
					this.onFetching = true
					if (this.search.count < this.search.start && this.search.count != 0) {
						this.onData = true
						return
					}
					api.getMessages(this.search).then(res => {
						// console.log(res.data)
		    		let data = res.data.list
		    		this.search.count = res.data.count
						if (this.search.count <= this.search.limit) this.onData = true
						if (up) this.newsList = []
		    		data.map(item => {
		    			this.newsList.push(item)
						})
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
		},
		watch: {
			onFetching (val) {
				console.log(val)
			}
		}
	}
</script>

<style lang="less">
	#messages {
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
	}
	.message {
		// margin-top: 15px;
		display: flex;
    flex-flow: column;
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
