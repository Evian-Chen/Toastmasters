<script setup>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { userAuthStore } from "@/stores/user";
// import { storeToRefs } from "pinia";

const userStore = userAuthStore();
// const { isLoggedIn } = storeToRefs(userStore);

const user = reactive({
  email: "",
  password: ""
})

const state = reactive({
  userExist: true,
  warning: ""
})

const router = useRouter();

// 使用者登入過，直接登入，沒有找到登入資料的話，要求使用者註冊
const onLogIn = async () => {
  if (!user.email || !user.password) {
    state.warning = "輸入欄不得空白";
    return;
  }

  await axios.post('/api/auth/login', user, { withCredentials: true })
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
      router.push('/');  // 回到首頁後，
      // 畫面配置一樣，帶有使用者資訊
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

const forgetPassword = () => {
  // do sth
  console.log("forget pw");
}

watch([() => user.email, () => user.password], () => {
  state.warning = "";
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
