<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const router = useRoute();

const params = reactive({
  token: "",
  pw: "",
  verifypw: "",
  warning: ""
});

const submit = () => {
  console.log("submit");
}

// 先檢查後端帶來的token
onMounted(() => {
  params.token = router.query.token;
  console.log(`後端導向過來後帶有的token: ${router.query.token}`);
})
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <h1 class="title">重設密碼</h1>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="100" />

      <div class="form-group">
        <label for="pw">輸入新密碼</label>
        <input id="pw" v-model="params.pw" />

        <label for="verifypw">再輸入一次新密碼</label>
        <input id="verifypw" v-model="params.verifypw" />
        <p class="error" v-if="params.warning">{{ params.warning }}</p>

        <button class="submit-btn" @click="submit">寄出驗證信</button>

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


