<template>
  <div class="daily-gift" v-show="show">
    <div class="daily-gift-box">
      <div class="img" id="simg">
        <div class="sguanbi" @click="close">
          <i class="iconfont icon-guanbi1"></i>
        </div>
        <img src="http://wawa-1255600302.file.myqcloud.com/images/mr.png" alt="">
        
      </div>
      <div class="mask" id="maskBox">
        <div class="daily-gift-text">
          <div class="context">
            <div class="mr-img">
              <img src="http://wawa-1255600302.file.myqcloud.com/images/aiyo.jpg" alt="">
            </div>
          </div>
          <div class="shouming">
            <p>长按二维码关注公众号，点击菜单【每日礼包】，即可领取金币</p>
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
    methods: {
      close () {
        this.$emit('close', 0)
      },
    }
  }
</script>


<style lang="less">
@import './../../assets/css/public.less';
  .daily-gift {
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
    .daily-gift-box {
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
        .daily-gift-text {
          text-align: center;
          background: #fff;
          height: 100%;
          border-radius: 10px;
          position: relative;
          .context {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 3rem;
            .mr-img {
              img {
                width: 100%;
              }
            }
          }
          .shouming {
            color: #545454;
            font-size: 1.4rem;
            padding: 1.5rem;
          }
        }
      }
    }
  }
</style>