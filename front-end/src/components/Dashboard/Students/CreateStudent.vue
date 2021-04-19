<template>
<div class="page">
  <h1>Add a Student</h1>
  <form v-if="creating" @submit.prevent="addStudent">
    <input v-model="firstName" placeholder="First Name">
    <br>
    <input v-model="lastName" placeholder="Last Name">
    <br>
    <input v-model="email" placeholder="Email">
    <br>
    <input v-model="billingPrice" placeholder="Billing Price">
    <br>
    <v-select class='dropdown' v-model="gender" :options="genderOptions" placeholder="Gender"/>
    <v-select class='dropdown' v-model="lessonLength" :options="lessonLengthOptions" placeholder="Lesson Length"/>
    <div class="d-flex flex-column input" v-for="(error, index) in errors" :key="index">
      <div class="errors">{{error}}</div>
    </div><br/>
    <button class="submit-button btn btn-outline-primary" type="submit">Submit</button>
  </form>
  <div v-else>
    <p>Student successfully added!</p>
    <p><a @click="toggleForm" href="#">Add another student</a></p>
        <button class='btn btn-primary' @click="$router.push('Students')">Return to Student View</button>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create',
  data() {
    return {
      creating: true,
      firstName: '',
      lastName: '',
      email: '',
      billingPrice: '',
      gender: '',
      lessonLength: '',
      genderOptions: ["male","female"],
      lessonLengthOptions: ["30 min", "45 min", "60 min"],
      errors: []
    }
  },
  methods: {
    async createStudent() {
      this.errors = [];
      this.errorLogin = '';
      if(!this.firstName || !this.lastName || !this.email || !this.gender) {
        if(!this.firstName) this.errors.push('Missing student first name')
        if(!this.lastName) this.errors.push('Missing student last name')
        if(!this.email) this.errors.push('Missing student email')
        if(!this.gender) this.errors.push('Missing student gender')
        return false;
      }

      try {
        await axios.post('/api/students/', {
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          email: this.email,
          price: this.formatBillingPrice(),
          startDate: this.today(),
          lessonLength: this.lessonLength
        })
        return true;
      } catch (error) {
        this.errors.push(error.response.data.message);
        return false;
      }
    },
    toggleForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '',
        this.billingPrice = '',
        this.gender = '',
        this.lessonLength = '',
        this.creating = !this.creating;
    },
    async addStudent() {
      const success = await this.createStudent();
      if(success) this.toggleForm();
    },
    today() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      return mm + "/" + dd + "/" + yyyy;
    },
    formatBillingPrice() {
      let price = this.billingPrice;
      if (price.length > 0) {
          if (price[0] != '$') {
              price = "$" + price;
          }
          if (!price.includes('.')) {
              price = price + ".00";
          }
          else if (price.includes('.') && (price.indexOf('.') != (price.length - 3))) {
              price = price + "0";
          }
          else if (price.length == 0) {
              price = "--";
          }
      }
      else if (price.length == 0) {
          price = "--";
      }
      return price;
    }
  }
}
</script>

<style scoped>
.errors {
  color: red;
}

input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
  width: 100%;
  margin-bottom:.5rem;
}

textarea {
  font-size: 1.6em;
  width: 100%;
  max-width: 500px;
  height: 100px;
}

button {
  margin-top: 20px;
  font-size: 1.2em;
}

.dropdown {
    margin-bottom: .5rem;
}

form {
    justify-content: center;
    width: 300px;
    
}

.submit-button {
    margin: 0;
}

.page {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>