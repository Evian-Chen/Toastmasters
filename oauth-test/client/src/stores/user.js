import { defineStore } from "pinia";
import { ref } from 'vue'
import axios from 'axios'

export const userAuthStore = defineStore('auth', () => {
  const userData = ref({
    name: "",
    password: "",
    email: "",
    bio: "",
    emailToken: "",
    emailVerified: "",
  });

  const isLoggedIn = ref(false)

  const setData = async (data) => {
    // 這邊應該改成跟資料庫請求這個人的所有資料，而不是靠前端去取得
    // 如果呼叫了這個函式，基本上就代表一定有這個人的資料
    await axios.get("/data/info", {
      params: data
    })
    .then((res) => {
      const info = res.data.info;

      userData.value = {
        name: info.name || "",
        password: info.password || "",
        email: info.email || "",
        bio: info.bio || "",
        emailToken: info.emailToken || "",
        emailVerified: info.email_verified || false
      }

      // 只有在email是驗證的情況下才會允許登入
      if (!userData.value.emailVerified) {
        isLoggedIn.value = true
      }
      console.log(`in pinia isLoggedIn: ${isLoggedIn.value}`);
      console.log(`in pinia setData user info: ${JSON.stringify(userData.value)}`);
    })
    .catch((err) => {
      console.log(`in setData, get data/info error: ${err}`);
    })
  };

  const logOut = () => {
    userData.value = {
      name: "",
      password: "",
      email: "",
      bio: "",
      emailToken: "",
      emailVerified: "",
    }
    isLoggedIn.value = false
    console.log("pinia user.js log out")
  }

  return { userData, setData, logOut, isLoggedIn }
})

