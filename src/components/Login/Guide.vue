<template>
  <div class="guide" :style="{height: height + 'px'}">
    <div class="content">
      <div class="tg-title">
        <img  src="http://wawa-1255600302.file.myqcloud.com/images/tg-title.png" alt="">
      </div>
      <div class="tg-text">
        <img src="http://wawa-1255600302.file.myqcloud.com/images/tg-text.png" alt="">
      </div>
      <div class="tg-btn">
        <div class="left">
          <img src="http://wawa-1255600302.file.myqcloud.com/images/tg-btn.png" alt="">
          <div class="get-btn" @click="getRouter"></div>
        </div>
        <div class="right">
          <img src="http://wawa-1255600302.file.myqcloud.com/images/tg-hz.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
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
      getRouter () {
				this.$router.push('/Extension/Login')
			},
    }
  }
</script>

<style lang="less">
  @import './../../assets/css/public.less';

  .guide {
    background: url(http://wawa-1255600302.file.myqcloud.com/images/bg2.png);
  	background-size: 100%;
    overflow: scroll;
    .content {
			padding: 0 3rem;
			img {
				width: 100%;
			}
			.tg-title {
				padding: 6rem;
			}
			.tg-btn {
				display: flex;
				padding: 2rem 0;
				.left {
					position: relative;
					.get-btn {
						width: 100%;
						height: 22%;
						position: absolute;
						bottom: 0;
					}
				}
			}
    }
  }
</style>

