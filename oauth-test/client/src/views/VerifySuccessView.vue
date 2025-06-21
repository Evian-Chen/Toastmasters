<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="container">
    <div class="card">
      <h1>✅ 驗證成功</h1>
      <p>您現在可以登入您的帳號。</p>
      <RouterLink class="login-btn" to="/login">前往登入</RouterLink>
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

.card {
  background: white;
  padding: 40px 30px;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
}

h1 {
  color: #42b983;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1.5rem;
}

.login-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #42b983;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.3s;
}

.login-btn:hover {
  background-color: #369870;
}
</style>
