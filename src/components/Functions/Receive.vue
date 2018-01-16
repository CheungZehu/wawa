<template>
  <div class="receives" v-if="show">
    <div class="receive-box">
      <div class="img" id="simg">
        <div class="sguanbi" @click="close">
          <i class="iconfont icon-guanbi1"></i>
        </div>
        <img src="http://wawa-1255600302.file.myqcloud.com/images/mr.png" alt="">
      </div>
      <div class="mask" id="maskBox">
        <div class="receive-text">
          <div class="context">
            <div class="content-title" v-if="hasDailyCoin">
              <p>您今天已经领取过了</p>
              <p>明天再来哦~</p>
            </div>
            <div class="content-title" v-else>
              <p>恭喜您！</p>
              <p>本次获得{{coinNum}}金币</p>
            </div>
            <div class="content-img">
              <img src="http://wawa-1255600302.file.myqcloud.com/images/lingqu.png" alt="">
              <span class="lingqu" v-if="hasDailyCoin">已领取</span>
            </div>
            <div class="content-btn">
              <p @click="close" :class="{a: hasDailyCoin}">好的</p>
              <p v-if="hasDailyCoin" @click="recharge" class="b">去充值</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/api'

  export default {
    props: {
      visibile: Boolean,
      coinNum: Number,
      hasDailyCoin: Boolean,
    },
    computed: {
      show () {
        return this.visibile
      }
    },
    methods: {
      close () {
        this.$emit('close')
      },
      recharge () {
        this.$router.push('/myInfo/recharge')
      },
    }
  }
</script>


<style lang="less">
@import './../../assets/css/public.less';
  .receives {
    background: rgba(0, 0, 0, .6);
    position: absolute;
    top: 0;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .receive-box {
      width: 76%;
      position: relative;
      .img {
        .sguanbi {
          position: absolute;
          color: #fff;
          right: 10px;
          top: -18px;
          &:after {
            content: '';
            width: 2px;
            height: 30px;
            background: #fff;
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 10px;
            transform: translate(-50%, 0);
            z-index: -1;
          }
          .icon-guanbi1 {
            font-size: 28px;
          }
        }
        width: 125%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        line-height: 0;
        margin-bottom: -30px;
        z-index: 1;
        img {
          width: 100%;
        }
      }
      .mask {
        width: 100%;
        background: rgba(255, 255, 255, .5);
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        .receive-text {
          text-align: center;
          background: #fff;
          height: 100%;
          border-radius: 10px;
          position: relative;
          .context {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3rem 0;
            flex-flow: column;
            .content-title {
              font-size: 1.6rem;
              color: #f26687;
            }
            .content-img {
              padding: 2rem 0 3rem 0;
              width: 12rem;
              position: relative;
              img {
                width: 100%;
              }
              .lingqu {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(-15deg);
                font-size: 1.8rem;
                font-weight: bold;
                color: #64b402;
                width: 10rem;
                border: 2px solid #64b402;
                border-radius: 5px;
                // transform: rotate(-15deg);
              }
            }
            .content-btn {
              display: flex;
              p {
                width: 9rem;
                line-height: 3.5rem;
                .bgLinearGradient(@top: #9be000; @bottom: #47a601);
                border-radius: 30px;
                border: 2px solid #9eee00;
                .boxShadowOutset(@x: 0; @y: 3px; @blur: 0; @spread: 0px; @color: #417a00;);
                color: #fff;
                font-size: 1.6rem;
              }
              .a {
                margin-right: 2rem;
                .bgLinearGradient(@top: #ff378b; @bottom: #ef1c5a);
                border: 2px solid #ff63a5;
                .boxShadowOutset(@x: 0; @y: 3px; @blur: 0; @spread: 0px; @color: #770d2d;);
              }
            }
          }
        }
      }
    }
  }
</style>