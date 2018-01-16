<template>
	<div class="my" :style="{height: height + 'px'}">
		<x-header title="个人中心"></x-header>
		<div class="my-head">
			<div class="user">
				<div class="img">
					<img :src="userInfo.headImage" v-if="userInfo.headImage" alt="">
					<img v-else src="http://wawa-1255600302.file.myqcloud.com/images/headImg.jpg" alt="">
				</div>
				<p class="user-name">{{userInfo.nickname || '昵称'}}</p>
				<!-- <p class="user-id">{{userInfo.id || 'ID:8745654646'}}</p> -->
			</div>
      <div class="info-record">
        <p>抓取次数:{{search.count}}次</p>
        <p style="padding: 0 8px;">|</p> 
        <p>
          <span>余额:{{sum}}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jinbi1"></use>
          </svg>
        </p>
      </div>
		</div>
    <div class="catch-record" id="catch-record">
			<scroller height="-231" v-model="scrollerStatus" scrollbar-y lock-x ref="scroller" :scroll-bottom-offset="150" :pulldown-config="pulldown" :use-pulldown='isPulldown'  @on-pulldown-loading="grabRecord(true)" @on-scroll-bottom="grabRecord()">
				<div v-if="newsList.length > 0">
					<div class="record">
						<doll-item v-for="(item, i) in newsList" :key="i" :name="item.name" :imgUrl="img + item.previewImage" :time="item.createTime" :status="item.caught"></doll-item>
					</div>
					<divider v-if="onData" style="color: rgb(125, 113, 113);">我是有底线的</divider>
        	<load-more tip="数据加载中" v-else style="margin-bottom:80px;"></load-more>
				</div>
				<div v-else>
					<div class="no-doll" :style="{height: dlHeight + 'px'}">
						<img src="http://wawa-1255600302.file.myqcloud.com/images/zhua.png">
						<p>暂无抓中记录</p>
					</div>
				</div>
			</scroller>
    </div>
	</div>
</template>

<script>
	import { Group, Cell, Scroller, LoadMore, Divider, XHeader } from 'vux'
	import api from '../../api/api'
	import DollItem from '../Common/DollItem'
	import { mapState, mapActions } from 'vuex'

	export default {
		components: {
			Group, Cell, Scroller, LoadMore, Divider, DollItem, XHeader
		},
		data () {
			return {
				// userInfo: {},
				// sum: 0,
				newsList: [],
				onData: false,
				onFetching: false,
				pulldown: {
					downContent: '<img src="../../../static/images/loading.gif" width="30" height="30">',
					upContent: '<img src="../../../static/images/loading.gif" width="30" height="30">',
					loadingContent: '<img src="../../../static/images/loading.gif" width="30" height="30">',
				},
				scrollerStatus: {
					pullupStatus: 'default'
				},
				isPulldown: false,
				search: {
					start: 0,
					limit: 10,
					count: 0
				},
				dlHeight: 0,
				height: 0,
			}
		},
		created () {
			// this.getUserInfo()
		},
		mounted () {
			this.$nextTick(() => {
				this.$refs.scroller.reset({ top: 0 })
			})
			this.getHeight()
			window.onresize = () => {
				this.getHeight()
			}
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
			...mapActions([
				'updateSum'
			]),
			getHeight () {
				let dl = document.getElementById('catch-record')
				this.dlHeight = window.innerHeight - 185 - 46
				this.height = window.innerHeight
			},
			grabRecord(up) {
				if (up) this.search.start = 0	
				if (this.onFetching) {
					return
				} else {
					this.onFetching = true
					if (this.search.count < this.search.start && this.search.count != 0) {
						this.onData = true
						return
					}
					api.grabRecord(this.search).then(res => {
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
		}
	}
</script>

<style lang="less">
@import './../../assets/css/public.less';
	.my {
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
		.my-head {
			text-align: center;
			padding-top: 20px;
			.user {
				z-index: 1;
				display: flex;
		    flex-direction: column;
		    align-items: center;
		    width: 100%;
				.img {
					width: 6rem;
					height: 6rem;
          border-radius: 50%;
          border: 2px solid #333;
          box-sizing: border-box;
					overflow: hidden;
					background: #f4f4f4;
					img {
						width: 100%;
					}
				}
				.user-name {
					margin-top: 5px;
					font-size: 1.6rem;
					font-weight: bold;
					text-align: center;
					.ellipsis;
					width: 80%;
				}
				.user-id {
					font-size: 1.4rem;
          color: #333;
          line-height: 1;
				}
      }
      .info-record {
        margin-top: 5px;
        background: rgba(0, 0, 0, 0.15);
        display: inline-flex;
        align-items: center;
        border-radius: 30px;
        padding: 3px 15px;
        color: #fff;
        font-size: 1.2rem;
        p {
          display: inline-flex;
          align-items: center;
          line-height: 1;
          .icon {
            width: 1.5rem;
            height: 1.5rem;
            margin-left: 5px;
          }
        }
      }
    }
    .catch-record {
      background-color: #fff;
			margin: 15px 15px 0 15px;
			border-radius: 5px;
			.no-doll {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-flow: column;
				// margin-top: 50px;
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
		}
	}
</style>
