import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '../views/Film.vue'
import Cinema from '../views/Cinema.vue'
import Search from '../views/Search.vue'
import City from '../views/City.vue'
// import Center from '../views/Center.vue'
import Detail from '../views/Detail.vue'
// import Login from ''

import Nowplaying from '../views/film/Nowplaying.vue'
import Comingsoon from '../views/film/Comingsoon.vue'
Vue.use(VueRouter) // 注册模块, 已经全局组件 router-view

const routes = [
  {
    path: '/film',
    component: Film,
    // 嵌套路由
    children: [
      {
        path: 'nowplaying', // 简写
        component: Nowplaying
      },
      {
        path: '/film/comingsoon',
        component: Comingsoon
      },
      {
        path: '',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/cinema/search',
    component: Search
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/center',
    component: () => import(/* webpackChunkName: "kerwingroup" */ '../views/Center.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "kerwingroup" */ '../views/Login.vue')
  },
  {
    path: '/detail/:myid', // 动态路由
    component: Detail,
    name: 'kerwinDetail'
  },

  // {
  //   path: '/detail',
  //   component: Detail
  // },

  {
    path: '*', // 通配符
    redirect: '/film'
  }
]

const router = new VueRouter({
  mode: 'hash', // hash ,history
  routes
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  // ...
  const auth = ['/center', '/order', '/money', '/card']

  if (auth.includes(to.fullPath)) {
    // console.log('验证token')
    if (!localStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
