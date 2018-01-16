<template>
  <div class="invting-mask"  v-show="show" @click="close">
    <div class="i-img">
      <img src="http://wawa-1255600302.file.myqcloud.com/images/you.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      visibile: Boolean,
    },
    computed: {
      show () {
        return this.visibile
      }
    },
    methods: {
      close () {
        console.log('close')
        this.$emit('close', false)
      },
    },
  }
</script>

<style lang="less">
  .invting-mask {
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
  }
</style>

