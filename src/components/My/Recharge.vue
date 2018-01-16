<template>
  <div>
    <div class="recharge">
      <x-header title="充值"></x-header>
      <div class="recharge-options" :style="{height: height + 'px'}">

        <!-- <flexbox class="flexbox">
          <flexbox-item>
            <div class="options-item">
              <p>账户余额：</p>
              <p style="display: inherit;">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jinbi1"></use>
                </svg>
                <span>{{sum}}</span>
              </p>
            </div>
          </flexbox-item>
        </flexbox>
        <flexbox class="flexbox" style="padding-bottom: 15px;">
          <flexbox-item>
            <router-link tag="div" class="options-item" :to="{path: '/myInfo/record'}">
              <p>金币流水记录</p>
            </router-link>
          </flexbox-item>
        </flexbox>
        <p class="recharge-title">选择充值金额</p>
        <flexbox v-for="(item, index) in rechargeOptions" :key="index" class="flexbox" @click.native="coinsOrder(item.id)">
          <flexbox-item>
            <div class="options-item">
              <p style="display: inherit;">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jinbi1"></use>
                </svg>
                <span>{{item.coinNum | gold}}</span> <span v-if="item.giftCoinNum">(送{{item.giftCoinNum}})</span>
              </p>
              <p class="money-box">￥{{item.price | price}}</p>
            </div>
          </flexbox-item>
        </flexbox> -->

        <div class="recharge-top">
          <p style="display: inherit;">
            <svg class="c-icon" aria-hidden="true">
              <use xlink:href="#icon-jinbi1"></use>
            </svg>
            <span>余额：{{sum}}金币</span>
          </p>
        </div>
        <div class="recharge-middle">
          <div class="item-rol" :class="{'item-rol-select': selectIndex === i}" v-for="(item, i) in rechargeOptions" :key="i" @click="selectCoins(item, i)">
            <div class="right-triangle"></div>
            <i class="iconfont icon-duihao1" v-if="selectIndex === i"></i>
            <div class="item-coin">
              <p class="left-text">
                <svg class="left-icon" aria-hidden="true">
                  <use xlink:href="#icon-jinbi1"></use>
                </svg>
              </p>
              <div class="right-text">
                <p>{{item.coinNum | gold}}+{{item.giftCoinNum}}</p>
                <p>(到账{{item.coinNum + item.giftCoinNum}})</p>
              </div>
            </div>
            <div class="item-price">
              <p>￥{{item.price | price}}</p>
            </div>
          </div>
        </div>
        <div class="recharge-bottom">
          <p class="recharge-btn" @click="pay">立即支付</p>
          <!-- <p class="recharge-list">金币流水记录</p> -->
          <router-link tag="p" class="recharge-list" :to="{path: '/myInfo/record'}">
            金币流水记录
          </router-link>
        </div>
        <!-- <div class="recharge-list">
          <p>金币流水记录</p>
        </div> -->
      </div>
    </div>
  </div>
  
</template>

<script>
  import { Flexbox, FlexboxItem, XInput, Group, XButton, Scroller, XHeader } from 'vux'
  import api from '../../api/api'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      Flexbox, FlexboxItem, XInput, Group, XButton, Scroller, XHeader
    },
    data () {
      return {
        rechargeOptions: [],
        value: '',
        sum: 0,
        search: {
					start: 0,
					limit: 10,
					count: 0
        },
        height: 0,
        selectIndex: 1,
        item: {},
      }
    },
    created () {
      this.coinsSum()
      this.coinsGoods()
    },
    mounted() {
      this.height = window.innerHeight - 46
      window.onresize = () => {
        this.height = window.innerHeight - 46
      }
    },
    methods: {
      ...mapActions([
				'updateSum'
			]),
      // 获取金币总数
      coinsSum () {
				api.coinsSum().then(res => {
					if (res.data.errCode === 0) {
            this.sum = res.data.sum
            this.updateSum(res.data.sum)
					}
				})
      },
      // 获取金币商品
      coinsGoods (val) {
        if (val) {}
        api.coinsGoods().then(res => {
          if (res.data.errCode === 0) {
            console.log(res.data)
            this.rechargeOptions = res.data.list
            this.item = this.rechargeOptions[this.selectIndex]
          }
        })
      },
      selectCoins (item, i) {
        this.selectIndex = i
        this.item = item
      },
      pay () {
        console.log(this.item)
        this.coinsOrder(this.item.id)
      },
      // 创建金币订单
      coinsOrder (id) {
        api.coinsOrder(id).then(res => {
          console.log(res.data)
          if (res.data.errCode === 0) {
            let tokenId = res.data.tokenId
            window.location.href = `https://pay.swiftpass.cn/pay/jspay?token_id=${tokenId}`
          } else {
            this.showInfo(res.data.errMsg);
          }
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  .recharge {
    .recharge-options {
      // padding: 0 1.6rem;
      overflow: scroll;
      background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
      background-size: 100%;
      overflow: scroll;
      .flexbox {
        padding-top: 15px;
        &:last-child {
          padding-bottom: 15px;
        }
        .options-item {
          text-align: center;
          color: #000;
          background-color: #fff;
          border-radius: 4px;
          background-clip: padding-box;
          padding: 18px 20px;
          font-size: 1.6rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            .icon {
              width: 1.5em;
              height: 1.5em;
              margin-right: 10px;
            }
          }
          .money-box {
            line-height: 1;
            background: @primary-color;
            width: 70px;
            padding: 8px 0;
            font-size: 1.4rem;
            text-align: center;
            border-radius: 2px;
          }
        }
        .active {
          color: #fff;
          background-color: @primary-color;
        }
      }
      .recharge-input {
        margin-top: 10px;
        padding: 13px 20px;
        background: #fff;
        display: flex;
        border-radius: 30px;
        position: relative;      
        .input {
          width: 100%;
          border: 0;
          outline: none;
          color: @primary-color;
        }
        span {
          color: @primary-color;
          font-size: @fz-12;
          font-weight: bold;
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      .explain {
        color: #8e8e8e;
        font-size: @fz-12;
        margin: 5px 0 0 15px;
      }
      .recharge-title {
        color: #fff;
        font-size: 1.6rem;
      }

      .recharge-top {
        height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.8rem;
        .c-icon {
          width: 1.5em;
          height: 1.5em;
          margin-right: 10px;
        }
      }
      .recharge-middle {
        font-size: 1.6rem;
        display: flex;
        flex-flow: row wrap;
        .item-rol {
          overflow: hidden;
          background: #fff;
          border-radius: 5px;
          padding: 5px 5px 0 5px;
          box-sizing: border-box;
          width: 44%;
          margin: 0 4% 4% 4%;
          &:first-child, &:nth-child(2) {
            margin-top: 0;
          }
          &:nth-child(even) {
            margin-left: 0;
          }
          .item-coin {
            background: #ffe7ed;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            display: inline-flex;
            align-items: center;
            // justify-content: center;
            width: 100%;
            padding: 1rem 0;
            .left-text {
              flex-shrink: 0;
              margin-right: 5px;
              margin-left: 1rem;
              .left-icon {
                width: 2rem;
                height: 2rem;
              }
            } 
            .right-text {
              p {
                &:first-child {
                  font-size: 1.8rem;
                }
                &:last-child {
                  font-size: 1.4rem;
                  color: #999999;
                }
              }
            }
          }
          .item-price {
            font-size: 1.8rem;
            height: 3.4rem;
            line-height: 3.4rem;
            text-align: center;
          }
        }
        .item-rol-select {
          background: #fc71a6;
          position: relative;
          .item-coin {
            background: #fff;
          }
          .item-price {
            color: #fff;
          }
          .icon-duihao1 {
            position: absolute;
            right: 0;
            top: -8px;
            font-size: 26px;
            color: #fff;
          }
          .right-triangle {
            position: absolute;
            width: 0;
            height: 0;
            // background: #000;
            border-top: 40px solid #fc71a6;
            border-left: 40px solid transparent;
            top: 0;
            right: 0;
          }
        }
      }
      .recharge-bottom {
        margin-top: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        .recharge-btn {
          background: #f92073;
          color: #fff;
          font-size: 1.8rem;
          text-align: center;
          width: 50%;
          height: 5rem;
          line-height: 5rem;
          border-radius: 40px;
        }
        .recharge-list {
          font-size: 1.8rem;
          color: #f92073;
          text-decoration: underline;
          margin-top: 7rem;
        }
      }
    }
  }
  
</style>

