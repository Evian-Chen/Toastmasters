import { defineStore } from "pinia";
import { ref } from 'vue'

export const userAuthStore = defineStore('auth', () => {
  const userData = ref(null)

  const setData = (data) => {
    userData.value = data
  }

  const logOut = () => {
    userData.value = null
  }

  return [userData, setData, logOut]
})
