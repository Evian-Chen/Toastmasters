<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { userAuthStore } from "@/stores/user";
// import { storeToRefs } from "pinia";

const userStore = userAuthStore();

const router = useRouter();

const logout = async () => {
  await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, {withCredentials: true})
  .then((res) => {
    console.log(`logout user ok: ${res.data}`);
    userStore.logOut();
    router.push('/');  // 這裡有問題
  })
  .catch((err) => {
    console.log(`error logout: ${err}`);
  })
};
</script>

<template>
  <div class="logout-container">
    <h1 class="logout-title">你確定要登出嗎？</h1>
    <button class="logout-button" @click="logout">登出</button>
  </div>
</template>

<style scoped>
.logout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Segoe UI', sans-serif;
}

.logout-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1e293b;
}

.logout-button {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.logout-button:hover {
  background-color: #dc2626;
}
</style>
