<template>
  <div :class="{loading: visibile}" class="loading-circle">
    <div class="container">
      <div class="loading-anim">
        <div class="border out"></div>
        <div class="border in"></div>
        <div class="border mid"></div>
        <div class="circle">
          <span class="dot" v-for="i in 12" :key="i"></span>
        </div>
      </div>
      <p class="circle-text">
					<span style="vertical-align:middle;display:inline-block;font-size:2rem;">正在初始化&nbsp;&nbsp;</span><inline-loading style="width: 3rem; height: 3rem;"></inline-loading>
				</p>
    </div>
  </div>
</template>

<script>
  import { InlineLoading } from 'vux'

  export default {
    props: {
      visibile: Boolean,
    },
    components: {
      InlineLoading
    },
    data () {
      return {
        isLoading: true,
      }
    },
    methods: {
      // loading () {
      //   console.log(111111)
      //   this.isLoading = !this.isLoading
      // }
    }
  }
</script>

<style lang="less">
  .loading-circle {
    z-index: 5;
  }
  .container {
    // margin: 20px;
    margin: 2rem;
    // width: calc(100% - 40px);
    height: auto;
  }
  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color .2s ease-out;
  }
  .circle-text {
    transform: translateX(-50%) translateZ(-100px) rotateY(-90deg) rotateX(90deg) rotateZ(90deg) scale(0.5);
    opacity: 0;
  }
  .loading .circle-text {
    font-size: 2rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateZ(0) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1);
    opacity: 1;
  }
  .loading-anim {
    position: relative;
    // width: 200px;
    // height: 200px;
    width: 16rem;
    height: 16rem;
    margin: auto;
    perspective: 800px;
    transform-style: preserve-3d;
    transform: translateZ(-100px) rotateY(-90deg) rotateX(90deg) rotateZ(90deg) scale(0.5);
    opacity: 0;
    transition: all .2s ease-out;
    .circle {
      width: 100%;
      height: 100%;
      animation: spin 5s linear infinite;
    }
    .border {
      position: absolute;
      border-radius: 50%;
      border: 3px solid #e34981;
    }
    .out {
      top: 15%;
      left: 15%;
      width: 66%;
      height: 66%;
      // top: 15%;
      // left: 15%;
      // width: 70%;
      // height: 70%;
      border-left-color: transparent;
      border-right-color: transparent;
      animation: spin 2s linear reverse infinite;
    }
    .in {
      top: 18.3%;
      left: 18.3%;
      width: 60%;
      height: 60%;
      // top: 18%;
      // left: 18%;
      // width: 64%;
      // height: 64%;
      border-top-color: transparent;
      border-bottom-color: transparent;
      animation: spin 2s linear infinite;
    }
    .mid {
      top: 38%;
      left: 38%;
      // top: 40%;
      // left: 40%;
      width: 20%;
      height: 20%;
      border-left-color: transparent;
      border-right-color: transparent;
      animation: spin 1s linear infinite;
    }
  }
  .loading .loading-anim {
    transform: translateZ(0) rotateY(0deg) rotateX(0deg) rotateZ(0deg) scale(1);
    opacity: 1;
  }
  .loading .loading-overlay {
    background: rgba(255, 255, 255, 0.5);
  }
  .dot {
    position: absolute;
    display: block;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: #e34981;
    animation: jitter 5s ease-in-out infinite, fade-in-out 5s linear infinite;
  }
  .dot:nth-child(1) {
    top: 7rem;
    left: 14rem;
    // top: 90px;
    // left: 180px;
    animation-delay: 0s;
  }

  .dot:nth-child(2) {
    top: 10.55rem;
    left: 13.06rem;
    // top: 135px;
    // left: 168px;
    animation-delay: 0.41667s;
  }

  .dot:nth-child(3) {
    top: 13.06rem;
    left: 10.55rem;
    // top: 168px;
    // left: 135px;
    animation-delay: 0.83333s;
  }

  .dot:nth-child(4) {
    top: 14rem;
    left: 7rem;
    // top: 180px;
    // left: 90px;
    animation-delay: 1.25s;
  }

  .dot:nth-child(5) {
    top: 13.06rem;
    left: 3.45rem;
    // top: 168px;
    // left: 45px;
    animation-delay: 1.66667s;
  }

  .dot:nth-child(6) {
    top: 10.55rem;
    left: 0.94rem;
    // top: 135px;
    // left: 12px;
    animation-delay: 2.08333s;
  }

  .dot:nth-child(7) {
    top: 7rem;
    left: 0;
    // top: 90px;
    // left: 0px;
    animation-delay: 2.5s;
  }

  .dot:nth-child(8) {
    top: 3.45rem;
    left: 0.94rem;
    // top: 45px;
    // left: 12px;
    animation-delay: 2.91667s;
  }

  .dot:nth-child(9) {
    top: 0.94rem;
    left: 3.45rem;
    // top: 12px;
    // left: 45px;
    animation-delay: 3.33333s;
  }

  .dot:nth-child(10) {
    top: 0px;
    left: 7rem;
    // top: 0px;
    // left: 90px;
    animation-delay: 3.75s;
  }

  .dot:nth-child(11) {
    top: 0.94rem;
    left: 10.55rem;
    // top: 12px;
    // left: 135px;
    animation-delay: 4.16667s;
  }

  .dot:nth-child(12) {
    top: 3.45rem;
    left: 13.06rem;
    // top: 45px;
    // left: 168px;
    animation-delay: 4.58333s;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes jitter {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(0.7, 0.7);
    }
    50% {
      transform: scale(1, 1);
    }
    75% {
      transform: scale(1.3, 1.3);
    }
    100% {
      transform: scale(1, 1);
    }
  }
  @keyframes fade-in-out {
    0% {
      opacity: 0.8;
    }
    25% {
      opacity: 0.2;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0.8;
    }
  }
</style>
