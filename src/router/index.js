import Vue from 'vue'
import VueRouter from 'vue-router'
// 注册路由
import Register from '@/views/Register.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})

export default router
