<template>
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
