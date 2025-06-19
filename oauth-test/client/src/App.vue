<script setup>
import { reactive } from "vue";
import axios from "axios";

const user = reactive({
  email: "",
  password: ""
})

// 使用者登入過，直接登入，沒有找到登入資料的話，要求使用者註冊
const onLogIn = async () => {
  if (!user.email || !user.password) {
    alert("輸入欄不得空白");
    return;
  }

  await axios.post('/api/user/login', user)
  .then((res) => {
    //
    console.log(`frontend login ok: ${res.status}`);
  })
  .catch((err) => {
    console.log(`error: ${err}`);
  })
}

// 沒有使用者資料，要註冊
const onSignUp = () => {
  //
}
</script>

<template>
  <div class="container">
    <div class="row">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="input">
        <input v-model="user.email" placeholder="enter email here...">
        <input v-model="user.password" placeholder="enter password here...">
      </div>

      <div class="btn">
        <button @click="onSignUp">Sign Up</button>
        <button @click="onLogIn">Log In</button>
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

</style>
