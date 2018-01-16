<template>
  <div class="daren" :style="{height: height + 'px'}">
    <div class="extension">
      <div class="balance">
        <div class="count-level-num">
          <p class="title">收益金额（单位：元）</p>
          <div class="num">
            <p>
              <span class="item-title">总收益</span>
              <span class="item-money">{{orderAmounts.bonus}}</span>
            </p>
            <p>
              <span class="item-title">一级</span>
              <span class="item-money">{{orderAmounts.bonus1}}</span>
            </p>
            <p>
              <span class="item-title">二级</span>
              <span class="item-money">{{orderAmounts.bonus2}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="balance">
        <div class="count-level-num" style="margin-top: 0;">
          <p class="title">充值金额（单位：元）</p>
          <div class="num">
            <p>
              <span class="item-title">总充值</span>
              <span class="item-money">{{orderAmounts.amount}}</span>
            </p>
            <p>
              <span class="item-title">一级</span>
              <span class="item-money">{{orderAmounts.amount1}}</span>
            </p>
            <p>
              <span class="item-title">二级</span>
              <span class="item-money">{{orderAmounts.amount2}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="balance">
        <div class="count-level-num">
          <p class="title">推广人数（单位：人）</p>
          <div class="num">
            <p>
              <span class="item-title">总人数</span>
              <span class="item-money">{{countLevelTotal.num }}</span>
            </p>
            <p>
              <span class="item-title">一级粉丝</span>
              <span class="item-money">{{countLevelTotal.num1}}</span>
            </p>
            <p>
              <span class="item-title">二级粉丝</span>
              <span class="item-money">{{countLevelTotal.num2}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="level-btn">
        <group gutter="1rem">
          <cell title="一级粉丝" :is-link="true" @click.native="getRouter('Offline?level=1')"></cell>
          <cell title="二级粉丝" :is-link="true" @click.native="getRouter('Offline?level=2')"></cell>
        </group>
        <group gutter="1rem">
          <cell title="一级充值" :is-link="true" @click.native="getRouter('Revenue?level=1')"></cell>
          <cell title="二级充值" :is-link="true" @click.native="getRouter('Revenue?level=2')"></cell>
        </group>
        <group gutter="1rem">
          <cell title="推广渠道类型列表" :is-link="true" @click.native="getRouter('MemberChainType')"></cell>
          <!-- <cell title="推广渠道类型添加" :is-link="true" @click.native="getRouter('MemberChainTypeAdd')"></cell> -->
        </group>
      </div>
      <div class="fuzhi">
        <div class="fuzhi-btn">
          <p>推广链接</p>
          <x-button type="primary" class="btn" data-clipboard-action="copy" :data-clipboard-text="shareUrl" style="width: 50%;">一键复制</x-button>
        </div>
        <p>{{shareUrl}}</p>
      </div>
      <!-- <div class="title-card">
        <h2 class="header">
          <span class="title">今日收入</span>
          <span class="more" @click="getRouter('Revenue')">详情</span>
        </h2>
        <ul class="today">
          <li class="list">
            <p class="title">今日营业(元)</p>
            <p class="price">{{amount}}</p>
          </li> 
          <li class="list">
            <p class="title">今日分红(元)</p>
            <p class="price">{{orderAmount}}</p>
          </li>
        </ul>
      </div> -->
      <!-- <div style="padding: 0 1rem; background:#fff;">
        <line-chart v-if="isShow" style="background:#fff;" :line-data="this.amountCount" :height="200"></line-chart>
      </div> -->
      <!-- <div class="title-card">
        <h2 class="header">
          <span class="title">会员数据</span>
          <span class="more" @click="getRouter('Offline?level=2')">二级详情</span>
          <span class="more" @click="getRouter('Offline?level=1')">一级详情</span>
        </h2>
        <ul class="today">
          <li class="list">
            <p class="title">今日新增会员</p>
            <p class="price">{{newUser}}</p>
          </li> 
          <li class="list">
            <p class="title">总会员数</p>
            <p class="price">{{user}}</p>
          </li>
        </ul>
      </div> -->
      <!-- <div style="padding: 0 1rem; background:#fff;">
        <line-chart v-if="isUserShow" style="background:#fff" :line-data="this.userCount" :height="200" ></line-chart>
      </div> -->
    </div>
        <!-- <span class="more" @click="logout()">退出</span> -->
        <x-button type="warn" class="btn" style="width: 30%; margin-bottom: 3rem;" @click.native="logout">退出登录</x-button>
  </div>
</template>

<script>
import { XButton, Box, Group, Cell } from "vux";
import LineChart from "./LineChart.js";
import api from "../../api/api";
import Clipboard from 'clipboard'
import { mapState } from 'vuex'

export default {
  components: {
    XButton, Box, LineChart, Group, Cell
  },
  data() {
    return {
      shareUrl: '',
      value: 'fsd',
      isShow: false,
      isUserShow: false,
      balance: 0,
      amount: 0,
      orderAmount: 0,
      user: 0,
      newUser: 0,
      amountCount: {
        labels: [],
        datasets: [
          {
            label: "营业",
            backgroundColor: "#4182e299",
            data: []
          },
          {
            label: "分红",
            backgroundColor: "red",
            data: []
          }
        ]
      },
      userCount: {
        labels: [],
        datasets: [
          {
            label: "新增粉丝",
            backgroundColor: "#4182e299",
            data: []
          }
        ]
      },
      height: 0,
      countLevelTotal: {},
      orderAmounts: {},
    };
  },
  created() {
    this.shareUrl = this.urlSk.indexUrl(this.userInfo.id)
    this.loading(false)
    // this.apiAmountByMid();
    // this.apiAmountCount();
    // this.apiUserCount();
    // this.doStatisticsByPromoter()
    // this.totalNewUsers()
    this.countLevelNum()
    this.countLevelOrderAmount()
  },
  mounted () {
    this.height = window.innerHeight
    window.onresize = () => {
      this.height = window.innerHeight
    }
    var clipboard = new Clipboard('.btn')
    clipboard.on('success', e => {
        console.log(e);
        this.showInfo('复制成功')
    })
    clipboard.on('error', e => {
        this.showInfo('复制失败')
    })
  },
  computed: {
    ...mapState({
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
    logout() {
      this.loading(true, '正在退出登录')
      api.logoutPromoter().then(res => {
        if (res.data.errCode === 0) {
          this.loading(false)
          this.showInfo('退出成功')
          setTimeout(() => {
            this.$router.replace('/Extension/Login')
          }, 300)
        }
      });
    },
    countLevelOrderAmount () {
      api.countLevelOrderAmount().then(res => {
        console.log('countLevelOrderAmount')
        console.log(res.data)
        if (res.data.errCode === 0) {
          this.orderAmounts = res.data.result
        }
      })
    },
    // 推广人数
    countLevelNum () {
      api.countLevelNum().then(res => {
        if (res.data.errCode === 0) {
          this.countLevelTotal = res.data.result
        }
      })
    },
    apiAmountCount() {
      api.amountCount().then(res => {
        if (res.data.errCode === 0) {
          console.log('统计过去7天的的营业额、分红')
          console.log(res.data)
          res.data.data.result.map(item => {
            this.amountCount.datasets[0].data.push(item.amount);
            this.amountCount.datasets[1].data.push(item.orderAmount);
            this.amountCount.labels.push(item.statisticDate);
          });
          this.isShow = true;
        } else {
          // alert(JSON.stringify(res.data))
          this.showInfo(res.data.errMsg)
          // this.$router.go()
        }
      })
    },
    apiUserCount() {
      api.userCount().then(res => {
        if (res.data.errCode === 0) {
          console.log('统计过去7天的新增用户')
          console.log(res.data)
          // this.user = res.data.data.todayNewMember.amount;
          this.newUser = res.data.data.todayNewMember.memberNum1;
          res.data.data.result.map(item => {
            this.userCount.datasets[0].data.push(item.memberNum1);
            this.userCount.labels.push(item.statisticDate);
          });
          this.isUserShow = true;
        } else {
          // alert(JSON.stringify(res.data))
        }
      })
    },
    // 总的新增用户
    totalNewUsers () {
      api.totalNewUsers().then(res => {
        console.log('总的新增用户')
        console.log(res.data)
        if (res.data.errCode === 0) {
          this.user = res.data.data.result.memberNum1
        } else {
          // alert(JSON.stringify(res.data))
        }
      })
    },
    apiAmountByMid() {
      api.getAmountByMid().then(res => {
        this.balance = res.data.amount / 100;
      });
    },
    doStatisticsByPromoter () {
      api.doStatisticsByPromoter().then(res => {
        console.log('总的营业额、分红')
        console.log(res.data)
        if (res.data.errCode === 0) {
          this.amount = res.data.data.result.amount
          this.orderAmount = res.data.data.result.orderAmount
        } else {
          // alert(JSON.stringify(res.data))
        }
      })
    },
    getRouter(string) {
      this.$router.push(`/Extension/${string}`)
    }
  }
};
</script>

<style lang="less" scoped>
.daren {
  overflow: scroll;
}
.extension {
  background: #efefef;
  .balance {
    // height: 9.2rem;
    padding: 2.5rem 2rem;
    background: #4182e2;
    line-height: 1;
    &:not(:first-child) {
      margin-top: 1rem;
    }
    .money {
      .title {
        color: #fff;
        font-size: 1.6rem;
      }
      .price {
        margin-top: 1rem;
        font-size: 6rem;
        color: #fff;
      }
    }
    .count-level-num {
      .title {
        color: #fff;
        font-size: 1.8rem;
      }
      .num {
        margin-top: 2rem;
        font-size: 1.8rem;
        color: #fff;
        line-height: 2.2rem;
        display: grid;
        grid-template-columns: 33.3% 33.3% 33.3%;
        p {
          text-align: center;
          .item-money {
            display: block;
            font-size: 2rem;
            margin-top: 1rem;
          }
        }
      }
    }  
  }
  .fuzhi {
    padding: 5rem;
    background: #fff;
    .fuzhi-btn {
      display: flex;
      P {
        flex-shrink: 0;
      }
    }
    p {
      font-size: 1.8rem;
      padding: 1rem;
      // text-align: center;
    }
    #foo {
      width: 100%;
      height: 3rem;
    }
  }
  .title-card {
    background: #fff;
    margin-top: 1rem;
    .header {
      height: 4rem;
      line-height: 4rem;
      border-bottom: 1px solid #f6f6f9;
      &:before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 2.2rem;
        vertical-align: middle;
        margin: 0 15px;
        background: #4182e2;
      }
      .title {
        font-weight: 500;
        font-size: 1.4rem;
      }
      .more {
        font-size: 1.4rem;
        font-weight: 500;
        color: #7d7d7d;
        float: right;
        padding-right: 9px;
      }
    }
    .today {
      display: flex;
      padding: 20px;
      font-size: 1.6rem;
      .list {
        flex: 1;
        text-align: center;
        list-style: none;
        &:first-child {
          border-right: 1px solid #f6f6f9;
        }
      }
    }
  }
}
</style>

