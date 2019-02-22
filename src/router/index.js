import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import goods from '@/components/goods/goods'
import sell from '@/components/sell/sell'
import ratings from '@/components/ratings/ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/sell',
      name: 'sell',
      component: sell
    },
    {
      path: '/ratings',
      name: 'gratings',
      component: ratings
    },
    {
      path: '/', 
      redirect: '/goods'
     }
  ],
  linkActiveClass:'active'
})
