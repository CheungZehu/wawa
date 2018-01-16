<template>
  <div class="tip" v-if="false">
    <div class="list">
      <div class="title">
        <img src="http://wawa-1255600302.file.myqcloud.com/images/tip.png" alt="">
      </div>
      <div class="content">
        <p>每个用户一次只能预约一个房间，预约第二个房间时，将取消上一个房间的预约。</p>
      </div>
      <button class="tip-btn" @click="getRecord(false, 1)">知道了</button>
    </div>
    <div class="guanbi" @click="getRecord(false)">
      <i class="iconfont icon-guanbi2"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      visibile: Boolean,
    },
    data () {
      return {
        isRecord: false,
      }
    },
    methods: {
      getRecord (val, index) {
        console.log(11)
        this.$emit('close', val, index)
      },
    }
  }
</script>

// <style lang="less">
// @import './../../assets/css/public.less';

//   .tip {
//     z-index: 3;
//     position: absolute;
//     top: 50%;
//     bottom: 0;
//     left: 50%;
//     right: 0;
//     transform: translate(-50%, -70%);
//     width: 68%;
//     height: 250px;
//     background: @primary-color;
//     border-radius: 7px;
//     .list {
//       background: rgb(255, 250, 220);
//       overflow: hidden;
//       border-radius: 7px;
//       position: absolute;
//       top: 10px;
//       bottom: 10px;
//       left: 10px;
//       right: 10px;
//       display: flex;
//       flex-flow: column;
//       justify-content: space-around;
//       align-items: center;
//       padding: 15px 0;
//       .title {
//         text-align: center;
//         img {
//           width: 50%;
//         }
//       }
//       .content {
//         padding: 0 15px;
//         p {
//           text-indent: 2em;
//         }
//       }
//       .tip-btn {
//         text-align: center;
//         width: 120px;
//         outline: none;
//         border: 0;
//         background: #804c01;
//         color: #fff;
//         border-radius: 4px;
//         line-height: 1;
//         padding: 8px 0;
//         font-size: 16px;
//       }
//     }
//     .guanbi {
//       position: absolute;
//       right: -10px;
//       top: -10px;
//       .icon-guanbi2 {
//         background: @primary-color;
//         padding: 10px;
//         border-radius: 50%;
//         color: #fff;
//         font-size: 16px;
//       }
//     }
//   }
// </style>
