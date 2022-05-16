<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/session">
        <img class="logo-nav" src="./assets/icon-left-font-monochrome-black-croped-resized.png" height="40">
      </router-link>
    </div>
    <router-link to="/login">Login</router-link> |
    <router-link to="/signup">Signup</router-link> |
    <router-link to="/account">Account</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo-nav {}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: rgba(209, 70, 70, 0.79);
}
</style>
