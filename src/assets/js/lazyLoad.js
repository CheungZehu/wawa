// Vue 图片懒加载，导出模块
export default (Vue, options = {}) => {
  // 数组item remove方法
  if (!Array.prototype.remove) {
    Array.prototype.remove = item => {
      if (!this.length) return
      var index = this.indexOf(item)
      if (index > -1) {
        this.splice(index, 1)
        return this
      }
    }
  }
  // 初始化的选项，default是未加载图片时显示的默认图片
  var init = {
    default: 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png'
  }
  // 需要进行监听的图片列表，还没有加载过得
  var listenList = []
  // 已经加载过的图片缓存列表
  var imageCatcheList = []
  // 是否已经加载过了
  const isAlredyLoad = imageSrc => {
    if (imageCatcheList.indexOf(imageSrc) > -1) {
      return true
    } else {
      return false
    }
  }
  // 检测图片是否可以加载，如果可以则进行加载
  const isCanShow = item => {
    var ele = item.ele
    var src = item.src
    // 图片距离页面顶部的距离
    var top = ele.getBoundingClientRect().top
    // 页面可视区域的高度
    var windowHeight = window.innerHeight
    // top + 10 已经进入可视区域10像素
    if (top + 10 < window.innerHeight) {
      var image = new Image()
      image.src = src
      image.onload = () => {
        ele.src = src
        imageCatcheList.push(src)
        listenList.remove(item)
      }
      return true
    } else {
      return false
    }
  }
  // 添加监听事件scroll
  const onListenScroll = () => {
    window.addEventListener('scroll', () => {
      var length = listenList.length
      for (let i = 0; i < length; i++) {
        isCanShow(listenList[i])
      }
    })
  }
  // Vue指令的最终方法
  // addListener为Vue指令的具体实现功能函数
  // ele是dom元素，binding是绑定的具体值
  const addListener = (ele, binding) => {
    // 绑定的图片地址
    var imageSrc = binding.value
    // 如果已经加载过，则无需重新加载，直接将src赋值
    if (isAlredyLoad(imageSrc)) {
      ele.src = imageSrc
      return false
    }
    var item = {
      ele: ele,
      src: imageSrc
    }
    // 图片显示默认的图片
    ele.src = init.default
    // 在看看是否可以显示此图片
    if (isCanShow(item)) {
      return
    }
    // 否则将图片地址和元素均放入监听的listenList里
    listenList.push(item)

    // 然后开始监听页面scroll事件
    onListenScroll()
  }

  // Vue自定义指令，lazyload为指令的名称
  Vue.directive('lazyload', {
    inserted: addListener,
    updated: addListener
  })
}