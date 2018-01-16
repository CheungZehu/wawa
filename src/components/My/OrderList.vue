<template>
  <div id="orders" :style="{height: dlHeight + 'px'}">
		<!-- <x-header title="我的订单"></x-header> -->
		<x-header title="我的订单" :left-options="{preventGoBack: true}" @on-click-back="back" v-if="isTemplateMsg"></x-header>
		<x-header title="我的订单"v-else></x-header>
    <scroller height="-46" v-model="scrollerStatus" scrollbar-y lock-x ref="scroller" :scroll-bottom-offset="150" :pulldown-config="pulldown" :use-pulldown='isPulldown'  @on-pulldown-loading="dollOrdersList(true)" 
		@on-scroll-bottom="dollOrdersList()">
      <div v-if="newsList.length > 0">
				<div>
					<order-item v-for="(item, i) in newsList" :key="i" :item="item" @del="dollOrdersList"></order-item>
				</div>
        <divider v-if="onData" style="color: rgb(125, 113, 113); font-size: 1.4rem;">我是有底线的</divider>
        <load-more tip="数据加载中" v-else style="margin-bottom:80px;"></load-more>
      </div>
      <div v-else>
				<div class="no-doll" :style="{height: dlHeight + 'px'}">
					<img src="http://wawa-1255600302.file.myqcloud.com/images/zhua.png">
					<p>暂无订单记录</p>
				</div>
			</div>
    </scroller>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider, CheckIcon, XButton, Box, XHeader } from 'vux'
  import OrderItem from '../Common/OrderItem'
	import { mapState, mapActions } from 'vuex'

	export default {
		components: {
			Group, Scroller, LoadMore, Divider, OrderItem, CheckIcon, XButton, Box, XHeader
		},
		data () {
			return {
				newsList: [],
				onData: false,
				onFetching: false,
				showUp: true,
				scrollerStatus: {
					pullupStatus: 'default'
				},
				search: {
					start: 0,
					limit: 10,
					count: 0
				},
        isPulldown: false,
        pulldown: {
					downContent: '<img src="../../../static/images/loading.gif" width="30" height="30">',
					upContent: '<img src="../../../static/images/loading.gif" width="30" height="30">',
					loadingContent: '<img src="../../../static/images/loading.gif" width="30" height="30">',
				},
				select: false,
				transportAmount: 0,
				leastRemitTransportAmountDollNum: 0,
        myDolls: [],
        isAddress: false,
        dollHeight: 0,
        list: [],
        height: 0,
				dlHeight: 0,
				isTemplateMsg: false,
			}
		},
    created () {

    },
		mounted() {
      this.$nextTick(() => {
				this.$refs.scroller.reset({ top: 0 })
			})
      this.getHeight()
			window.onresize = () => {
				this.getHeight()
			}
			this.from()
    },
		methods: {
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
				let dl = document.getElementById('orders')
				console.log(dl.offsetHeight)
				this.dlHeight = window.innerHeight
			},
      reset () {
        console.log(111)
        this.$nextTick(() => {
          this.$refs.scroller.reset({ top: 0 })
        })
      },
      dollOrdersList(up) {
				if (up) this.search.start = 0	
				if (this.onFetching) {
					return
				} else {
					this.onFetching = true
					if (this.search.count < this.search.start && this.search.count != 0) {
						this.onData = true
						return
					}
					api.dollOrdersList(this.search).then(res => {
						console.log(res.data)
		    		let data = res.data.list
		    		this.search.count = res.data.count
						if (this.search.count <= this.search.limit) this.onData = true
						if (up) this.newsList = []
		    		data.map(item => {
		    			this.newsList.push(item)
						})
						this.search.start = this.search.start + this.search.limit
						// console.log(this.newsList)
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
	}
</script>

<style lang="less">
  #orders {
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
	}
  .no-doll {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
		font-size: 1.4rem;
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

