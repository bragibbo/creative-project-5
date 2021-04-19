<template>
<div class="wrapper">
  <div class="grid-container">
      <div class="grid-item header">
        Name
      </div>
      <div class="grid-item header">
        Gender
      </div>
      <div class="grid-item header">
        Email
      </div>
      <div class="grid-item header">
        Student Since
      </div>
      <div class="grid-item header">
        Billing Price
      </div>

    </div>
  <div class="student-table"   v-for="student in students" :key="student.id">
    <div class="grid-container">
      <div class="grid-item">
        {{student.student.lastName}}, {{student.student.firstName}}
      </div>
      <div class="grid-item">
        {{student.student.gender}}
      </div>
      <div class="grid-item">
        {{student.student.email}}
      </div>
      <div class="grid-item">
        {{student.startDate}}
      </div>
      <div class="grid-item">
        {{student.price}}
      </div>
      <div class="grid-item remove">
        <button class="btn btn-outline-primary btn-sm mr-2" @click='editStudent(student)'>edit</button>
        <button class="btn btn-outline-danger btn-sm my-1" @click='() => removeStudent(student)'>Delete Student</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'StudentTable',
  props: {
    students: Array,
  },
  data() {
    return {
      error: ''
    }
  },
  methods: {
    async removeStudent(student) {
      this.error = '';
      try {
        await axios.delete('/api/students/' + student._id)
        this.$emit('delete')
      } catch (error) {
        this.error = error;
      }
    },
    editStudent(student) {
      this.$router.push({name: "EditStudent", query: {id: student._id}});
    }
  }
}
</script>

<style scoped>
    h1 {
      font-size:1.5em;  
    }
    .grid-container {
      display: grid;

      border-bottom: 1px solid black;
      grid-template-columns: 2fr .25fr 3fr 1fr 1fr .75fr;
      grid-column-gap: 20px;
      vertical-align: center;
    }

    .grid-item {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .wrapper {
      margin-bottom: 20px;
    }

    .remove-button {
      background-color: rgb(168, 98, 98);
    }

    .btn {
      font-size: .5rem;
    }

    .header {
      font-weight: 600;
      font-size: .8rem;
      margin-bottom: .2rem;
    }

</style>