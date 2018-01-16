<template>
  <div class="memberChainType-item">
    <div class="left">
      <p class="name">渠道类型：{{item.name}}</p>
      <p class="info">ID:{{item.id}}</p>
      <!-- <p>{{shareUrl}}</p> -->
    </div>
    <div class="right">
      <x-button type="primary" class="right-btn"  data-clipboard-action="copy" :data-clipboard-text="shareUrl">复制链接</x-button>
    </div>
  </div>
</template>

<script>
  import { XButton } from 'vux'
  import Clipboard from 'clipboard'
  import { mapState } from 'vuex'

  export default {
    components: {
      XButton
    },
    props: {
      item: Object
    },
    data () {
      return {
        clipboard: null,
        shareUrl: '',
      }
    },
    mounted () {
      this.shareUrl = this.urlSk.indexUrl(this.userInfo.id, this.item.id)
      // let clipboard = new Clipboard('.right-btn')
      var clipboard = new Clipboard('.right-btn')
      clipboard.on('success', e => {
          console.log(e);
          this.showInfo('复制成功')
      })
      clipboard.on('error', e => {
          this.showInfo('复制失败')
      })
    },
    computed: {
      ...mapState({
        userInfo: function (state) {
          let localMember = JSON.parse(window.localStorage.getItem('member'))
          if (!state.member.name && localMember) {
            this.$store.commit('updateMember', {member: localMember})
          }
          return state.member
        }
      }),
      time () {
        return this.util.formatDate(this.item.createTime)
      },
    },
    methods: {
      copy () {
        this.clipboard.on('success', e => {
          console.log(e);
          this.showInfo('复制成功')
        })
        this.clipboard.on('error', e => {
            this.showInfo('复制失败')
        })
      },
    },
    filters: {
      time (val) {
        return this.util.formatDate(val)
      }
    }
  };
</script>

<style lang="less" scopend>
@import "./../../assets/css/public.less";
.memberChainType-item {
  line-height: 1;
  display: flex;
  align-items: center;
  padding: 1rem;
  margin: 0 2rem 1.5rem 2rem;
  background-color: #fff;
  &:first-child {
    margin-top: 1.5rem;
  }
  .borderRadius;
  .left {
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
  .right {
    flex-shrink: 0;
    .right-btn {
      line-height: 2;
      font-size: 1.6rem;
    }
  }
}
</style>
