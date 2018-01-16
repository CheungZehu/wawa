<template>
  <div class="readys" v-show="show">
    <!-- <x-dialog v-model="show" :dialog-style="{'background-color': 'transparent', 'overflow': 'initial'}"> -->
      <div class="ready">
        <div class="content">
          <img src="http://wawa-1255600302.file.myqcloud.com/images/ready.png" alt="">
          <p>倒计时结束将自动取消排队</p>
          <p class="count-down">{{upornotCountDown}}</p>
        </div>
        <div class="ready-btn">
          <div class="r-btn" @click.stop="close(false)">
            <p>放弃游戏</p>
          </div>
          <div class="r-btn" @click="close(true)">
            <p>开始游戏 (x {{coinPrice}})</p>
            <!-- <p>(x {{coinPrice}})</p> -->
          </div>
        </div>
      </div>
    <!-- </x-dialog> -->
  </div>
</template>

<script>
  import { XDialog, TransferDomDirective as TransferDom, Flexbox, FlexboxItem, XButton } from 'vux'

  export default {
    directives: {
      TransferDom
    },
    components: {
      XDialog, Flexbox, FlexboxItem, XButton
    },
    props: {
      visibile: Boolean,
      upornotCountDown: Number,
      coinPrice: Number,
    },
    computed: {
      show () {
        return this.visibile
      }
    },
    methods: {
      close (val) {
        console.log('close')
        this.$emit('close', false, val)
      },
    },
  }
</script>

<style lang="less">
@import './../../assets/css/public.less';
.readys {
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
  .ready {
    height: 40rem;
    text-align: center;
    .content {
      color: #fff;
      p {
        font-size: 1.6rem;
      }
      img {
        width: 60%;
        margin-bottom: 10px;
      }
      .count-down {
        font-size: 5rem;
        padding: 4rem 0;
      }
    }
    .ready-btn {
      margin-top: 20px;
      display: inline-flex;
      .r-btn {
        background: #75c600;
        .borderRadius(5px);
        line-height: 5rem;
        width: 14rem;
        text-align: center;
        color: #fff;
        font-size: 1.7rem;
        &:first-child {
          background: #aaaaaa;
          margin-right: 5rem;
        }
      }
    }
  }
}
</style>
