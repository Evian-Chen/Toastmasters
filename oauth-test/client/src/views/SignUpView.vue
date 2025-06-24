<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { userAuthStore } from "@/stores/user";
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const userStore = userAuthStore();
const { isLoggedIn } = storeToRefs(userStore);

const router = useRouter();

const user = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
});

// 針對欄位的錯誤提示
const error = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
})

// 檢查每個輸入欄位都合法
const inputIsValid = () => {
  error.name = user.name ? '' : '請輸入姓名';
  error.password = user.password ? '' : '請輸入密碼';
  error.confirmPassword = user.confirmPassword === user.password ? '' : '密碼不一致';

  if (user.email) {
    const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    error.email = user.email.search(emailRule) !== -1 ? '' : '電子郵件格式錯誤';
  } else {
    error.email = '請輸入電子郵件';
  }

  if (!error.name && !error.email && !error.password && !error.confirmPassword) {
    return true;
  }
  return false;
}

const submit = async () => {
  // 註冊邏輯，1. 檢查輸入，若有錯誤則給出紅字，2. 使用者是否已經存在，3. 驗證電子郵件
  if (inputIsValid()) {
    await axios.post("/api/auth/mail/sent", user)
    .then((res) => {
      if (res.status === 201) {  // 使用者已經存在了
        alert("使用者已註冊");
      } else {
        userStore.setData({
          name: user.name,
          password: user.password,
          email: user.email,
        });
        console.log(`sign up status: ${res.status}`);
        alert("請點擊email中的驗證連結，頁面將為您自動跳轉");
        router.push('/login');
      }

    })
    .catch((err) => {
      console.log(err);
    })
  }
}

const logout = async () => {
  await axios.post("/api/auth/logout", {}, {withCredentials: true})
  .then((res) => {
    console.log(`logout user ok: ${res.data}`);
    userStore.logOut();
    router.push('/');
  })
  .catch((err) => {
    console.log(`error logout: ${err}`);
  })
};
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <h1 class="title">註冊帳號</h1>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="100" />

      <div v-if="!isLoggedIn" class="form">
        <div class="form-group">
          <label for="name">姓名</label>
          <input id="name" v-model="user.name" :class="{ invalid: error.name }" />
          <p class="error" v-if="error.name">{{ error.name }}</p>
        </div>

        <div class="form-group">
          <label for="email">電子郵件</label>
          <input id="email" v-model="user.email" :class="{ invalid: error.email }" />
          <p class="error" v-if="error.email">{{ error.email }}</p>
        </div>

        <div class="form-group">
          <label for="password">密碼</label>
          <input id="password" type="password" v-model="user.password" :class="{ invalid: error.password }" />
          <p class="error" v-if="error.password">{{ error.password }}</p>
        </div>

        <div class="form-group">
          <label for="confirmPassword">確認密碼</label>
          <input id="confirmPassword" type="password" v-model="user.confirmPassword" :class="{ invalid: error.confirmPassword }" />
          <p class="error" v-if="error.confirmPassword">{{ error.confirmPassword }}</p>
        </div>

        <button class="submit-btn" @click="submit">建立帳號</button>
      </div>

      <!-- 在已經登入的情況下要先要求登出 -->
      <div v-else class="form-group">
        <p class="logout-hint">目前已經登入帳號，如欲註冊新帳號請先登出</p>
        <button class="submit-btn" @click="logout">登出帳號</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.card {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
}

.title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 24px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 15px;
  margin-bottom: 0.4rem;
  color: #333;
}

.form-group input {
  padding: 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #42b983;
  outline: none;
}

.invalid {
  border-color: red !important;
}

.error {
  color: red;
  font-size: 13px;
  margin-top: 0.3rem;
}

.logout-hint {
  color: black;
  font-size: 20px;
  margin: 0.5rem;
  text-align: center;
}

.submit-btn {
  padding: 14px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #369870;
}
</style>
