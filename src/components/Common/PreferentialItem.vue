<template>
  <div class="th-item">
    <div class="th-item-left">
      <!-- <img src="http://wawa-1255600302.file.myqcloud.com/images/lihe.png" alt=""> -->
      <img :src="img + item.previewImage" alt="">
      <div class="item-text">
        <p class="title">买就送5金币</p>
        <p class="time">有效期至：1月31日 10:00</p>
      </div>
    </div>
    <div class="th-item-right">
      <div class="img-btn-right" @click="ordersBags">
        <img src="http://wawa-1255600302.file.myqcloud.com/images/pay.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      item: Object,
    },
    methods: {
      ordersBags () {
        this.$emit('ordersBags', this.item.id)
      },
    }
  }
</script>

<style lang="less">
  .th-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    position: relative;
    &:not(:last-child) {
      &:after {
        content: "";
        width: 100%;
        height: 1px;
        background: #fff;
        position: absolute;
        bottom: 0;
        transform: scaleY(0.2);
      }
      // border-bottom: 1px solid #fff;
    }
    .th-item-left {
      display: flex;
      img {
        width: 5rem;
        height: 5rem;
        flex-shrink: 0;
        margin-right: 1rem;
      }
      .item-text {
        .title {
          color: #fff;
          font-size: 1.7rem;
        }
        .time {
          font-size: 1.4rem;
          color: #c8acd7;
        }
      }
    }
    .th-item-right {
      .img-btn-right {
        width: 6rem;
        line-height: 0;
        img {
          width: 100%;
        }
      }
    }
  }
</style>

