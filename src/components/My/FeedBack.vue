<template>
  <div class="doll-detail" :style="{height: height + 'px'}">
    <x-header title="问题反馈"></x-header>
    <div class="detail">
      <div>
        <group gutter="0" class="nb">
          <popup-radio class="popup-radio" style="background: #fff !important; padding: 10px 0; font-size: 1.6rem;" title="联系方式" :options="options" v-model="model.contactType" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="doll-top">
        <input class="input" v-model="model.contactInfo" placeholder="联系号码">
      </div>
      <div class="doll-center">
        <group gutter="0" class="nb">
          <popup-radio style="background: #fff !important; padding: 10px 0; font-size: 1.6rem;" title="问题类型" :options="options2" v-model="model.type" placeholder="请选择"></popup-radio>
        </group>
      </div>
      <div class="doll-bottom">
        <group gutter="0" class="nb">
          <x-textarea :height="150" style="background: #fff !important; padding: 10px 0; font-size: 1.6rem;" placeholder="添加描述（选填）" title="" v-model="model.content"></x-textarea>
        </group>
      </div>
    </div>
    <box gap="20px 40px">
      <x-button @click.native="submit" class="aaa" :class="{submit: active}">提交</x-button>
    </box>
    <!-- <box gap="20px 40px">
      <x-button type="warn" @click.native="feedBacks">查看我发布的反馈</x-button>
    </box> -->
    <p class="feed-list" @click="feedBacks">查看我发布的反馈</p>
  </div>
</template>

<script>
  import { Group,PopupRadio, XTextarea, XInput, XButton, Box, XHeader } from 'vux'
  import api from '../../api/api'

  export default {
    components: {
      Group, PopupRadio, XTextarea, XInput, XButton, Box, XHeader
    },
    data () {
      return {
        options: [{
          key: 1,
          value: '手机号'
        }, {
          key: 2,
          value: '微信'
        }, {
          key: 3,
          value: 'QQ'
        }, {
          key: 4,
          value: '邮箱'
        }],
        options2: [{ key: 1, value: '爪子卡到绳子' }, { key: 2, value: '爪子无法移动' }, { key: 3, value: '抓到娃娃到洞口后，不松爪子' }, { key: 4, value: '娃娃掉落后，提示未抓中' }, { key: 5, value: '快递和娃娃品质问题' }, { key: 6, value: '其他' }],
        model: {
          content: '',
          contactInfo: '',
          contactType: null,
          type: '',
        },
        active: false,
        height: 0,
      }
    },
    mounted() {
      this.height = window.innerHeight
      window.onresize = () => {
        this.height = window.innerHeight
      }
    },
    methods: {
      submit () {
        console.log(1111)
        if (this.active) {
          console.log(this.model)
          api.feedBack(this.model).then(res => {
            console.log(res.data)
            if (res.data.errCode === 0) {
              this.showInfo('发布反馈成功')
              for (let key in this.model) {
                this.model[key] = ''
              }
            } else {
              this.showInfo('发布反馈失败，请稍后重试')
            }
          }).catch(err => {
            this.showInfo('发布反馈失败，请稍后重试')
          })
        }
      },
      feedBacks () {
        this.$router.push('/myInfo/feedBacks')
      }
    },
    watch: {
      model: {
        handler (val) {
          let number = 0
          for (let key in val) {
            if (!val[key] && key !== 'content') number++
          }
          if (number === 0) {
            this.active = true
          } else {
            this.active = false
          }
        },
        deep: true
      }
    }
  }
</script>

<style lang="less">
@import './../../assets/css/public.less';
  .doll-detail {
    // padding: 10px;
    background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
    .detail {
      margin: 10px;
      padding: 0 18px;
      background-color: #fff;
      .borderRadius;
      font-size: 1.4rem;
      .doll-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 11px 0;
        // border-top: 1px solid #fbe2e8;
        .input {
          outline: none;
          border: 0;
          background: #fff;
          font-size: 1.6rem;
          width: 100%;
        }
      }
      .doll-center {
        position: relative;
        // border-top: 1px solid #fbe2e8;
        // transform: scaleY(0.5);
        // transform-origin: 0 0;
        &:before {
          content: " ";
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          height: 1px;
          border-top: 1px solid #D9D9D9;
          color: #D9D9D9;
          border-top: 1px solid #fbe2e8;
          transform-origin: 0 0;
          transform: scaleY(0.5);
          z-index: 1;
        }
      }
    }
    .btn {
      margin-top: 20px;
      .button {
        width: 100%;
        background: #cecece;
        border-radius: 4px;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.21);
        border-bottom: 8px solid #b1b1b1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 18px;
        padding: 15px 0;
        &:active {
          background: #bdbdbd;
        }
        .iconfont {
          font-size: 24px;
        }
      }
      .submit {
        background: #09bb07;
        border-bottom: 8px solid #008c00;
        &:active {
          background: #0aa909;
        }
      }
    } 
    .aaa {
      background: #969696;
      color: #fff;
    }
    .submit {
      background: #09bb07;
      &:active {
        background: #0aa909;
      }
    }
    .feed-list {
      font-size: 2rem;
      text-decoration: underline;
      text-align: center;
      color: #fff;
    }
  }
  textarea {
    background-color: transparent;  
  }
  .vux-popup-dialog {
    font-size: 1.4rem;
  }
</style>
