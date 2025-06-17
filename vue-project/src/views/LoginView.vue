<script setup>
import { onMounted, ref } from "vue"
import axios from "axios"

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
const CLIENT_URL = "http://localhost:5173"

console.log(`clientid: ${CLIENT_ID}`)

const userData = ref({
  name: "",
  email: "",
  email_verified: "",
  picture: "",
})

const onLogin = (res) => {
  const axiosOptions = {
    headers: { "Access-Control-Allow-Origin": CLIENT_URL },
  }

  console.log(res)

  axios
    .post("/api/user/verify-token", res, axiosOptions)
    .then((res) => {
      console.log("res: ", res);
      userData.value = res.data;
    })
    .catch((error) => {
      console.log("error", error);
    })
}

onMounted(() => {
  window.onload = () => {
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
  }
})
</script>

<template>
  <div class="container">
    <template v-if="!userData.email_verified">
      <h1>Hello, This is an example of google sign in.</h1>
      <div id="googleButton"></div>
    </template>
    <template v-else>
      <img
        class="profile"
        :title="userData.name"
        :src="userData.picture"
        alt="Profile"
      />
      <h2>Hello, {{ userData.name }}!</h2>
      <p>Email Verified: {{ userData.email_verified }}</p>
      <p>Email: {{ userData.email }}</p>
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
