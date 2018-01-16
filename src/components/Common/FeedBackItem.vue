<template>
  <div class="revenue-item">
    <!-- <div class="title">
      <p>会员名称</p>
      <p>{{item.memberName}}</p>
    </div> -->
    <div class="content">
      <div class="item">
        <p>联系方式</p>
        <p>{{item.contactType | contactType}}</p>
      </div>
      <div class="item">
        <p>联系号码</p>
        <p>{{item.contactInfo}}</p>
      </div>
      <div class="item">
        <p>问题类型</p>
        <p>{{item.type | feedBackType}}</p>
      </div>
      <div class="item">
        <p>处理状态</p>
        <p>{{item.status | status}}</p>
      </div>
      <div class="item">
        <p>问题描述</p>
        <p>{{item.content}}</p>
      </div>
      <div class="item">
        <p>反馈时间</p>
        <p>{{item.createTime}}</p>
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
      type (val) {
        switch (val) {
          case 1:
            return '订单提成'
            break
          case 2:
            return '提现'
            break
        }
      },
      contactType (val) {
        switch (val) {
          case 1:
            return '手机号'
            break
          case 2:
            return '微信'
            break
          case 3:
            return 'QQ'
            break
          case 4:
            return '邮箱'
            break
        }
      },
      status (val) {
        switch (val) {
          case 0:
            return '待处理'
            break
          case 1:
            return '已处理'
            break
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@import './../../assets/css/public.less';
  .revenue-item {
    &:first-child {
      margin-top: 1.5rem;
    }
    margin: 0 2rem 1.5rem 2rem;
    background-color: #fff;
    .borderRadius;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: column;
    padding: 2rem;
    font-size: 1.6rem;
    .title {
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #D9D9D9;
      padding-bottom: 1rem;
      p {
        color: #6d6d6d;
        &:last-child {
          font-size: 1.6em;
          color: #000;
        }
      }
    }
    .content {
      width: 100%;
      .item {
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        p {
          line-height: 1.8;
          color: #333;
          font-size: 1.6rem;
          &:first-child {
            flex-shrink: 0;
            margin-right: 5px;
          }
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



