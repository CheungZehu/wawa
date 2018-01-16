<template>
  <div class="input-invitation">
    <div class="input-invitation-box">
      <p>填写好友分享给你的邀请码</p>
      <div class="input">
        <input type="number" v-model="value" placeholder="输入邀请码">
      </div>
    </div>
    <div class="btn">
      <div class="button" @click="submit">
        <!-- <i slot="icon" class="iconfont icon-weixin" style="padding-right:10px;display:block;" width="30" height="30"></i> -->
        <span>提交</span>
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
        value: '',
      }
    },
    methods: {
      submit () {

      },
    }
  }
</script>

<style lang="less">
  .input-invitation {
    padding-top: 50px;
    .input-invitation-box {
      margin: 0 30px 0 30px;
      padding: 50px;
      background-color: rgb(255, 250, 220);
      box-shadow: 1px 1px 3px rgba(125, 82, 82, 0.75);
      border-radius: 4px;
      text-align: center;
      .input {
        margin-top: 15px;
        background: #e4dcad;
        border-radius: 30px;
        padding: 3px 10px;
        input {
          background: #e4dcad;
          height: 30px;
          border: 0;
          outline: none;
          text-align: center;
          font-size: 18px;
          width: 100%;
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
        border-bottom: 5px solid rgba(5, 134, 4, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 18px;
        padding: 10px 0;
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


