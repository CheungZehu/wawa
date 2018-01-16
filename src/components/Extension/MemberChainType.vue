<template>
	<div class="memberChainType" :style="{height: `${height}px`}">
		<div v-if="newsList.length > 0">
			<div class="list">
				<memberChainType-item v-for="(item, i) in newsList" :key="i" :item="item"></memberChainType-item>
			</div>
			<div class="add">
				<x-button type="primary" @click.native="add">添加</x-button>
			</div>
		</div>

		<div v-else>
			<div class="no-doll" :style="{height: height + 'px'}">
				<p>暂无渠道类型</p>
				<div class="doll-add">
					<x-button type="primary" @click.native="add">添加</x-button>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider, XButton } from 'vux'
	import memberChainTypeItem from '../Common/memberChainTypeItem'
	import { mapState, mapActions } from 'vuex'

	export default {
		components: {
			Group, Scroller, LoadMore, Divider, memberChainTypeItem, XButton
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
		created () {

		},
		mounted() {
      this.memberChainTypeSelectList()
      // this.$nextTick(() => {
			// 	this.$refs.scroller.reset({ top: 0 })
			// })
			this.height = window.innerHeight
			window.onresize = () => {
				this.height = window.innerHeight
			}
    },

		methods: {
      memberChainTypeSelectList () {
        api.memberChainTypeSelectList().then(res => {
          if (res.data.errCode === 0) {
            console.log('memberChainTypeSelectList')
            this.newsList = res.data.data.result
            console.log(this.newsList)
          } else {
            alert(JSON.stringify(res.data))
          }
        })
			},
			add () {
				this.$router.push(`/Extension/MemberChainTypeAdd`)
			}
		},
	}
</script>

<style lang="less">
	.memberChainType {
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
		background-size: 100%;
	
    .list {
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
        padding-bottom: 2rem;
			}
			.doll-add {
				width: 10rem;
				line-height: 2;
			}
		}
		.add {
			padding: 2rem 5rem 0 5rem;
		}
  }
</style>

