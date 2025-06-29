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
      meta: { requiresAuth: false }
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
      meta: { requiresAuth: false }
    },{
      path: '/verify-success',
      name: 'verify-success',
      component: () => import('../views/VerifySuccessView.vue')
    },{
      path: '/clubs',
      name: 'clubs',
      component: () => import('../views/FindClubsView.vue'),
      meta: { requiresAuth: false }
    },{
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue'),
      meta: { requiresAuth: false }
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
      component: () => import('../views/AccountView.vue'),
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  console.log(`用戶來自 ${from.path} -> ${to.path}`);

  /**
   * 檢查邏輯:
   * 1. 先檢查cookie有沒有存登入，有的話進入使用pinia
   * 2. 檢查請求是否帶有參數token，帶有token的話就進入
   * 3. 沒有cookie也沒有token，代表是訪客，
   */

  const userStore = userAuthStore();

  try {
    const authStatus = await checkAuthState();

    if (to.query.resetToken && authStatus !== 'success') {  // 目前只有外部請求重設密碼的可以通過
      console.log("有外部token, 以及" + authStatus);
      return next();
    }

    if (authStatus === 'success') {  // 有這個cookie
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, { withCredentials: true });
      userStore.setData(res.data.user);

      console.log("有cookie");
      return next();
    }

    if (to.meta.requiresAuth) { // 沒有cookie，想去的頁面是需要認證的
      console.log("沒有cookie");
      return next('/');
    }

    console.log("next");
    next();
  } catch (err) {
    console.log(`後端路由守門錯誤: ${err}`);
  }
});

async function checkAuthState() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/check`, { withCredentials: true });
    return res.data.status;
  } catch (err) {
    console.log(`後端路由authCheck錯誤: ${err}`);
    return false;
  }
}

export default router
