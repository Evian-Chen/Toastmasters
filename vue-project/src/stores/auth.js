import { defineStore } from "pinia";
import { ref } from 'vue'

export const userAuthStore = defineStore('auth', () => {
  const userData = ref({
    name: "",
    email: "",
    email_verified: "",
    picture: "",
  })

  const isLoggedIn = ref(false)

  const setData = (data) => {
    userData.value = {
      name: data.name,
      email: data.email,
      email_verified: data.email_verified,
      picture: data.picture
    }
    isLoggedIn.value = true
  }

  const logOut = () => {
    userData.value = {
      name: "",
      email: "",
      email_verified: "",
      picture: ""
    }
    isLoggedIn.value = false
    console.log("auth.js log out")
  }

  return { userData, setData, logOut, isLoggedIn }
})
