<template>
  <div>
    <!-- <canvas id="myCanvas" width="500" height="400" style="position:absolute;top:0;left:0;"></canvas> -->
    <div id="danmu"></div>
  </div>
</template>

<script>
  import $ from 'jquery'
  
  export default {
    // props: {
    //   textList: Array,
    // },
    data () {
      return {
        w: null,
        h: null,
        barrageList: [],
        canvas: null,
        ctx: null,
        textList: ['弹幕', '666', '233333333',
          'javascript', 'html', 'css', '弹幕'
        ],
      }
    },
    mounted () {
      // this.barrage()
      // this.start()
    },
    methods: {
      start (val) {
        // if (typeof (val) == 'string') {
        //   this.barrage(val)
        // } else if (val instanceof Array) {
        //   val.forEach((t) => {
        //     this.barrage(t)
        //   })
        // }
        // if (val.length > 0) {
        //   val.forEach((t) => {
        //     this.barrage(t)
        //   })
        // }
        if (this.textList.length > 0) {
          this.textList.forEach((t) => {
            // this.barrage(t);
          })
        }
      },
      barrage (text){
        var $p=$('<p>'+text+'</p>')
        var x = 0
        var h = this.getOffset(20, $('#danmu').height() - 200)
        var num = this.getOffset(2, 3)
        var color = this.getColor()
        var timer = setInterval(() => {
          //此条件判断语句用控制每次打开弹幕时弹幕都是从最右边开始出现
          if($('#danmu').css("display") !== "none"){
              x += num > 0.5 ? num : num + 0.5
          }else{
              x = 0
          }
          $p.css({
            "transition": "all .2s linear",
            "white-space":"nowrap",
            // "font-weight":"bold",
            "font-size":"24px",
            "position":"absolute",
            "top":h,
            "color": color,
            "left":$('#danmu').width() + 30 - x
          });
          $('#danmu').append($p);  
          if(parseInt($p.css("left")) < -parseInt($p.width())) {
              $p.remove()
              clearInterval(timer)	    
              timer=null
          }
        }, 16.7)
      },
      render (text) {
        requestAnimationFrame(this.render(text));
      },
    
      
      getColor() {
        return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
      },
      //获取偏移量
      getOffset(max, min) {
        // return +(Math.random() * 4).toFixed(1) + 1;
        return parseFloat((Math.random() * (max - min) + min).toFixed(1))
      },
    }
  }
</script>

<style lang="less">
  #danmu {
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
