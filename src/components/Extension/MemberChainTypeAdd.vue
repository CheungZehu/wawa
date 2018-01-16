<template>
  <div class="memberChainType-add" :style="{height: `${height}px`}">
    <div class="box">
      <group gutter="0">
        <x-input title="类型名称" v-model="name" placeholder="请填写类型名称"></x-input>
      </group>
      <div class="btn-add">
        <x-button type="primary" @click.native="add">添加</x-button>
      </div>
      
    </div>
  </div>
</template>

<script>
  import { Group, XInput, XButton } from 'vux'
  import api from '../../api/api'
  export default {
    components: {
      Group, XInput, XButton
    },
    data () {
      return {
        height: 0,
        name: '',
      }
    },
    mounted () {
      this.height = window.innerHeight
			window.onresize = () => {
				this.height = window.innerHeight
			}
    },
    methods: {
      add () {
        if (this.name) {
          this.loading(true, '正在添加')
          this.memberChainTypeInsert(this.name)
        } else {
          this.showInfo('请填写类型名称')
        }
      },
      memberChainTypeInsert (name) {
        api.memberChainTypeInsert({name: name}).then(res => {
          this.loading(false)
          if (res.data.errCode === 0) {
            console.log('memberChainTypeInsert')
            console.log(res.data)
            this.showInfo('添加成功')
            setTimeout(() => {
              this.$router.replace('/Extension')
            }, 300)
          } else {
            alert(JSON.stringify(res.data))
            this.showInfo('添加失败，请重试')
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .memberChainType-add {
    background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
    background-size: 100%;
    .box {
      padding: 5rem 2rem 0 2rem;
      .btn-add {
        margin: 6rem 5rem 0 5rem;
      }
    }
  }
</style>

