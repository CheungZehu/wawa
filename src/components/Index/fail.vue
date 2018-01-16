<template>
  <!-- <div class="shibai" v-show="show" @click.stop="close"> -->
  <div class="shibai" v-show="show">
    <div class="img">
      <img src="http://wawa-1255600302.file.myqcloud.com/images/shibai.png" alt="">
    </div>
    <div class="btn-box">
      <div class="a-btn" @click.stop="close">
        <p>放弃</p>
      </div>
      <div class="a-btn" @click.stop="playAgain" v-if="playAgainCountDown > 0">
        <p>再战一局({{playAgainCountDown}})</p>
        <!-- <p v-else>预约</p> -->
      </div>
      <div class="a-btn gray" @click.stop="playAgain" v-else>
        <p>预约</p>
      </div>
    </div>
    <!-- <div class="btn-box" v-if="playAgainCountDown > 0">
      <div class="a-btn" @click.stop="confirmTocancel(false)">
        <p>放弃</p>
      </div>
      <div class="a-btn" @click.stop="playAgain">
        <p>再战一局({{playAgainCountDown}})</p>
      </div>
    </div>
    <div class="btn-box" v-else>
      <div class="a-btn" @click.stop="close(false)">
        <p>放弃</p>
      </div>
      <div class="a-btn gray" @click.stop="appointment">
        <p>预约</p>
      </div>
    </div> -->
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
        // this.$emit('close', false)
        if (this.playAgainCountDown > 0) {
          this.$emit('close', false, 2)
        } else {
          this.$emit('close', false)
        }
      },
      // 预约
      appointment () {
        this.$emit('appointment')

        this.$emit('close', false, 0)
      },
      // 再战一局
      playAgain () {
        // this.$emit('close', false, 1)
        if (this.playAgainCountDown > 0) {
          this.$emit('close', false, 1)
        } else {
          this.$emit('close', false, 0)
        }
      }
    },
    watch: {
      playAgainCountDown (val) {
        console.log('playAgainCountDown ============== ', val)
      }
    }
  }
</script>

<style lang="less">
@import './../../assets/css/public.less';
  .shibai {
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
      .a-btn {
        background: #75c600;
        .borderRadius(5px);
        line-height: 4rem;
        width: 12rem;
        text-align: center;
        color: #fff;
        font-size: 1.6rem;
        &:first-child {
          background: #aaaaaa;
          margin-right: 5rem;
        }
      }
      .gray {
        background: #ffc000;
      }
    }
  }
</style>
