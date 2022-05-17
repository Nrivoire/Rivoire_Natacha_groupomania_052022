<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/session" v-if="this.session">
      <img class="logo-nav" src="./assets/icon-left-font-monochrome-black-croped-resized.png" height="40"
        alt="logo groupomania">
      <img class="logo-nav-mobile" src="./assets/logo-groupomania.png" height="50" width="40"
        alt="logo groupomania">
    </router-link>
    <router-link to="/" v-if="!this.session">
      <img class="logo-nav" src="./assets/icon-left-font-monochrome-black-croped-resized.png" height="40"
        alt="logo groupomania">
      <img class="logo-nav-mobile" src="./assets/logo-groupomania.png" height="50" width="40"
        alt="logo groupomania">
    </router-link>
    <div class="" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/login" v-if="!this.session" class="nav-item">Login</router-link>
        <router-link to="/signup" v-if="!this.session" class="nav-item">Signup</router-link>
        <router-link to="/account" v-if="this.session" class="nav-item align-nav">Compte</router-link>
        <div class="nav-item">
          <button @click='disconnect' type="button" class="btn btn-outline-danger button-disconnect"
            v-if="this.session">Déconnexion</button>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      session: sessionStorage.getItem('Token')
    }
  },
  methods: {
    disconnect() {
      if (confirm('Voulez-vous vraiment vous déconnecter?')) {
        sessionStorage.removeItem('Token');
        sessionStorage.removeItem('UserId');
        sessionStorage.removeItem('Admin');
        window.location = '/';
      }
    }
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.button-disconnect {
  width: 100%;
}

.logo-nav-mobile {
  opacity: 0;
}

@media screen and (max-width: 425px) {
  .logo-nav {
    display: none;
  }

  .logo-nav-mobile {
    opacity: 1;
    margin-left: 30px;
  }

  .navbar-nav {
    flex-direction: row;
  }
}

.navbar-nav {
  align-items: center;
}

.align-nav {
  height: 20%;
}

.logo-nav {
  margin-left: 10px;
  margin-right: 20px;
}

.nav-item {
  margin-right: 10px;
  margin-left: 10px;
}

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
