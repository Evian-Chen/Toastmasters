<script setup>
// import { onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import { userAuthStore } from "@/stores/auth"

const auth = userAuthStore()
const router = useRouter()

const logOutAccount = async () => {
  console.log(`使用者資訊: ${JSON.stringify(auth.userData)}`)
  try {
    await axios.post("/api/user/logout") // 向後端請求清除 session
    auth.logOut()                        // 清除前端 Pinia 狀態
    console.log(`使用者已成功登出, 使用者資訊: ${auth.userData}`)
  } catch (err) {
    console.error("登出失敗", err)
  }
}

// onMounted(async () => {
//   console.log(`使用者資訊: ${JSON.stringify(auth.userData)}`)
//   try {
//     await axios.post("/api/user/logout") // 向後端請求清除 session
//     auth.logOut()                        // 清除前端 Pinia 狀態
//     console.log(`使用者已成功登出, 使用者資訊: ${auth.userData}`)
//   } catch (err) {
//     console.error("登出失敗", err)
//   }
// })
</script>

<template>
  <div class="logout-container">
    <div v-if="auth.userData.email">
      <p>Email Verified: {{ auth.userData.email_verified }}</p>
      <h1>你已成功登出</h1>
      <button @click="router.push('/')">回到首頁</button>
    </div>
    <div v-else>
      <p>Email Verified: {{ auth.userData.email_verified }}</p>
      <h1>確認要登出嗎？</h1>
      <button @click="logOutAccount">確定登出</button>
    </div>
  </div>
</template>

<style scoped>
.logout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  gap: 20px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
