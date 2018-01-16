<template>
  <div style="height:100%;" class="tem">
    <!-- <div class="header">
      <router-link tag="div" class="user-info" :to="{path: '/myInfo/user'}">
        <img src="../../static/images/headImg.jpg" alt="">
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jinbi1"></use>
          </svg>
          <span>600金币</span>
        </p>
      </router-link>
      <div class="function">
        <router-link tag="i" class="img" :to="{path: '/myInfo'}">
          <img src="static/images/pay.png" alt="" :to="{path: '/myInfo'}">
        </router-link>
        <router-link tag="i" class="img" :to="{path: '/myInfo'}">
          <img src="static/images/setting.png" alt="" :to="{path: '/myInfo'}">
        </router-link>
      </div>
    </div> -->
    <router-view class="router-view"></router-view>

    <!-- <div class="bottom"></div>
    <tabbar class="tabbar" slot="bottom">
      <tabbar-item :selected="isIndex" link="/index">
         <span slot="label" class="iconfont icon" :class="[isIndex ? 'icon-shouye1' : 'icon-shouye']">首页</span>
      </tabbar-item>
      <tabbar-item :selected="isActivity" link="/activity">
         <span slot="label" class="iconfont icon" :class="[isActivity ? 'icon-huodong' : 'icon-huodong2']">活动</span>
      </tabbar-item>
      <tabbar-item :selected="isCooperation" link="/news">
         <span slot="label" class="iconfont icon" :class="[isCooperation ? 'icon-hezuo2' : 'icon-hezuo1']">新闻</span>
      </tabbar-item>
      <tabbar-item :selected="isMy" link="/myInfo">
         <span slot="label" class="iconfont icon" :class="[isMy ? 'icon-wode' : 'icon-wode1']">我的</span>
      </tabbar-item>
    </tabbar> -->
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      Tabbar, TabbarItem
    },
    data () {
      return {
        url: '',
      }
    },
    created () {
      this.url = this.urlSk.indexUrl('Center')
    },
    computed: {
      isIndex () {
        return /index/.test(this.$route.path) || /intro/.test(this.$route.path)
      },
      isActivity () {
        return /activity/.test(this.$route.path)
      },
      isCooperation () {
        return /news/.test(this.$route.path)
      },
      isMy () {
        return /my/.test(this.$route.path)
      },
      isAct () {
        return /ActivityDetail/.test(this.$route.path)
      },
      isBackground () {
        if (/ModifyInfo/.test(this.$route.path) || /CompleteInfo/.test(this.$route.path) || /CoachDetail/.test(this.$route.path) || /CooperationDetail/.test(this.$route.path)) {
          return true
        } else {
          return false
        }
      },

      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
        isLoading: state => state.isLoading,
      })
    },
    methods: {
      background () {
        if (this.isBackground) {
          let body = document.querySelector('body')
          body.style.background = "#fff"
        } else {
          let body = document.querySelector('body')
          body.style.background = "#f2f2f2"
        }
      },
    },
    watch: {
      // '$route': 'background', 
    },
    
  }
</script>

<style lang="less">
  .tem {
    height: 100%;
    // background: url(../../static/images/bg.png);
    // background-size: 100%;
  }
  .tabbar {
    position: fixed !important;
  }
  .bottom {
    height: 54px;
  }
  .weui-tabbar__item.vux-tabbar-simple {
    height: 54px !important;
  }
  .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
    color: @primary-color !important;
  }
  .vux-tabbar-simple .weui-tabbar__label {
    line-height: 36px !important;
    
  }
  .icon {
    font-size: 14px !important;
  }
  .tabbar .iconfont:before {
    height: 24px !important;
    display: block;
    font-size: 20px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }


  .rightMove-enter-active,
  .rightMove-leave-active {
    transition: all .3s
  }

  .rightMove-enter,
  .rightMove-leave-to {
    transform: translate3d(100%, 0, 0)
  }

  // .router-view {
  //   width: 100%;
  // }

  // .header {
  //   padding: 0 5px;
  //   display: flex;
  //   justify-content: space-between;
  //   height: 50px;
  //   align-items: center;
  //   .user-info {
  //     display: inline-flex;
  //     align-items: center;
  //     img {
  //       width: 35px;
  //       height: 35px;
  //       border-radius: 50%;
  //       margin-right: 5px;
  //     }
  //     p {
  //       display: inline-flex;
  //       align-items: center;
  //       color: #fff;
  //       .icon {
  //         width: 25px;
  //         height: 25px;
  //         margin-right: 5px;
  //       }
  //     }
  //   }
  //   .function {
  //     position: relative;
  //     .iconfont {
  //       font-size: 30px;
  //       color: #fff;
  //       margin-left: 5px;
  //     }
  //     .img {
  //       width: 32px;
  //       height: 32px;
  //       position: absolute;
  //       top: 50%;
  //       right: 5px;
  //       transform: translate(0, -50%);
  //       &:first-child {
  //         right: 50px;
  //       }
  //       img {
  //         width: 100%;
  //       }
  //     }
  //   }
  // }
</style>
