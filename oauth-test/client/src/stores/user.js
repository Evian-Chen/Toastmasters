import { defineStore } from "pinia";
import { ref } from 'vue'

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

  const setData = (data) => {
    userData.value = {
      name: data.name || "",
      password: data.password || "",
      email: data.email || "",
      bio: data.bio || "",
      emailToken: data.emailToken || "",
      emailVerified: data.email_verified || false
    }

    // 只有在email是驗證的情況下才會允許登入
    if (!userData.value.emailVerified) {
      isLoggedIn.value = true
    }
    console.log(`in pinia isLoggedIn: ${isLoggedIn.value}`);
    console.log(`in pinia: ${JSON.stringify(userData.value)}`);
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

