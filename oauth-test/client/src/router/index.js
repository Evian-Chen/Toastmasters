import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import { userAuthStore } from "@/stores/user";

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
      component: () => import('../views/LoginView.vue'),
      meta: { requiresAuth: false }
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

router.beforeEach(async (to, from, next) => {
  // console.log(`用戶來自 ${from.path}`);
  // console.log(`用路想去 ${to.path}`);

  const userStore = userAuthStore();  // 確保先啟用pinia

  if (!to.meta.requiresAuth) { // 不需要經過JWT檢查
    next();
  } else {
    await axios.get("/api/auth/me", { withCredentials: true })
      .then((res) => {
        console.log(`current user: ${res.data.user}`);  // 使用者之前有登入過
        userStore.setData(res.data.user);
      })
      .catch((err) => {
        router.push("/");
        console.log(`auth/me error: ${err}`);
      })
  }
})

export default router
