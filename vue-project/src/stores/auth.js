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

  console.log(`userData: ${JSON.stringify(userData)}`)

  return { userData, setData, logOut }
})
