<template>
  <div class="preferential" :style="{height: `${height}px`}">
    <div class="th-box">
      <div class="th-title">
        <img class="th-img" src="http://wawa-1255600302.file.myqcloud.com/images/th-tx.png" alt="">
        <!-- <p class="text-title">充值大特惠，娃娃抓不停</p> -->
      </div>
      <div class="th-context">
        <preferential-item v-for="(item, i) in bagsList" :key="i" :item="item" @ordersBags="ordersBags"></preferential-item>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/api'
  import PreferentialItem from '../Common/PreferentialItem'

  export default {
    components: {
      PreferentialItem
    },
    data () {
      return {
        height: 0,
        bagsList: [],
      }
    },
    created () {
      this.getCoinsBags()
    },
    mounted () {
      this.height = window.innerHeight
      window.onresize = () => {
        this.height = window.innerHeight
      }
    },
    methods: {
      getCoinsBags () {
        api.getCoinsBags().then(res => {
          if (res.data.errCode === 0) {
            console.log(res.data)
            this.bagsList = res.data.list
          }
        })
      },
      ordersBags (id) {
        let model = { bagId: id, payWay: 2 }
        api.ordersBags(model).then(res => {
          if (res.data.errCode === 0) {
            console.log(res.data)
            let tokenId = res.data.tokenId
            window.location.href = `https://pay.swiftpass.cn/pay/jspay?token_id=${tokenId}`
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .preferential {
    background: #3f2175;
    overflow: scroll;
    position: relative;
    .th-box {
      background: #912fa7;
      width: 90%;
      border-radius: 12px;
      position: absolute;
      top: 7rem;
      left: 50%;
      transform: translate(-50%, 0);
      .th-title {
        width: 90%;
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translate(-50%, 0);
        .th-img {
          width: 100%;
        }
      }
      .th-context {
        padding: 2rem 2rem 0rem 2rem;
        min-height: 10rem;
      }
    }
  }
</style>

