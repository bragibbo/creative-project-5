<template>
  <div class='page'>
      <div class="content">
        <h1 class='title'>Welcome</h1>
        <Login v-if="loginMode"/>
        <Register v-else/>
        <button class="btn btn-outline-primary" @click="toggleMode">{{loginMode ? 'Register' : 'Login'}}</button>
      </div>
      
      <div class="mt-4 content-footer">
        <p>Created by Brayden Gibbons and Nathan Sirrine. View the code for this project on <a href="https://github.com/bragibbo/creative-project-4">Github</a>.</p>
      </div>
  </div>
</template>

<script>
import Login from '../components/Login/Login';
import Register from '../components/Login/Register';
export default {
  name: 'LandingPage',
  components: {
    Login,
    Register
  },
  data() {
    return {
      loginMode: true,
    }
  },
  methods: {
    toggleMode() {
      this.loginMode = !this.loginMode
    }
  }
}
</script>

<style scoped>
.title {
  margin-top: 2rem;
}

.page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  width: 100%;
}

.content-footer {
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  margin-right: 30px;
  border-top: 1px solid gray;
  font-size: .75em;
  align-items: flex-start;
}
</style>