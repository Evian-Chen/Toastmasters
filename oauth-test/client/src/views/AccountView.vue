<script setup>
import { ref } from 'vue';

const bio = ref('');
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const updateBio = () => {
  console.log("更新 bio：", bio.value);
};

const updatePassword = () => {
  console.log("更新密碼：", currentPassword.value, newPassword.value, confirmPassword.value);
};
</script>

<!-- TODO: -->
<!-- 使用nested router重新設計這個頁面 -->
<!-- 增加一些一般可變更的個人設定，例如生日、暱稱等等 -->
<!-- 先以日記的想法為主進行擴增+測試 -->

<template>
  <div class="wrapper">
    <div class="card">
      <h1 class="title">帳號設定</h1>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="100" />

      <div class="form-group">
        <label for="bio">個人簡介</label>
        <textarea id="bio" v-model="bio" rows="4" placeholder="輸入你的簡介..."></textarea>
        <button class="submit-btn" @click="updateBio">更新簡介</button>
      </div>

      <hr class="divider" />

      <div class="form-group">
        <label for="current-password">目前密碼</label>
        <input type="password" id="current-password" v-model="currentPassword" />

        <label for="new-password">新密碼</label>
        <input type="password" id="new-password" v-model="newPassword" />

        <label for="confirm-password">確認新密碼</label>
        <input type="password" id="confirm-password" v-model="confirmPassword" />

        <button class="submit-btn" @click="updatePassword">更新密碼</button>
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.form-group label {
  font-size: 15px;
  color: #333;
  margin-top: 0.5rem;
}

.form-group input,
.form-group textarea {
  padding: 14px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #42b983;
  outline: none;
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

.divider {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 2rem 0;
}
</style>
