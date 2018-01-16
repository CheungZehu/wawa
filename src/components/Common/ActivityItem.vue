<template>
  <div class="activity-item">
    <div class="left">
      <div class="img">
        <img src="http://wawa-1255600302.file.myqcloud.com/images/headImg.jpg" alt="">
        <!-- <img :src="imgUrl" alt=""> -->
      </div>
      <div class="text">
        <p class="title">发哦送的积分发哦送的积分发哦送的积分发哦送的积分发哦送的积分发哦积分发哦送的积分送的积分发哦送的积分</p>
        <p class="time">{{item.createTime}}</p>
      </div>
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
    },
    methods: {
      check () {
        this.$emit('check', this.status, this.index)
      }
    },
    filters: {
      status (val) {
        if (val) {
          return '抓取成功'
        } else {
          return '抓取失败'
        }
      }
    }
  }
</script>

<style lang="less">
@import './../../assets/css/public.less';

  .activity-item {
    &:first-child {
      margin-top: 1.5rem;
    }
    margin: 0 2rem 1.5rem 1.5rem;
    background-color: rgb(255, 250, 220);
    .borderRadius;
    display: flex;
    padding: 1.5rem;
    &:active {
      background-color: rgb(255, 251, 200);
    }
    .left {
      display: inline-flex;
      // align-items: center;
      .img {
        flex-shrink: 0;
        margin-right: 10px;
        width: 7rem;
        height: 7rem;
        line-height: 1;
        overflow: hidden;
        box-sizing: border-box;
        img {
          width: 100%;
        }
      }
      .text {
        line-height: 1.5;
        .title {
          font-size: 1.5rem;
          color: #896a10;
          .lineClamp;
        }
        .time {
          font-size: 1.4rem;
          color: rgb(189, 185, 150);
          margin-top: 5px;
        }
      }
    }
    .right {
      p {
        display: inline-flex;
        align-items: center;
        line-height: 1;
        color: rgb(189, 185, 150);
        font-size: 1.2rem;
      }
    }
  }
</style>



