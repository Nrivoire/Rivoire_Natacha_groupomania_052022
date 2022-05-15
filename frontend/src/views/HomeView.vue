<template>
  <nav>
    <router-link to="/login">Login</router-link> |
    <router-link to="/signup">Signup</router-link>
  </nav>
  <div class="home">
    <img src="../assets/icon-above-font.svg" height="500" alt="groupomania red logo">
    <HomePage msg="Welcome to The Forum"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/HomePage.vue'

export default {
  name: 'HomeView',
  components: {
    HomePage
  }
}
</script>
