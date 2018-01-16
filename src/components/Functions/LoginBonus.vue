<template>
  <div class="xinshou" v-show="show">
    <div class="xinshou-box">
      <div class="img" id="simg">
        <div class="sguanbi" @click="close">
          <i class="iconfont icon-guanbi1"></i>
        </div>
        <img src="http://wawa-1255600302.file.myqcloud.com/images/xinshou1.png" alt="">
      </div>
      <div class="mask" id="maskBox">
        <div class="xinshou-text">
          <div class="context">
            <div class="gold-item" v-for="(item, i) in bonus" :key="i">
              <img src="http://wawa-1255600302.file.myqcloud.com/images/goldbox.png" alt="">
              <p>+{{item}}</p>
              <p class="gaizhang" v-if="i < accumulate.signInDays">已签到</p>
            </div>
          </div>
          <div class="xinshou-btn">
            <div class="again" @click="close">
              <p>确定</p>
            </div>
          </div>
          <div class="shouming">
            <p>每天00：00刷新签到，坚持每天签到领取金币</p>
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
    },
    data () {
      return {
        bonus: [],
        accumulate: {},
      }
    },
    computed: {
      show () {
        return this.visibile
      }
    },
    mounted () {
      this.accumulateConfig()
    },
    methods: {
      accumulateConfig () {
        api.accumulateConfig().then(res => {
          console.log('res.data')
          console.log(res.data)
          this.accumulate = res.data.data
          let arr = []
          for (var i = 0; i < 7; i++) {
            for (let key in this.accumulate) {
              if (/CoinNum/.test(key)) {
                let str = 'day' + (i + 1) + 'CoinNum'
                if (str === key) {
                  arr.push(this.accumulate[key])
                }
              }
            }
          }
          this.bonus = arr
        })
      },
      close () {
        this.$emit('close', 2)
      },
    }
  }
</script>


<style lang="less">
@import './../../assets/css/public.less';
  .xinshou {
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
    .xinshou-box {
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
        .xinshou-text {
          text-align: center;
          background: #fff;
          height: 100%;
          border-radius: 10px;
          position: relative;
          .context {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 40px 0 20px 0;
            .gold-item {
              text-align: center;
              background: #f9e4e9;
              line-height: 1;
              width: 6rem;
              height: 8rem;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-flow: column;
              border-radius: 10px;
              border: 1px solid #f7c5d1;
              box-sizing: border-box;
              margin: 5px;
              position: relative;
              img {
                width: 3.5rem;
                height: 3.5rem;
                margin-bottom: 10px;
              }
              p {
                color: #f6a0b5;
                font-size: 1.5rem;
              }
              .gaizhang {
                position: absolute;
                top: 3.5rem;
                color: #64b804;
                border: 1px solid #64b804;
                line-height: 1;
                width: 5.5rem;
                height: 2rem;
                line-height: 20px;
                border-radius: 4px;
                transform: rotate(-15deg);
              }
            }
          }
          .xinshou-btn {
            display: inline-flex;
            .again {
              .bgLinearGradient(@top: #9be000; @bottom: #47a601;);
              .border(@width: 2px; @color: #9eee00);
              .borderRadius(30px);
              .boxShadowOutset(@x: 0; @y: 2px; @blur: 0; @spread: 0; @color: #417a00;);
              width: 90px;
              height: 35px;
              line-height: 35px;
              P {
                font-size: 1.6rem;
                text-align: center;
                color: #fff;
                text-shadow: 1px 1px 0 rgba(0, 0, 0, .2);
              }
            }
          }
          .shouming {
            color: #b0b0b0;
            font-size: 1.2rem;
            padding: 20px 0 10px 0;
          }
        }
      }
    }
  }
</style>