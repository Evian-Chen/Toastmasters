<script setup>
import { onMounted } from "vue"
import axios from "axios"
import { userAuthStore } from "@/stores/auth"

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const CLIENT_URL = "http://localhost:5173"

const auth = userAuthStore()

const onLogin = (res) => {
  const axiosOptions = {
    headers: { "Access-Control-Allow-Origin": CLIENT_URL },
  }

  axios
    .post("/api/user/verify-token", res, axiosOptions)
    .then((res) => {
      console.log("res data: ", res.data);
      auth.setData(res.data);
    })
    .catch((error) => {
      console.log("error", error);
    })
}

onMounted(() => {
  if (CLIENT_ID) {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID, // required
      callback: onLogin, // invoke while user login in the popup
      cancel_on_tap_outside: true, // optional
      context: "signin", // optional
    })

    window.google.accounts.id.renderButton(
      document.getElementById("googleButton"),
      { theme: "outline", size: "large" } // customization attributes
    )

    window.google.accounts.id.prompt(); // show one-tap popup
  } else {
    console.error("client_id doesn't exist!");
  }
})
</script>

<template>
  <div class="container">
    <template v-if="!auth.userData.email_verified">
      <h1>Hello, This is an example of google sign in.</h1>
      <div id="googleButton"></div>
    </template>
    <template v-else>
      <img class="profile" :title="auth.userData.name" :src="auth.userData.picture" alt="Profile" />
      <h2>Hello, {{ auth.userData.name }}!</h2>
      <p>Email Verified: {{ auth.userData.email_verified }}</p>
      <p>Email: {{ auth.userData.email }}</p>
    </template>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.profile {
  border-radius: 50%;
}
</style>
