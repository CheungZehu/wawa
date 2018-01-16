<template>
  <div class="order-item">
    <div class="order-title">
      <p class="order-id">订单编号 {{item.orderNo}}</p>
      <p class="order-status">{{item.status | status}}</p>
    </div>
    <div class="dolls-list">
      <div class="dolls-item" v-for="(doll, i) in item.items" :key="i">
        <div class="d-img">
          <!-- <img src="static/images/headImg.jpg" alt=""> -->
          <img :src="img + doll.previewImage" alt="">
        </div>
        <div class="dolls-text">
          <p>{{doll.name}}</p>
        </div>
      </div>
    </div>
    <div class="address-info" v-if="item.status === 3">
      <p>物流编号：{{item.transportNumber}}</p>
      <p>物流公司：{{item.transportCompany}}</p>
      <p v-if="item.transportAmount">运费：{{item.transportAmount | price}}元</p>
      <p>收件人：{{item.receiverAppellation}} </p>
      <p>{{item.receiverAddress}}</p>
    </div>
    <div class="bohui-info" v-if="item.status === 6">
      <p>驳回理由：{{item.rejectReason}}</p>
    </div>
    <div class="dolls-setting" v-if="item.status === 0">
      <p @click="delDollOrders">放弃</p>
      <p class="get" @click="dollOrdersRepay">微信支付</p>
    </div>
  </div>
</template>

<script>
  import api from '../../api/api'

  export default {
    props: {
      item: Object,
    },
    methods: {
      dollOrdersRepay () {
        api.dollOrdersRepay(this.item.id).then(res => {
          console.log(res.data)
          if (res.data.errCode === 0) {
            if (res.data.tokenId) {
							window.location.href = `https://pay.swiftpass.cn/pay/jspay?token_id=${res.data.tokenId}`
						}
          }
        })
      },
      delDollOrders () {
        api.delDollOrders(this.item.id).then(res => {
          console.log(res.data)
          if (res.data.errCode === 0) {
            this.showInfo('取消订单成功')
            this.$emit('del', true)
          }
        })
      },
    },
    filters: {
      status (val) {
        switch (val) {
          case 0: 
            return '未支付'
          case 1: 
            return '待确认'
          case 2: 
            return '待发货'
          case 3: 
            return '已发货'
          case 4: 
            return '已完成'
          case 5: 
            return '已取消'
          case 6: 
            return '已驳回'
        }
      }
    }
  }
</script>

<style lang="less">
  .order-item {
    &:first-child {
      margin-top: 1rem;
    }
    background: #fff;
    margin: 0 1rem 1rem 1rem;
    padding: 1rem 1.5rem 0 1.5rem;
    border-radius: 5px;
    .order-title {
      border-bottom: 1px solid #fbe2e8;
      padding-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      font-size: 1.6rem;
      .order-id {
        color: #333;
      }
      .order-status {
        color: #b79e44;
      }
    }
    .dolls-list {
      padding-top: 1.5rem;
      .dolls-item {
        display: flex;
        padding-bottom: 1.5rem;
        .d-img {
          flex-shrink: 0;
          margin-right: 10px;
          width: 4rem;
          height: 4rem;
          line-height: 1;
          overflow: hidden;
          box-sizing: border-box;
          border-radius: 5px;
          img {
            width: 100%;
          }
        }
        .dolls-text {
          color: #333;
          font-size: 1.5rem;
        }
      }
    }
    .address-info {
      border-top: 1px solid #fbe2e8;
      color: #333;
      padding: 1rem 0;
      font-size: 1.4rem;
      P:not(:first-child) {
        margin-top: 3px;
      }
    }
    .bohui-info {
      border-top: 1px solid #fbe2e8;
      color: #f11c1c;
      padding: 1rem 0;
      font-size: 1.4rem;
    }
    .dolls-setting {
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid #fbe2e8;
      padding: 1rem 0;
      line-height: 2;
      color: #333;
      font-size: 1.4rem;
      .get {
        background: rgb(88, 180, 6);
        padding: 0 1.5rem;
        color: #fff;
        border-radius: 5px;
        margin-left: 2rem;
      }
    }
  }
</style>

