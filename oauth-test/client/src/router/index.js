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
      meta: { requiresAuth: true }
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
  console.log(`用戶來自 ${from.path}`);
  console.log(`用戶想去 ${to.path}`);

  const token = await axios.get("/api/auth/cookie");

  const userStore = userAuthStore();

  // 外部請求帶有參數的話，不需要經過JWT認證
  if (JSON.stringify(to.query) !== '{}') {
    return next();
  }

  // 如果 user 已經存在於 pinia（登入過了），直接放行
  if (userStore.user) {
    console.log("exist in pinia");
    return next();
  }

  console.log(`cookie msg: ${token.data.message}`);

  if (token.data.message === "true") {  // 有這個cookie，而且pinia也還沒登入過
    const res = await axios.get("/api/auth/me", { withCredentials: true });
    userStore.setData(res.data.user);
    return next();
  } else { // 沒有cookie也還沒登入過
    if (!to.meta.requiresAuth) {
      console.log(`to.meta.requiresAuth: ${to.meta.requiresAuth}`);
      next();
    } else {
      console.log("沒有跳轉權限");
      next(false);
    }
  }
});


export default router
