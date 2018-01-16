<template>
  <div id="app">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
      <!-- <load-ing v-show="isLoading"></load-ing> -->
    </div>
<!--     <transition :name="'slide-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition> -->
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
import api from './api/api'
import { mapState, mapActions } from 'vuex'
import { TransferDom, Loading } from 'vux'
import LoadIng from './components/Common/Loading'

export default {
  name: 'app',
  directives: {
    TransferDom
  },
  components: {
    Loading, LoadIng
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      isLoading: state => state.isLoading,
      // direction: state => state.vux.direction,
      // demoTop: state => state.vux.demoScrollTop
    }),
    isAct () {
      return /ActivityDetail/.test(this.$route.path)
    }
  },
  created () {
    localStorage.clear()
    // this.login()
    // this.getUserInfo()

    if (/9090/.test(window.location.origin)) {
      this.login()
      // this.getUserInfo()
      this.getSoundConfig()
    } else {
      this.getUserInfo()
      this.getSoundConfig()
    }
  },
  beforeDestroy() {
    localStorage.removeItem('member')
    localStorage.removeItem('sum')
    localStorage.removeItem('updateSoundConfig')
    localStorage.removeItem('sessionID')
    localStorage.clear()
  },
  methods: {
    ...mapActions([
      'updateMember', 'updateSum', 'updateSoundConfig'
    ]),
    test() {
      console.log('1121')
    },
    login () {
      // 13844836024 13000000002 vpwTDu_L1HfS8rSIg oR2NewlLlG-vpwTDu_L1HfS8rSIg oR2Newv9oDJ59RFhgXiWDknSVXyA
      let model = { mode: 'test', mobile: 'oR2Newv9oDJ59RFhgXiWDknSVXyA', type: 2, needUserInfo: false }
      api.login(model).then(res => {
        if (res.data.errCode === 0) {
          console.log('test登录成功')
          console.log(res.data)
          // alert(JSON.stringify(res.data))
          this.user = res.data
          this.getUserInfo()
          this.coinsSum()
        } else {
          console.log('test失败')
        }
      })
    },
    // 获取会员信息
    getUserInfo(){
      api.getUserInfo().then(res=>{
        if(res.data.errCode == 0){
          console.log('获取会员信息')
          console.log(res.data)
          this.updateMember(res.data.member)
          this.coinsSum();
          this.wxSdk.share(res.data.member.id, res.data.member.nickname)
        }else{
          this.showInfo(res.data.errMsg)
        }
      })
    },
    coinsSum () {
      api.coinsSum().then(res => {
        if (res.data.errCode === 0) {
          this.updateSum(res.data.sum)
        } else {
          console.log(res.data.errMsg);
        }
      })
    },
    getSoundConfig () {
      api.soundConfig().then(res => {
        console.log('getSoundConfig')
        console.log(res.data)
        if (res.data.errCode === 0) {
          let model = Object.assign({}, res.data.data)
          delete model.id
          this.updateSoundConfig(model)
          console.log(model)
        }
      })
    },
  },
}
</script>

<style lang="less">
  
  @import '~vux/src/styles/reset.less';
  @import '//at.alicdn.com/t/font_477549_rkw0x4f2e412lnmi.css';

  * {
    margin: 0;
    padding: 0;
    -webkit-touch-callout:none;  
    -webkit-user-select:none;  
    -khtml-user-select:none;  
    -moz-user-select:none;  
    -ms-user-select:none;  
    user-select:none;  
    -webkit-overflow-scrolling: touch;   
  }
  #app {
    height: 100%;
  }
  a {
    color: #000;
  }
  li {
    list-style: none;
  }
  div, h1, p, ul, li, label, textarea, input, span {
    word-break: break-all;
  }

  html, body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
    width: 100%;
    // background: @primary-color;
    // font-size: 10px;
    -webkit-overflow-scrolling: touch;
  }
  @media only screen and (min-width: 320px) and (max-width: 374px) {
    html {
      font-size: 8px !important;
    }
  }
  @media only screen and (min-width: 375px) and (max-width: 425px) {
    html {
      font-size: 9px !important;
    }
  }
  @media only screen and (min-width: 425px) {
    html {
      font-size: 10px !important;
    }
  }

  
  .rightMove-enter-active,
  .rightMove-leave-active {
  transition: all .3s
  }

  .rightMove-enter,
  .rightMove-leave-to {
  transform: translate3d(100%, 0, 0)
  }

  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  // ::-webkit-scrollbar {display:none}
  ::-webkit-scrollbar{
    display:none;
  }

  .weui-toast {
    width: 12.5rem !important;
  }

  a { 
    -webkit-tap-highlight-color:rgba(255,0,0,0);
  } 

  input{
    -webkit-user-select: auto;
  } 

  .vux-header {
    background-color: #000 !important;
  }
</style>

<!-- 
    .router-view {
      width: 100%;
      top: 0;
    }

  .slide-out-enter-active,
  .slide-out-leave-active,
  .slide-in-enter-active,
  .slide-in-leave-active {
    will-change: transform;
    transition: all 500ms;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .slide-out-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-out-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-in-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-in-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  } -->