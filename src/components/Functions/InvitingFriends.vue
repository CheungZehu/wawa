<template>
  <div class="inviting" v-show="show">
    <div class="inviting-box">
      <div class="img" id="simg">
        <div class="sguanbi" @click="close">
          <i class="iconfont icon-guanbi1"></i>
        </div>
        <img src="http://wawa-1255600302.file.myqcloud.com/images/yq.png" alt="">
      </div>
      <div class="mask" id="maskBox">
        <div class="inviting-text">
          <div class="title">
            <div class="left">
              <h3>分享领金币啦！</h3>
              <p>分享成功即可领取金币！</p>
            </div>
            <div class="right">
              <p @click="showInvting">分享</p>
              <!-- <p>可领取: 0/3</p> -->
            </div>
          </div>
          <div class="context">
            <div class="item" v-for="(item, i) in share" :key="i">
              <div class="item-l">
                <div class="item-img">
                  <img src="http://wawa-1255600302.file.myqcloud.com/images/gold.png" alt="">
                </div>
                <div class="info">
                  <p>邀请到{{item.number}}位好友</p>
                  <p>奖励：金币x{{item.gold}}</p>
                </div>
              </div>
              <div class="item-r">
                <p class="r-count">当前：
                  <span v-if="item.number > 0">{{invitationNum}}</span>
                  <span v-else>{{item.number}}</span>
                  /
                  <span>{{item.number}}</span>
                </p>
                <p class="receive" v-if="item.status === 0" @click="showInvting">邀请</p>
                <p class="receive have-receive" v-else-if="item.status === 1" @click="receive(item)">领取</p>
                <i class="iconfont icon-dui" v-else-if="item.status === 2"></i>
              </div>
            </div>
          </div>
          <div class="shouming">
            <p>*好友进入游戏后，抓取一次娃娃即算邀请成功;</p>
            <p>*每晚12点重置进度，别忘记领奖啊~</p>
          </div>
        </div>
      </div>
      <div class="inviting-mask">

      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/api'
  import { mapState, mapActions } from 'vuex'

  export default {
    props: {
      visibile: Boolean,
    },
    data () {
      return {
        share: [],
        // show: false,
        invitationNum: 0,
      }
    },
    computed: {
			...mapState({
				sum: function (state) {
					let localSum = window.localStorage.getItem('sum')
					if (state.sum === 0 && localSum) {
						this.$store.commit('updateSum', {sum: localSum})
					}
					return state.sum
				},
      }),
      show () {
        return this.visibile
      },
    },
    mounted () {
      this.shareInvitationReward()
    },
    methods: {
      ...mapActions([
        'updateMember', 'updateSum'
      ]),
      close () {
        // this.show = false
        this.$emit('close', 1)
      },
      showInvting () {
        this.$emit('show', true)
      },
      shareInvitationReward () {
        api.shareInvitationReward().then(res => {
          if (res.data.errCode === 0) {
            console.log('邀请好友配置')
            console.log(res.data)
            let shareInvitation = res.data.result
            let index = 0
            for (var key in shareInvitation) {
              if (/invitation/.test(key)) {
                let a = key.slice(10, 11)
                if (index === 0) {
                  index = a
                } else {
                  if (index < a) index = a
                }
              }
            }
            let arr = []
            for (var i = 0; i < index+1; i++) {
              for (let key in shareInvitation) {
                if (/invitation/.test(key)) {
                  let str = 'invitation' + i + 'Coin'
                  if (str === key) {
                    arr.push({number: i, gold: shareInvitation[key], status: 0})
                  }
                }
              }
            }
            this.share = arr
            this.shareInvitationRewardSelect()
          } else {
            this.showInfo(res.data.errMsg)
          }
        })
      },
      shareInvitationRewardSelect () {
        api.shareInvitationRewardSelect().then(res => {
          console.log('shareInvitationRewardSelect')
          console.log(res.data)
          // console.log(JSON.parse(res.data))
          if (res.data.errCode === 0) {
            console.log('shareInvitationRewardSelect')
            console.log(res.data)
            this.invitationNum = res.data.result.invitationNum
            let result = {}
            if (res.data.result.invitations) {
              result = res.data.result.invitations
              for (let key in result) {
                this.share.map(item => {
                  if (item.number === Number(key)) {
                    item.id = result[key].id
                    item.status = result[key].status
                  }
                })
              }
              console.log(this.share)
            }
            // this.show = this.visibile
          } else {
            // alert(11)
            this.showInfo(res.data.errMsg)
          }
        })
      },
      // 领取
      receive (item) {
        api.obtainInvitationCoin({id: item.id}).then(res => {
          console.log(res.data)
          if (res.data.errCode === 0) {
            this.updateSum(this.sum + item.gold)
            this.showInfo(`领取${item.gold}金币成功`)
            item.status = 2
          }
        })
      }
    }
  }
</script>


<style lang="less">
@import './../../assets/css/public.less';
  .inviting {
    background: rgba(0, 0, 0, .6);
    position: absolute;
    top: 0;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .inviting-box {
      width: 76%;
      position: relative;
      .img {
        .sguanbi {
          position: absolute;
          color: #fff;
          right: 10px;
          top: -18px;
          &:after {
            content: '';
            width: 2px;
            height: 30px;
            background: #fff;
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 10px;
            transform: translate(-50%, 0);
            z-index: -1;
          }
          .icon-guanbi1 {
            font-size: 28px;
          }
        }
        width: 125%;
        position: relative;
        left: 50%;
        transform: translate(-50%, 0);
        line-height: 0;
        margin-bottom: -3rem;
        z-index: 1;
        img {
          width: 100%;
        }
      }
      .mask {
        background: rgba(255, 255, 255, .5);
        border-radius: 10px;
        padding: 1rem;
        box-sizing: border-box;
        .inviting-text {
          text-align: center;
          background: #fff;
          // height: 100%;
          border-radius: 10px;
          position: relative;
          padding: 3.5rem 1.5rem 0 1.5rem;
          .title {
            background: #f6a0b5;
            border-radius: 5px;
            color: #fff;
            margin-bottom: 1rem;
            padding: .5rem 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left {
              text-align: left;
              h3 {
                font-size: 1.6rem;
              }
              p {
                font-size: 1.3rem;
                color: #fff;
              }
            }
            .right {
              p {
                &:first-child {
                  font-size: 1.4rem;
                  .bgLinearGradient(@top: #fe2984; @bottom: #f32066;);
                  padding: .3rem .8rem;
                  .borderRadius(30px);
                  line-height: 1;
                  color: #fff; 
                  border: 2px solid #ff3e94;
                  .boxShadowOutset(@x: 0; @y: 3px; @blur: 0px; @spread: 0px; @color: #75001d);
                }
                &:last-child {
                  font-size: 1.2rem;
                  color: #fff5c4;
                  margin-top: 3px;
                }
              }
            }
          }
          .context {
            height: 25rem;
            overflow-y: scroll;
            top: 11rem;
            bottom: 2rem;
            left: 2rem;
            right: 2rem;
            padding-right: 1px;
            .item {
              display: flex;
              align-items: center;
              padding: .7rem;
              background: #ffeff3;
              border-radius: 5px;
              border: 1px solid #eae2c7;
              box-sizing: border-box;
              justify-content: space-between;
              height: 5rem;
              &:not(:first-child) {
                margin-top: 5px;
              }
              .item-l {
                display: inline-flex;
                .item-img {
                  width: 3rem;
                  height: 3rem;
                  line-height: 1;
                  overflow: hidden;
                  margin-right: 10px;
                  flex-shrink: 0;
                  img {
                    width: 100%;
                  }
                }
                .info {
                  text-align: left;
                  p {
                    line-height: 1;
                    &:first-child {
                      font-size: 1.4rem;
                      font-weight: bold;
                      color: #333333;
                      margin-bottom: 5px;
                    }
                    &:last-child {
                      font-size: 1.2rem;
                      color: #b0b0b0;
                    }
                  }
                }
              }
              .item-r {
                .r-count {
                  color: #b79e44;
                  font-size: 1.2rem;
                }
                .receive {
                  .bgLinearGradient(@top: #32cddf; @bottom: #0d90a6;);
                  padding: .3rem .3rem;
                  .borderRadius(30px);
                  font-size: 1.3rem;
                  line-height: 1;
                  color: #fff;
                  // width: 60px;
                  text-align: center;
                  border: 1px solid #2cc4d7;
                  box-sizing: border-box;
                  .boxShadowOutset(@x: 0; @y: 2px; @blur: 0px; @spread: 0px; @color: #006766);
                }
                .have-receive {
                  .bgLinearGradient(@top: #9be000; @bottom: #49a701;);
                  border: 1px solid #9eee00;
                  .boxShadowOutset(@x: 0; @y: 2px; @blur: 0px; @spread: 0px; @color: #417a00);
                }
                .icon-dui {
                  color: #60b700;
                  font-size: 2.6rem;
                  margin-top: -5px;
                  line-height: .8;
                }
              }
            }
          }
          .shouming {
            color: #999999;
            font-size: 1.2rem;
            padding: 1rem 0 1rem 0;
            text-align: left;
          }
        }
      }
    }
  }
</style>
