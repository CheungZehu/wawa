<template>
  <div class="doll-item-selete" @click="check">
    <div class="left">
      <check-icon class="checkicon" v-model="item.status"></check-icon>
      <div class="img">
        <img :src="img + item.previewImage" alt="">
      </div>
      <div class="text">
        <p class="title">{{item.name}}</p>
        <p class="exchangeCoinNum">可兑换{{item.exchangeCoinNum}}金币</p>
        <p class="time">抓取时间：{{item.createTime}}</p>
        <p class="time" v-if="item.expireTime">过期时间：{{item.expireTime}}</p>
      </div>
    </div>
    <div class="right" v-if="item.exchangeAwardNeededNum !== 1">
      <p class="suipian">1/{{item.exchangeAwardNeededNum}}</p>
    </div>
  </div>
</template>

<script>
  import { CheckIcon } from 'vux'

  export default {
    components: {
      CheckIcon
    },
    props: {
      item: Object,
      index: Number,
    },
    methods: {
      check () {
        this.$emit('check', this.item.status, this.index)
      }
    },
  }
</script>

<style lang="less">
@import './../../assets/css/public.less';

  .bt {
    &:not(:first-child) {
      border-top: 1px solid #fbe2e8;
    }
  }
  .doll-item-selete {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #fbe2e8;
    &:active {
      background-color: rgba(249, 220, 228, 0.3);
    }
    .left {
      display: inline-flex;
      align-items: center;
      .img {
        flex-shrink: 0;
        margin-right: 10px;
        width: 6rem;
        height: 6rem;
        line-height: 1;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 5px;
        img {
          width: 100%;
        }
      }
      .text {
        line-height: 1.5;
        p {
          &:not(:first-child) {
            margin-top: 2px;
          }
        }
        .title {
          font-size: 1.5rem;
          color: #333333;
        }
        .exchangeCoinNum {
          font-size: 1.4rem;
          color: #f5a4b6;
        }
        .time {
          font-size: 1.2rem;
          color: #b0b0b0;
        }
      }
    }
    .right {
      flex-shrink: 0;
      .suipian {
        font-size: 1.6rem;
        background: rgb(247, 197, 209);
        color: #fff;
        padding: 0px 1.5rem;
        border-radius: 20px;
      }
    }
  }
</style>



