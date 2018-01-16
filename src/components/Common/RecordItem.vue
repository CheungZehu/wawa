<template>
  <div class="record-item">
    <div class="left">
      <p>{{fromObjType | type}}</p>
      <p>{{createTime}}</p>
    </div>
    <div class="right">
      <span>+{{num}}</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jinbi1"></use>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      fromObjType: Number,
      num: Number,
      createTime: String
    },
    filters: {
      type (val) {
        switch (val) {
          case 1:
            return '订单购买'
            break
          case 2:
            return '订单购买赠送'
            break
          case 3:
            return '首次登录赠送'
            break
          case 5:
            return '礼包订单购买'
            break
          case 6:
            return '礼包订单赠送'
            break
          case 11:
            return '每日签到赠送'
            break
          case 12:
            return '累计签到赠送'
            break
          case 21:
            return '邀请好友获得'
            break
          case 22:
            return '受邀请获得'
            break
          case 32:
            return '娃娃机上机消耗'
            break
          case 33:
            return '分享好友获得'
            break
          case 41:
            return '后台赠送获得'
            break
          case 51:
            return '娃娃兑换金币获得'
            break
          case 52:
            return '娃娃过期自动兑换金币获得'
            break
        }
      }
    }
  }
</script>

<style lang="less">
@import './../../assets/css/public.less';
  .record-item {
    &:first-child {
      margin-top: 1.5rem;
    }
    margin: 0 2rem 1.5rem 2rem;
    background-color: #fff;
    .borderRadius;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    .left {
      p {
        &:first-child {
          font-size: 1.4rem;
        }
        &:last-child {
          font-size: 1.2rem;
          color: #808080;
        }
      }
    }
    .right {
      display: inherit;
      align-items: center;
      span {
        font-weight: bold;
        font-style:italic;
        color: #f76260;
        font-size: 1.6rem;
        margin-right: 5px;
      }
      .icon {
        width: 1.3em;
        height: 1.3em;
      }
    }
  }
</style>



