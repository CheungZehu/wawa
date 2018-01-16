<template>
  <div class="chenggong" v-show="show" >
    <div class="img">
      <img src="http://wawa-1255600302.file.myqcloud.com/images/chenggong.png" alt="">
    </div>
    <div class="btn-box">
      <div class="c-btn" @click.stop="share">
        <p>快去分享</p>
      </div>
      <div class="c-btn" @click.stop="playAgain" v-if="playAgainCountDown > 0">
        <p>再战一局({{playAgainCountDown}})</p>
      </div>
      <div class="c-btn gray" v-else @click.stop="close">
        <p>放弃</p>
      </div>
      <!-- <div class="c-btn" @click.stop="appointment">
        <p>再战一局</p>
      </div> -->
    </div>
    
  </div>
</template>

<script>
  export default {
    props: {
      visibile: Boolean,
      playAgainCountDown: Number,
    },
    data () {
      return {
        height: 0,
        imgHeight: 0,
      }
    },
    mounted () {
      this.maskHeight()
      window.onresize = () => {
        this.maskHeight()
      }
    },
    computed: {
      show () {
        return this.visibile
      }
    },
    methods: {
      maskHeight () {
        this.height = window.innerWidth * 0.6
      },
      close () {
        // this.$emit('close', false, 0)
        if (this.playAgainCountDown > 0) {
          this.$emit('close', false, 2)
        } else {
          this.$emit('close', false)
        }
      },
      appointment () {
        this.$emit('appointment')
        this.close()
      },
      playAgain () {
        // this.$emit('close', false, 1)
        if (this.playAgainCountDown > 0) {
          this.$emit('close', false, 1)
        } else {
          this.$emit('close', false, 0)
        }
      },
      share () {
        // localStorage.setItem('share', true)
        // this.close()
        // this.$router.push('/index')
        this.$emit('showInviting', true)
      }
    },
  }
</script>

<style lang="less">
@import './../../assets/css/public.less';
  .chenggong {
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
    }
    .btn-box {
      margin-top: 20px;
      display: inline-flex;
      .c-btn {
        background: #75c600;
        .borderRadius(5px);
        line-height: 4rem;
        width: 12rem;
        text-align: center;
        color: #fff;
        font-size: 1.6rem;
        &:first-child {
          background: #f62371;
          margin-right: 5rem;
        }
      }
      .gray {
        background: #ffc000;
      }
    }
      
  }
</style>
