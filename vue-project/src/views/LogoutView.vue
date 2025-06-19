<script setup>
// import { onMounted } from "vue"
import axios from "axios"
import { useRouter } from "vue-router"
import { userAuthStore } from "@/stores/auth"
import { storeToRefs } from "pinia"

const auth = userAuthStore()
const router = useRouter()

const { isLoggedIn } = storeToRefs(auth)
console.log(`logout view is logged in: ${isLoggedIn.value}`)

const logOutAccount = async () => {
  console.log("try log out account")
  try {
    // await axios.post("/api/user/logout")
    await axios.post("/api/user/logout")
    .then((res) => {
      console.log(`log out success: ${res.data}`)
    })
    .catch((err) => {
      console.log(`log out error: ${err}`)
    })
    auth.logOut()
    console.log("try logout function")
  } catch (err) {
    console.error("登出失敗", err)
  }
}

</script>

<template>
  <div class="logout-container">
    <div v-if="!isLoggedIn">
      <h1>你已成功登出</h1>
      <button @click="router.push('/')">回到首頁</button>
    </div>
    <div v-else>
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
