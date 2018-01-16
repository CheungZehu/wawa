<template>
  <div class="revenue-item">
    <!-- <div class="title">
      <p>会员名称</p>
      <p>{{item.nickname}}</p>
    </div> -->
    <div class="content">
      <div class="item">
        <p>会员名称</p>
        <p>{{item.nickname}}</p>
      </div>
      <div class="item">
        <p>订单金额</p>
        <p>{{item.payAmount | price}}元</p>
      </div>
      <div class="item">
        <p>订单时间</p>
        <p>{{item.createTime}}</p>
      </div>
      <div class="item">
        <p>订单内容</p>
        <p>{{item.content}}</p>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  filters: {
    type(val) {
      switch (val) {
        case 1:
          return "订单提成";
        case 2:
          return "提现";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./../../assets/css/public.less";
.revenue-item {
  &:first-child {
    margin-top: 15px;
  }
  margin: 0 20px 15px 20px;
  background-color: #fff;
  .borderRadius;
  // .boxShadowOutset(@color: rgba(125, 82, 82, 0.75));
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: column;
  padding: 20px;
  font-size: 1.6rem;
  .title {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d9d9d9;
    padding-bottom: 10px;
    p {
      color: #6d6d6d;
      &:last-child {
        font-size: 1.4em;
        color: #000;
      }
    }
  }
  .content {
    // padding-top: 10px;
    width: 100%;
    .item {
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      p {
        line-height: 1.8;
        // color: #6d6d6d;
        // font-size: 1.6em;
      }
    }
  }

  // .title {
  //   padding: 10px 0;
  //   border-bottom: 1px solid #D9D9D9;
  //   line-height: 1;
  //   p {
  //     font-size: 1em;

  //     &:last-child {
  //       font-size: 1.6em;
  //       color: #000;
  //     }
  //   }
  // }
}
</style>



