import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/App'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index',
      name: 'Home',
      component: resolve => require(['@/components/index'], resolve),
      children: [
        { path: '/index2', meta: { title: '哎哟抓娃娃' }, component: resolve => require(['@/components/Index/index'], resolve) },
        { path: '/index', meta: { title: '哎哟抓娃娃' }, component:  resolve => require(['@/components/Index/index2'], resolve) },
        { path: '/index/detail/:id', name: 'Detail', component: resolve => require(['@/components/Index/detail'], resolve) },
        { path: '/index/help', meta: { title: '帮助' }, component: resolve => require(['@/components/Index/help'], resolve) },
        // 设置
        { path: '/myInfo', meta: { title: '设置' }, component: resolve => require(['@/components/My/index'], resolve) },
        // { path: '/myInfo/Participate/', component: resolve => require(['@/components/My/Participate'], resolve) },
        { path: '/myInfo/ModifyInfo', component: resolve => require(['@/components/My/ModifyInfo'], resolve) },
        // 充值
        { path: '/myInfo/recharge', meta: { title: '充值' }, component: resolve => require(['@/components/My/Recharge'], resolve) },
        // 特惠礼包
        { path: '/myInfo/Preferential', meta: { title: '特惠礼包' }, component: resolve => require(['@/components/My/Preferential'], resolve) },
        // 记录
        { path: '/myInfo/record', meta: { title: '金币记录' }, component: resolve => require(['@/components/My/Record'], resolve) },
        // 消息中心
        { path: '/myInfo/message', meta: { title: '消息中心' }, component: resolve => require(['@/components/My/Message'], resolve) },
        // 我的娃娃
        { path: '/myInfo/myDoll', meta: { title: '我的娃娃' }, component: resolve => require(['@/components/My/MyDoll'], resolve) },
        // 下单
        { path: '/myInfo/order', meta: { title: '下单' }, component: resolve => require(['@/components/My/Order'], resolve) },
        // 我的订单
        { path: '/myInfo/orderList', meta: { title: '我的订单' }, component: resolve => require(['@/components/My/OrderList'], resolve) },
        // 我的地址
        { path: '/myInfo/address', meta: { title: '我的地址' }, component: resolve => require(['@/components/My/Address'], resolve) },
        // 添加地址
        { path: '/myInfo/addAddress', meta: { title: '添加地址' }, component: resolve => require(['@/components/My/AddAddress'], resolve) },
        // 邀请好友
        { path: '/myInfo/invitation', meta: { title: '邀请好友' }, component: resolve => require(['@/components/My/Invitation'], resolve) },
        // 输入邀请码
        { path: '/myInfo/inputInvitationCode', meta: { title: '输入邀请码' }, component: resolve => require(['@/components/My/InputInvitationCode'], resolve) },
        // 个人中心
        { path: '/user', meta: { title: '个人中心' }, component: resolve => require(['@/components/My/user'], resolve) },
        // 反馈
        { path: '/myInfo/feedBack', meta: { title: '问题反馈' }, component: resolve => require(['@/components/My/FeedBack'], resolve) },
        // 反馈列表
        { path: '/myInfo/feedBacks', meta: { title: '反馈列表' }, component: resolve => require(['@/components/My/FeedBackList'], resolve) },
        // 声音设置
        { path: '/myInfo/Music', meta: { title: '声音设置' }, component: resolve => require(['@/components/My/Music'], resolve) },

        // 抓取详情
        { path: '/myInfo/user/dollDetail/:id', name: 'DollDetail', component: resolve => require(['@/components/Common/DollDetail'], resolve) },
        

        
        { path: '/my/CompleteInfo', component: resolve => require(['@/components/My/CompleteInfo'], resolve) },

        // 最新活动
        { path: '/Activity', meta: { title: '最新活动' }, component: resolve => require(['@/components/Functions/Activity'], resolve) },
        // 新手福利
        // { path: '/BeginnerWelfare', meta: { title: '新手福利' }, component: resolve => require(['@/components/Functions/BeginnerWelfare'], resolve) },
        // 邀请好友
        { path: '/InvitingFriends', meta: { title: '邀请好友' }, component: resolve => require(['@/components/Functions/InvitingFriends'], resolve) },
        // 每日礼包
        { path: '/DailyGiftBag', meta: { title: '每日礼包' }, component: resolve => require(['@/components/Functions/DailyGiftBag'], resolve) },
        // 每日任务
        { path: '/DailyTasks', meta: { title: '每日任务' }, component: resolve => require(['@/components/Functions/DailyTasks'], resolve) },
        // 玩家秀
        { path: '/GamePlayerShow', meta: { title: '玩家秀' }, component: resolve => require(['@/components/Functions/GamePlayerShow'], resolve) },
        // 新闻
        { path: '/News', meta: { title: '游戏指引' }, component: resolve => require(['@/components/Functions/News'], resolve) },
        // 新闻
        { path: '/News/Detail/:id', name: 'NewsDateil', meta: { title: '详情' }, component: resolve => require(['@/components/Common/newsBack'], resolve) },

        // 推广达人首页
        { path: '/Extension', meta: { title: '推广达人' }, component: resolve => require(['@/components/Extension/index'], resolve) },
        // 推广达人宣传
        { path: '/Extension/Guide', meta: { title: '推广达人宣传' }, component: resolve => require(['@/components/Login/Guide'], resolve) },
        // 推广达人登录
        { path: '/Extension/Login', meta: { title: '推广达人登录' }, component: resolve => require(['@/components/Login/Login'], resolve) },
        // 推广达人注册
        // { path: '/Extension/Register', meta: { title: '推广达人注册' }, component: resolve => require(['@/components/Login/Register'], resolve) },
        // 营收
        { path: '/Extension/Revenue', component: resolve => require(['@/components/Extension/Revenue'], resolve) },
        // 下线
        { path: '/Extension/Offline', component: resolve => require(['@/components/Extension/Offline'], resolve) },
        // 推广渠道类型列表
        { path: '/Extension/MemberChainType', meta: { title: '推广渠道类型列表' }, component: resolve => require(['@/components/Extension/MemberChainType'], resolve) },
        // 推广渠道类型添加
        { path: '/Extension/MemberChainTypeAdd', meta: { title: '推广渠道类型列表' }, component: resolve => require(['@/components/Extension/MemberChainTypeAdd'], resolve) },
      ]
    },
    
  ]
})