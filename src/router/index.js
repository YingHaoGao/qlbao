import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import Sign from '../views/sign.vue'
import Account from '../views/account.vue'
import Pay from '../views/pay.vue'
import Payment from '../views/payment.vue'
import Share from '../views/share.vue'
// const Sign =resolve => require(['@/view/sign'], resolve);
// const Account =resolve => require(['@/view/account'], resolve);
// const Pay =resolve => require(['@/view/pay'], resolve);
// const Payment =resolve => require(['@/view/payment'], resolve);
// const Share =resolve => require(['@/view/share'], resolve);

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Sign',
      component: Sign,
      meta: {
        title: '注册页面'
      }
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        title: '结算页面'
      }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
      meta: {
        title: '付款完成页面'
      }
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay,
      meta: {
        title: '支付页面'
      }
    },
    {
      path: '/share',
      name: 'Share',
      component: Share,
      meta: {
        title: '我的邀请卡'
      }
    }
  ]
})

