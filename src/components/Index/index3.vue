<template>
  <div id="box_body">
    <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group>
    <van-tabs sticky>
      <van-tab v-for="index in 4" :key="index" :title="'选项 ' + index">
        <p v-for="i in 50" :key="i">内容 {{ index }}</p>
        
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { TabItem, Sticky } from 'vux'

import { Tab, Tabs, Cell, CellGroup } from 'vant';
import Vue from 'vue'
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Cell);
Vue.use(CellGroup);
export default {
  components: {

    TabItem,
    Sticky
  },
  data () {
    return {
      showSpace: false
    }
  },
  methods: {
    spaceChange () {
      this.showSpace = !this.showSpace
      this.$nextTick(() => {
        this.$refs.sticky.bindSticky()
      })
    }
  }
}
</script>
<style scoped>
  .space-btn {
    padding: 5px 0;
    margin: 10px;
    text-align: center;
    border: 1px red solid;
  }
  .space {
    padding: 30px 0;
    margin: 10px;
    text-align: center;
    border: 1px green solid;
  }
</style>