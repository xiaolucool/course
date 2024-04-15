import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '首页' },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/course',
    name: 'course',
    meta: { title: '课表' },
    component: () => import('@/views/Course.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: { title: '个人信息' },
    component: () => import('@/views/User.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from, next);
  
  document.title = to.meta.title as string
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  if (user.id) {
    next()
  } else {
    if (to.name === 'login') {
      next()
      return
    }
    next({ name: 'login' })
  }

})

export default router
