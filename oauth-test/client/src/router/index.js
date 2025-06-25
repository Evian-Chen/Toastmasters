import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
    },{
      path: '/verify-success',
      name: 'verify-success',
      component: () => import('../views/VerifySuccessView.vue')
    },{
      path: '/clubs',
      name: 'clubs',
      component: () => import('../views/FindClubsView.vue')
    },{
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    },{
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: () => import('../views/ForgetPasswordView.vue')
    },{
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import("../views/resetPasswordView.vue")
    },{
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    }
  ],
})

export default router
