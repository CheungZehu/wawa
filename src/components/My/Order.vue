<template>
	<div class="order-record" :style="{height: height + 'px'}">
		<x-header title="下单"></x-header>
    <div class="address" id="address">
      <p class="address-title">收货地址</p>
      <div class="address-text" v-if="list.length" >
        <p class="name">{{this.list[index].receiverAppellation}}  {{this.list[index].mobile}}</p>
        <p class="context">{{this.list[index].province}}{{this.list[index].city}}{{this.list[index].county}}{{this.list[index].street}}</p>
				<p class="qie" @click="seleteAddress">切换地址</p>
      </div>
      <div class="no-address" v-else @click="addressAdd">
        <p>暂无地址，点击填写地址</p>
      </div>
    </div>
    <div class="mydoll" :style="{height: dollHeight + 'px'}">
      <p class="mydoll-title">选中娃娃</p>
      <div class="list">
        <div class="doll-item" v-for="(item,i) in myDolls" :key="i">
          <div class="left">
            <div class="img">
              <img :src="img + item.previewImage" alt="">
            </div>
            <div class="text">
              <p class="title">{{item.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
		<div class="order-bottom">
			<div class="left">
				<div class="postage">
					邮费：
					<span v-if="transportAmount !== 0">￥{{transportAmount | price}}</span>
					<span v-else>包邮</span>
				</div>
			</div>
			<div class="right is-btn" v-if="isBtn">
				<p v-if="transportAmount !== 0">微信支付</p>
				<p v-else>确定</p>
			</div>
			<div class="right" v-else @click="order">
				<p v-if="transportAmount !== 0">微信支付</p>
				<p v-else>确定</p>
			</div>
		</div>
		<div class="selete-mask" @click="seleteAddress" :class="{show: isSelete}"></div>
		<div class="selete-address" id="selete-address" :class="{none: !isSelete}">
			<div class="se-item" v-for="(item, i) in list" :key="i" @click="seleted(i)">
				<div class="txt">
					<p>{{item.receiverAppellation}} {{item.mobile}}</p>
					<p>{{item.province}}{{item.city}}{{item.county}}{{item.street}}</p>
				</div>
				<i class="iconfont icon-dui" v-if="index === i"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '../../api/api'
	import { Group, Scroller, LoadMore, Divider, CheckIcon, XHeader } from 'vux'
  import DollItemSelect from '../Common/DollItemSelect'
	import { mapState, mapActions } from 'vuex'

	export default {
		components: {
			Group, Scroller, LoadMore, Divider, DollItemSelect, CheckIcon, XHeader
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
				model: {
					dollIds: '',
					addressId: '',
					payWay: 2,
				},
				isSelete: false,
				index: 0,
				add: false,
				isBtn: false,
				height: 0,
			}
		},
    created () {
			this.addressesList()
      this.myDolls = JSON.parse(localStorage.getItem('myDolls'))
			console.log(this.myDolls)
			
    },
		mounted() {
			this.transport(this.myDolls.length)
			this.getHeight()
			window.onresize = () => {
				this.getHeight()
			}
    },
		beforeDestroy() {	
			if (!this.add) {
				localStorage.removeItem('myDolls')
				console.log("localStorage.removeItem");
			}
		},
		methods: {
			getHeight () {
				this.dollHeight = window.innerHeight - 320
				this.height = window.innerHeight
			},
			// 添加地址
			addressAdd () {
				this.add = true
				this.$router.push('/myInfo/addAddress?add=true')
			},
			// 显示选择地址
			seleteAddress () {
				this.isSelete = !this.isSelete
			},
			// 切换地址
			seleted (i) {
				this.index = i
				this.seleteAddress()
			},
			order () {
				this.loading(true, '请稍候')
				let str = ''
				this.myDolls.map(item => {
					str += item.id + ','
				})
				str = str.substring(0, str.length- 1)
				this.model.dollIds = str
				this.model.addressId = this.list[this.index].id
				console.log(this.model)
				this.dollOrders()
			},
			dollOrders () {
				// this.loading(true, '请稍候')
				this.isBtn = true
				if (this.isBtn) {
					api.dollOrders(this.model).then(res => {
						console.log(res.data)
						this.loading(false)
						if (res.data.errCode === 0) {
							this.loading(false)
							this.showInfo('下单成功')
							setTimeout(() => {
								if (res.data.tokenId) {
									window.location.href = `https://pay.swiftpass.cn/pay/jspay?token_id=${res.data.tokenId}`
								} else {
									this.$router.replace('/myInfo/orderList')
								}
							}, 200)
						} else {
							this.loading(false)
							this.isBtn = false
							// alert(JSON.stringify(res.data))
							this.showInfo(res.data.errMsg)
							console.log(res.data)
						}
					}).catch(err => {
						this.loading(false)
						this.isBtn = false
					})
				}	
			},
			// 包邮
			transport (val) {
				api.transportAmount(val).then(res => {
					console.log(res.data)
					if (res.data.errCode === 0) {
						this.transportAmount = res.data.data.transportAmount
						this.leastRemitTransportAmountDollNum = res.data.data.leastRemitTransportAmountDollNum
					}
				})
			},
			// 地址列表
			addressesList () {
        api.addressesList().then(res => {
          console.log(res.data)
          if (res.data.errCode === 0) {
						this.list = res.data.list
						console.log(this.list)
          }
        })
      },
		},
	}
</script>

<style lang="less">
	.order-record {
		// padding-top: 10px;
		background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
    .address {
      background: #fff;
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
			height: 15rem;
			font-size: 1.6rem;
			position: relative;
      .address-title {
        color: #333;
        border-bottom: 1px solid #fbe2e8;
        padding-bottom: 3px;
      }
      .address-text {
        color: #333;
        line-height: 1.5;
        .name {
          padding: 10px 0 5px 0;
				}
				.qie {
					background: #804c01;
					position: absolute;
					right: 5px;
					bottom: 5px;
					color: #fff;
					border-radius: 5px;
					padding: 3px 10px;
				}
      }
      .no-address {
				height: 12rem;
				font-size: 1.6rem;
				display: flex;
				justify-content: center;
				align-items: center;
      }
    }
    .mydoll {
      background: #fff;
      margin: 10px;
      padding: 10px;
      border-radius: 5px;
      overflow: scroll;
      .mydoll-title {
        color: #333;
        border-bottom: 1px solid #fbe2e8;
				padding-bottom: 5px;
				font-size: 1.5rem;
      }
      .list {
        .doll-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #fbe2e8;
          &:active {
            background-color: rgb(255, 251, 200);
          }
          .left {
            display: inline-flex;
            align-items: center;
            .img {
              flex-shrink: 0;
              margin-right: 10px;
              width: 40px;
              height: 40px;
              line-height: 1;
              overflow: hidden;
              box-sizing: border-box;
              // .border(@width: 1px; @color: @primary-color);
              border-radius: 5px;
              img {
                width: 100%;
              }
            }
            .text {
              line-height: 1.5;
              .title {
                font-size: @fz-15;
                color: #333;
              }
              .time {
                font-size: @fz-12;
                color: rgb(189, 185, 150);
              }
            }
          }
        }
      }
    }
		.order-bottom {
			height: 60px;
			background: #fff;
			position: absolute;
			bottom: 0;
			width: 100%;
			box-shadow: 0 -1px 10px 0px rgba(0, 0, 0, 0.2);
			display: flex;
			font-size: 1.6rem;
			.left {
				width: 55%;
				height: 100%;
				flex-shrink: 0;
				display: inline-flex;
				align-items: center;
        justify-content: flex-end;
        box-sizing: border-box;
				color: #804c01;
				.select {
					display: inline-flex;
					align-items: center;
					.checkicon {
						margin-bottom: 4px;
					}
        }
        .postage {
          margin-right: 20px;
        }
			}
			.right {
				width: 45%;
				height: 100%;
				flex-shrink: 0;
				background: #804c01;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				color: #fff;
			}
			.is-btn {
				background: #a0a0a0;
			}
		}
		.selete-mask {
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: rgba(0, 0, 0, .5);
			transition: opacity 400ms;
			opacity: 0;
			z-index: -1;
		}
		.show {
			opacity: 1;
			z-index: 500;
		}
		.selete-address {
			z-index: 501;
			background: #fff;
			position: fixed;
			width: 100%;
			height: auto;
			bottom: 0;
			left: 0;
			transition-property: transform;
			transition-duration: 300ms;
			max-height: 100%;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
			.se-item {
				padding: 0 15px;
				height: 70px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				&:not(:first-child) {
					border-top: 1px solid #D9D9D9;
				}
				.txt {
					font-size: 1.4rem;
				}
				.icon-dui {
					font-size: 2rem;
					margin-left: 5px;
					flex-shrink: 0;
					color: #896a10;
				}
			}
		}
		.none {
			display: none;
		}
  }
</style>

