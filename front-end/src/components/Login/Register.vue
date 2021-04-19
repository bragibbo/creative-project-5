<template>
  <div class="register">
    <h3>Register a New User</h3>
    <div class="form">
      <form @submit.prevent="register">
        <input class="my-1" v-model="firstName" placeholder="First Name">
        <br>
        <input class="my-1" v-model="lastName" placeholder="Last Name">
        <br>
        <input class="my-1" v-model="username" placeholder="User name">
        <br>
        <input class="my-1" v-model="email" placeholder="Email">
        <br>
        <input class="my-1" v-model="password" type="password" placeholder="Password">
        <br>
        <div class="mt-3 d-flex flex-row justify-content-center">
          <div class="mx-3 form-check">
            <input class="form-check-input" v-model="gender" type="radio" id="male" name="gender" v-bind:value="'male'">
            <label class="form-check-label" for="male">Male</label>
          </div>
          <div class="mx-3 form-check">
            <input class="form-check-input" v-model="gender" type="radio" id="female" name="gender" v-bind:value="'female'">
            <label class="form-check-label" for="female">Female</label>
          </div>
        </div>
        <button class="my-4 btn btn-primary" type="submit">Register</button>
      </form>
    </div>

        <p class='mt-2'>Already have an account?</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  component: {
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      gender: '',
      error: '',
      errorLogin: '',
    }
  },
  methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if(!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
          gender: this.gender,
          email: this.email,
        })
        this.$root.$data.user = response.data.user
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
  }
}
</script>

<style scoped>
.register {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form {
  width: 75%;
}
</style>
