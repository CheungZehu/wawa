<template>
  <div class="message-item">
    <!-- <div class="left">
      <div class="img">
        <img src="../../../static/images/headImg.jpg" alt="">
      </div>
    </div> -->
    <div class="right">
      <p class="title">{{title}}</p>
      <p class="text">{{content}}</p>
      <p class="time">{{time}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      content: String,
      time: String,
    }
  }
</script>

<style lang="less"> 
@import './../../assets/css/public.less';

  .message-item {
    &:first-child {
      margin-top: 1.5rem;
    }
    margin: 0 2rem 1.5rem 2rem;
    background-color: #fff;
    .borderRadius;
    display: flex;
    padding: 2rem;
    .left {
      flex-shrink: 0;
      margin-right: 15px;
      .img {
        width: 35px;
        height: 35px;
        line-height: 1;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    .right {
      .title {
        font-size: 1.5rem;
        color: #f76260;

      }
      .text {
        font-size: 1.4rem;
        padding-bottom: 8px;
        padding-top: 5px;
      }
      .time {
        font-size: @fz-12;
        color: #808080;
      }
    }
  }
</style>



