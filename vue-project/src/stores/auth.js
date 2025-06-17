import { defineStore } from "pinia";
import { reactive } from 'vue'

export const userAuthStore = defineStore('auth', () => {
  const userData = reactive({
    name: "",
    email: "",
    email_verified: "",
    picture: "",
  })

  const setData = (data) => {
    userData.name = data.name,
    userData.email = data.email,
    userData.email_verified = data.email_verified,
    userData.picture = data.picture
  }

  const logOut = () => {
    userData.name = "",
    userData.email = "",
    userData.email_verified = "",
    userData.picture = ""
  }

  return [userData, setData, logOut]
})
