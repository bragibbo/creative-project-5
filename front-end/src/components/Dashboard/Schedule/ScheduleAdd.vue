<template>
  <form>
    <div class="d-flex flex-column input my-2">
      <label for="hour-select">Select Student</label>
      <v-select 
        id="student-select" 
        class="w-50" 
        v-model="selectedStudent" 
        :get-option-label="option => `${option.student.firstName} ${option.student.lastName}`" 
        :options="students"
      />
    </div>
    <div class="d-flex flex-column input my-2">
      <label for="hour-select">Hour to Schedule</label>
      <v-select id="hour-select" class="w-50" v-model="selectedHour" :options="hours"/>
    </div>
    <div class="d-flex flex-column input my-4">
      <button type="button" class="btn btn-outline-primary" @click="submit">Add to Schedule</button>
    </div>
    <div v-if="errors.length > 0">
      <div class="d-flex flex-column input" v-for="(error, index) in errors" :key="index">
        <div class="errors">{{error}}</div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    hours: Array,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      selectedHour: '',
      selectedStudent: '',
      errors: [],
      students: [],
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
    async submit() {
      this.errors = []
      if (!this.selectedStudent || !this.selectedHour) {
        if(!this.selectedStudent) this.errors.push('Must select a student')
        if(!this.selectedHour) this.errors.push('Missing a selected hour')
      } else {
        await this.sendSchedule();
        this.$emit('add')
        this.selectedStudent = '';
        this.selectedHour = ''
      }
    },
    async sendSchedule() {
      try {
      await axios.post("/api/schedule/", {
        id: this.selectedStudent._id,
        time: this.selectedHour
      });
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.student-select {
 
}

.btn {
  font-size: 1rem;
}

.errors {
  color: red;
}

.input {
  align-items: flex-start;
}

@media only screen and (max-width: 700px) {
  .input {
    align-items: center;
  }
}
</style>
