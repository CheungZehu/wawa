<template>
  <div class="dolls-d" v-show="show">
    <div class="doll-detail">
      <div class="list">
        <div class="content">
          <!-- <img src="/static/images/chenggong.png" alt="">
          <img src="/static/images/chenggong.png" alt="">
          <img src="/static/images/chenggong.png" alt=""> -->
          <p style="font-size: 1.6rem;" v-if="content" v-html="content"></p>
          <p style="font-size: 1.6rem;" v-else>暂无介绍</p>
        </div>
      </div>
      <div class="guanbi" @click="close">
        <i class="iconfont icon-guanbi1"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { XDialog, TransferDomDirective as TransferDom } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XDialog,
    },
    props: {
      visibile: Boolean,
      content: String,
    },
    data () {
      return {
        helps: [{
          title: '抓一次需要多少金币？',
          text: '每台机器价格不一样，机器封面及抓娃娃页面上有标记当前机器所需金币数额，成功上机后自动扣除相应金币。'
        }, {
          title: '怎么知道我还有多少金币？',
          text: '进入娃娃机房间后，页面右下角有您的金币余额显示。'
        }, {
          title: '如何获得金币？',
          text: '可以通过充值获得金币；还可以通过分享给朋友、累计登陆、购买礼包等活 动获得金币。'
        }],
      }
    },
    computed: {
      show () {
        return this.visibile
      }
    },
    methods: {
      close () {
        console.log('close')
        this.$emit('close', false)
      },
    },
  }
</script>

<style lang="less">
@import './../../assets/css/public.less';
.dolls-d {
  background: rgba(0, 0, 0, .6);
  position: absolute;
  top: 0;
  z-index: 16;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .doll-detail {
    width: 76%;
    background: #fff;
    border-radius: 7px;
    position: relative;
    .list {
      font-size: 1.6rem;
      padding: 10px;
      overflow: hidden;
      img {
        width: 100%;
      }
      .content {
        overflow: scroll;
        height: 50rem;
      }
    }
    .guanbi {
      position: absolute;
      right: 0;
      top: -50px;
      &:after {
        content: '';
        width: 2px;
        height: 30px;
        background: #fff;
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 30px;
        transform: translate(-50%, 0);
        z-index: -1;
      }
      .icon-guanbi1 {
        color: #fff;
        font-size: 28px;
      }
    }
  }
}

</style>
