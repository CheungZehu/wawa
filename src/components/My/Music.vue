<template>
  <div class="music" :style="{height: height + 'px'}">
    <x-header title="声音/提醒"></x-header>
    <div class="music-box">
      <group gutter="0" class="music-group">
        <x-switch title="背景音" v-model="model.playBackgroundSound" @on-change="change" style="color:#383838;font-size:14px;"></x-switch>
      </group>
      <group gutter="15px" class="music-group">
        <x-switch title="提示音" v-model="model.playHintSound" @on-change="change" style="color:#383838;font-size:14px;"></x-switch>
      </group>
      <group gutter="15px" class="music-group">
        <x-switch title="接收抓到娃娃模版消息提醒" v-model="model.receiveCatchDollRemind" @on-change="change" style="color:#383838;font-size:14px;"></x-switch>
      </group>
      <group gutter="15px" class="music-group">
        <x-switch title="接收金币增加模版消息提醒" v-model="model.receiveCoinAddRemind" @on-change="change" style="color:#383838;font-size:14px;"></x-switch>
      </group>
    </div>
  </div>
</template>

<script>
  import { Group, XSwitch, XHeader } from 'vux'
  import { mapState, mapActions } from 'vuex'
  import api from '../../api/api'

  export default {
    components: {
      Group, XSwitch, XHeader
    },
    data () {
      return {
        model: {
          playBackgroundSound: '',
					playHintSound: '',
					receiveCatchDollRemind: '',
					receiveCoinAddRemind: '',
        },
        height: 0,
      }
    },
    created () {
      this.getSoundConfig()
    },
    mounted () {
      this.height = window.innerHeight
      window.onresize = () => {
				this.height = window.innerHeight
      }
    },
    computed: {
			...mapState({
				soundConfig: function (state) {
					let soundConfig = JSON.parse(window.localStorage.getItem('soundConfig'))
					this.$store.commit('updateSoundConfig', {soundConfig: soundConfig})
					return state.soundConfig
				},
			})
		},
    methods: {
      ...mapActions([
				'updateSoundConfig'
			]),
      getSoundConfig () {
				api.soundConfig().then(res => {
					console.log(res.data)
					if (res.data.errCode === 0) {
						this.model = Object.assign({}, res.data.data)
						delete this.model.id
						this.updateSoundConfig(this.model)
					}
				})
			},
			changeSoundConfig (params) {
				api.changeSoundConfig(params).then(res => {
					// console.log(res.data)
					if (res.data.errCode === 0) {
						this.getSoundConfig()
					}
				})
			},
			change () {
				this.changeSoundConfig(this.model)
			},
    }
  }
</script>

<style lang="less">
  .music {
    background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
    background-size: 100%;
    .music-box {
      padding: 1rem;
    }
  }
  .weui-switch:checked {
    border-color: #fe2b8a !important;
    background-color: #fe2b8a !important;
  }
</style>

