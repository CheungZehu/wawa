<template>
  <div class="address-record" :style="{height: height + 'px'}">
    <x-header title="我的地址"></x-header>
    <div v-if="list.length > 0">
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
      <div class="add-btn">
        <x-button class="address-btn" @click.native="add">添加地址</x-button>
      </div>
    </div>
    <div v-else>
      <div class="no-dolls" :style="{height: height + 'px'}">
        <img src="http://wawa-1255600302.file.myqcloud.com/images/zhua.png">
        <p>暂无地址<span class="add" @click="add">去添加</span></p>
      </div>
    </div>
  </div>
    
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider, CheckIcon, XButton, Box, XHeader } from 'vux'
  import DollItemSelect from '../Common/DollItemSelect'
	import { mapState, mapActions } from 'vuex'

	export default {
		components: {
			Group, Scroller, LoadMore, Divider, DollItemSelect, CheckIcon, XButton, Box, XHeader
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
        if (this.list.length < 5) {
          this.$router.replace('/myInfo/addAddress')
        } else {
          this.showInfo('最多可添加五个地址')
        }
      },
      date (id) {
        this.$router.replace('/myInfo/addAddress?id=' + id)
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
        if (confirm('是否删除该地址？')) {
          api.delAddress(item.id).then(res => {
            console.log(res.data)
            if (res.data.errCode === 0) {
              this.showInfo('删除成功')
              this.addressesList()
            }
          })
        }  
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
	.address-record {
    background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
    overflow: scroll;
    .address {
      background: #fff;
      margin: 10px;
      padding: 10px 15px 0 15px;
      border-radius: 5px;
      .address-title {
        color: #333;
        border-bottom: 1px solid #fbe2e8;
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
        border-top: 1px solid #fbe2e8;
        padding: 8px 0;
        justify-content: flex-end;
        color: #333;
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
    .add-btn {
      padding: 10px;
      .address-btn {
        background: #af5064;
        color: #fff;
      }
    }  
    .add {
      text-decoration: underline;
      margin-left: 5px;
    }
    .no-dolls {
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
  }
</style>

