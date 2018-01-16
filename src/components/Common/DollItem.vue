<template>
  <div class="doll-item">
    <div class="left">
      <div class="img">
        <!-- <img src="../../../static/images/headImg.jpg" alt=""> -->
        <img :src="imgUrl" alt="">
      </div>
      <div class="text">
        <p class="title">{{name}}</p>
        <p class="time">{{time}}</p>
      </div>
    </div>
    <div class="right">
      <p>{{status | status}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      imgUrl: String,
      time: String,
      status: Boolean
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

  .bt {
    &:not(:first-child) {
      // margin-top: 15px;
      border-top: 1px solid #f3e79d;
    }
  }
  .doll-item {
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
        margin-right: 1rem;
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
      .text {
        line-height: 1.5;
        .title {
          font-size: 1.5rem;
          color: #333333;
        }
        .time {
          font-size: 1.2rem;
          color: #b0b0b0;
        }
      }
    }
    .right {
      flex-shrink: 0;
      p {
        display: inline-flex;
        align-items: center;
        line-height: 1;
        color: rgb(189, 185, 150);
        font-size: 1.2rem;
        .icon-fangxiang1 {
          font-size: 1.2rem;
        }
      }
    }
  }
</style>



