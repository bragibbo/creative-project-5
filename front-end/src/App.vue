<template>
  <div id="app">
    <div class="content">
      <div class="nav">
        <div class="text-header d-flex flex-row w-100 align-items-center justify-content-end"  v-if="user">
          <div class="text-white">Logged in as: {{ user.firstName }} {{ user.lastName }}</div>
          <button @click="logout" class="ml-4 btn btn-primary text-header">
            Logout
          </button>
        </div>
      </div>
      <Dashboard v-if="user"/>
      <LandingPage v-else />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Dashboard from './views/Dashboard'
import LandingPage from './views/LandingPage'

export default {
  name: 'App',
  components: {
    Dashboard,
    LandingPage
  },
  computed: {
    user() {
      return this.$root.$data.user
    }
  },
  async created() {
    try {
      let response = await axios.get("/api/users");
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
  }
}
</script>


<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.text-header {
  font-size: .75rem !important;
}

.content {
  height: 100%;
}

.nav {
  background: var(--secondaryBlue);
  padding: 20px;
  box-shadow: 0px 1px 10px;
}

.nav a {
  font-weight: bold;
  color: #2c3e50;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
