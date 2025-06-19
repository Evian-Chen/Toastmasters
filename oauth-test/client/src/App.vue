<script setup>
import { reactive } from "vue";

const user = reactive({
  email: "",
  password: ""
})

const onLogIn = () => {
  console.log(`email: ${user.email}, pd: ${user.password}`);
  if (!user.email || !user.password) {
    alert("輸入欄不得空白");
  }
}

const onSignUp = () => {
  //
}
</script>

<template>
  <div class="container">
    <div class="row">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="input">
        <input v-model="user.email" placeholder="enter email here...">
        <input v-model="user.password" placeholder="enter password here...">
      </div>

      <div class="btn">
        <button @click="onSignUp">Sign Up</button>
        <button @click="onLogIn">Log In</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.row {
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo {
  margin: 0 auto 2rem;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.input input {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border 0.3s;
}

.input input:focus {
  border-color: #42b983;
}

.btn {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.btn button {
  flex: 1;
  padding: 12px;
  font-size: 16px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn button:hover {
  background-color: #369870;
}

</style>
