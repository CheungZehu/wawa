/* 工具类函数 */
let Utils = {
  //加密
  sha1: function (str) {
    return Crypto.SHA1(str);
  },

  aes_encrypt: function (key, data) {
    return Crypto.AES.encrypt(data, key);
  },

  aes_decrypt: function (key, raw) {
    return Crypto.AES.decrypt(raw, key);
  },

  //截取url 参数
  getUrlParam(name) {
    var result = "";
    var index = window.location.href.indexOf('?');
    var searchArr = window.location.href.slice(index + 1).split("&");
    searchArr.map(function (item) {
      var arr = item.split("=");
      if (arr[0] == name) {
        result = decodeURIComponent(arr[1]);
      }
    });
    return result
  },
  //当前时间
  nowDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  // 时间格式化 yyyy-mm-dd hh:mm:ss:ms
  formatDateTime (date, ms) {
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    var d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    var h = date.getHours()
    var minute = date.getMinutes()
    minute = minute < 10 ? ('0' + minute) : minute
    var seconds = date.getSeconds()
    if (ms) {
      var milliseconds = date.getMilliseconds()
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + seconds + ':' + milliseconds
    } else {
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + seconds
    }
  },

  timeAddZero (val) {
    if (!val && val !== 0) return
    return val < 10 ? (`0${val}`) : val
  },

  // 时间戳转换成时间格式 yyyy-mm-dd hh:mm:ss
  formatDate(timestamp) {
    if (!timestamp) return
    var d = new Date(timestamp)
    var year = d.getFullYear()
    var month = d.getMonth() + 1
    var date = d.getDate()
    var hour = d.getHours()
    var minute = d.getMinutes()
    var second = d.getSeconds()
    month = this.timeAddZero(month)
    date = this.timeAddZero(date)
    hour = this.timeAddZero(hour)
    minute = this.timeAddZero(minute)
    second = this.timeAddZero(second)
    
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
  },

  // 一段时间内 用于筛选  返回一个数组
  getXDay(v) {
    let myDate = new Date(); //获取今天日期
    myDate.setDate(myDate.getDate() - v);
    let dateArray = [];
    let dateTemp;
    let flag = 1;
    for (let i = 0; i < v; i++) {
      let month = (myDate.getMonth() + 1);
      let day = myDate.getDate();
      if (month <= 9) {
        month = '0' + month;
      }
      if (day <= 9) {
        day = '0' + day;
      }
      dateTemp = myDate.getFullYear() + "-" + month + "-" + day;
      dateArray.push(dateTemp);
      myDate.setDate(myDate.getDate() + flag);
    }
    return { startTime: dateArray[0], endTime: dateArray.pop() }
  },
  // 生成随机字符串
  getNewId() {
    let id = '';
    for (var i = 0; i < 8; i++) {
      id += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return id;
  },

  // 防抖
  debounce(func, wait, immediate) {
    var timeout, result

    var debounced = () => {
      var context = this
      var args = arguments

      if (timeout) clearTimeout(timeout)
      if (immediate) {
        // 如果已经执行过，不再执行
        var callNow = !timeout
        timeout = setTimeout(() => {
          timeout = null
        }, wait)
        if (callNow) result = func.apply(context, args)
      } else {
        timeout = setTimeout(() => {
          result = func.apply(context, args)
        }, wait)
      }
      return result
    }

    debounced.cancel = () => {
      clearTimeout(timeout)
      timeout = null
    }

    return debounced
  },

  // 节流
  throttle (func, wait, mustRun) {
    var timeout, startTime = new Date()

    return function () {
      var context = this,
          args = arguments,
          curTime = new Date()
      clearTimeout(timeout)
      if (curTime - startTime >= mustRun) {
        func.apply(context, args)
        startTime = curTime
      } else {
        timeout = setTimeout(func, wait)
      }
    }
  },

  // 判断是PC端还是移动端
  IsPC () {
    var userAgentInfo = navigator.userAgent
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    var flag = true
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
  },
  // 判断用户是否在微信中打开
  isWeiXin () {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.indexOf('micromessenger') != -1) {
      return true
    } else {
      return false
    }
  },

  // 判断安卓，ios
  isiOS () {
    var userAgent = navigator.userAgent;
    var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; //android终端
    var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // alert('是否是Android：' + isAndroid);
    // alert('是否是iOS：' + isiOS);
    if (isiOS) {
      return true
    } else {
      return false
    }
  },
  // 区间随机数
  random (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  },
};

/*
 * ---------------------------------Crypto Tool----------------------------------
 */
(function () { var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; var d = window.Crypto = {}; var a = d.util = { rotl: function (h, g) { return (h << g) | (h >>> (32 - g)) }, rotr: function (h, g) { return (h << (32 - g)) | (h >>> g) }, endian: function (h) { if (h.constructor == Number) { return a.rotl(h, 8) & 16711935 | a.rotl(h, 24) & 4278255360 } for (var g = 0; g < h.length; g++) { h[g] = a.endian(h[g]) } return h }, randomBytes: function (h) { for (var g = []; h > 0; h--) { g.push(Math.floor(Math.random() * 256)) } return g }, bytesToWords: function (h) { for (var k = [], j = 0, g = 0; j < h.length; j++ , g += 8) { k[g >>> 5] |= h[j] << (24 - g % 32) } return k }, wordsToBytes: function (i) { for (var h = [], g = 0; g < i.length * 32; g += 8) { h.push((i[g >>> 5] >>> (24 - g % 32)) & 255) } return h }, bytesToHex: function (g) { for (var j = [], h = 0; h < g.length; h++) { j.push((g[h] >>> 4).toString(16)); j.push((g[h] & 15).toString(16)) } return j.join("") }, hexToBytes: function (h) { for (var g = [], i = 0; i < h.length; i += 2) { g.push(parseInt(h.substr(i, 2), 16)) } return g }, bytesToBase64: function (h) { if (typeof btoa == "function") { return btoa(e.bytesToString(h)) } for (var g = [], l = 0; l < h.length; l += 3) { var m = (h[l] << 16) | (h[l + 1] << 8) | h[l + 2]; for (var k = 0; k < 4; k++) { if (l * 8 + k * 6 <= h.length * 8) { g.push(c.charAt((m >>> 6 * (3 - k)) & 63)) } else { g.push("=") } } } return g.join("") }, base64ToBytes: function (h) { if (typeof atob == "function") { return e.stringToBytes(atob(h)) } h = h.replace(/[^A-Z0-9+\/]/ig, ""); for (var g = [], j = 0, k = 0; j < h.length; k = ++j % 4) { if (k == 0) { continue } g.push(((c.indexOf(h.charAt(j - 1)) & (Math.pow(2, -2 * k + 8) - 1)) << (k * 2)) | (c.indexOf(h.charAt(j)) >>> (6 - k * 2))) } return g } }; d.mode = {}; var b = d.charenc = {}; var f = b.UTF8 = { stringToBytes: function (g) { return e.stringToBytes(unescape(encodeURIComponent(g))) }, bytesToString: function (g) { return decodeURIComponent(escape(e.bytesToString(g))) } }; var e = b.Binary = { stringToBytes: function (j) { for (var g = [], h = 0; h < j.length; h++) { g.push(j.charCodeAt(h)) } return g }, bytesToString: function (g) { for (var j = [], h = 0; h < g.length; h++) { j.push(String.fromCharCode(g[h])) } return j.join("") } } })();

/*
 * ---------------------------------SHA-1----------------------------------
 */
(function () { var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; var d = window.Crypto = {}; var a = d.util = { rotl: function (h, g) { return (h << g) | (h >>> (32 - g)) }, rotr: function (h, g) { return (h << (32 - g)) | (h >>> g) }, endian: function (h) { if (h.constructor == Number) { return a.rotl(h, 8) & 16711935 | a.rotl(h, 24) & 4278255360 } for (var g = 0; g < h.length; g++) { h[g] = a.endian(h[g]) } return h }, randomBytes: function (h) { for (var g = []; h > 0; h--) { g.push(Math.floor(Math.random() * 256)) } return g }, bytesToWords: function (h) { for (var k = [], j = 0, g = 0; j < h.length; j++ , g += 8) { k[g >>> 5] |= h[j] << (24 - g % 32) } return k }, wordsToBytes: function (i) { for (var h = [], g = 0; g < i.length * 32; g += 8) { h.push((i[g >>> 5] >>> (24 - g % 32)) & 255) } return h }, bytesToHex: function (g) { for (var j = [], h = 0; h < g.length; h++) { j.push((g[h] >>> 4).toString(16)); j.push((g[h] & 15).toString(16)) } return j.join("") }, hexToBytes: function (h) { for (var g = [], i = 0; i < h.length; i += 2) { g.push(parseInt(h.substr(i, 2), 16)) } return g }, bytesToBase64: function (h) { if (typeof btoa == "function") { return btoa(e.bytesToString(h)) } for (var g = [], l = 0; l < h.length; l += 3) { var m = (h[l] << 16) | (h[l + 1] << 8) | h[l + 2]; for (var k = 0; k < 4; k++) { if (l * 8 + k * 6 <= h.length * 8) { g.push(c.charAt((m >>> 6 * (3 - k)) & 63)) } else { g.push("=") } } } return g.join("") }, base64ToBytes: function (h) { if (typeof atob == "function") { return e.stringToBytes(atob(h)) } h = h.replace(/[^A-Z0-9+\/]/ig, ""); for (var g = [], j = 0, k = 0; j < h.length; k = ++j % 4) { if (k == 0) { continue } g.push(((c.indexOf(h.charAt(j - 1)) & (Math.pow(2, -2 * k + 8) - 1)) << (k * 2)) | (c.indexOf(h.charAt(j)) >>> (6 - k * 2))) } return g } }; d.mode = {}; var b = d.charenc = {}; var f = b.UTF8 = { stringToBytes: function (g) { return e.stringToBytes(unescape(encodeURIComponent(g))) }, bytesToString: function (g) { return decodeURIComponent(escape(e.bytesToString(g))) } }; var e = b.Binary = { stringToBytes: function (j) { for (var g = [], h = 0; h < j.length; h++) { g.push(j.charCodeAt(h)) } return g }, bytesToString: function (g) { for (var j = [], h = 0; h < g.length; h++) { j.push(String.fromCharCode(g[h])) } return j.join("") } } })(); (function () { var f = Crypto, a = f.util, b = f.charenc, e = b.UTF8, d = b.Binary; var c = f.SHA1 = function (i, g) { var h = a.wordsToBytes(c._sha1(i)); return g && g.asBytes ? h : g && g.asString ? d.bytesToString(h) : a.bytesToHex(h) }; c._sha1 = function (o) { if (o.constructor == String) { o = e.stringToBytes(o) } var v = a.bytesToWords(o), x = o.length * 8, p = [], r = 1732584193, q = -271733879, k = -1732584194, h = 271733878, g = -1009589776; v[x >> 5] |= 128 << (24 - x % 32); v[((x + 64 >>> 9) << 4) + 15] = x; for (var z = 0; z < v.length; z += 16) { var E = r, D = q, C = k, B = h, A = g; for (var y = 0; y < 80; y++) { if (y < 16) { p[y] = v[z + y] } else { var u = p[y - 3] ^ p[y - 8] ^ p[y - 14] ^ p[y - 16]; p[y] = (u << 1) | (u >>> 31) } var s = ((r << 5) | (r >>> 27)) + g + (p[y] >>> 0) + (y < 20 ? (q & k | ~q & h) + 1518500249 : y < 40 ? (q ^ k ^ h) + 1859775393 : y < 60 ? (q & k | q & h | k & h) - 1894007588 : (q ^ k ^ h) - 899497514); g = h; h = k; k = (q << 30) | (q >>> 2); q = r; r = s } r += E; q += D; k += C; h += B; g += A } return [r, q, k, h, g] }; c._blocksize = 16 })();

/*
 * ---------------------------------AES----------------------------------
 */
(function () { var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; var d = window.Crypto = {}; var a = d.util = { rotl: function (h, g) { return (h << g) | (h >>> (32 - g)) }, rotr: function (h, g) { return (h << (32 - g)) | (h >>> g) }, endian: function (h) { if (h.constructor == Number) { return a.rotl(h, 8) & 16711935 | a.rotl(h, 24) & 4278255360 } for (var g = 0; g < h.length; g++) { h[g] = a.endian(h[g]) } return h }, randomBytes: function (h) { for (var g = []; h > 0; h--) { g.push(Math.floor(Math.random() * 256)) } return g }, bytesToWords: function (h) { for (var k = [], j = 0, g = 0; j < h.length; j++ , g += 8) { k[g >>> 5] |= h[j] << (24 - g % 32) } return k }, wordsToBytes: function (i) { for (var h = [], g = 0; g < i.length * 32; g += 8) { h.push((i[g >>> 5] >>> (24 - g % 32)) & 255) } return h }, bytesToHex: function (g) { for (var j = [], h = 0; h < g.length; h++) { j.push((g[h] >>> 4).toString(16)); j.push((g[h] & 15).toString(16)) } return j.join("") }, hexToBytes: function (h) { for (var g = [], i = 0; i < h.length; i += 2) { g.push(parseInt(h.substr(i, 2), 16)) } return g }, bytesToBase64: function (h) { if (typeof btoa == "function") { return btoa(e.bytesToString(h)) } for (var g = [], l = 0; l < h.length; l += 3) { var m = (h[l] << 16) | (h[l + 1] << 8) | h[l + 2]; for (var k = 0; k < 4; k++) { if (l * 8 + k * 6 <= h.length * 8) { g.push(c.charAt((m >>> 6 * (3 - k)) & 63)) } else { g.push("=") } } } return g.join("") }, base64ToBytes: function (h) { if (typeof atob == "function") { return e.stringToBytes(atob(h)) } h = h.replace(/[^A-Z0-9+\/]/ig, ""); for (var g = [], j = 0, k = 0; j < h.length; k = ++j % 4) { if (k == 0) { continue } g.push(((c.indexOf(h.charAt(j - 1)) & (Math.pow(2, -2 * k + 8) - 1)) << (k * 2)) | (c.indexOf(h.charAt(j)) >>> (6 - k * 2))) } return g } }; d.mode = {}; var b = d.charenc = {}; var f = b.UTF8 = { stringToBytes: function (g) { return e.stringToBytes(unescape(encodeURIComponent(g))) }, bytesToString: function (g) { return decodeURIComponent(escape(e.bytesToString(g))) } }; var e = b.Binary = { stringToBytes: function (j) { for (var g = [], h = 0; h < j.length; h++) { g.push(j.charCodeAt(h)) } return g }, bytesToString: function (g) { for (var j = [], h = 0; h < g.length; h++) { j.push(String.fromCharCode(g[h])) } return j.join("") } } })(); (function () { var f = Crypto, a = f.util, b = f.charenc, e = b.UTF8, d = b.Binary; var c = f.SHA1 = function (i, g) { var h = a.wordsToBytes(c._sha1(i)); return g && g.asBytes ? h : g && g.asString ? d.bytesToString(h) : a.bytesToHex(h) }; c._sha1 = function (o) { if (o.constructor == String) { o = e.stringToBytes(o) } var v = a.bytesToWords(o), x = o.length * 8, p = [], r = 1732584193, q = -271733879, k = -1732584194, h = 271733878, g = -1009589776; v[x >> 5] |= 128 << (24 - x % 32); v[((x + 64 >>> 9) << 4) + 15] = x; for (var z = 0; z < v.length; z += 16) { var E = r, D = q, C = k, B = h, A = g; for (var y = 0; y < 80; y++) { if (y < 16) { p[y] = v[z + y] } else { var u = p[y - 3] ^ p[y - 8] ^ p[y - 14] ^ p[y - 16]; p[y] = (u << 1) | (u >>> 31) } var s = ((r << 5) | (r >>> 27)) + g + (p[y] >>> 0) + (y < 20 ? (q & k | ~q & h) + 1518500249 : y < 40 ? (q ^ k ^ h) + 1859775393 : y < 60 ? (q & k | q & h | k & h) - 1894007588 : (q ^ k ^ h) - 899497514); g = h; h = k; k = (q << 30) | (q >>> 2); q = r; r = s } r += E; q += D; k += C; h += B; g += A } return [r, q, k, h, g] }; c._blocksize = 16 })(); (function () { var e = Crypto, a = e.util, b = e.charenc, d = b.UTF8, c = b.Binary; e.HMAC = function (l, m, k, h) { if (m.constructor == String) { m = d.stringToBytes(m) } if (k.constructor == String) { k = d.stringToBytes(k) } if (k.length > l._blocksize * 4) { k = l(k, { asBytes: true }) } var g = k.slice(0), n = k.slice(0); for (var j = 0; j < l._blocksize * 4; j++) { g[j] ^= 92; n[j] ^= 54 } var f = l(g.concat(l(n.concat(m), { asBytes: true })), { asBytes: true }); return h && h.asBytes ? f : h && h.asString ? c.bytesToString(f) : a.bytesToHex(f) } })(); (function () { var e = Crypto, a = e.util, b = e.charenc, d = b.UTF8, c = b.Binary; e.PBKDF2 = function (q, o, f, t) { if (q.constructor == String) { q = d.stringToBytes(q) } if (o.constructor == String) { o = d.stringToBytes(o) } var s = t && t.hasher || e.SHA1, k = t && t.iterations || 1; function p(i, j) { return e.HMAC(s, j, i, { asBytes: true }) } var h = [], g = 1; while (h.length < f) { var l = p(q, o.concat(a.wordsToBytes([g]))); for (var r = l, n = 1; n < k; n++) { r = p(q, r); for (var m = 0; m < l.length; m++) { l[m] ^= r[m] } } h = h.concat(l); g++ } h.length = f; return t && t.asBytes ? h : t && t.asString ? c.bytesToString(h) : a.bytesToHex(h) } })(); (function () { Crypto.mode.OFB = { encrypt: a, decrypt: a }; function a(c, b, d) { var g = c._blocksize * 4, f = d.slice(0); for (var e = 0; e < b.length; e++) { if (e % g == 0) { c._encryptblock(f, 0) } b[e] ^= f[e % g] } } })(); (function () { var l = Crypto, a = l.util, u = l.charenc, s = u.UTF8, j = u.Binary; var v = [99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71, 240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113, 216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110, 90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76, 88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157, 56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100, 93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6, 36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101, 122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102, 72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135, 233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22]; for (var n = [], r = 0; r < 256; r++) { n[v[r]] = r } var q = [], p = [], m = [], h = [], g = [], e = []; function f(y, x) { for (var w = 0, z = 0; z < 8; z++) { if (x & 1) { w ^= y } var A = y & 128; y = (y << 1) & 255; if (A) { y ^= 27 } x >>>= 1 } return w } for (var r = 0; r < 256; r++) { q[r] = f(r, 2); p[r] = f(r, 3); m[r] = f(r, 9); h[r] = f(r, 11); g[r] = f(r, 13); e[r] = f(r, 14) } var k = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]; var c = [[], [], [], []], d, b, t; var o = l.AES = { encrypt: function (A, z, y) { var i = s.stringToBytes(A), x = a.randomBytes(o._blocksize * 4), w = z.constructor == String ? l.PBKDF2(z, x, 32, { asBytes: true }) : z; mode = y && y.mode || l.mode.OFB; o._init(w); mode.encrypt(o, i, x); return a.bytesToBase64(x.concat(i)) }, decrypt: function (z, y, x) { var A = a.base64ToBytes(z), w = A.splice(0, o._blocksize * 4), i = y.constructor == String ? l.PBKDF2(y, w, 32, { asBytes: true }) : y; mode = x && x.mode || l.mode.OFB; o._init(i); mode.decrypt(o, A, w); return s.bytesToString(A) }, _blocksize: 4, _encryptblock: function (w, x) { for (var D = 0; D < o._blocksize; D++) { for (var i = 0; i < 4; i++) { c[D][i] = w[x + i * 4 + D] } } for (var D = 0; D < 4; D++) { for (var i = 0; i < 4; i++) { c[D][i] ^= t[i][D] } } for (var C = 1; C < b; C++) { for (var D = 0; D < 4; D++) { for (var i = 0; i < 4; i++) { c[D][i] = v[c[D][i]] } } c[1].push(c[1].shift()); c[2].push(c[2].shift()); c[2].push(c[2].shift()); c[3].unshift(c[3].pop()); for (var i = 0; i < 4; i++) { var B = c[0][i], A = c[1][i], z = c[2][i], y = c[3][i]; c[0][i] = q[B] ^ p[A] ^ z ^ y; c[1][i] = B ^ q[A] ^ p[z] ^ y; c[2][i] = B ^ A ^ q[z] ^ p[y]; c[3][i] = p[B] ^ A ^ z ^ q[y] } for (var D = 0; D < 4; D++) { for (var i = 0; i < 4; i++) { c[D][i] ^= t[C * 4 + i][D] } } } for (var D = 0; D < 4; D++) { for (var i = 0; i < 4; i++) { c[D][i] = v[c[D][i]] } } c[1].push(c[1].shift()); c[2].push(c[2].shift()); c[2].push(c[2].shift()); c[3].unshift(c[3].pop()); for (var D = 0; D < 4; D++) { for (var i = 0; i < 4; i++) { c[D][i] ^= t[b * 4 + i][D] } } for (var D = 0; D < o._blocksize; D++) { for (var i = 0; i < 4; i++) { w[x + i * 4 + D] = c[D][i] } } }, _decryptblock: function (x, w) { for (var D = 0; D < o._blocksize; D++) { for (var i = 0; i < 4; i++) { c[D][i] = x[w + i * 4 + D] } } for (var D = 0; D < 4; D++) { for (var i = 0; i < 4; i++) { c[D][i] ^= t[b * 4 + i][D] } } for (var C = 1; C < b; C++) { c[1].unshift(c[1].pop()); c[2].push(c[2].shift()); c[2].push(c[2].shift()); c[3].push(c[3].shift()); for (var D = 0; D < 4; D++) { for (var i = 0; i < 4; i++) { c[D][i] = n[c[D][i]] } } for (var D = 0; D < 4; D++) { for (var i = 0; i < 4; i++) { c[D][i] ^= t[(b - C) * 4 + i][D] } } for (var i = 0; i < 4; i++) { var B = c[0][i], A = c[1][i], z = c[2][i], y = c[3][i]; c[0][i] = e[B] ^ h[A] ^ g[z] ^ m[y]; c[1][i] = m[B] ^ e[A] ^ h[z] ^ g[y]; c[2][i] = g[B] ^ m[A] ^ e[z] ^ h[y]; c[3][i] = h[B] ^ g[A] ^ m[z] ^ e[y] } } c[1].unshift(c[1].pop()); c[2].push(c[2].shift()); c[2].push(c[2].shift()); c[3].push(c[3].shift()); for (var D = 0; D < 4; D++) { for (var i = 0; i < 4; i++) { c[D][i] = n[c[D][i]] } } for (var D = 0; D < 4; D++) { for (var i = 0; i < 4; i++) { c[D][i] ^= t[i][D] } } for (var D = 0; D < o._blocksize; D++) { for (var i = 0; i < 4; i++) { x[w + i * 4 + D] = c[D][i] } } }, _init: function (i) { d = i.length / 4; b = d + 6; o._keyexpansion(i) }, _keyexpansion: function (w) { t = []; for (var x = 0; x < d; x++) { t[x] = [w[x * 4], w[x * 4 + 1], w[x * 4 + 2], w[x * 4 + 3]] } for (var x = d; x < o._blocksize * (b + 1); x++) { var i = [t[x - 1][0], t[x - 1][1], t[x - 1][2], t[x - 1][3]]; if (x % d == 0) { i.push(i.shift()); i[0] = v[i[0]]; i[1] = v[i[1]]; i[2] = v[i[2]]; i[3] = v[i[3]]; i[0] ^= k[x / d] } else { if (d > 6 && x % d == 4) { i[0] = v[i[0]]; i[1] = v[i[1]]; i[2] = v[i[2]]; i[3] = v[i[3]] } } t[x] = [t[x - d][0] ^ i[0], t[x - d][1] ^ i[1], t[x - d][2] ^ i[2], t[x - d][3] ^ i[3]] } } } })();


export default Utils
