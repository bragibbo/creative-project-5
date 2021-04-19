<template>
<div class="page">
  <h1>Edit Student</h1>
  <form @submit.prevent="saveStudent">
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
    <button class="submit-button btn btn-outline-primary" type="submit">Save</button>
  </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create',
  data() {
    return {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      billingPrice: '',
      gender: '',
      lessonLength: '',
      genderOptions: ["M","F"],
      lessonLengthOptions: ["30 min", "45 min", "60 min"],
      errors: []
    }
  },
  methods: {
    async saveStudent() {
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
        await axios.put('/api/students/' + this.id, {
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          email: this.email,
          price: this.formatBillingPrice(),
          lessonLength: this.lessonLength
        })
        this.$router.push("Students");
      } catch (error) {
        this.errors.push("Error saving student");      
      }
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
        }
        return price;
    }
  },
  async created() {
    this.errors = []
    try {
      const response = await axios.get('/api/students/' + this.$route.query.id)
      const student = response.data.student;
      this.id = student._id;
      this.firstName = student.student.firstName;
      this.lastName = student.student.lastName;
      this.email = student.student.email;
      this.billingPrice = student.price;
      this.gender = student.student.gender;
      this.lessonLength = student.lessonLength;
    } catch (error) {
      this.errors.push(error);
    }
  }
}
</script>

<style scoped>
.errors {
  color: red;
}

input {
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