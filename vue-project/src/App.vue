<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { userAuthStore } from './stores/auth'
import { onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import { storeToRefs } from "pinia"

const auth = userAuthStore()
const { isLoggedIn } = storeToRefs(auth)

console.log(`APP is logged in: ${isLoggedIn.value}`)

onMounted(async () => {
  await axios.get("/api/user/me")
  .then((res) => {
    auth.setData(res.data)
  })
  .catch(() => {
    auth.logOut()
    console.log("log out")
  })
})

</script>

<template>
  <header>
    <img alt="Toastmasters logo" class="logo" src="@/assets/logo.svg" width="150" />

    <div class="wrapper">
      <HelloWorld msg="Look for clubs!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/search">Search</RouterLink>

        <div v-if="!isLoggedIn">
          <RouterLink to="/login">Log In</RouterLink>
        </div>
        <div v-else>
          <RouterLink to="/logout">Log Out</RouterLink>
        </div>

      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
