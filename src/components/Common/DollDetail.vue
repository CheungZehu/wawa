<template>
  <div class="doll-detail">
    <div class="detail">
      <div class="doll-top">
        <div class="left">
          <div class="img">
            <img src="http://wawa-1255600302.file.myqcloud.com/images/headImg.jpg" alt="">
          </div>
          <div class="text">
            <p class="title">开心抓娃娃秘书</p>
            <p class="time">2小时前</p>
          </div>
        </div>
        <div class="right">
          <p>抓取失败</p>
        </div>
      </div>
      <div class="doll-bottom">
        <p>局号</p>
        <p>4698546498764644</p>
      </div>
    </div>
    <div class="btn">
      <div class="button" @click="feedBack">
        <span>反馈</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods: {
      feedBack () {
        this.$router.push({name: 'FeedBack', params: {id: this.$route.params.id}})
      }
    }
  }
</script>

<style lang="less">
@import './../../assets/css/public.less';
  .doll-detail {
    padding: 10px;
    .detail {
      padding: 0 18px;
      background-color: rgb(255, 250, 220);
      .borderRadius;
      .boxShadowOutset(@color: rgba(125, 82, 82, 0.75));
      .doll-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 0;
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
            .border(@width: 1px; @color: @primary-color);
            img {
              width: 100%;
            }
          }
          .text {
            line-height: 1.3;
            .title {
              font-size: @fz-15;
              color: #f76260;
            }
            .time {
              font-size: @fz-12;
              color: rgb(189, 185, 150);
            }
          }
        }
        .right {
          p {
            display: inline-flex;
            align-items: center;
            line-height: 1;
            color: rgb(189, 185, 150);
            font-size: @fz-14;
            .icon-fangxiang1 {
              font-size: @fz-12;
            }
          }
        }
      }
      .doll-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 18px 0;
        border-top: 1px solid rgba(189, 185, 150, 0.8);
        p:first-child {
          font-size: @fz-14;
        }
        p:last-child {
          font-size: @fz-14;
          color: rgb(189, 185, 150);
        }
      }
    }
    .btn {
      margin-top: 20px;
      .button {
        width: 100%;
        background: #ff5e00;
        border-radius: 4px;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.21);
        border-bottom: 8px solid rgb(199, 82, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 18px;
        padding: 15px 0;
        &:active {
          background: #10c50e;
        }
        .iconfont {
          font-size: 24px;
        }
      }
    }
  }
  
</style>
