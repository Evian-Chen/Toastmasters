<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="navbar">
    <nav class="nav-container">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/login" class="nav-link">Login</RouterLink>
    </nav>
  </header>

  <main class="main-content">
    <RouterView />
  </main>
</template>

<style scoped>
/* 固定在上方 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #42b983;
  padding: 1rem 2rem;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 導覽列內容排列 */
.nav-container {
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
}

/* 導覽連結樣式 */
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
}

.nav-link:hover {
  text-decoration: underline;
}

/* 頁面主要內容區域，需要加上 top padding 才不會被 navbar 擋住 */
.main-content {
  padding-top: 80px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
