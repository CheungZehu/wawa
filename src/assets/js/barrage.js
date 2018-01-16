// (function () {

  class Barrage {
    constructor(canvas) {
      this.canvas = document.getElementById(canvas);
      let rect = this.canvas.getBoundingClientRect();
      this.w = rect.right - rect.left;
      this.h = rect.bottom - rect.top;
      this.ctx = this.canvas.getContext('2d');
      this.ctx.font = '20px Microsoft YaHei';
      this.barrageList = [];
      this.interval = "";
    }

    //添加弹幕列表
    shoot(value) {
      let top = this.getTop();
      let color = this.getColor();
      let offset = this.getOffset();
      let width = Math.ceil(this.ctx.measureText(value).width);

      let barrage = {
        value: value,
        top: top,
        left: this.w,
        color: color,
        offset: offset,
        width: width
      }
      this.barrageList.push(barrage);
    }

    //开始绘制
    // draw() {
    //   if (this.barrageList.length) {
    //     this.ctx.save();
    //     this.ctx.clearRect(0, 0, this.w, this.h);
        
    //     console.log(this.barrageList)
    //     // this.ctx.restore();
    //     for (let i = 0; i < this.barrageList.length; i++) {
    //       let b = this.barrageList[i];
    //       if (b.left + b.width <= 0) {
    //         this.barrageList.splice(i, 1);
    //         // this.barrageList[i] = null
    //         i--;
    //         continue;
    //       } else {
    //         b.left -= b.offset;
    //         // this.drawText(b);
    //         this.ctx.fillStyle = b.color;
    //         this.ctx.fillText(b.value, b.left, b.top);
    //         this.ctx.restore();
    //       }
    //     }
    //   }
    //   requestAnimationFrame(this.draw.bind(this));
    // }

    draw () {    //绘制方法
      // if (this.interval != "") return;
      var _this = this;
      let count = 0
      // this.interval = setInterval(function () {//每隔20毫秒重新绘制一次，间隔最好小于40，要不然效果就跟播放图片差不多
        //1，清除屏幕
        // _this.ctx.clearRect(0, 0, _this.width, _this.height);
        _this.ctx.clearRect(0, 0, _this.w, _this.h);
        _this.ctx.save();
        console.log(_this.barrageList)
        for (let i = 0; i < _this.barrageList.length; i++) {
          let b = _this.barrageList[i];
          if (_this.barrageList.length - 1 === i) {
            clearInterval(this.interval)
          } else {
            if (_this.barrageList[i].left < -200) {
              // _this.barrageList.splice(i, 1);
              _this.barrageList[i] = null;
              // i--;
              // continue;
            } else {
              b.left -= b.offset;
              // this.drawText(b);
              _this.ctx.fillStyle = b.color;
              _this.ctx.fillText(b.value, b.left, b.top);
              _this.ctx.restore();
            }
          }
            
        }
      // }, 20);
    };

    //绘制文字
    drawText(barrage) {
      this.ctx.fillStyle = barrage.color;
      this.ctx.fillText(barrage.value, barrage.left, barrage.top);
      this.ctx.restore();
    }

    //获取随机颜色
    getColor() {
      return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    }

    //获取随机top
    getTop() {
      //canvas绘制文字x,y坐标是按文字左下角计算，预留30px
      return Math.floor(Math.random() * (this.h - 30)) + 30;
    }

    //获取偏移量
    getOffset() {
      return +(Math.random() * 4).toFixed(1) + 1;
    }

  }

  // let barrage = new Barrage('canvas')
  // barrage.draw();

  // const textList = ['弹幕', '666', '233333333',
  //   'javascript', 'html', 'css', '前端框架', 'Vue', 'React',
  //   'Angular', '测试弹幕效果', '弹幕', '666', '233333333',
  //   'javascript', 'html', 'css', '前端框架', 'Vue', 'React',
  //   'Angular', '测试弹幕效果', '弹幕', '666', '233333333',
  //   'javascript', 'html', 'css', '前端框架', 'Vue', 'React',
  //   'Angular', '测试弹幕效果'
  // ];

  // textList.forEach((t) => {
  //   barrage.shoot(t);
  // })

// })();


export default Barrage