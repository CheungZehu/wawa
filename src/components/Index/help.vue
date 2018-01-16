<template>
  <div v-transfer-dom>
    <x-dialog v-model="show" hide-on-blur @on-hide="close" :dialog-style="{'background-color': 'transparent', 'overflow': 'initial'}">
      <div class="help">
        <div class="list">
          <div class="title">
            <p>哎呦抓娃娃</p>
            <p>LOGO</p>
          </div>
          <div class="content">
            <div class="item" v-for="(item, i) in helps" :key="i">
              <p class="item-title iconfont icon-wenti">{{item.title}}</p>
              <p class="item-context">{{item.text}}</p>
            </div>
          </div>
        </div>
        <div class="guanbi" @click="close">
          <i class="iconfont icon-guanbi2"></i>
        </div>
      </div>
    </x-dialog>
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
        }, {
          title: '如何切换摄像头更好的定位娃娃？',
          text: '成功上机后，操作面板右侧摄像头却换按钮，即可切换方向。'
        }, {
          title: '移动爪子最长多少时间？',
          text: '移动爪子最长30S，超过时间会自动下爪。'
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

  .help {
    height: 400px;
    background: @primary-color;
    border-radius: 7px;
    .list {
      background: rgb(255, 250, 220);
      overflow: hidden;
      border-radius: 7px;
      position: absolute;
      top: 10px;
      bottom: 10px;
      left: 10px;
      right: 10px;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      padding: 15px 0;
      .title {
        text-align: center;
        img {
          width: 50%;
        }
        p {
          font-size: 24px;
          color: #896a10;
        }
      }
      .content {
        padding: 0 15px;
        overflow: scroll;
        text-align: left;
        .item {
          font-size: 14px;
          padding: 10px 0;
          &:not(:last-child) {
            border-bottom: 1px solid #f3e79d;
          }
          .item-title {
            text-align: left;
            color: #896a10;
            &:before {
              margin-right: 5px;
            }
          }
          .item-context {
            color: #b79e44;
          }
        }
      }
      .tip-btn {
        text-align: center;
        width: 120px;
        outline: none;
        border: 0;
        background: #804c01;
        color: #fff;
        border-radius: 4px;
        line-height: 1;
        padding: 8px 0;
        font-size: 16px;
      }
    }
    .guanbi {
      position: absolute;
      right: -10px;
      top: -10px;
      .icon-guanbi2 {
        background: @primary-color;
        padding: 10px;
        border-radius: 50%;
        color: #fff;
        font-size: 16px;
      }
    }
  }
</style>
