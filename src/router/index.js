import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入token处理函数
import auth from '@/utils/auth.js'
// 注册路由
import Register from '@/views/Register.vue'
// 登陆路由
import Login from '@/views/Login.vue'
// 布局路由
import Layout from '@/views/Layout.vue'
// 个人信息路由
import Home from '@/views/Home.vue'
// 图书路由
import Search from '@/views/Search.vue'

Vue.use(VueRouter)

const routes = [
  // 注册
  { path: '/register', component: Register },
  // 登录
  { path: '/login', component: Login },
  // 布局
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/search', component: Search }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 获取token
  const token = auth.getToken()
  // 不是访问登录，有没有token，跳转登录页面
  if (to.path !== '/login' && to.path !== '/register' && !token) return next('/login')
  // 其他情况放行
  next()
})

export default router
