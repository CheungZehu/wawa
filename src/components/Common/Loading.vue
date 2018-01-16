<template>
	<div style="overflow: hidden;">
		<!-- <img src="../../../static/images/qicheng.png" alt=""> -->
		
		<load-more class="noMore" :show-loading='false' tip="已无更多数据" background-color="#f2f2f2" v-if="show"></load-more>
		<load-more class="Loading" tip="正在加载" background-color="#f2f2f2" v-else></load-more>
	</div>
</template>

<script>
	import { LoadMore } from 'vux'

	export default {
		props: {
			show: Boolean,
		},
		components: {
			LoadMore
		}
	}
</script>

<style>
  .Loading {
    margin: 1em auto 1em auto !important;
  }
  .noMore {
    margin: 1.5em auto .1em auto !important;
  }
</style>