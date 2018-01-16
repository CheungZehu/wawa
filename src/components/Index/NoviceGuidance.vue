<template>
  <div class="novice-guidance"  v-show="show" @click="know">
    <div class="first ng-box" id="ng-box" :style="{width: `${width}px`, height: `${height}px`}" v-show="popupBox" >
      <div class="ng-title">
        <div class="close-box"></div>
        <img class="title-img" src="http://wawa-1255600302.file.myqcloud.com/images/aiyou-title.png" alt="">
      </div>

      <div class="first-box" v-if="popupContext">
        <div class="text">
          <p>我们精心为您准备了</p>
          <p><span style="color: #f7c5d1;">超多萌娃</span>和<span style="color: #ffde00;">39金币</span></p>
          <p>快来抓娃娃吧 (*≧m≦*)</p>
        </div>
        <img class="dengdao" src="http://wawa-1255600302.file.myqcloud.com/images/dengdao.png" alt="">
        <div class="context-button" @click="know(0)">我知道了</div>
      </div>

      <div class="second-box" v-else>
        <div class="text" v-if="popupText">
          <p>该房间正忙！您可以先预约排队，或者查看游戏指引，还可以去大厅看看，会有更多惊喜哦~</p>
        </div>
        <div class="text" v-else>
          <p>对这款娃娃不感兴趣？您可以查看游戏指引，或者去大厅看看，会有更多惊喜哦~</p>
        </div>
        <div class="second-btn">
          <p @click="close">开始抓娃娃</p>
          <p @click="getIndex">找娃娃去</p>
        </div>
        <div class="bottom-text">
          不知道怎么玩？看<span>游戏指引</span>
        </div>
      </div>

    </div>

    <div class="second" v-if="liveBox">
      <img class="nb-bk" src="http://wawa-1255600302.file.myqcloud.com/images/ng-bk.png" alt="">
      <div class="ng-right">
        <img src="http://wawa-1255600302.file.myqcloud.com/images/ng-zq.png" alt="">
        <img src="http://wawa-1255600302.file.myqcloud.com/images/ng-xq.png" alt="">
        <img src="http://wawa-1255600302.file.myqcloud.com/images/ng-qh.png" alt="">
      </div>
      <div class="second-bottom">
        <img class="ng-zd" src="http://wawa-1255600302.file.myqcloud.com/images/ng-zdl.png" alt="">
        <div class="btn-zd" @click.stop="know(1)"></div>
      </div>
    </div>

    <div class="third" v-if="operationBox">
      <div class="ng-zzdl">
        <img class="zzdl-img" src="http://wawa-1255600302.file.myqcloud.com/images/ng-zzdl.png" alt="">
        <div class="zzdl-btn" @click.stop="know(2)"></div>
      </div>
      <div class="ng-yuyue">
        <img class="yuyue-img" src="http://wawa-1255600302.file.myqcloud.com/images/ng-yuyue.png" alt="">
      </div>
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
        width: 0,
        height: 0,
        popupBox: true,
        liveBox: false,
        operationBox: false,
        popupContext: true,
        popupText: true,
        knowIndex: 0,
      }
    },
    mounted () {
      
      this.getNgBox()
      window.onresize = () => {
        this.getNgBox()
      }
      this.from()
    },
    computed: {
      show () {
        return this.visibile
      }
    },
    methods: {
      getNgBox () {
        let ngBox = document.getElementById('ng-box')
        this.width = this.height = window.innerWidth * 0.7
      },
      from () {
        let noviceGuidance = localStorage.getItem('from') 
        if (!noviceGuidance) {
          let from = this.util.getUrlParam('from')
          if (from === 'noviceGuidance') {
            this.$emit('close', true)
            localStorage.setItem('from', from)
          }
        }
        // this.$emit('close', true) 
			},
      close () {
        console.log('close')
        this.$emit('close', false, true)
      },
      getIndex () {
        this.$router.replace('/index')
      },
      know2 () {
        alert(2)
      },

      know (val) {
        // alert(val)
        if (typeof (val) === 'number') {
          switch (val) {
            case 0:
              this.popupBox = false
              this.liveBox = true
              this.knowIndex = 1
              break
            case 1: 
              this.liveBox = false
              this.operationBox = true
              this.knowIndex = 2
              break
            case 2:
              this.operationBox = false
              this.popupBox = true
              this.popupContext = false
              this.knowIndex = 3
              break
          }
        } else {
          // alert(111111)
          if (this.knowIndex === 0) {
            this.popupBox = false
            this.liveBox = true
            this.knowIndex = 1
          } else if (this.knowIndex === 1) {
            this.liveBox = false
            this.operationBox = true
            this.knowIndex = 2
          } else if (this.knowIndex === 2) {
            this.operationBox = false
            this.popupBox = true
            this.popupContext = false
            this.knowIndex = 3
          } else if (this.knowIndex === 3) {
            this.close()
          }
        }
      }
    },
  }
</script>

<style lang="less">
  .novice-guidance {
    background: rgba(0, 0, 0, .6);
    position: absolute;
    top: 0;
    z-index: 17;
    bottom: 0;
    left: 0;
    right: 0;
    .i-img {
      width: 50%;
      position: absolute;
      right: 5px;
      top: 5px;
      img {
        width: 100%;
      }
    }
    .ng-box {
      background: rgba(255, 255, 255, .4);
      position: absolute;
      border-radius: 15px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      // display: none;
      .ng-title {
        .close-box {
          width: 3rem;
          height: 3rem;
          // background: #000;
          border-radius: 50%;
          position: absolute;
          right: -3px;
          top: -27px;
          z-index: 1;
        }
        .title-img {
          position: absolute;
          width: 105%;
          left: 50%;
          top: -40px;
          transform: translate(-50%, 0);
        }
      }
      .first-box {
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
        // display: none;
        .text {
          font-size: 1.8rem;
          color: #fff;
          margin-bottom: 1rem;
        }
        .dengdao {
          width: 50%;
          line-height: 0;
        }
        .context-button {
          background: #c94c6a;
          color: #fff;
          font-size: 1.8rem;
          width: 60%;
          text-align: center;
          padding: .5rem 0;
          border-radius: 5px;
          height: 3.4rem;
          line-height: 3.4rem;
        }
      }
      .second-box {
        display: flex;
        justify-content: center;
        flex-flow: column;
        align-items: center;
        // display: none;
        .text {
          width: 85%;
          font-size: 1.8rem;
          color: #fff;
          margin-bottom: 1rem;
        }
        .second-btn {
          color: #fff;
          font-size: 1.7rem;
          display: flex;
          p {
            margin: 2rem 0;
            background: #c94c6a;
            height: 4rem;
            line-height: 4rem;
            width: 10rem;
            text-align: center;
            border-radius: 5px; 
            &:last-child {
              margin-left: 2rem;
              background: #9e213f;
            }
          }
        }
        .bottom-text {
          font-size: 1.7rem;
          color: #9e213f;
          span {
            text-decoration: underline;
          }
        }
      }
    }
    .second {
      position: relative;
      // display: none;
      .nb-bk {
        width: 96%;
        padding: 2%;
      }
      .ng-right {
        position: absolute;
        top: 80px;
        right: 30px;
        display: flex;
        flex-flow: column;
        img {
          position: relative;
          height: 5rem;
          &:nth-child(2) {
            top: 2rem;
          }
          &:nth-child(3) {
            top: 4rem;
          }
        }
      }
      .second-bottom {
        position: relative;
        .ng-zd {
          width: 40%;
          position: absolute;
          bottom: 10rem;
          left: 50%;
          transform: translate(-50%, 0);
        }
        .btn-zd {
          position: absolute;
          width: 13rem;
          height: 6rem;
          border-radius: 10px;
          // background: #fff;
          bottom: 10rem;
          left: 50%;
          transform: translate(-50%, 0);
        }
      }
    }
    .third {
      // display: none;
      .ng-zzdl {
        position: absolute;
        width: 70%;
        bottom: 130px;
        left: 55%;
        transform: translate(-50%, 0);
        .zzdl-img {
          width: 100%;
        }
        .zzdl-btn {
          position: absolute;
          width: 12rem;
          height: 5.5rem;
          // background: #fff;
          top: 28%;
          left: 55%;
          transform: translate(-50%, 0);
          border-radius: 10px;
        }
      }
      .ng-yuyue {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 160px;
        .yuyue-img {
          position: absolute;
          width: 17rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
</style>


