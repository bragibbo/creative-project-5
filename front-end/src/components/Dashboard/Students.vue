<template>
<div class="page">
  <div>
      <h1>Students</h1>
  </div>
  <div class="top-bar">
    <button class='btn btn-primary btn-sm' @click="$router.push('CreateStudent')">Add Student</button>
  </div>

  <div class="students">
    <StudentTable :students="students" @delete="getStudents" />
  </div>

</div>
</template>

<script>
import axios from 'axios'
import StudentTable from "./Students/StudentTable.vue"
export default {
  name: 'Students',
  components: {
    StudentTable
  },
  data() {
   return {
     students: []
   }
  },
  async created() {
    await this.getStudents()
  },
  methods: {
    async getStudents () {
      try {
        let response = await axios.get("/api/students");
        this.students = response.data.students;
      } catch (error) {
        this.students = [];
      }
    },
  }
}
</script>

<style scoped>
  .top-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  .btn {
    font-size: .7rem;
    margin-bottom: .5rem;

  }

  .page-title {
    font-size: 2rem;
    font-weight: 500;
  }

</style>