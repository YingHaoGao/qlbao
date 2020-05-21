import Vue from 'vue'
import Router from 'vue-router'

import Sign from '../views/sign.vue'
import Account from '../views/account.vue'
import Pay from '../views/pay.vue'
import Payment from '../views/payment.vue'
import Share from '../views/share.vue'
import SignHtml from '../views/signHtml.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Sign',
      component: Sign,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/sign',
      name: 'SignHtml',
      component: SignHtml,
      meta: {
        title: '注册页面'
      }
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        title: '我的号码'
      }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
      meta: {
        title: '我的号码',
        isShare: true
      }
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay,
      meta: {
        title: '支付'
      }
    },
    {
      path: '/share',
      name: 'Share',
      component: Share,
      meta: {
        title: '我的邀请卡',
        isShare: true
      }
    }
  ]
})

