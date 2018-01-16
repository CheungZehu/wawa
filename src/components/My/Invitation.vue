<template>
  <div class="invitation">
    <div class="invitation-box">
      <p>每邀请一个好友加入并输入您的邀请码，您和被邀请人都将获得300金币奖励，最多可获得30000金币</p>
      <p>769284</p>
    </div>
    <div class="btn">
      <div class="button" @click="onMenuShare(1)">
        <i slot="icon" class="iconfont icon-weixin" style="padding-right:10px;display:block;" width="30" height="30"></i>
        <span>分享到微信</span>
      </div>
    </div>
    <div class="btn" style="margin-top: 20px;">
      <div class="button" @click="onMenuShare(2)">
        <i slot="icon" class="iconfont icon-weixin" style="padding-right:10px;display:block;" width="30" height="30"></i>
        <span>分享到朋友圈</span>
      </div>
    </div>
    <div class="share" v-if="mask" @click="mask = false">
      <p>{{index === 1 ? '点击右上角发送给朋友' : '点击右上角分享到朋友圈'}}</p>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'

  export default {
    components: {
      XButton
    },
    data () {
      return {
        mask: false,
        index: 1,
      }
    },
    methods: {
      onMenuShare (val) {
        this.mask = true
        this.index = val
      },
    }
  }
</script>

<style lang="less">
  .invitation {
    padding-top: 50px;
    .invitation-box {
      margin: 0 30px 0 30px;
      padding: 20px;
      background-color: rgb(255, 250, 220);
      box-shadow: 1px 1px 3px rgba(125, 82, 82, 0.75);
      border-radius: 4px;
      p {
        &:last-child {
          text-align: center;
          color: #09bb07;
          font-weight: bold;
          font-size: 28px;
        }
      }
    }
    .btn {
      margin: 50px 30px 0 30px;
      .button {
        width: 100%;
        background: #09bb07;
        border-radius: 4px;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.21);
        border-bottom: 8px solid rgba(5, 134, 4, 0.3);
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
    .share {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      p {
        color: #fff;
        text-align: right;
        padding: 10px;
      }
    }
  }
</style>

