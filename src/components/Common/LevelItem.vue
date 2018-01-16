<template>
  <div class="level-item">
    <div class="left">
      <img  class="avatar" :src="item.headImage" width="50" height="50">
    </div>
    <div class="right">
      <p class="name">{{item.nickname}}</p>
      <p class="f-name" v-if="item.fNickname">上线:{{item.fNickname}}</p>
      <p class="info">ID:{{item.number}}</p>
      <p class="time">时间:{{item.createTime}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style lang="less" scopend>
@import "./../../assets/css/public.less";
.level-item {
  line-height: 1;
  display: flex;
  // align-items: center;
  padding: 1rem;
  margin: 0 2rem 1.5rem 2rem;
  background-color: #fff;
  &:first-child {
    margin-top: 1.5rem;
  }
  .borderRadius;
  .left {
    margin-right: 1rem;
    .avatar {
      display: block;
    }
  }
  .right {
    flex: 1;
    font-size: 1.6rem;
    .name {
      font-size: 1.7rem;
    }
    .f-name {
      font-size: 1.6rem;
      margin-top: 10px;
    }
    .info {
      font-size: 1.6rem;
      color: #333;
      margin-top: 10px;
    }
    .time {
      font-size: 1.4rem;
      color: #989898;
      margin-top: 10px;
    }
  }
}
</style>
