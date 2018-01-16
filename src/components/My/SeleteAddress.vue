<template>
	<div class="address-selete" :style="{height: height + 'px'}">
    <div class="address" v-for="(item, i) in list" :key="i">
      <div class="address-text">
        <p class="name">{{item.receiverAppellation}}  {{item.mobile}}</p>
        <p class="context">{{item.province}}{{item.city}}{{item.county}}{{item.street}}</p>
      </div>
      <div class="setting">
        <p class="iconfont icon-bianji" @click="date(item.id)">编辑</p>
        <p class="iconfont icon-delete" @click="delAddress(item)">删除</p>
      </div>
    </div>
    <div class="ad-btn">
      <!-- <button class="address-btn">添加地址</button> -->
      <x-button class="address-btn" @click.native="add">添加地址</x-button>
    </div>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider, CheckIcon, XButton, Box } from 'vux'
  import DollItemSelect from '../Common/DollItemSelect'
	import { mapState, mapActions } from 'vuex'

	export default {
		components: {
			Group, Scroller, LoadMore, Divider, DollItemSelect, CheckIcon, XButton, Box
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
				select: false,
				transportAmount: 0,
				leastRemitTransportAmountDollNum: 0,
        myDolls: [],
        isAddress: false,
        dollHeight: 0,
        list: [],
        height: 0,
			}
		},
    created () {
      // this.myDolls = JSON.parse(localStorage.getItem('myDolls'))
      // console.log(this.myDolls)
      this.addressesList()
    },
		mounted() {
      this.height = window.innerHeight
      window.onresize = () => {
        this.height = window.innerHeight
      }
    },
		methods: {
      add () {
        this.$router.push('/myInfo/addAddress')
      },
      date (id) {
        this.$router.push('/myInfo/addAddress?id=' + id)
      },
      addressesList () {
        api.addressesList().then(res => {
          console.log(res.data)
          if (res.data.errCode === 0) {
            this.list = res.data.list
          }
        })
      },
      delAddress (item) {
        api.delAddress(item.id).then(res => {
          console.log(res.data)
          if (res.data.errCode === 0) {
            this.showInfo('删除成功')
            this.addressesList()
          }
        })
      },
		},
		watch: {
			newsList: {
				handler (val) {
					console.log(val)
					let count = 0
					val.map(item => {
						if (item.status) {
							count++
						}
					})
					if (count === val.length) {
						this.select = true
					} else {
						this.select = false
					}
					this.transport(count)
				},
				deep: true
			}
		}
	}
</script>

<style lang="less">
	.address-selete {
    // padding-top: 10px;
    overflow: scroll;
    .address {
      background: #fffadd;
      margin: 10px;
      padding: 10px 15px 0 15px;
      border-radius: 5px;
      .address-title {
        color: #c5b063;
        border-bottom: 1px solid #f3e79d;
        padding-bottom: 5px;
        font-size: 1.6rem;
      }
      .address-text {
        color: #333;
        line-height: 1.5;
        padding: 10px 0;
        font-size: 1.6rem;
        .name {
          padding-bottom: 10px;
        }
      }
      .setting {
        display: flex;
        border-top: 1px solid #f3e79d;
        padding: 8px 0;
        justify-content: flex-end;
        color: #b79e44;
        .iconfont {
          font-size: 1.4rem;
          &:before {
            margin-right: 5px;
          }
          &:last-child {
            margin-left: 20px;
          }
        }
      }
    }
    .ad-btn {
      padding: 10px;
      .address-btn {
        background: #804c01;
        color: #fff;
      }
    }  
  }
</style>

