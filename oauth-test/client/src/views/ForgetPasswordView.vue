<script setup>
// import axios from 'axios';
import axios from 'axios';
import { reactive } from 'vue';

const params = reactive({
  email: "",
  emailWarning: "",
  verifyCode: "",
  codeWarning: "",
  emailSent: false,
  emailExists: false
})

const checkEmail = async () => {
  // 檢查email是否有輸入
  if (params.email) {
    const emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // email是合理的
    if (params.email.search(emailRule) === -1) {
      params.emailWarning = "電子郵件格式錯誤";
      return;
    }
    params.emailWarning = ""

    // 檢查email是否已經被註冊過，都沒錯之後寄出信件
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/data/info`, {
      params: params
    })
    .then(() => {
      console.log("使用者有註冊過，可以寄出密碼變更驗證信");
      params.emailExists = true;
    })
    .catch(() => {
      params.emailWarning = "此電子郵件沒有被註冊過，請註冊新帳號";
    })
  } else {
    params.emailWarning = '請輸入電子郵件';
    return;
  }
}

const setNewPw = async () => {
  await checkEmail();

  if (params.emailExists) {
    await axios.post(`/api/forget/password`, {
      email: params.email
    })
    .then((res) => {
      console.log(`呼叫/forget/password ${res.status}`);
      params.emailSent = true;
    })
    .catch((err) => {
      console.log(`set new password error: ${err}`);
    })
  }
}

</script>

<template>
  <div class="wrapper">
    <div class="card">
      <h1 class="title">重設密碼</h1>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="100" />

      <div class="form-group">
        <label for="email">輸入註冊的電子郵件</label>
        <input id="email" v-model="params.email" />
        <p class="error" v-if="params.emailWarning">{{ params.emailWarning }}</p>

        <button class="submit-btn" @click="setNewPw">寄出驗證信</button>

      </div>

      <!-- <div v-if="params.emailSent" class="form-group"> -->
        <!-- TODO: 加入重新寄出驗證信 -->
        <!-- <button class="submit-btn" @click="">驗證</button> -->
      <!-- </div> -->

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
  margin: 0.6rem;
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

