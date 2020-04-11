import Vue from 'vue'
import Router from 'vue-router'

// 登录注册
import login from '@/components/login/login'
import register from '@/components/login/register'
import phoneLogin from '@/components/login/phoneLogin'
import forget from '@/components/login/forget'



import index from '@/components/index'
import price from '@/components/price/price'
import deal from '@/components/deal/deal'
import dealPay from '@/components/deal/dealBuy'
import mine from '@/components/mine/mine'

import identity from '@/components/mine/identity'
import merchant from '@/components/mine/merchant'
import identityInfo from '@/components/mine/identityInfo'
import invite from '@/components/mine/invite'
import safeCenter from '@/components/mine/safeCenter'
import editPwd from '@/components/mine/editLogin'
import editPay from '@/components/mine/editPay'
import loginList from '@/components/mine/safeList'
import mineMoney from '@/components/mine/mineMoney'
import payWay from '@/components/mine/payWay'
import addPay from '@/components/mine/addPay'
import editPayWay from '@/components/mine/editPayWay'
import indentList from '@/components/mine/indentList'
import indentPay from '@/components/mine/indentPay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {path: '/login',name: 'login',component: login},
    {path: '/phoneLogin',name: 'phoneLogin',component: phoneLogin},
    {path: '/register',name: 'register',component: register},
    {path: '/forget',name: 'forget',component: forget},

    {path: '/price',name: 'price',component: price},
    {path: '/deal',name: 'deal',component: deal},
    {path: '/dealPay',name: 'dealPay',component: dealPay},
    {path: '/mine',name: 'mine',component: mine},
    {path: '/identity',name: 'identity',component: identity},
    {path: '/merchant',name: 'merchant',component: merchant},
    {path: '/identityInfo',name: 'identityInfo',component: identityInfo},
    {path: '/invite',name: 'invite',component: invite},
    {path: '/safeCenter',name: 'safeCenter',component: safeCenter},
    {path: '/editPwd',name: 'editPwd',component: editPwd},
    {path: '/editPay',name: 'editPay',component: editPay},
    {path: '/loginList',name: 'loginList',component: loginList},
    {path: '/mineMoney',name: 'mineMoney',component: mineMoney},
    {path: '/payWay',name: 'payWay',component: payWay},
    {path: '/indentList',name: 'indentList',component: indentList},
    {path: '/indentPay',name: 'indentPay',component: indentPay},
    {path: '/addPay',name: 'addPay',component: addPay},
    {path: '/editPayWay',name: 'editPayWay',component: editPayWay},
  ]
})
