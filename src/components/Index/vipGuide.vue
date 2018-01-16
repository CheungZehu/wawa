<template>
  <div class="vip-guide" v-show="show" @click.stop="close">
    <div class="img">
      <!-- <img src="http://wawa-1255600302.file.myqcloud.com/images/meibi.png" alt=""> -->
      <p class="vip-text">该频道仅限VIP用户预约</p>
    </div>
    <div class="btn-box">
      <div class="b-btn" @click.stop="recharge">
        <p>去充值</p>
      </div>
    </div>
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
      close () {
        console.log('close')
        this.$emit('close', false)
      },
      recharge () {
        this.$router.push('/myInfo/recharge')
      },
      share () {
        localStorage.setItem('share', true)
        this.$router.push('/index')
      }
    },
  }
</script>

<style lang="less">
@import './../../assets/css/public.less';
  .vip-guide {
    background: rgba(0, 0, 0, .6);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    z-index: 16;
    .img {
      width: 60%;
      img {
        width: 100%;
      }
      .vip-text {
        color: #fff;
        font-size: 2rem;
        text-align: center;
      }
    }
    .btn-box {
      margin-top: 20px;
      display: inline-flex;
      .b-btn {
        background: #75c600;
        .borderRadius(5px);
        line-height: 4rem;
        width: 12rem;
        text-align: center;
        color: #fff;
        font-size: 1.6rem;
        &:first-child {
          background: #f62371;
          // margin-right: 5rem;
        }
      }
    }
  }

</style>
