<template>
  <div class="records" v-show="show">
    <div class="records-box">
      <div class="img" id="simg">
        <div class="sguanbi" @click="close">
          <i class="iconfont icon-guanbi1"></i>
        </div>
        <img src="http://wawa-1255600302.file.myqcloud.com/images/record1.png" alt="">
      </div>
      <div class="mask" id="maskBox">
        <div class="records-text">
          <div class="context" v-if="recordList.length > 0">
            <div class="item" v-for="(item, i) in recordList" :key="i">
              <div class="item-img">
                <img :src="item.headImage" alt="">
              </div>
              <div class="info">
                <p>{{item.nickname}}</p>
                <p>{{item.createTime}}</p>
              </div>
            </div>
          </div>
          <div class="no-records" v-else>
            <img src="http://wawa-1255600302.file.myqcloud.com/images/zhua.png">
            <p>暂无抓中记录</p>
          </div>
        </div>
      </div>
      <div class="records-mask">

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
        isRecord: false,
        recordList: [],
      }
    },
    computed: {
      show () {
        return this.visibile
      }
    },
    methods: {
      getRecord (val) {
        console.log(11)
        this.$emit('close', val)
      },
      close () {
        console.log('close')
        this.$emit('close', false)
      },
      // 抓取记录
			dollDetailRecord () {
				api.dollDetailRecord(this.$route.params.id).then(res => {
          console.log(res.data)
          if (res.data.errCode === 0) {
            this.recordList = []
            this.recordList = res.data.list
          } else {
            this.showInfo(res.data.errMsg)
          }
				})
			},
    }
  }
</script>


<style lang="less">
@import './../../assets/css/public.less';
  .records {
    background: rgba(0, 0, 0, .6);
    position: absolute;
    top: 0;
    z-index: 16;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .records-box {
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
        .records-text {
          text-align: center;
          background: #fff;
          border-radius: 10px;
          position: relative;
          padding: 3.5rem 1.5rem 0 1.5rem;
          .context {
            height: 40rem;
            overflow-y: scroll;
            top: 11rem;
            bottom: 2rem;
            left: 2rem;
            right: 2rem;
            padding-right: 1px;
            .item {
              width: 100%;
              display: flex;
              align-items: center;
              padding: 1rem 0;
              border-bottom: 1px solid #fbe2e8;
              .item-img {
                width: 3.5rem;
                height: 3.5rem;
                line-height: 1;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 2rem;
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
                    font-size: 1.3rem;
                    font-weight: bold;
                    color: #333333;
                    margin-bottom: 3px;
                  }
                  &:last-child {
                    font-size: 1.1rem;
                    color: #b0b0b0;
                  }
                }
              }
            }
          }
          .no-records {
            height: 40rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: column;
            img {
              width: 10rem;
            }
            p {
              font-size: 1.6rem;
              margin-top: 1rem;
              margin-bottom: 30%;
            }
          }
        }
      }
    }
  }
</style>

