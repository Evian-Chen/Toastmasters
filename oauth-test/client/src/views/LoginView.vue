<script setup>
import { reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { userAuthStore } from "@/stores/user";
import { onMounted } from "vue";

const userStore = userAuthStore();

const user = reactive({
  email: "",
  password: "",
  isReset: false
})

const state = reactive({
  userExist: true,
  warning: ""
})

const router = useRouter();
const route = useRoute();

// 使用者登入過，直接登入，沒有找到登入資料的話，要求使用者註冊
const onLogIn = async () => {
  console.log(`重設密碼: ${user.isReset}`);
  if (!user.email || !user.password) {
    state.warning = "輸入欄不得空白";
    return;
  }

  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, user, { withCredentials: true })
  .then((res) => {
    if (res.status === 201) {
      console.log("前端導向註冊頁面");
      state.userExist = false;
      state.warning = "使用者不存在";
    } else if (res.status === 210) {
      alert("請去信箱檢查驗證信，點擊驗證連結後，帳號才能啟用");
      state.warning = "信箱未驗證";
    }else {
      console.log("user exists in database " + JSON.stringify(res.data.user));
      userStore.setData(res.data.user);

      // 如果是透過忘記密碼得到新密碼的，強制導向個人設定的重設密碼
      if (user.isReset) {
        console.log(`重設密碼: ${user.isReset}，導航到個人設定`);
        return router.push('/account')
      }

      router.push('/');  // 回到首頁後，
    }

  })
  .catch((err) => {
    console.log(`error: ${err}`);
    if (err.response.status === 401) {
      state.warning = "使用者密碼錯誤";
    }
  })
}

// 沒有使用者資料，要註冊
const onSignUp = () => {
  router.push('/signup');
}

// 使用者點擊忘記密碼
// 密碼重設流程:
// -> 寄出驗證信，驗證信包含新密碼
// -> 重新導向到login畫面，重設密碼
// -> 進入個人設定，要求更新密碼
const forgetPassword = () => {
  router.push("/forgetPassword");
}

watch([() => user.email, () => user.password], () => {
  state.warning = "";
})

onMounted(() => {
  user.isReset = false;
  if (route.query.reset === 'true') {
    user.isReset = true;
  }
})
</script>

<template>
  <div class="container">
    <div class="row">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="input">
        <input v-model="user.email" placeholder="enter email here...">
        <input v-model="user.password" placeholder="enter password here...">
      </div>

      <!-- 輸入欄是空的就按下了login -->
      <div v-if="state.warning">
        <p class="error">{{ state.warning }}</p>
      </div>

      <div class="btn">
        <button v-if="!state.userExist" @click="onSignUp">Sign Up</button>
        <button @click="onLogIn">Log In</button>
      </div>
      <div class="btn">
        <button v-if="state.warning === '使用者密碼錯誤'" @click="forgetPassword">忘記密碼</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.row {
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo {
  margin: 0 auto 2rem;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s;
}

.input input:focus {
  border-color: #42b983;
}

.btn {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.btn button {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn button:hover {
  background-color: #369870;
}

.error {
  color: red;
  font-size: 13px;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}

</style>
