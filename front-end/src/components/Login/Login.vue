<template>
  <div>
    <h2>Login</h2>
    <form class='form' @submit.prevent="login">
        <input class="my-1" v-model="username" placeholder="Username">
        <br>
        <input class="my-1" v-model="password" placeholder="Password">
        <br>
        <div class='submit-btn'>
            <button class="submit-button btn btn-primary my-1" type="submit">Login</button>
        </div>
    </form>
    <p class='mt-5'>Don't have an account yet?</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  components: {
  },
  data() {
      return {
        username: "",
        password: "",
      }
  },
  methods: {
    async login() {
      this.error = '';
      this.errorLogin = '';
      if (!this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users/login', {
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.errorLogin = "Error: " + error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>



</style>
