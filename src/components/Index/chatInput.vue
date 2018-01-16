<template>
  <div>
    <div class="chat" v-show="isChat">
      <div v-if="isiOS">
        <div class="chat-box" :class="{'chat-bottom': bottom, box: inputShow}" id="chat-box">
          <ul class="video-sms-list" id="video-sms-list">
            <li v-for="(item, i) in msgList" :key="i">
              <div class="video-sms-pane">
                <div class="video-sms-text">
                  <span class="user-name-blue">{{item.nickName}}</span>
                  <span>{{item.content}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <div class="chat-box" :class="{'chat-bottom2': bottom, box: inputShow}" id="chat-box">
          <ul class="video-sms-list" id="video-sms-list">
            <li v-for="(item, i) in msgList" :key="i">
              <div class="video-sms-pane">
                <div class="video-sms-text">
                  <span class="user-name-blue">{{item.nickName}}</span>
                  <span>{{item.content}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
        
      <div v-show="show">
        <div class="chat-input" :class="{bottom: bottom}" v-if="isiOS">
          <div class="video-discuss-form">
            <input type="text" class="video-discuss-input" @focus="focus" @blur="blur" v-model="msgtosend">
            <button class="video-discuss-button" @click="send" v-if="isBtn">发送</button>
            <button class="video-discuss-button btn-false" v-else>发送</button>
          </div>
        </div>
        <div class="chat-input" :class="{bottom2: bottom}" v-else>
          <div class="video-discuss-form">
            <input type="text" class="video-discuss-input" @focus="focus" @blur="blur" v-model="msgtosend">
            <button class="video-discuss-button" @click="send" v-if="isBtn">发送</button>
            <button class="video-discuss-button btn-false" v-else>发送</button>
          </div>
        </div> 
      </div>
    </div>
    <div class="guangbo" :style="{width: width + 'px'}">
      <canvas id="canvasBarrage" class="canvas-barrage" :style="{width: width + 'px'}"></canvas>
<!-- 
      <div class="lunbo" :style="{transform: `translate3d(0, ${currenTranslateY}px, 0)`, transition: `transform 300ms`}">
        <p id="broadcast-text">
          <i class="iconfont icon-laba1"></i>
          <span>恭喜{{broadcastText}}抓中了娃娃</span>
        </p>
      </div> -->
    </div>
  </div>
</template>

<script>
  import { XTextarea, Group, Marquee, MarqueeItem } from 'vux'
  import CanvasBarrage from 'assets/js/canvasBarrages.js'
  import webim from 'assets/js/sdk/webim_no_emotion.js'
  import json2 from 'assets/js/sdk/json2.js'
  import axios from 'axios'
  import qs from 'qs'
  import api from '../../api/api'
  import { mapState, mapActions } from 'vuex'
  import Barrage from 'assets/js/barrage.js'

  export default {
    props: {
      visibile: Boolean,
      member: Object
    },
    components: {
      XTextarea, Group, Marquee, MarqueeItem
    },
    data () {
      return {
        value: '',
        focusState: false,
        absolute: false,
        bottom: false,
        isiOS: false,
        show: false,
        inputShow: false,
        loginInfo: {
          sdkAppID: 1400053196, //用户所属应用id,必填
          // appIDAt3rd: 1400053196, //用户所属应用id，必填
          accountType: 19975, //用户所属应用帐号类型，必填
          // identifier: 'abcdefg', //当前用户ID,必须是否字符串类型，选填
          identifier: null, //当前用户ID,必须是否字符串类型，选填
          identifiernick: null, //当前用户昵称，选填
          userSig: null, //当前用户身份凭证，必须是字符串类型，选填
          // headurl: 'static/images/headImg.jpg'//当前用户默认头像，选填
        },
        onGroupSystemNotifys: {
          "5": 'onDestoryGroupNotify', //群被解散(全员接收)
          "11": 'onRevokeGroupNotify', //群已被回收(全员接收)
          "255": 'onCustomGroupNotify'//用户自定义通知(默认全员接收)
        },
        options: {
          'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
          'isLogOn': true, //是否开启控制台打印日志,默认开启，选填
        },
        msgList: [],
        selSess: null, //当前聊天会话
        selType: webim.SESSION_TYPE.GROUP,
        selToID: null,
        msgtosend: '',
        // visibile: false,
        isBtn: true,
        logoutCount: 0,
        imGroupId: '',
        BChatRoomId: '@TGS#bDGWFAAFB',
        asyncCount: 0,
        timer: null,
        isBroadcast: false,
        broadcastText: '',
        broadcastTextList: [],
        currenTranslateY: 0,
        canvas: null,
        colorList: ['#f92675', '#f6bfcc', '#fff', '#75c600'],
        topIndex: 0,
        content: '',
        randomIndex: null,
      }
    },
    created () {
      this.isiOS = this.util.isiOS()
      this.width = window.innerWidth
    },
    mounted () {
      this.channelsDetail()
    },
    computed: {
			...mapState({
				userInfo: function (state) {
					let localMember = JSON.parse(window.localStorage.getItem('member'))
					if (!state.member.name && localMember) {
						this.$store.commit('updateMember', {member: localMember})
					}
					return state.member
				}
      }),
      isChat () {
        return this.visibile
      }
		},
    methods: {
      pay () {
        if (this.show) {
          this.show = false
        }
      },
      hide () {
        if (this.isChat) {
          this.show = !this.show
        }
      },
      focus () {
        this.bottom = true
        this.inputShow = false
      },
      blur () {
        this.bottom = false
        this.inputShow = true
      },
      scrollTop () {
        let chatBox = document.getElementById('chat-box')
        let list = document.getElementById('video-sms-list')
        if (list) {
          if (chatBox.offsetHeight < list.offsetHeight) {
            chatBox.scrollTop = list.offsetHeight + 100
          }
        }  
      },
      // 详情
			channelsDetail () {
				api.channelsDetail(this.$route.params.id).then(res => {
					if (res.data.errCode === 0) {
            this.imGroupId = res.data.data.imGroupId
            this.imSig()
					} else {
						this.showInfo(res.data.errMsg)
					}
				})
      },
      // 发送消息
      send () {
        if (this.msgtosend) {
          // this.sendMsg(this.msgtosend)
          if (/aaoq/.test(this.msgtosend))this.sendBroadcast(this.msgtosend)
          else this.sendMsg(this.msgtosend)
        } else {
          this.showInfo('发送内容不能为空')
        }
      },
      // 发送广播消息
      sendBroadcast (msg) {
        if (!msg) return
        let random = Math.round(Math.random() * 4294967296);
        let url = 'https://console.tim.qq.com/v4/group_open_http_svc/send_group_msg?usersig=eJxlj11PgzAYhe-5FQ23M1o*CmOJF8gWHY7MyJxxNw2hrb5qOwIdYxj-uw6X2GTn9nlOTs6XhRCyV4v8sijL7U5pqg8Vt9EE2di**IdVBYwWmno1O4O8q6DmtBCa1wN0CCEuxqYDjCsNAk5GwSQoAzfsgw4bf33-t0w8JwpMBV4HmM2ekvntfroJ4W2tnVDdvCQP-vNu7eTLcOTlqUzmXdSLoJdqKpYyhln8LlM*Bhy0sdBX6Si525es3jzqrLn3snahyKcuw2rVub1-bUxqkPx0yHGJT9xxZNCW1w1s1SC4*Kh4*Bjb*rZ*APrvXQQ_&identifier=admin&sdkappid=1400053196&random=99999999&contenttype=json'
        let params = {
          GroupId: this.BChatRoomId,
          Random: random,
          MsgBody: [{
            MsgType: "TIMTextElem",
            MsgContent: {
              Text: msg
            }
          }]
        }
        axios.post(url, params).then(res => {
          // alert('发送广播消息成功')
          // console.log(res.data)
        })
      },
      
      // sig
      imSig () {
        this.loginInfo.identifier = this.userInfo.nickname
        this.loginInfo.identifierNick = this.userInfo.nickname
        api.imSig(this.userInfo.nickname).then(res => {
          // console.log(res.data)
          if (res.data.errCode === 0) {
            this.loginInfo.userSig = res.data.sig
            this.sdkLogin()
          }
        })
      },
      // sdk登录
      sdkLogin () {
        var onConnNotify = function (resp) {
          var info;
          switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
              // webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
              break;
            case webim.CONNECTION_STATUS.OFF:
              // info = '连接已断开，无法收到新消息，请检查下你的网络是否正常: ' + resp.ErrorInfo;
              // alert(info);
              webim.Log.warn(info);
              break;
            case webim.CONNECTION_STATUS.RECONNECT:
              // info = '连接状态恢复正常: ' + resp.ErrorInfo;
              // alert(info);
              webim.Log.warn(info);
              break;
            default:
              // webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
              break;
          }
        };
        var that = this
        // 接收消息
        function onBigGroupMsgNotify(msgList) {
          for (var i = msgList.length - 1; i >= 0; i--) { //遍历消息，按照时间从后往前
            var msg = msgList[i];
            // console.log('接收消息')
            // console.log(msg.sess._impl.id);
            webim.Log.warn('receive a new avchatroom group msg: ' + msg.getFromAccountNick());
              //显示收到的消息
              that.showMsg(msg);
          }
        }
        var listeners = {
          onConnNotify: onConnNotify, //选填
          onBigGroupMsgNotify: onBigGroupMsgNotify, //监听新消息(大群)事件，必填
          onGroupSystemNotifys: this.onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
        }
        // web sdk 登录
        webim.login(this.loginInfo, listeners, this.options, resp => {
          // webim.Log.info('登录成功')
          // console.log(resp)
          this.applyJoinBigGroup(this.imGroupId)
        }, err => {
          // webim.Log.info('登录失败')
          // console.log(err)
        })
      },
      // 加入群
      applyJoinBigGroup (groupId) {
        var options = {
          'GroupId': groupId//群id
        };
        webim.applyJoinBigGroup(options, resp => {
          if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
            // console.log('加入房间成功');
            this.selToID = groupId
            this.$emit('change', true)
          }
        }, err => {
          this.logout()
          // console.log(err.ErrorInfo);
          this.$emit('change', false)
        });
        var bOptions = {
          'GroupId': this.BChatRoomId // 群id
        }
        webim.applyJoinBigGroup(bOptions, resp => {
          if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
            // console.log('加入在线成员广播大群');
          }
        })
      },
      success (memberName, channelName) {
        let text = this.randomText(memberName, channelName)
        this.sendBroadcast(text.value)
      },
      fail (memberName, channelName) {
        let text = this.randomText(memberName, channelName)
        // this.sendBroadcast(text.value)
      },
      randomText (memberName, channelName) {
        let textList = [
          {value:`恭喜【${memberName}】抓中了一个${channelName}`}, 
          {value: `【${memberName}】刚刚抓中了一个${channelName}`}, 
          {value: `祝贺【${memberName}】刚刚抓中了一个${channelName}`}, 
          {value: `【${memberName}】华丽一爪，${channelName}到手`}, 
          {value: `逆天了，【${memberName}】又抓中了${channelName}`}, 
          {value: `哎哟，不错噢！【${memberName}】抓中了${channelName}`}]
        let length = textList.length
        let index = this.util.random(0, length)
        if (this.randomIndex === index) {
          if (index === length) index = 0
          else index++
          this.randomIndex = index
        } else {
          this.randomIndex = index
        }
        
        let text = textList[index]
        return text
      },
      // 发送消息
      sendMsg (val) {
        this.isBtn = false
        var selSess = new webim.Session(this.selType, this.selToID, this.selToID, Math.round(new Date().getTime() / 1000));
        var isSend = true;
        var seq = -1;
        var random = Math.round(Math.random() * 4294967296);//消息随机数，用于去重
        var msgTime = Math.round(new Date().getTime() / 1000);//消息时间戳
        var subType;//消息子类型
        if (this.selType == webim.SESSION_TYPE.GROUP) {
          subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
        } else {
          subType = webim.C2C_MSG_SUB_TYPE.COMMON;
        }
        var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, this.loginInfo.identifier, subType, this.loginInfo.identifierNick);
        //解析文本和表情
        var expr = /\[[^[\]]{1,3}\]/mg;
        // if ()
        var text_obj = new webim.Msg.Elem.Text(val);
        msg.addText(text_obj);
        webim.sendMsg(msg, resp => {
          // webim.Log.info("发消息成功");
          // console.log(resp)
        }, err => {
          // webim.Log.info("发消息失败");
          // console.log(err)
        })
      },
      // 显示广播消息
      showBroadcast (content) {
        
        let topIndex = this.util.random(1, 9)
        if (this.topIndex === topIndex) {
          this.showBroadcast(content)
          return
        } else {
          this.topIndex = topIndex
        }
        if (this.content === content) return
        else this.content = content

        let height = this.topIndex * 30
        let length = this.colorList.length
        let index = this.util.random(0, length)
        let color = this.colorList[index]
        if (this.canvas) {
          this.canvas.add({value: content, color: color, height: height})
        } else {
          let dataBarrage = [{value: content, color: color, height: height}]
          var eleCanvas = document.getElementById('canvasBarrage')
          this.canvas = new CanvasBarrage(eleCanvas, {data: dataBarrage})
        }
          
        // this.broadcastText = this.broadcastTextList[0]
        // // this.isBroadcast = true
        // setTimeout(() => {
        //   this.currenTranslateY = 0
        //   setTimeout(() => {
        //     this.currenTranslateY = -50
        //     setTimeout(() => {
        //       this.broadcastText = ''
        //       this.broadcastTextList.splice(0, 1)
        //       if (this.broadcastTextList.length > 1) {
        //         this.showBroadcast()
        //       }
        //     }, 500)
        //   }, 3000)
        // }, 500)
 
      },
      // 显示消息
      showMsg (msg) {
        // console.log('显示消息')
        // console.log(msg)
        if (msg.fromAccountNick === '@TIM#SYSTEM' && msg.sess._impl.id === this.BChatRoomId) return
        
        var isSelfSend, fromAccount, fromAccountNick, sessType, subType, from, content;
        fromAccount = msg.getFromAccount();
        if (!fromAccount) {
          fromAccount = '';
        }
        fromAccountNick = msg.getFromAccountNick();
        if (!fromAccountNick) {
          fromAccountNick = '未知用户';
        }
        if ('@TIM#SYSTEM' === fromAccountNick) {
          fromAccountNick = '@小哎';
        }
        sessType = msg.getSession().type();
        subType = msg.getSubType();
        isSelfSend = msg.getIsSend();//消息是否为自己发的

        switch (subType) {
          case webim.GROUP_MSG_SUB_TYPE.COMMON: // 群普通消息
            content = this.convertMsgtoHtml(msg)
            break
          case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
            content = '[群提示消息]' + this.convertMsgtoHtml(msg)
            break
          default:
            content = msg.tipText
            // alert(content)
            break
        }
        if (msg.fromAccountNick === 'admin') {
          // console.log('显示广播消息')
          // console.log(content)
          this.showBroadcast(content)
          // this.broadcastTextList.push(content)
        } else {
          this.msgList.push({
            nickName: fromAccountNick,
            content: content
          })
        }
        this.msgtosend = ''
        this.isBtn = true
      },
      //把消息转换成Html
      convertMsgtoHtml (msg) {
        var html = "", elems,elem, type, content;
        elems=msg.getElems();//获取消息包含的元素数组
        // alert(JSON.stringify(elems))
        for (var i in elems) {
          elem = elems[i];
          type = elem.getType();//获取元素类型
          content = elem.getContent();//获取元素对象
          switch (type) {
            case webim.MSG_ELEMENT_TYPE.TEXT:
              html += this.convertTextMsgToHtml(content)
              break
            case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
              html += this.convertGroupTipMsgToHtml(content)
              break
            default:
              webim.Log.err('未知消息元素类型：elemType=' + type)
              break
          }
        }
        // alert(webim.Tool.formatHtml2Text(html))
        return webim.Tool.formatHtml2Text(html) 
      },
      //解析文本消息元素
      convertTextMsgToHtml (content) {
        return content.text;
        // console.log('contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent')
        // console.log(content)
        // console.log(content.text)
      },
      //解析群提示消息元素
      convertGroupTipMsgToHtml (content) {
        var WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10
        var text = ''
        var maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1
        var opType, opUserId, userIdList
        opType = content.getOpType()
        opUserId = content.getOpUserId()
        // alert(JSON.stringify(opType))
        switch (opType) {
          case webim.GROUP_TIP_TYPE.JOIN: // 加群
            userIdList = content.getUserIdList()
            for (var m in userIdList) {
              text += userIdList[m] + ','
              if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m === maxIndex) {
                text += '等' + userIdList.length + '人'
                break
              }
            }
            text = text.substring(0, text.length - 1)
            text += '进入房间'
            break
          case  webim.GROUP_TIP_TYPE.QUIT: // 退出群
            text += opUserId + '离开房间'
            break
          case webim.GROUP_TIP_TYPE.KICK: // 踢出群
            text += opUserId + '将'
            userIdList = content.getUserIdList()
            for (var m in userIdList) {
              text += userIdList[m] + ','
              if (userIdList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
                text += '等' + userIdList.length + '人'
                break
              }
            }
            text += '踢出该群'
            break
          default:
            text += '未知群提示消息类型： type=' + type
            break
        }
        return text
        // console.log('解析群提示消息元素')
        // console.log(text)
      },
      // 登出
      logout () {
        this.logoutCount++
        webim.logout(resp => {
          webim.Log.info('登出成功')
        }, err => {
          webim.Log.info('登出失败')
          if (this.logoutCount < 3) {
            this.logout()
          } 
        })
      }
    },
    watch: {
      msgList: {
        handler (val) {
          // console.log(val)
          if (this.visibile) {
            setTimeout(() => {
              this.scrollTop()
            }, 500)
          }
          if (val.length > 30) {
            val.splice(0, 1)
          }
        },
        deep: true
      },
      show (val) {
        // console.log(val)
        if (val) this.inputShow = true
        else this.inputShow = false
      },
      isChat (val) {
        if (val) {
          setTimeout(() => {
            this.scrollTop()
          }, 500)
        }
      }
    },
    beforeDestroy() {
			this.logout()
		},
  }
</script>

<style lang="less">
  .chat {
    // position: fixed;
    // position: absolute;
    // bottom: 0;
    // left: 0;
    // height: 300px;
    // width: 100%;
    // z-index: 10;
    .chat-box {
      transition: all .2s;
      position: absolute;
      bottom: 160px;
      max-height: 20rem;
      width: 30rem;
      overflow: scroll;
      z-index: 5;
      // background: rgba(0,0,0,.4);
      .video-sms-list {
        color: #fff;
        margin: 0 15px;
        li {
          margin-bottom: 5px;
          .video-sms-pane {
            display: inline-block;
            .video-sms-text {
              padding: 2px 10px;
              font-size: 14px;
              // background-color: rgba(255, 255, 255, 0.5);
              border-radius: 10px;
              text-align: left;
              // width: 25rem;
              line-height: 18px;
              color: #000;
              
              word-wrap: break-word;
              font-size: 1.6rem;
              span {
                padding-right: 10px;
                vertical-align: top;
                // color: #000;
                color: #fff;
              }
              .user-name-blue {
                color: #f6c0cd;
              }
            }
          }
        }
      }
    }
    .chat-bottom {
      bottom: 90px;
    }
    .chat-bottom2 {
      bottom: 50px;
    }
    .box {
      bottom: 206px;
    }
    .chat-input {
      position: absolute;
      width: 100%;
      bottom: 160px;
      z-index: 5;
      .video-discuss-form {
        height: 30px;
        background: rgba(0, 0, 0, .5);
        padding: 8px 60px 8px 8px;
        position: relative;
        .video-discuss-input {
          width: 100%;
          height: 30px;
          vertical-align: top;
          // padding: 0 13% 0 2%;
          border-radius: 2px;

          outline: 0;
          -webkit-appearance: none;
          border: 0;
        }
        .video-discuss-button {
          background-color: #dc4b53;
          height: 30px;
          color: #fff;
          width: 45px;
          position: absolute;
          right: 10px;
          font-size: 1.5rem;
          top: 8px;
          border-radius: 2px;
          padding: 0;
          margin: 0;
          border: 0;
          z-index: 111;
        }
        .btn-false {
          background-color: #a7a7a7;
        }
      }
    }
    .bottom {
      bottom: 40px;
    }
    .bottom2 {
      bottom: 0;
    }
  }
  .guangbo {
    position: absolute;
    top: 6rem;
    left: 0;
    z-index: 10;
    height: 300px;
    font-size: 1.8rem;
    color: #fff;
    overflow: hidden;
    .canvas-barrage {
      height: 300px;
    }
    .lunbo {
      p {
        background: rgba(0,0,0,.3);
        border-radius: 10px;
        padding: 0 5px;
        .icon-laba1 {
          color: #ec879f;
        }
      }
        
    }
    .align-middle {
      text-align: center;
    }

  }
</style>

